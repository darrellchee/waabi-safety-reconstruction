"""Careers: matched viewport/scroll captures; REA native screenshots, numeric geometry and overlays."""
import asyncio,os,json,gzip,base64
from pathlib import Path
from PIL import Image,ImageChops,ImageEnhance,ImageStat
from playwright.async_api import async_playwright
OUT=Path('artifacts/comparison/careers');OUT.mkdir(parents=True,exist_ok=True)
async def rea(page,port,name):
 c=await page.context.new_cdp_session(page);tid=(await c.send('Target.getTargetInfo'))['targetInfo']['targetId']
 proc=await asyncio.create_subprocess_exec('npm','exec','--yes','--package=rea-agents@6.5.0','--','rea','capture-web-screenshot',f'http://127.0.0.1:{port}',tid,'--format','json',stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.PIPE)
 raw,err=await proc.communicate();data=json.loads(raw)
 with gzip.open(OUT/(name+'.json.gz'),'wb') as f:f.write(raw)
 (OUT/(name+'.png')).write_bytes(base64.b64decode(data['normalized_result']['artifact']['data_base64']))
PROBE='''()=>{const box=e=>{let s=getComputedStyle(e);return{tag:e.tagName,text:e.innerText,cls:e.className,rect:e.getBoundingClientRect().toJSON(),font:s.font,tracking:s.letterSpacing,padding:s.padding,gap:s.gap,background:s.backgroundColor}};return{height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth,sections:[...document.querySelectorAll('main > section,main > div > section')].map(box),nodes:[...document.querySelectorAll('main h1,main h2,main h3,main p')].map(box)}}'''
async def main():
 sides=[side for side in os.getenv('CAREERS_SIDES','reference,local').split(',') if side];widths=list(map(int,os.getenv('CAREERS_WIDTHS','1440,1920,768,390').split(',')))
 async with async_playwright() as p:
  for side in sides:
   port=9411 if side=='reference' else 9412
   kwargs={'executable_path':'/usr/bin/chromium','args':['--no-sandbox',f'--remote-debugging-port={port}']}
   if side=='reference':kwargs['proxy']={'server':os.environ['HTTPS_PROXY']}
   b=await p.chromium.launch(**kwargs)
   for w in widths:
    h={1440:900,1920:1080,768:1024,390:844}[w]
    page=await b.new_page(viewport={'width':w,'height':h},reduced_motion=os.getenv('CAREERS_MOTION','no-preference'))
    await page.add_init_script('const originalInterval=window.setInterval;window.setInterval=function(fn,delay,...args){return delay===2000?0:originalInterval(fn,delay,...args)}')
    await page.goto(('https://waabi.ai' if side=='reference' else os.getenv('CAREERS_LOCAL_URL','http://127.0.0.1:3000'))+'/careers',wait_until='domcontentloaded',timeout=120000);await page.evaluate('document.fonts.ready');await page.wait_for_timeout(1200)
    if side=='reference':
     try:await page.get_by_role('button',name='Reject All',exact=True).click(timeout=1000)
     except Exception:pass
     await page.evaluate('''()=>{const bar=[...document.querySelectorAll('div')].find(e=>getComputedStyle(e).position==='fixed'&&e.getBoundingClientRect().height<60&&e.textContent.includes("Let's talk autonomous"));bar?.querySelector('button')?.click()}''')
     await page.wait_for_timeout(500)
    # Disable photo timers equally for stable static comparisons, preserving initial crop/stack.
    # The init script suppresses only the 2000ms photo interval on both sides; RAF and scroll motion continue.

    height=await page.evaluate('document.documentElement.scrollHeight')
    for y in range(0,height,600):await page.evaluate('(y)=>scrollTo({top:y,behavior:"instant"})',y);await page.wait_for_timeout(180)
    await page.evaluate('scrollTo({top:0,behavior:"instant"})');await page.wait_for_timeout(3500)
    data=await page.evaluate(PROBE);(OUT/f'{side}-{w}-geometry.json').write_text(json.dumps(data,indent=2))
    await page.screenshot(path=str(OUT/f'{side}-{w}-full.png'),full_page=True)
    for name,y in [('hero',0),('intro',h+70),('mission',1900 if w>=768 else 1700),('voices',3250 if w>=1024 else 3550 if w>=768 else 2700),('values',4200 if w>=1024 else 4500 if w>=768 else 3450),('closing',5200 if w>=1024 else 5300 if w>=768 else 4100)]:
     await page.evaluate('(y)=>scrollTo({top:y,behavior:"instant"})',y);await page.wait_for_timeout(750)
     await rea(page,port,f'{side}-{w}-{name}')
    print(side,w,'height',data['height'],'overflow',data['overflow'],flush=True);await page.close()
   await b.close()
 for local in OUT.glob('local-*.png'):
  ref=OUT/local.name.replace('local-','reference-',1)
  if not ref.exists():continue
  a,b=Image.open(ref).convert('RGB'),Image.open(local).convert('RGB')
  if a.size!=b.size:continue
  Image.blend(a,b,.5).save(OUT/(local.stem+'-overlay.png'))
  ImageEnhance.Contrast(ImageChops.difference(a,b)).enhance(3).save(OUT/(local.stem+'-diff.png'))
 rows=[];pixels=[]
 for w in [1440,1920,768,390]:
  ref=OUT/f'reference-{w}-geometry.json';local=OUT/f'local-{w}-geometry.json'
  if not(ref.exists() and local.exists()):continue
  a,b=json.loads(ref.read_text()),json.loads(local.read_text())
  rows.append({'width':w,'referencePageHeight':a['height'],'localPageHeight':b['height'],'localOverflow':b['overflow'],'sections':[{'referenceTop':x['rect']['y'],'localTop':y['rect']['y'],'referenceHeight':x['rect']['height'],'localHeight':y['rect']['height']} for x,y in zip(a['sections'],b['sections'])]})
  for name in ['hero','intro','mission','voices','values','closing']:
   ref=OUT/f'reference-{w}-{name}.png';local=OUT/f'local-{w}-{name}.png'
   if not(ref.exists() and local.exists()):continue
   a,b=Image.open(ref).convert('RGB'),Image.open(local).convert('RGB')
   pixels.append({'width':w,'state':name,'meanAbsoluteRGBChannelError0to255':sum(ImageStat.Stat(ImageChops.difference(a,b)).mean)/3})
 (OUT/'final-comparison.json').write_text(json.dumps({'geometry':rows,'pixelComparisons':pixels,'notes':'Normal motion; 2000ms photo intervals suppressed equally for static alignment only. Footer decoder phases and inherited footer approximation contribute to differences.'},indent=2))
asyncio.run(main())

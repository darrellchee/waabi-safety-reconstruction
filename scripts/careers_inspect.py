import asyncio,json,os,base64,gzip
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('artifacts/reference/careers');OUT.mkdir(parents=True,exist_ok=True)
async def rea(page,port,name,inspect=False):
 c=await page.context.new_cdp_session(page);target=(await c.send('Target.getTargetInfo'))['targetInfo']['targetId']
 cmd=['npm','exec','--yes','--package=rea-agents@6.5.0','--','rea','inspect-web-page' if inspect else 'capture-web-screenshot',f'http://127.0.0.1:{port}',target,'--format','json']
 if inspect:cmd+=['--include-script-sources','--observation-ms','1000']
 proc=await asyncio.create_subprocess_exec(*cmd,stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.PIPE);raw,err=await proc.communicate()
 data=json.loads(raw)
 with gzip.open(OUT/(name+'.json.gz'),'wb') as f:f.write(raw)
 if not inspect:(OUT/(name+'.png')).write_bytes(base64.b64decode(data['normalized_result']['artifact']['data_base64']))
 return data
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--remote-debugging-port=9401'],proxy={'server':os.environ['HTTPS_PROXY']})
  for w,h in [(1440,900),(1920,1080),(768,1024),(390,844)]:
   page=await b.new_page(viewport={'width':w,'height':h})
   await page.goto('https://waabi.ai/careers',wait_until='domcontentloaded',timeout=120000);await page.evaluate('document.fonts.ready');await page.wait_for_timeout(3500)
   try:await page.get_by_role('button',name='Reject All',exact=True).click(timeout=1000)
   except Exception:pass
   await page.mouse.move(0,0)
   await rea(page,9401,f'careers-{w}-hero')
   if w==1440:
    await rea(page,9401,'careers-inspection',True)
    (OUT/'careers.html').write_text(await page.content())
   height=await page.evaluate('document.documentElement.scrollHeight')
   for y in range(0,height,600):
    await page.evaluate('(y)=>scrollTo({top:y,behavior:"instant"})',y);await page.wait_for_timeout(180)
   await page.evaluate('scrollTo({top:0,behavior:"instant"})');await page.wait_for_timeout(1000)
   await page.screenshot(path=str(OUT/f'careers-{w}-full.png'),full_page=True)
   data=await page.evaluate('''()=>{let describe=e=>{let s=getComputedStyle(e),r=e.getBoundingClientRect();return{tag:e.tagName,text:e.innerText,cls:typeof e.className==='string'?e.className:'',rect:r.toJSON(),font:s.font,tracking:s.letterSpacing,color:s.color,background:s.backgroundColor,gap:s.gap,padding:s.padding,margin:s.margin,display:s.display,grid:s.gridTemplateColumns}};return{height:document.documentElement.scrollHeight,text:document.body.innerText,sections:[...document.querySelectorAll('main section')].map(describe),nodes:[...document.querySelectorAll('main h1,main h2,main h3,main p,main button,main label,main select')].map(describe),images:[...document.images].map(e=>({src:e.currentSrc,alt:e.alt,...describe(e)})),videos:[...document.querySelectorAll('video')].map(e=>({src:e.currentSrc,poster:e.poster,...describe(e)})),links:[...document.querySelectorAll('main a')].map(e=>({href:e.href,...describe(e)})),iframes:[...document.querySelectorAll('iframe')].map(e=>({src:e.src,...describe(e)}))}}''')
   (OUT/f'metrics-{w}.json').write_text(json.dumps(data,indent=2));print(w,height,data['text'][:300],flush=True)
   if w in [1440,390]:
    for i,y in enumerate(range(700,height,750 if w==1440 else 650)):
     await page.evaluate('(y)=>scrollTo({top:y,behavior:"instant"})',y);await page.wait_for_timeout(750);await rea(page,9401,f'careers-{w}-scroll-{i:02d}')
   await page.close()
  await b.close()
asyncio.run(main())

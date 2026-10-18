"""REA is primary inspector/capture; Playwright drives passive CDP target and samples transforms."""
import asyncio,base64,gzip,hashlib,json,os
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('artifacts/comparison/safety-motion-round2');OUT.mkdir(parents=True,exist_ok=True)
async def rea(page,port,command,path,*args):
 c=await page.context.new_cdp_session(page);target=(await c.send('Target.getTargetInfo'))['targetInfo']['targetId']
 proc=await asyncio.create_subprocess_exec('npm','exec','--yes','--package=rea-agents@6.5.0','--','rea',command,f'http://127.0.0.1:{port}',target,*args,'--format','json',stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.PIPE)
 raw,err=await proc.communicate()
 try:
  value=json.loads(raw)
  with gzip.open(path.with_suffix('.json.gz'),'wb') as f:f.write(raw)
  a=value.get('normalized_result',{}).get('artifact',{})
  if a.get('data_base64'):path.with_suffix('.png').write_bytes(base64.b64decode(a['data_base64']))
  return value.get('evidence_id')
 except Exception as exc:print('REA ERROR',err.decode()[:200],str(exc));return None
PROBE=r'''() => {
 const describe=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {text:e.textContent?.trim().slice(0,60),class:e.className,y:r.y,x:r.x,w:r.width,h:r.height,opacity:s.opacity,transform:s.transform,transition:s.transition}};
 const title=[...document.querySelectorAll('h2,h3')].find(e=>e.textContent.includes('Safety from the inside'));
 const sections=[...document.querySelectorAll('section')];
 const dna=sections.find(e=>e.textContent.includes('Safety is core')&&e.textContent.includes('Built different'));
 return {scrollY,time:performance.now(),dna:dna&&describe(dna),title:title&&describe(title),parents:title&&[title.parentElement,title.parentElement.parentElement,title.parentElement.parentElement.parentElement].map(describe),images:dna&&[...dna.querySelectorAll('img')].map(describe),digits:dna&&[...dna.querySelectorAll('p,span')].filter(e=>/^0?[123]$/.test(e.textContent.trim())).map(describe),moving:[...document.querySelectorAll('main [style]')].filter(e=>{let r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}).map(describe).slice(-40)}
}'''
async def main():
 async with async_playwright() as p:
  for side in os.environ.get('MOTION_SIDES','reference,local').split(','):
   port=9276 if side=='reference' else 9277
   args=dict(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox',f'--remote-debugging-port={port}'])
   if side=='reference':args['proxy']={'server':os.environ.get('HTTPS_PROXY','http://proxy:8080')}
   browser=await p.chromium.launch(**args)
   for w,h in [(int(w),{1440:900,1920:1080,768:1024,390:844}[int(w)]) for w in os.environ.get('MOTION_WIDTHS','1440,390').split(',')]:
    page=await browser.new_page(viewport={'width':w,'height':h},ignore_https_errors=True,reduced_motion='no-preference')
    url='https://waabi.ai/safety' if side=='reference' else 'http://127.0.0.1:3000/safety'
    await page.goto(url,wait_until='domcontentloaded',timeout=120000);await page.wait_for_timeout(4500)
    for _ in range(3):
     try:
      await page.get_by_role('button',name='Reject All',exact=True).click(timeout=1000);await page.wait_for_timeout(300)
     except Exception:pass
    if side=='reference' and w==1440:
     evidence=await rea(page,port,'inspect-web-page',OUT/'fresh-rea-inspection','--observation-ms','1200','--include-script-sources','--include-console-text')
     scripts=await page.locator('script[src]').evaluate_all('(els)=>els.map(e=>e.src)');hashes=[]
     for url in scripts:
      response=await page.request.get(url);source=await response.text();digest=hashlib.sha256(source.encode()).hexdigest();hashes.append({'url':url,'sha256':digest,'bytes':len(source)})
      if 'DNA' in source or 'FadeIn' in source or 'Title' in source:
       (OUT/('fresh-'+url.split('/')[-1])).write_text(source)
     (OUT/'fresh-script-hashes.json').write_text(json.dumps({'evidence':evidence,'scripts':hashes},indent=2))
    traces=[]
    ys=[0,750,1450,2200,2600,3000,3400,3800,3400,3000] if w>=768 else [0,750,1450,2000,2400,2800]
    for j,y in enumerate(ys):
     await page.evaluate('(y)=>scrollTo({top:y,behavior:"instant"})',y)
     for delay in [50,100,250,600]:
      await page.wait_for_timeout(delay);sample=await page.evaluate(PROBE);sample.update(step=j,elapsed=delay);traces.append(sample)
     if j in ([4,6,8] if w>=768 else [3,4]):await rea(page,port,'capture-web-screenshot',OUT/f'{side}-{w}-{j}-{y}')
    (OUT/f'{side}-{w}-trace.json').write_text(json.dumps(traces,indent=2));await page.close()
   await browser.close()
if __name__ == "__main__": asyncio.run(main())

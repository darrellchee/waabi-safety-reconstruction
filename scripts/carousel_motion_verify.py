"""Compare live/reference pointer drag and release; REA captures native final states."""
import asyncio,base64,gzip,json,os
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('artifacts/comparison/motion-round2/carousel');OUT.mkdir(parents=True,exist_ok=True)
async def capture(page,port,path):
 c=await page.context.new_cdp_session(page);tid=(await c.send('Target.getTargetInfo'))['targetInfo']['targetId']
 p=await asyncio.create_subprocess_exec('npm','exec','--yes','--package=rea-agents@6.5.0','--','rea','capture-web-screenshot',f'http://127.0.0.1:{port}',tid,'--format','json',stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.PIPE)
 raw,err=await p.communicate();result=json.loads(raw)
 with gzip.open(str(path)+'.json.gz','wb') as f:f.write(raw)
 path.with_suffix('.png').write_bytes(base64.b64decode(result['normalized_result']['artifact']['data_base64']))
async def main():
 rows=[]
 async with async_playwright() as p:
  for side in ['reference','local']:
   port=9381 if side=='reference' else 9382
   args={'executable_path':'/usr/bin/chromium','args':['--no-sandbox',f'--remote-debugging-port={port}']}
   if side=='reference':args['proxy']={'server':os.environ['HTTPS_PROXY']}
   b=await p.chromium.launch(**args)
   page=await b.new_page(viewport={'width':1440,'height':900})
   url='https://waabi.ai/safety' if side=='reference' else os.environ.get('MOTION_LOCAL_URL','http://127.0.0.1:3006')+'/safety'
   await page.goto(url,wait_until='domcontentloaded',timeout=120000);await page.evaluate('document.fonts.ready');await page.wait_for_timeout(1500)
   try:await page.get_by_role('button',name='Reject All',exact=True).click(timeout=1000)
   except Exception:pass
   await page.mouse.move(0,0)
   selector='.practice-slides' if side=='local' else '[blossom-carousel]'
   rail=page.locator(selector)
   if side=='reference':rail=rail.filter(has_text='Safety-first best practices').first
   await rail.scroll_into_view_if_needed();await page.wait_for_timeout(700)
   await rail.evaluate('(e)=>{e.scrollTo({left:0,behavior:"instant"});window.__dragFrames=[];window.__dragDone=false;const start=performance.now();function sample(){window.__dragFrames.push({t:performance.now()-start,x:e.scrollLeft,transform:getComputedStyle(e).transform,snap:getComputedStyle(e).scrollSnapType});if(!window.__dragDone)requestAnimationFrame(sample)}requestAnimationFrame(sample)}')
   rect=await rail.bounding_box();y=max(160,min(700,rect['y']+rect['height']*.45))
   await page.mouse.move(1150,y);await page.mouse.down();await page.mouse.move(200,y,steps=20);await page.mouse.up();await page.wait_for_timeout(1600)
   await rail.evaluate('()=>window.__dragDone=true')
   data={'side':side,'frames':await page.evaluate('window.__dragFrames'),'end':await rail.evaluate('(e)=>({x:e.scrollLeft,width:e.clientWidth,max:e.scrollWidth-e.clientWidth,attr:e.getAttribute("data-carousel-motion")})')}
   await capture(page,port,OUT/f'{side}-practice-after-drag')
   rows.append(data);(OUT/f'{side}-drag.json').write_text(json.dumps(data,indent=2));print(side,data['end'],flush=True)
   await b.close()
 (OUT/'summary.json').write_text(json.dumps([{'side':r['side'],'end':r['end'],'frames':len(r['frames'])} for r in rows],indent=2))
asyncio.run(main())

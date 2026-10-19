"""REA-native route transition inspection; Playwright/CDP drive and sample real navigation."""
import asyncio,os,json,gzip,base64,time
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('artifacts/reference/page-transitions');OUT.mkdir(parents=True,exist_ok=True)
INIT='''window.__routeTrace=[];window.__viewTransitions=[];const start=document.startViewTransition?.bind(document);if(start)document.startViewTransition=function(...args){window.__viewTransitions.push({t:performance.now(),url:location.pathname});return start(...args)};window.__sampleRoutes=()=>{let t0=performance.now();function sample(){window.__routeTrace.push({t:performance.now()-t0,path:location.pathname,y:scrollY,body:{opacity:getComputedStyle(document.body).opacity,transform:getComputedStyle(document.body).transform,background:getComputedStyle(document.body).backgroundColor},animations:document.getAnimations().map(a=>({type:a.constructor.name,time:a.currentTime,state:a.playState,target:a.effect?.target?.tagName,cls:a.effect?.target?.className,pseudo:a.effect?.pseudoElement,timing:a.effect?.getComputedTiming(),frames:a.effect?.getKeyframes()})),fixed:[...document.querySelectorAll('body div')].filter(e=>{let s=getComputedStyle(e),r=e.getBoundingClientRect();return s.position==='fixed'&&r.width>=innerWidth*.9&&r.height>=innerHeight*.9}).map(e=>({cls:e.className,html:e.outerHTML.slice(0,800),opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform,clip:getComputedStyle(e).clipPath,z:getComputedStyle(e).zIndex}))});if(performance.now()-t0<2400)requestAnimationFrame(sample)}requestAnimationFrame(sample)};'''
async def rea(page,port,name,inspect=False):
 c=await page.context.new_cdp_session(page);tid=(await c.send('Target.getTargetInfo'))['targetInfo']['targetId']
 cmd=['npm','exec','--yes','--package=rea-agents@6.5.0','--','rea','inspect-web-page' if inspect else 'capture-web-screenshot',f'http://127.0.0.1:{port}',tid,'--format','json']
 if inspect:cmd+=['--include-script-sources','--observation-ms','1000']
 p=await asyncio.create_subprocess_exec(*cmd,stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.PIPE);raw,err=await p.communicate();data=json.loads(raw)
 with gzip.open(OUT/(name+'.json.gz'),'wb') as f:f.write(raw)
 if not inspect:(OUT/(name+'.png')).write_bytes(base64.b64decode(data['normalized_result']['artifact']['data_base64']))
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--remote-debugging-port=9421'],proxy={'server':os.environ['HTTPS_PROXY']})
  for w,h in [(1440,900),(390,844)]:
   page=await b.new_page(viewport={'width':w,'height':h});await page.add_init_script(INIT)
   await page.goto('https://waabi.ai/',wait_until='domcontentloaded',timeout=120000);await page.evaluate('document.fonts.ready');await page.wait_for_timeout(3500)
   try:await page.get_by_role('button',name='Reject All',exact=True).click(timeout=1500)
   except Exception:pass
   await rea(page,9421,f'home-{w}-before')
   if w==1440:await rea(page,9421,'live-transition-inspection',True)
   print('buttons',await page.locator('button').evaluate_all('(es)=>es.slice(0,12).map(e=>({label:e.getAttribute("aria-label"),text:e.textContent}))'),flush=True)
   await page.get_by_role('button',name='Menu',exact=True).focus();await page.keyboard.press('Enter');await page.wait_for_timeout(700)
   await rea(page,9421,f'home-{w}-menu')
   c=await page.context.new_cdp_session(page);frames=[]
   async def onframe(e):
    frames.append({'timestamp':e['metadata']['timestamp'],'data':e['data']});await c.send('Page.screencastFrameAck',{'sessionId':e['sessionId']})
   c.on('Page.screencastFrame',onframe);await c.send('Page.startScreencast',{'format':'jpeg','quality':75,'maxWidth':w,'maxHeight':h,'everyNthFrame':1})
   await page.evaluate('window.__sampleRoutes()')
   await page.locator('a[href="/safety"]').first.evaluate('(el)=>el.click()')
   await page.wait_for_timeout(2600);await c.send('Page.stopScreencast')
   await rea(page,9421,f'safety-{w}-after')
   data=await page.evaluate('({trace:window.__routeTrace,calls:window.__viewTransitions,path:location.pathname})')
   with gzip.open(OUT/f'transition-{w}-trace.json.gz','wt') as f:json.dump(data,f)
   dest=OUT/f'frames-{w}';dest.mkdir(exist_ok=True)
   if frames:
    t0=frames[0]['timestamp'];selected=[]
    for offset in [0,.05,.10,.15,.20,.25,.3,.4,.5,.6,.8,1,1.3,1.7,2.2]:
     frame=min(frames,key=lambda f:abs(f['timestamp']-t0-offset));(dest/f'{int(offset*1000):04d}.jpg').write_bytes(base64.b64decode(frame['data']));selected.append({'requestedMs':offset*1000,'actualMs':(frame['timestamp']-t0)*1000})
    (dest/'timings.json').write_text(json.dumps(selected,indent=2))
   print(w,'frames',len(frames),'route',data['path'],'viewTransitionCalls',data['calls'],flush=True);await page.close()
  await b.close()
asyncio.run(main())

"""Independent normal-motion audit. REA captures evidence; Playwright drives/samples.
python scripts/motion_round2_audit.py reference|local [1440|390]
"""
import asyncio,sys,os,json,gzip,base64,time
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('artifacts/comparison/motion-round2/audit');OUT.mkdir(parents=True,exist_ok=True)
PROBE=r'''() => {
const describe=e=>{let s=getComputedStyle(e),r=e.getBoundingClientRect();return {tag:e.tagName,text:e.textContent?.trim().slice(0,100),cls:typeof e.className==='string'?e.className:'',x:r.x,y:r.y,w:r.width,h:r.height,opacity:s.opacity,transform:s.transform,clip:s.clipPath,display:s.display,visibility:s.visibility}};
return {t:performance.now(),y:scrollY,vh:innerHeight,sections:[...document.querySelectorAll('main section')].map(describe),text:[...document.querySelectorAll('main h1,main h2,main h3,main p')].filter(e=>{let r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}).map(e=>({...describe(e),parents:[e.parentElement,e.parentElement?.parentElement,e.parentElement?.parentElement?.parentElement].filter(Boolean).map(describe),words:[...e.querySelectorAll('span')].slice(0,12).map(describe)})),media:[...document.querySelectorAll('main img,main video')].filter(e=>{let r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}).map(e=>({...describe(e),src:e.currentSrc||e.src,time:e.currentTime,paused:e.paused,parents:[e.parentElement,e.parentElement?.parentElement].filter(Boolean).map(describe)})),moving:[...document.querySelectorAll('main div')].filter(e=>{let r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.bottom>0&&r.top<innerHeight&&(s.transform!=='none'||s.opacity!=='1')}).slice(0,80).map(describe)}
}'''
async def rea(page,port,prefix,inspect=False):
 c=await page.context.new_cdp_session(page);target=(await c.send('Target.getTargetInfo'))['targetInfo']['targetId']
 cmd=['npm','exec','--yes','--package=rea-agents@6.5.0','--','rea','inspect-web-page' if inspect else 'capture-web-screenshot',f'http://127.0.0.1:{port}',target]
 if inspect:cmd+=['--observation-ms','800','--include-script-sources']
 cmd+=['--format','json'];p=await asyncio.create_subprocess_exec(*cmd,stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.PIPE);out,err=await p.communicate()
 try:
  data=json.loads(out)
  with gzip.open(str(prefix)+'.json.gz','wb') as f:f.write(out)
  if not inspect:Path(str(prefix)+'.png').write_bytes(base64.b64decode(data['normalized_result']['artifact']['data_base64']))
 except Exception as e:Path(str(prefix)+'.error.txt').write_text(str(e)+'\n'+err.decode()[:500])
async def main(side,width):
 h=900 if width==1440 else 844;port=9352 if side=='reference' else 9353
 async with async_playwright() as p:
  kwargs={'executable_path':'/usr/bin/chromium','headless':True,'args':['--no-sandbox',f'--remote-debugging-port={port}']}
  if side in ['reference','baseline']:kwargs['proxy']={'server':os.environ.get('HTTPS_PROXY','http://proxy:8080')}
  b=await p.chromium.launch(**kwargs);ctx=await b.new_context(viewport={'width':width,'height':h},reduced_motion='no-preference',ignore_https_errors=True)
  for route in ([os.getenv('MOTION_ROUTE')] if os.getenv('MOTION_ROUTE') else ['home','safety']):
   page=await ctx.new_page();prefix=OUT/f'{side}-{route}-{width}';traces=[]
   await page.goto(('https://waabi.ai' if side=='reference' else 'https://waabi-safety-reconstruction.vercel.app' if side=='baseline' else os.getenv('MOTION_LOCAL_URL','http://127.0.0.1:3000'))+('/' if route=='home' else '/safety'),wait_until='domcontentloaded',timeout=120000)
   await page.wait_for_timeout(3500)
   try:
    reject=page.get_by_role('button',name='Reject All',exact=True)
    if await reject.count():await reject.click(timeout=3000)
   except:pass
   await page.mouse.move(0,0)
   await rea(page,port,Path(str(prefix)+'-inspection'),True)
   geometry=await page.evaluate(PROBE);Path(str(prefix)+'-geometry.json').write_text(json.dumps(geometry))
   if route=='home':positions=[0,h*.6,h,1.25*h,1.5*h,1.75*h,2.25*h,3.25*h,3.6*h,4*h,4.35*h,4*h,3.6*h,3.25*h,1.25*h,0]
   else:
    # Exact DOM starts differ by layout; audit stable reference scroll coordinates.
    positions=[0,h*.8,h*1.2,h*2.7,h*3.0,h*3.4,h*3.8,h*4.2,h*3.8,h*3.4,h*3.0,h*2.7]
   for i,y in enumerate(positions):
    await page.evaluate('(y)=>scrollTo({top:y,behavior:"instant"})',round(y));samples=[];start=time.monotonic()
    while time.monotonic()-start<.85:
     samples.append(await page.evaluate(PROBE));await page.wait_for_timeout(50)
    traces.append({'step':i,'target':round(y),'samples':samples})
    if i in [3,5,8]:await rea(page,port,Path(str(prefix)+f'-state-{i:02d}'))
   with gzip.open(str(prefix)+'-trace.json.gz','wt') as f:json.dump(traces,f,separators=(',',':'))
   print(side,route,width,'captured',flush=True);await page.close()
  await b.close()

async def dna_raf(side):
 async with async_playwright() as p:
  kw=dict(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
  if side=='reference':kw['proxy']={'server':os.environ['HTTPS_PROXY']}
  b=await p.chromium.launch(**kw);page=await b.new_page(viewport={'width':1440,'height':900},ignore_https_errors=True)
  if os.getenv('MOTION_PAUSE_VIDEO')=='1':await page.add_init_script('HTMLMediaElement.prototype.play = function() { this.pause(); return Promise.resolve(); };')
  await page.goto(('https://waabi.ai' if side=='reference' else os.getenv('MOTION_LOCAL_URL','http://127.0.0.1:3000'))+'/safety',wait_until='domcontentloaded');await page.wait_for_timeout(2000)
  try:await page.get_by_role('button',name='Reject All',exact=True).click(timeout=1500)
  except:pass
  out=await page.evaluate('''async()=>{let h=[...document.querySelectorAll('h2,h3')].find(e=>e.textContent.startsWith('Safety from'));let row=document.querySelector('.story-copy')||h.parentElement.parentElement;let counter=document.querySelector('.story-counter')||[...document.querySelectorAll('div')].find(e=>e.className.includes('items-baseline')&&e.textContent.includes('/3'));let img=h.closest('section').querySelector('img');let image=document.querySelector('.story-visual-inner')||img.parentElement;let nodes=[counter,row,image];const pose=()=>nodes.map(e=>({y:new DOMMatrixReadOnly(getComputedStyle(e).transform).m42,opacity:+getComputedStyle(e).opacity,rectY:e.getBoundingClientRect().y}));let initial=pose();scrollTo({top:2430,behavior:'instant'});let frames=[];let t0=performance.now();await new Promise(resolve=>{const f=()=>{frames.push({t:performance.now()-t0,nodes:pose()});if(performance.now()-t0<2200)requestAnimationFrame(f);else resolve()};requestAnimationFrame(f)});return{initial,frames}}''')
  Path('artifacts/comparison/motion-round2/audit/'+side+('-paused-video' if os.getenv('MOTION_PAUSE_VIDEO')=='1' else '')+'-dna-raf-transient.json').write_text(json.dumps(out));await b.close();print(side,'RAF done',flush=True)

async def dna_both():
 for side in ['reference','local']: await dna_raf(side)
async def video_clock(side):
 async with async_playwright() as p:
  kw=dict(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
  if side=='reference':kw['proxy']={'server':os.environ['HTTPS_PROXY']}
  b=await p.chromium.launch(**kw);page=await b.new_page(viewport={'width':1440,'height':900},ignore_https_errors=True)
  await page.goto(('https://waabi.ai' if side=='reference' else os.getenv('MOTION_LOCAL_URL','http://127.0.0.1:3000'))+'/',wait_until='domcontentloaded');await page.wait_for_timeout(3000)
  try:await page.get_by_role('button',name='Reject All',exact=True).click(timeout=1500)
  except:pass
  await page.evaluate("window.auditHeroVideo=[...document.querySelectorAll('video')].find(e=>e.currentSrc.includes('WAABI_27s'))")
  samples=[]
  for y,delay in [(0,500),(3500,500),(3500,1200),(0,500),(0,600)]:
   await page.evaluate('(y)=>scrollTo({top:y,behavior:"instant"})',y);await page.wait_for_timeout(delay)
   samples.append(await page.evaluate("()=>{let v=window.auditHeroVideo;return{wall:performance.now(),scroll:scrollY,time:v.currentTime,paused:v.paused,duration:v.duration,ready:v.readyState}}"))
  (OUT/(side+'-hero-video-clock.json')).write_text(json.dumps(samples,indent=2));await b.close();print(side,'video clock done',flush=True)
async def video_both():
 for side in ['reference','local']:await video_clock(side)
if __name__=='__main__':
 if sys.argv[1]=='dna-raf':asyncio.run(dna_both())
 elif sys.argv[1]=='video-clock':asyncio.run(video_both())
 else:asyncio.run(main(sys.argv[1],int(sys.argv[2]) if len(sys.argv)>2 else 1440))

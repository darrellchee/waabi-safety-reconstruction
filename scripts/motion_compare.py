"""Normal-motion reference/local trace. REA supplies stable-state screenshots and provenance.
Playwright drives scrolling and records numeric DOM motion every 100 ms; media pixels are
excluded from numeric comparisons because live video frames are nondeterministic.
Run: python scripts/motion_compare.py --side reference|local|both [--width 1440|390]
"""
import argparse, asyncio, base64, gzip, json, os, time
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('artifacts/comparison/motion')
PROBE=r'''() => {
 const phrases=['Waabi is pioneering','Built to think.','We built our own road.','Unlocking scale','Safe','Scalable','Practical','In 2021,','What began as','When this technology','The people moving'];
 const describe=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {tag:e.tagName,text:e.textContent.trim().slice(0,120),class:typeof e.className==='string'?e.className:'',x:r.x,y:r.y,width:r.width,height:r.height,opacity:s.opacity,color:s.color,transform:s.transform,clipPath:s.clipPath,visibility:s.visibility,position:s.position}};
 const nodes=[...document.querySelectorAll('h1,h2,h3,p')].filter(e=>phrases.some(t=>e.textContent.trim().startsWith(t)));
 return {time:performance.now(),scrollY,viewport:[innerWidth,innerHeight],nodes:nodes.map(e=>({...describe(e),children:[...e.children].slice(0,8).map(describe),ancestors:[e.parentElement,e.parentElement?.parentElement].filter(Boolean).map(describe)})),videos:[...document.querySelectorAll('video')].map(e=>({src:e.currentSrc,time:e.currentTime,paused:e.paused,ready:e.readyState,style:describe(e)})),moving:[...document.querySelectorAll('main div,main section,main img,main h1,main h2')].filter(e=>{let r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.bottom>0&&r.top<innerHeight&&(s.transform!=='none'||s.opacity!=='1')}).slice(0,100).map(describe),animations:document.getAnimations().slice(0,30).map(a=>({state:a.playState,time:a.currentTime,timing:a.effect?.getComputedTiming(),target:a.effect?.target?.className}))};
}'''
EARLY=r'''(() => {
 window.__nativeMotionFrames=[];let start=null,last=-100;
 const tick=now=>{
  const h=document.querySelector('h1');
  if(h&&start===null)start=now;
  if(start!==null&&now-start-last>=95){
   last=now-start;
   const pose=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {text:e.textContent.slice(0,70),opacity:s.opacity,transform:s.transform,x:r.x,y:r.y,width:r.width,height:r.height}};
   window.__nativeMotionFrames.push({time:performance.now(),relative:now-start,title:pose(h),words:[...h.querySelectorAll('span')].slice(0,24).map(pose)});
  }
  if(start===null||now-start<4500)requestAnimationFrame(tick);
 };requestAnimationFrame(tick);
})();'''
async def rea(page,port,path):
 c=await page.context.new_cdp_session(page);target=(await c.send('Target.getTargetInfo'))['targetInfo']['targetId']
 proc=await asyncio.create_subprocess_exec('npm','exec','--yes','--package=rea-agents@6.5.0','--','rea','capture-web-screenshot',f'http://127.0.0.1:{port}',target,'--format','json',stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.PIPE)
 stdout,stderr=await proc.communicate()
 try:
  envelope=json.loads(stdout);png=base64.b64decode(envelope['normalized_result']['artifact']['data_base64']);path.with_suffix('.png').write_bytes(png)
  with gzip.open(path.with_suffix('.json.gz'),'wb') as f:f.write(stdout)
 except Exception as exc:path.with_suffix('.error.txt').write_text(str(exc)+'\n'+stderr.decode()[:1000])
def write_trace(path,value):
 with gzip.open(str(path)+'.gz','wt') as f:json.dump(value,f,separators=(',',':'))
def read_trace(path):
 with gzip.open(path,'rt') as f:return json.load(f)
async def trace(page,path,milliseconds=700):
 samples=[];start=time.monotonic()
 while (time.monotonic()-start)*1000<milliseconds:
  samples.append(await page.evaluate(PROBE));await page.wait_for_timeout(100)
 write_trace(path.with_suffix('.json'),samples)
async def run(side,width,routes,hero_only=False):
 height=900 if width==1440 else 844;port=9265 if side=='reference' else 9266;OUT.mkdir(parents=True,exist_ok=True)
 async with async_playwright() as p:
  launch={'executable_path':'/usr/bin/chromium','headless':True,'args':['--no-sandbox',f'--remote-debugging-port={port}']}
  if side=='reference':launch['proxy']={'server':os.environ.get('HTTPS_PROXY','http://proxy:8080')}
  b=await p.chromium.launch(**launch)
  context=await b.new_context(viewport={'width':width,'height':height},reduced_motion='no-preference',ignore_https_errors=True)
  for route in routes:
   page=await context.new_page();await page.add_init_script(EARLY);base='https://waabi.ai' if side=='reference' else os.environ.get('MOTION_LOCAL_URL','http://127.0.0.1:3000')
   prefix=OUT/f'{side}-{route}-{width}'
   await page.goto(base+('/' if route=='home' else '/company'),wait_until='domcontentloaded',timeout=120000)
   await trace(page,Path(str(prefix)+'-hero-timeline'),5000)
   write_trace(Path(str(prefix)+'-early-frames.json'),await page.evaluate('window.__nativeMotionFrames||[]'))
   try:
    reject=page.get_by_role('button',name='Reject All',exact=True)
    if await reject.count():
     await reject.click(timeout=5000);await page.wait_for_timeout(500)
     if await reject.count():await reject.click(timeout=5000)
   except Exception:pass
   await rea(page,port,Path(str(prefix)+'-hero-settled'))
   await page.mouse.move(width // 2,height // 2);await page.mouse.wheel(0,600);await trace(page,Path(str(prefix)+'-wheel-forward'),1800)
   await page.mouse.wheel(0,-600);await trace(page,Path(str(prefix)+'-wheel-back'),1800)
   await page.evaluate('scrollTo({top:0,behavior:"instant"})');await page.wait_for_timeout(500)
   if hero_only:
    await page.close();continue
   h=height
   if route=='home':
    positions=[0,.5*h,h,1.75*h,2.25*h,3.25*h,3.6*h,4*h,4.35*h,4*h,3.6*h,3.25*h,2.25*h,0]
   else:positions=[0,.7*h,1.05*h,1.3*h,1.6*h,2.2*h,2.8*h,2.2*h,1.6*h,1.05*h,0]
   for i,y in enumerate(positions):
    await page.evaluate('(y)=>scrollTo({top:y,behavior:"instant"})',round(y));await trace(page,Path(str(prefix)+f'-scroll-{i:02d}-{round(y)}'),650)
    if i in ([3,6,8,10] if route=='home' else [2,4,6,8]):await rea(page,port,Path(str(prefix)+f'-state-{i:02d}-{round(y)}'))
   await page.close()
  await b.close()
def report():
 from PIL import Image, ImageChops, ImageEnhance
 findings=[]
 for local in sorted(OUT.glob('local-*-scroll-*.json.gz')):
  reference=local.with_name(local.name.replace('local-','reference-',1))
  if not reference.exists():continue
  a,b=read_trace(reference)[-1],read_trace(local)[-1]
  key=lambda n:''.join(n['text'].split())
  ref={key(n):n for n in a['nodes'] if n['width']>0 and n['height']>0}
  for n in b['nodes']:
   if key(n) not in ref or n['width']<=0 or n['height']<=0:continue
   r=ref[key(n)];d={field:round(n[field]-r[field],3) for field in ['x','y','width','height']}
   findings.append({'sample':local.name,'text':n['text'],'delta_local_minus_reference':d,'reference_opacity':r['opacity'],'local_opacity':n['opacity']})
 for local in OUT.glob('local-*-state-*.png'):
  reference=local.with_name(local.name.replace('local-','reference-',1))
  if not reference.exists():continue
  a,b=Image.open(reference).convert('RGB'),Image.open(local).convert('RGB')
  if a.size!=b.size:continue
  Image.blend(a,b,.5).save(local.with_name(local.stem+'-overlay.png'))
  ImageEnhance.Contrast(ImageChops.difference(a,b)).enhance(2).save(local.with_name(local.stem+'-diff.png'))
 (OUT/'numeric-comparison.json').write_text(json.dumps(findings,indent=2))

async def main():
 parser=argparse.ArgumentParser();parser.add_argument('--side',choices=['reference','local','both'],default='both');parser.add_argument('--width',type=int,choices=[1440,390],default=None);parser.add_argument('--route',choices=['home','company'],default=None);parser.add_argument('--hero-only',action='store_true');a=parser.parse_args()
 for side in (['reference','local'] if a.side=='both' else [a.side]):
  for width in ([a.width] if a.width else [1440,390]):await run(side,width,[a.route] if a.route else ['home','company'],a.hero_only)
 report()
if __name__=='__main__':asyncio.run(main())

"""Pause real native transitions at identical animation times for visual comparison.
REA source evidence and native screenshot envelopes: artifacts/reference/page-transitions.
Run against the production server on port 3010; Playwright is the frame driver.
"""
import asyncio,os,json
from pathlib import Path
from playwright.async_api import async_playwright
from PIL import Image,ImageDraw
OUT=Path('artifacts/comparison/page-transitions');OUT.mkdir(parents=True,exist_ok=True)
INIT='''window.__transitionReady=false;let start=document.startViewTransition.bind(document);document.startViewTransition=(...args)=>{let t=start(...args);t.ready.then(()=>{window.__nativeAnimations=document.getAnimations().filter(a=>a instanceof CSSAnimation&&a.effect?.target===document.documentElement);window.__nativeAnimations.forEach(a=>{a.pause();a.currentTime=0});window.__transitionReady=true});return t};'''
async def main():
 async with async_playwright() as p:
  for label,url in [('reference','https://waabi.ai/'),('local','http://127.0.0.1:3010/')]:
   b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'],**({'proxy':{'server':os.environ['HTTPS_PROXY']}} if label=='reference' else {}))
   for w,h in [(1440,900),(390,844)]:
    page=await b.new_page(viewport={'width':w,'height':h},reduced_motion='no-preference');await page.add_init_script(INIT)
    await page.goto(url,wait_until='networkidle',timeout=120000);await page.evaluate('document.fonts.ready');await page.wait_for_timeout(1200)
    if label=='reference':
     for name in ['Reject All','Close news banner']:
      try:await page.get_by_role('button',name=name,exact=True).click(timeout=1000)
      except Exception:pass
    # Route via real site link; keep header closed so snapshots compare the route effect.
    await page.locator('a[href="/safety"]').last.evaluate('(a)=>a.click()')
    await page.wait_for_function('window.__transitionReady',timeout=20000)
    samples=[]
    for ms in [200,400,720]:
     sample=await page.evaluate('''ms=>{window.__nativeAnimations.forEach(a=>a.currentTime=ms);return window.__nativeAnimations.map(a=>({name:a.animationName,time:a.currentTime,duration:a.effect.getTiming().duration,frames:a.effect.getKeyframes()}))}''',ms)
     await page.screenshot(path=str(OUT/f'{label}-{w}-{ms}.png'),animations='allow');samples.append({'ms':ms,'animations':sample})
    (OUT/f'{label}-{w}-samples.json').write_text(json.dumps(samples,indent=2))
    await page.evaluate('window.__nativeAnimations.forEach(a=>a.finish())');await page.wait_for_timeout(900);await page.screenshot(path=str(OUT/f'{label}-{w}-after.png'))
    await page.close();print(label,w,'captured',flush=True)
   await b.close()
 results=[]
 def normalize(value):
  if isinstance(value,list):return [normalize(x) for x in value]
  if isinstance(value,dict):return {k:normalize(v) for k,v in value.items()}
  if isinstance(value,str):return value.replace('cubic-bezier(0.25, 0.1, 0.25, 1)','ease').replace('inset(0%','inset(0px')
  return value
 for width in [1440,390]:
  source=json.loads((OUT/f'reference-{width}-samples.json').read_text());local=json.loads((OUT/f'local-{width}-samples.json').read_text())
  for a,b in zip(source,local):
   left=[x for x in a['animations'] if x['name'].startswith('css-page')];right=[x for x in b['animations'] if x['name'].startswith('css-page')]
   results.append({'viewport':width,'animationTimeMs':a['ms'],'normalizedRootKeyframesAndTimingMatch':normalize(left)==normalize(right)})
 (OUT/'keyframe-comparison.json').write_text(json.dumps(results,indent=2))
 for w,h in [(1440,900),(390,844)]:
  thumbw=480 if w==1440 else 260;thumbh=round(h*thumbw/w)
  board=Image.new('RGB',(thumbw*3,(thumbh+28)*2),'#eee');draw=ImageDraw.Draw(board)
  for row,label in enumerate(['reference','local']):
   for col,ms in enumerate([200,400,720]):
    img=Image.open(OUT/f'{label}-{w}-{ms}.png').convert('RGB');img.thumbnail((thumbw,thumbh));board.paste(img,(col*thumbw,row*(thumbh+28)+28));draw.text((col*thumbw+8,row*(thumbh+28)+8),f'{label} {ms}ms',fill='black')
  board.save(OUT/f'comparison-{w}.jpg',quality=90)
  for ms in [200,400,720]:
   a=Image.open(OUT/f'reference-{w}-{ms}.png').convert('RGB');b=Image.open(OUT/f'local-{w}-{ms}.png').convert('RGB');Image.blend(a,b,.5).save(OUT/f'overlay-{w}-{ms}.jpg',quality=85)
asyncio.run(main())

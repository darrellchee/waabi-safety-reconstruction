"""Capture settled local states and produce paired screenshot overlays/differences."""
import asyncio,json,os
from pathlib import Path
from PIL import Image,ImageChops,ImageStat
from playwright.async_api import async_playwright
async def main():
 results=[]
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for w,h,name in [(1440,900,'desktop-1440'),(1920,1080,'desktop-1920'),(768,1024,'tablet'),(390,844,'mobile')]:
   page=await b.new_page(viewport={'width':w,'height':h})
   await page.goto(os.environ.get('PLAYWRIGHT_BASE_URL','http://localhost:3000')+'/safety',wait_until='domcontentloaded');await page.evaluate('document.fonts.ready');await page.wait_for_timeout(1800)
   await page.wait_for_function("getComputedStyle(document.querySelector('.site-header')).position === 'fixed'");await page.add_style_tag(content='html{scroll-behavior:auto!important}')
   await page.screenshot(path=f'artifacts/comparison/{name}-initial.png')
   await page.screenshot(path=f'artifacts/comparison/{name}-full.png',full_page=True)
   result={'viewport':[w,h],'name':name,'sections':await page.locator('main>section').evaluate_all('(els)=>els.map(e=>({id:e.id,y:e.offsetTop,height:e.offsetHeight}))')}
   for i in ([2,3,6,7,9] if w==1440 else []):
    await page.evaluate('(y)=>scrollTo(0,y)',i*h);await page.wait_for_timeout(1000);await page.screenshot(path=f'artifacts/comparison/{name}-{i:02}.png')
   results.append(result);await page.close()
  await b.close()
 for name in ['desktop-1440','desktop-1920','tablet','mobile']:
  for suffix in ['initial']+(['02','03','06','07','09'] if name=='desktop-1440' else []):
   ref=Path(f'artifacts/reference/{name}-{suffix}.png')
   if not ref.exists() and suffix=='initial':ref=Path(f'artifacts/reference/{name}-00.png')
   local=Path(f'artifacts/comparison/{name}-{suffix}.png')
   if not ref.exists() or not local.exists():continue
   r=Image.open(ref).convert('RGB');l=Image.open(local).convert('RGB')
   if r.size!=l.size:continue
   Image.blend(r,l,.5).save(f'artifacts/comparison/{name}-{suffix}-overlay.png')
   diff=ImageChops.difference(r,l);diff.save(f'artifacts/comparison/{name}-{suffix}-diff.png')
   results.append({'comparison':f'{name}-{suffix}','mean_absolute_rgb_error':sum(ImageStat.Stat(diff).mean)/3,'note':'Raw pixel error; includes independent animation/loading/cookie states, not a fidelity percentage.'})
 Path('artifacts/comparison/results.json').write_text(json.dumps(results,indent=2));print(json.dumps(results,indent=2))
asyncio.run(main())

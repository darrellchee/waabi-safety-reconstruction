"""Capture reconstructed pages and create honest viewport overlays against REA references.
Run from repository root after npm run dev. Pillow and Python Playwright are required.
"""
import asyncio, json, os
from pathlib import Path
from PIL import Image, ImageChops, ImageStat
from playwright.async_api import async_playwright

async def main():
 results=[]
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for name,path in [('home','/'),('company','/company')]:
   out=Path('artifacts/comparison')/name;out.mkdir(parents=True,exist_ok=True)
   for width,height in [(1440,900),(1920,1080),(768,1024),(390,844)]:
    page=await browser.new_page(viewport={'width':width,'height':height},reduced_motion='reduce')
    errors=[];page.on('pageerror',lambda error:errors.append(str(error)))
    await page.goto(os.environ.get('PLAYWRIGHT_BASE_URL','http://127.0.0.1:3000')+path,wait_until='domcontentloaded',timeout=60000)
    await page.evaluate('document.fonts.ready');await page.wait_for_timeout(1500)
    await page.screenshot(path=str(out/f'{width}-initial.png'))
    # Home reference captures follow cookie dismissal; Company reference initial includes it.
    reject=page.get_by_role('button',name='Reject All',exact=True)
    if await reject.count():await reject.click()
    await page.add_style_tag(content='html{scroll-behavior:auto!important}')
    page_height=await page.evaluate('document.documentElement.scrollHeight')
    for y in range(0,page_height,height//2):
     await page.evaluate('y=>scrollTo(0,y)',y);await page.wait_for_timeout(100)
    await page.evaluate('scrollTo(0,0)');await page.wait_for_timeout(500)
    await page.screenshot(path=str(out/f'{width}-hero.png'))
    await page.screenshot(path=str(out/f'{width}-full.png'),full_page=True)
    for y in range(height,page_height,height):
     await page.evaluate('y=>scrollTo(0,y)',y);await page.wait_for_timeout(400)
     await page.screenshot(path=str(out/f'{width}-scroll-{y//height}.png'))
    ref=Path('artifacts/reference')/name/(f'rea-{width}-0.png' if name=='home' else f'company-{width}-hero.png')
    local=out/f'{width}-{"hero" if name=="home" else "initial"}.png'
    result={'page':name,'viewport':[width,height],'height':page_height,'runtime_errors':errors}
    if ref.exists():
     r=Image.open(ref).convert('RGB');l=Image.open(local).convert('RGB')
     if r.size==l.size:
      Image.blend(r,l,.5).save(out/f'{width}-hero-overlay.png')
      diff=ImageChops.difference(r,l);diff.save(out/f'{width}-hero-difference.png')
      result['mean_absolute_rgb_error']=round(sum(ImageStat.Stat(diff).mean)/3,3)
    results.append(result);await page.close()
  await browser.close()
 Path('artifacts/comparison/pages-results.json').write_text(json.dumps(results,indent=2))
 print(json.dumps(results,indent=2))

asyncio.run(main())

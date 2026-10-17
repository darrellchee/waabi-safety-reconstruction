"""Capture release screenshots/geometry; use PLAYWRIGHT_BASE_URL for a running build."""
import asyncio,json,os
from pathlib import Path
from playwright.async_api import async_playwright
async def main():
 results=[]
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for name,path in [('home','/'),('company','/company')]:
   out=Path('artifacts/comparison')/name
   for w,h in [(1440,900),(1920,1080),(768,1024),(390,844)]:
    page=await b.new_page(viewport={'width':w,'height':h},reduced_motion='reduce')
    await page.goto(os.environ.get('PLAYWRIGHT_BASE_URL','http://127.0.0.1:3000')+path,wait_until='domcontentloaded');await page.evaluate('document.fonts.ready');await page.wait_for_timeout(1200)
    await page.add_style_tag(content='html{scroll-behavior:auto!important}')
    reject=page.get_by_role('button',name='Reject All',exact=True)
    if await reject.count():await reject.click()
    await page.screenshot(path=str(out/f'{w}-release-hero.png'))
    height=await page.evaluate('document.documentElement.scrollHeight')
    for y in range(0,height,h//2):await page.evaluate('y=>scrollTo(0,y)',y);await page.wait_for_timeout(40)
    await page.wait_for_timeout(350);await page.screenshot(path=str(out/f'{w}-release-footer.png'))
    await page.evaluate('scrollTo(0,0)');await page.wait_for_timeout(300);await page.screenshot(path=str(out/f'{w}-full.png'),full_page=True)
    results.append({'page':name,'viewport':[w,h], 'height':height, 'footerHeight':await page.locator('footer').evaluate('(el)=>el.offsetHeight'),'sections':await page.locator('main>section').evaluate_all('(els)=>els.map(e=>({class:e.className,y:e.offsetTop,height:e.offsetHeight}))')})
    await page.close()
  await b.close()
 Path('artifacts/comparison/release-layouts.json').write_text(json.dumps(results,indent=2));print(json.dumps(results,indent=2))
asyncio.run(main())

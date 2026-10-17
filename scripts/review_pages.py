import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  page=await b.new_page(viewport={'width':1440,'height':900})
  await page.goto('http://localhost:3000/',wait_until='domcontentloaded');await page.wait_for_timeout(2500);await page.evaluate('document.fonts.ready');await page.add_style_tag(content='html{scroll-behavior:auto!important}')
  Path('artifacts/comparison/home').mkdir(exist_ok=True,parents=True)
  await page.screenshot(path='artifacts/comparison/home/parent-full.png',full_page=True)
  print(await page.locator('main>section').evaluate_all('(els)=>els.map(e=>({cl:e.className,y:e.offsetTop,h:e.offsetHeight}))'))
  await b.close()
asyncio.run(main())

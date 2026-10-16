import asyncio,json
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  page=await b.new_page()
  for w,h,name in [(1440,900,'desktop-1440'),(1920,1080,'desktop-1920'),(768,1024,'tablet'),(390,844,'mobile')]:
   await page.set_viewport_size({'width':w,'height':h});await page.goto('http://localhost:3000/safety');await page.wait_for_timeout(3000);await page.evaluate('document.fonts.ready');await page.add_style_tag(content='html{scroll-behavior:auto!important}')
   await page.screenshot(path=f'artifacts/comparison/{name}-initial.png')
   await page.screenshot(path=f'artifacts/comparison/{name}-full.png',full_page=True)
   for i,y in enumerate([900,1800,2700,3600,4500,5400,6300,7200,8100]):
    if y<await page.evaluate('document.body.scrollHeight'):
     await page.evaluate('(y)=>scrollTo(0,y)',y);await page.wait_for_timeout(750);await page.screenshot(path=f'artifacts/comparison/{name}-{i+1:02}.png')
   print(name,await page.evaluate('({height:document.body.scrollHeight,width:document.documentElement.scrollWidth})'))
  await b.close()
asyncio.run(main())

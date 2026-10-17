import asyncio,os,json
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'],proxy={'server':os.environ['HTTPS_PROXY']});page=await b.new_page(viewport={'width':390,'height':844},ignore_https_errors=True)
  await page.goto('https://waabi.ai/',wait_until='domcontentloaded',timeout=120000);await page.wait_for_timeout(5000)
  data=await page.evaluate('''()=>[...document.querySelectorAll('section,h1,h2,h3,blockquote')].map(e=>({tag:e.tagName,text:e.innerText?.slice(0,120),rect:e.getBoundingClientRect().toJSON(),font:getComputedStyle(e).font,tracking:getComputedStyle(e).letterSpacing}))''');open('artifacts/reference/home/mobile-metrics.json','w').write(json.dumps(data,indent=2));await b.close()
asyncio.run(main())

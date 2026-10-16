import asyncio,json,os
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'],proxy={'server':os.environ['HTTPS_PROXY']})
  page=await b.new_page(viewport={'width':390,'height':844},ignore_https_errors=True)
  await page.goto('https://waabi.ai/safety',wait_until='domcontentloaded',timeout=120000);await page.wait_for_timeout(3000)
  height=await page.evaluate('document.body.scrollHeight')
  for y in range(0,height,400):await page.evaluate('(y)=>scrollTo(0,y)',y);await page.wait_for_timeout(100)
  await page.evaluate('scrollTo(0,0)');await page.wait_for_timeout(800)
  data=await page.locator('section,h1,h2,p').evaluate_all('es=>es.map(e=>({tag:e.tagName,text:e.innerText.slice(0,60),rect:e.getBoundingClientRect().toJSON(),font:getComputedStyle(e).font,pad:getComputedStyle(e).padding}))')
  story=page.locator('section').nth(1)
  data.append(await page.locator('section').nth(0).evaluate('''(e)=>({statsChildren:[...e.querySelectorAll('div')].map(x=>({cls:x.className,text:x.innerText?.slice(0,50),rect:x.getBoundingClientRect().toJSON(),font:getComputedStyle(x).font}))})'''));data.append(await story.evaluate('''(e)=>({html:e.outerHTML,children:[...e.querySelectorAll('div,p,img')].map(x=>({cls:x.className,text:x.innerText?.slice(0,40),rect:x.getBoundingClientRect().toJSON(),font:getComputedStyle(x).font}))})'''))
  open('artifacts/reference/mobile-metrics.json','w').write(json.dumps(data,indent=2));await b.close()
asyncio.run(main())

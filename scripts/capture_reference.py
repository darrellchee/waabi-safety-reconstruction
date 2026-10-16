import asyncio,json,os
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'],proxy={'server':os.environ['HTTPS_PROXY']})
  page=await browser.new_page(viewport={'width':1440,'height':900},ignore_https_errors=True)
  await page.goto('https://waabi.ai/safety',wait_until='networkidle',timeout=120000)
  await page.wait_for_timeout(5000)
  await page.screenshot(path='artifacts/reference/desktop-1440-initial.png')
  open('artifacts/reference/text.txt','w').write(await page.locator('body').inner_text())
  data=await page.evaluate('''() => [...document.querySelectorAll('h1,h2,h3,p,section,header,footer,video,canvas')].map(el=>({tag:el.tagName,text:el.innerText?.slice(0,1000),class:el.className,rect:el.getBoundingClientRect().toJSON(),css:{font:getComputedStyle(el).font,color:getComputedStyle(el).color,background:getComputedStyle(el).background,padding:getComputedStyle(el).padding},src:el.currentSrc}))''')
  open('artifacts/reference/dom.json','w').write(json.dumps(data,indent=2))
  for w,h,name in [(1440,900,'desktop-1440'),(1920,1080,'desktop-1920'),(768,1024,'tablet'),(390,844,'mobile')]:
   await page.set_viewport_size({'width':w,'height':h});await page.evaluate('scrollTo(0,0)');await page.wait_for_timeout(1500)
   height=await page.evaluate('document.body.scrollHeight')
   for y in range(0,height,h//2):
    await page.evaluate('(y)=>scrollTo(0,y)',y);await page.wait_for_timeout(300)
   await page.evaluate('scrollTo(0,0)');await page.wait_for_timeout(1000)
   await page.screenshot(path=f'artifacts/reference/{name}-full.png',full_page=True)
   for i,y in enumerate(range(0,height,h)):
    await page.evaluate('(y)=>scrollTo(0,y)',y);await page.wait_for_timeout(700)
    await page.screenshot(path=f'artifacts/reference/{name}-{i:02}.png')
  await browser.close()
asyncio.run(main())

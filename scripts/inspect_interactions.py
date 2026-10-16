import asyncio,json,os
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'],proxy={'server':os.environ['HTTPS_PROXY']})
  page=await b.new_page(viewport={'width':1440,'height':900},ignore_https_errors=True)
  await page.goto('https://waabi.ai/safety',wait_until='networkidle',timeout=120000);await page.wait_for_timeout(3000)
  out={}
  out['controls']=await page.locator('button,a,input').evaluate_all('es=>es.map(e=>({tag:e.tagName,text:e.innerText,aria:e.getAttribute("aria-label"),href:e.getAttribute("href"),cls:e.className,rect:e.getBoundingClientRect().toJSON()}))')
  out['headerHTML']=await page.locator('header').evaluate('(e)=>e.outerHTML')
  await page.locator('header button').first.click();await page.wait_for_timeout(1200)
  out['menu']=await page.locator('body').inner_text();await page.screenshot(path='artifacts/reference/menu-desktop.png')
  out['menuHTML']=await page.locator('header').evaluate('(e)=>e.outerHTML')
  await page.locator('header button').first.click();await page.wait_for_timeout(500)
  out['sections']=await page.locator('section').evaluate_all('es=>es.map(e=>({html:e.outerHTML}))')
  for y in [2300,2700,3100,3500,3900,4300,5100,5400,6150,6450,6800]:
   await page.evaluate('(y)=>scrollTo(0,y)',y);await page.wait_for_timeout(1000)
   out[f'scroll{y}']=await page.locator('section').evaluate_all('es=>es.map(e=>({text:e.innerText.slice(0,70),rect:e.getBoundingClientRect().toJSON(),transforms:[...e.querySelectorAll("[style]")].map(x=>({text:x.innerText?.slice(0,60),style:x.getAttribute("style")}))}))')
  await page.set_viewport_size({'width':390,'height':844});await page.evaluate('scrollTo(0,0)');await page.wait_for_timeout(1500)
  out['mobilecontrols']=await page.locator('button,a').evaluate_all('es=>es.map(e=>({tag:e.tagName,text:e.innerText,aria:e.getAttribute("aria-label"),href:e.getAttribute("href"),cls:e.className,rect:e.getBoundingClientRect().toJSON()}))')
  await page.locator('header button').first.click();await page.wait_for_timeout(1200);await page.screenshot(path='artifacts/reference/menu-mobile.png')
  open('artifacts/reference/interactions.json','w').write(json.dumps(out,indent=2))
  await b.close()
asyncio.run(main())

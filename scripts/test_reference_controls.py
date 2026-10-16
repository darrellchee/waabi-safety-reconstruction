import asyncio,json,os
from playwright.async_api import async_playwright
async def state(page):
 return await page.locator('section').nth(3).locator(':scope > div').evaluate_all('es=>es.map(e=>({rect:e.getBoundingClientRect().toJSON(),text:e.innerText.slice(0,90)}))')
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'],proxy={'server':os.environ['HTTPS_PROXY']})
  page=await b.new_page(viewport={'width':1440,'height':900},ignore_https_errors=True)
  await page.goto('https://waabi.ai/safety',wait_until='domcontentloaded',timeout=120000);await page.wait_for_timeout(5000)
  await page.get_by_role('button',name='Reject All',exact=True).click()
  tech=page.locator('section').nth(3)
  await tech.scroll_into_view_if_needed();await page.wait_for_timeout(1500)
  out={'initial':await state(page)}
  await tech.locator(':scope > div').nth(1).hover();await page.wait_for_timeout(1200)
  out['hoverSecond']=await state(page);await page.screenshot(path='artifacts/reference/tech-hover-second.png')
  best=page.locator('section').nth(4)
  await best.scroll_into_view_if_needed();await page.wait_for_timeout(1500)
  out['bestInitial']=await best.locator('[blossom-carousel]').evaluate('(e)=>({left:e.scrollLeft,rect:e.getBoundingClientRect().toJSON()})')
  await best.get_by_role('button',name='Next',exact=True).click();await page.wait_for_timeout(1000)
  out['bestNext']=await best.locator('[blossom-carousel]').evaluate('(e)=>({left:e.scrollLeft,rect:e.getBoundingClientRect().toJSON()})');await page.screenshot(path='artifacts/reference/best-next.png')
  for _ in range(3): await best.get_by_role('button',name='Next',exact=True).click();await page.wait_for_timeout(700)
  out['bestAtEnd']=await best.locator('[blossom-carousel]').evaluate('(e)=>({left:e.scrollLeft,scrollWidth:e.scrollWidth})')
  out['endButtons']=await best.locator('button').evaluate_all('es=>es.map(e=>({aria:e.getAttribute("aria-label"),disabled:e.disabled,opacity:getComputedStyle(e).opacity}))')
  await page.set_viewport_size({'width':390,'height':844});await tech.scroll_into_view_if_needed();await page.wait_for_timeout(1200)
  out['mobileInitial']=await state(page);await tech.locator(':scope > div').nth(1).click(position={'x':120,'y':50});await page.wait_for_timeout(1000)
  out['mobileClickSecond']=await state(page);await page.screenshot(path='artifacts/reference/tech-mobile-second.png')
  open('artifacts/reference/controls-behavior.json','w').write(json.dumps(out,indent=2));await b.close()
asyncio.run(main())

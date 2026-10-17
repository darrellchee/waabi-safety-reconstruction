import asyncio,json,os
from pathlib import Path
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'],proxy={'server':os.environ['HTTPS_PROXY']})
  pg=await b.new_page(viewport={'width':1440,'height':900},ignore_https_errors=True);await pg.goto('https://waabi.ai/company',wait_until='networkidle',timeout=120000)
  section=pg.locator('section').last;await section.scroll_into_view_if_needed();await pg.wait_for_timeout(1500)
  observations=[]
  for btn in await section.locator('button').all():
   await btn.hover();await pg.wait_for_timeout(500);observations.append({'hover':await section.inner_text()});await btn.click();await pg.wait_for_timeout(500);observations[-1]['click']=await section.inner_text()
  Path('artifacts/reference/company/map-interactions.json').write_text(json.dumps(observations,indent=2));await pg.screenshot(path='artifacts/reference/company/map-hover.png');await b.close()
asyncio.run(main())

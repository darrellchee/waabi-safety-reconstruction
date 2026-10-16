"""Launch a disposable public-reference browser for passive REA CDP inspection."""
import asyncio,os
from pathlib import Path
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--remote-debugging-port=9223'],proxy={'server':os.environ['HTTPS_PROXY']})
  page=await browser.new_page(viewport={'width':1440,'height':900},ignore_https_errors=True)
  await page.goto('https://waabi.ai/safety',wait_until='networkidle',timeout=120000)
  await page.wait_for_timeout(5000)
  Path('artifacts/reference/rea/browser-ready.txt').write_text('https://waabi.ai/safety loaded at 1440x900; CDP http://127.0.0.1:9223')
  for _ in range(180):
   if Path('artifacts/reference/rea/browser-stop.txt').exists():break
   await asyncio.sleep(5)
  await browser.close()
asyncio.run(main())

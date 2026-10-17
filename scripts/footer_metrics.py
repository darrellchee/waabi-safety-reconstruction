import asyncio,json,os
from pathlib import Path
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'],proxy={'server':os.environ['HTTPS_PROXY']})
  all=[]
  for w,h in [(1440,900),(768,1024),(390,844)]:
   pg=await b.new_page(viewport={'width':w,'height':h},ignore_https_errors=True)
   await pg.goto('https://waabi.ai/company',wait_until='domcontentloaded',timeout=60000);await pg.evaluate('document.fonts.ready');await pg.wait_for_timeout(1500);await pg.evaluate('scrollTo(0,document.body.scrollHeight)');await pg.wait_for_timeout(1800)
   x=await pg.locator('footer').evaluate('''el=>({height:el.offsetHeight, nodes:[el,...el.querySelectorAll('h2,p,nav,ul,li,svg')].map(e=>({tag:e.tagName,text:e.innerText?.slice(0,50),cl:e.className?.baseVal||e.className,r:e.getBoundingClientRect().toJSON(),font:getComputedStyle(e).font,gap:getComputedStyle(e).gap,pad:getComputedStyle(e).padding}))})''')
   all.append({'width':w,**x});await pg.close()
  await b.close();Path('artifacts/reference/company/footer-metrics.json').write_text(json.dumps(all,indent=2));print(json.dumps(all)[:8000])
asyncio.run(main())

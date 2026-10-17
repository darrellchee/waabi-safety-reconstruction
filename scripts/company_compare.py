import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
from PIL import Image,ImageChops
OUT=Path('artifacts/comparison/company');OUT.mkdir(exist_ok=True,parents=True)
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
  for w,h in [(1440,900),(1920,1080),(768,1024),(390,844)]:
   pg=await b.new_page(viewport={'width':w,'height':h});await pg.goto('http://localhost:3000/company',wait_until='networkidle');await pg.wait_for_timeout(1200);await pg.screenshot(path=str(OUT/f'local-{w}-hero.png'))
   await pg.evaluate('''async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,90))}scrollTo(0,0)}''');await pg.wait_for_timeout(1000);await pg.screenshot(path=str(OUT/f'local-{w}-full.png'),full_page=True)
   d=await pg.evaluate('''()=>({height:document.body.scrollHeight,sections:[...document.querySelectorAll('.company-page>section')].map(e=>({class:e.className,y:e.getBoundingClientRect().y,height:e.offsetHeight})),broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),overflow:document.documentElement.scrollWidth-innerWidth})''');(OUT/f'metrics-{w}.json').write_text(json.dumps(d,indent=2))
   ref=Image.open(f'artifacts/reference/company/company-{w}-hero.png').convert('RGB');local=Image.open(OUT/f'local-{w}-hero.png').convert('RGB');Image.blend(ref,local,.5).save(OUT/f'overlay-{w}-hero.png');ImageChops.difference(ref,local).save(OUT/f'diff-{w}-hero.png');await pg.close()
  await b.close()
asyncio.run(main())

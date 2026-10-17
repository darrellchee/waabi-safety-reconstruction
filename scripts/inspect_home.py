import asyncio,json,os,base64,gzip
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('artifacts/reference/home');OUT.mkdir(exist_ok=True,parents=True)
async def rea(command,target,file):
 with file.open('w') as f:
  proc=await asyncio.create_subprocess_exec('npm','exec','--yes','--package=rea-agents@6.5.0','--','rea',command,'http://127.0.0.1:9232',target,'--format','json',stdout=f,stderr=asyncio.subprocess.PIPE);await proc.communicate()
 d=json.loads(file.read_text())
 if command=='capture-web-screenshot':file.with_suffix('.png').write_bytes(base64.b64decode(d['normalized_result']['artifact']['data_base64']))
 with gzip.open(str(file)+'.gz','wb') as f:f.write(file.read_bytes())
 file.unlink()
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--remote-debugging-port=9232'],proxy={'server':os.environ['HTTPS_PROXY']})
  page=await b.new_page(viewport={'width':1440,'height':900},ignore_https_errors=True)
  await page.goto('https://waabi.ai/',wait_until='networkidle',timeout=120000);await page.wait_for_timeout(4000)
  c=await page.context.new_cdp_session(page);target=(await c.send('Target.getTargetInfo'))['targetInfo']['targetId']
  await rea('inspect-web-page',target,OUT/'rea-inspection.json')
  (OUT/'text.txt').write_text(await page.locator('body').inner_text())
  (OUT/'html.html').write_text(await page.content())
  (OUT/'dom.json').write_text(json.dumps(await page.evaluate('''()=>[...document.querySelectorAll('section,h1,h2,h3,p,video,img,canvas')].map(e=>({tag:e.tagName,text:e.innerText?.slice(0,900),class:e.className,rect:e.getBoundingClientRect().toJSON(),font:getComputedStyle(e).font,padding:getComputedStyle(e).padding,color:getComputedStyle(e).color,background:getComputedStyle(e).background,src:e.currentSrc||e.src}))'''),indent=2))
  try:await page.get_by_role('button',name='Reject All',exact=True).click(timeout=2000)
  except:pass
  for w,h in [(1440,900),(1920,1080),(768,1024),(390,844)]:
   await page.set_viewport_size({'width':w,'height':h});await page.evaluate('scrollTo(0,0)');await page.wait_for_timeout(1000)
   height=await page.evaluate('document.body.scrollHeight')
   for y in range(0,height,h//2):await page.evaluate('y=>scrollTo(0,y)',y);await page.wait_for_timeout(150)
   await page.evaluate('scrollTo(0,0)');await page.wait_for_timeout(500)
   await page.screenshot(path=str(OUT/f'{w}-full.png'),full_page=True)
   for i,y in enumerate(range(0,height,h)):
    await page.evaluate('y=>scrollTo(0,y)',y);await page.wait_for_timeout(700)
    await rea('capture-web-screenshot',target,OUT/f'rea-{w}-{i}.json')
  await b.close()
asyncio.run(main())

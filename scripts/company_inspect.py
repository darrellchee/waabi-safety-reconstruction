import asyncio,json,os,base64,gzip
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('artifacts/reference/company');OUT.mkdir(parents=True,exist_ok=True)
async def rea(cmd,target,name):
 proc=await asyncio.create_subprocess_exec('npm','exec','--yes','--package=rea-agents@6.5.0','--','rea',cmd,'http://127.0.0.1:9233',target,'--format','json',stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.PIPE)
 out,err=await proc.communicate();data=json.loads(out)
 with gzip.open(OUT/(name+'.json.gz'),'wb') as f:f.write(out)
 if cmd=='capture-web-screenshot':(OUT/(name+'.png')).write_bytes(base64.b64decode(data['normalized_result']['artifact']['data_base64']))
 return data
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--remote-debugging-port=9233'],proxy={'server':os.environ['HTTPS_PROXY']})
  for w,h in [(1440,900),(1920,1080),(768,1024),(390,844)]:
   page=await browser.new_page(viewport={'width':w,'height':h},ignore_https_errors=True)
   await page.goto('https://waabi.ai/company',wait_until='networkidle',timeout=120000);await page.wait_for_timeout(3000)
   import urllib.request
   target=next(x['id'] for x in json.loads(urllib.request.urlopen('http://127.0.0.1:9233/json/list').read()) if 'waabi.ai/company' in x['url'])
   await rea('capture-web-screenshot',target,f'company-{w}-hero')
   if w==1440:
    await rea('inspect-web-page',target,'company-inspection')
    (OUT/'company.html').write_text(await page.content())
   await page.evaluate('''async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,200))}scrollTo(0,0)}''');await page.wait_for_timeout(1000)
   await page.screenshot(path=str(OUT/f'company-{w}-full.png'),full_page=True)
   metrics=await page.evaluate('''()=>({height:document.body.scrollHeight,text:document.body.innerText,sections:[...document.querySelectorAll('section')].map(e=>({cls:e.className,rect:e.getBoundingClientRect().toJSON(),text:e.innerText})),nodes:[...document.querySelectorAll('h1,h2,h3,p,button')].map(e=>({tag:e.tagName,text:e.innerText,cls:e.className,rect:e.getBoundingClientRect().toJSON(),font:getComputedStyle(e).font,tracking:getComputedStyle(e).letterSpacing})),images:[...document.images].map(i=>({src:i.currentSrc,alt:i.alt,width:i.width,height:i.height})),videos:[...document.querySelectorAll('video')].map(v=>({src:v.currentSrc,poster:v.poster}))})''')
   (OUT/f'metrics-{w}.json').write_text(json.dumps(metrics,indent=2))
   if w==1440:
    for i,y in enumerate(range(700,metrics['height'],800)):
     await page.evaluate('(y)=>scrollTo(0,y)',y);await page.wait_for_timeout(650);await rea('capture-web-screenshot',target,f'company-1440-scroll-{i}')
   await page.close()
  await browser.close()
asyncio.run(main())

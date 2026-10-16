"""REA supplies primary screenshot evidence; Playwright positions its external browser.
Computed CSS metrics are a narrow fallback because REA does not expose evaluation.
"""
import asyncio,json,os
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('artifacts/reference/rea')
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--remote-debugging-port=9224'],proxy={'server':os.environ['HTTPS_PROXY']})
  metrics=[]
  for w,h in [(1440,900),(1920,1080),(768,1024)]:
   page=await browser.new_page(viewport={'width':w,'height':h},ignore_https_errors=True)
   await page.goto('https://waabi.ai/safety',wait_until='networkidle',timeout=120000)
   await page.wait_for_timeout(3000)
   cdp=await page.context.new_cdp_session(page);target=(await cdp.send('Target.getTargetInfo'))['targetInfo']['targetId']
   for area,text in [('stats','The stakes are real and rising.'),('philosophy','Safety is core to our DNA.')]:
    el=page.get_by_text(text,exact=True).first
    await el.scroll_into_view_if_needed();await page.wait_for_timeout(1000)
    # Passive REA owns capture and provenance; external browser positioning is explicit.
    file=OUT/f'layout-{w}-{area}.json'
    with file.open('w') as f:
     proc=await asyncio.create_subprocess_exec('npm','exec','--yes','--package=rea-agents@6.5.0','--','rea','capture-web-screenshot','http://127.0.0.1:9224',target,'--format','json',stdout=f,stderr=asyncio.subprocess.PIPE)
     _,err=await proc.communicate()
    data=json.loads(file.read_text());a=data['normalized_result']['artifact']
    import base64,gzip
    file.with_suffix('.png').write_bytes(base64.b64decode(a['data_base64']))
    with gzip.open(str(file)+'.gz','wb') as f:f.write(file.read_bytes())
    file.unlink()
    result=await el.evaluate('''el=>{let section=el.closest('section');return {section:section?.outerHTML.slice(0,300),viewport:{width:innerWidth,height:innerHeight},scrollY,rootFont:getComputedStyle(document.documentElement).fontSize,nodes:[section,...section.querySelectorAll('h1,h2,h3,p')].filter(Boolean).map(e=>({tag:e.tagName,text:e.innerText?.slice(0,100),class:e.className,rect:e.getBoundingClientRect().toJSON(),font:getComputedStyle(e).font,tracking:getComputedStyle(e).letterSpacing,padding:getComputedStyle(e).padding,gap:getComputedStyle(e).gap,width:getComputedStyle(e).width,maxWidth:getComputedStyle(e).maxWidth}))}}''')
    metrics.append({'area':area,'width':w,'reaEvidence':data['evidence_id'],'metricsProvider':'Playwright computed CSS fallback',**result})
  (OUT/'layout-metrics.json').write_text(json.dumps(metrics,indent=2))
  await browser.close()
asyncio.run(main())

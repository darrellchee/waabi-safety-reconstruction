"""Measure reference DNA sticky composition across desktop and tablet widths.
MOTION_SIDES=local MOTION_LOCAL_URL=http://127.0.0.1:3000 python scripts/dna_geometry_verify.py
"""
import asyncio,os,json
from pathlib import Path
from playwright.async_api import async_playwright
from motion_round2_audit import rea
async def main():
 rows=[]
 async with async_playwright() as p:
  for side in os.environ.get('MOTION_SIDES','reference,local').split(','):
   port=9391 if side=='reference' else 9392
   kwargs={'executable_path':'/usr/bin/chromium','args':['--no-sandbox',f'--remote-debugging-port={port}']}
   if side=='reference':kwargs['proxy']={'server':os.environ['HTTPS_PROXY']}
   b=await p.chromium.launch(**kwargs)
   for w,h in [(1440,900),(1920,1080),(768,1024)]:
    page=await b.new_page(viewport={'width':w,'height':h});await page.goto(('https://waabi.ai' if side=='reference' else os.environ.get('MOTION_LOCAL_URL','http://127.0.0.1:3006'))+'/safety',wait_until='domcontentloaded');await page.evaluate('document.fonts.ready');await page.wait_for_timeout(2000);await page.evaluate('scrollTo({top:3400,behavior:"instant"})');await page.wait_for_timeout(2200)
    try:await page.get_by_role('button',name='Reject All',exact=True).click(timeout=1000)
    except Exception:pass
    await page.mouse.move(0,0)
    data=await page.evaluate('''()=>{const box=e=>{let r=e.getBoundingClientRect(),s=getComputedStyle(e);return{x:r.x,y:r.y,w:r.width,h:r.height,cls:typeof e.className==='string'?e.className:'',css:{margin:s.margin,padding:s.padding,position:s.position,top:s.top,gap:s.gap,display:s.display}}};let title=[...document.querySelectorAll('h2,h3')].find(e=>e.textContent.startsWith('Safety from'));let section=title.closest('section');let img=section.querySelector('img');let counter=[...section.querySelectorAll('p,span')].find(e=>/^0[123]$/.test(e.textContent.trim()));let ancestors=e=>{let a=[];for(let i=0;e&&i<5;i++,e=e.parentElement)a.push(box(e));return a};return{title:ancestors(title),image:ancestors(img),counter:ancestors(counter)}}''')
    rows.append({'side':side,'viewport':[w,h],'data':data})
    await rea(page,port,Path(f'artifacts/comparison/motion-round2/audit/final-{side}-dna-{w}'))
    await page.close()
   await b.close()
 Path('artifacts/comparison/motion-round2/audit/corrected-dna-geometry.json').write_text(json.dumps(rows,indent=2));print(json.dumps([{'side':r['side'],'w':r['viewport'][0],'title':r['data']['title'][0],'image':r['data']['image'][0],'counter':r['data']['counter'][0] if r['data']['counter'] else None} for r in rows]))
asyncio.run(main())

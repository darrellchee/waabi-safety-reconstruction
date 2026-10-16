"""Download publicly accessible assets observed in the reference Safety page."""
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.parse import urlparse, unquote
from concurrent.futures import ThreadPoolExecutor
import re,json,html
ROOT=Path(__file__).resolve().parents[1]
s=html.unescape(Path('/workspace/reference.html').read_text()).replace('\\"','"').replace('\\u0026','&')
assets={}
for u in re.findall(r'https://www.datocms-assets.com/[^\s"<>\\]+',s):
 base=u.split('?')[0]
 if not re.search(r'\.(png|jpg|jpeg|webp|svg)$',base):continue
 name=unquote(urlparse(base).path.split('/')[-1])
 local=name.rsplit('.',1)[0]+'.webp'
 assets[base]=(base+'?fit=max&w=2000&q=90&fm=webp',local)
for path in re.findall(r'url\((/_next/static/media/[^;]+?)\)format',s):
 path=re.sub(r'\\+([()])',r'\1',path)
 assets['https://waabi.ai'+path]=('https://waabi.ai'+path,unquote(path.split('/')[-1]))
for u in re.findall(r'https://[^\s"<>\\]+\.mp4',s):assets[u]=(u,u.split('/')[-1])
def download(item):
 original,(url,name)=item
 target=ROOT/'public/assets'/name
 try:
  if not target.exists():
   with urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=120) as r:target.write_bytes(r.read())
  return original,{'local':'/assets/'+name,'downloadUrl':url,'bytes':target.stat().st_size}
 except Exception as e:return original,{'error':str(e),'downloadUrl':url}
with ThreadPoolExecutor(max_workers=6) as pool: results=dict(pool.map(download,assets.items()))
(ROOT/'public/assets/manifest.json').write_text(json.dumps(results,indent=2))
for url,item in results.items():print(item)

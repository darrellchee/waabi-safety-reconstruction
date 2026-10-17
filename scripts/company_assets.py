from html.parser import HTMLParser
from urllib.parse import urlparse,parse_qs
import urllib.request,concurrent.futures,json
from pathlib import Path
class P(HTMLParser):
 def __init__(self):super().__init__();self.images=[];self.anchors=[]
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='img':self.images.append(d)
  if t=='a':self.anchors.append(d)
p=P();p.feed(open('/tmp/company.html').read());out=Path('public/assets/company');out.mkdir(exist_ok=True)
urls={}
for i in p.images:
 u=i.get('src','')
 if u.startswith('/_next/image'):u=parse_qs(urlparse(u).query)['url'][0]
 if u.startswith('/'):u='https://waabi.ai'+u
 if u:urls[u.split('?')[0]]=i.get('alt','')
def get(item):
 u,alt=item;name=u.split('/')[-1];name=name.rsplit('.',1)[0]+'.webp' if not name.endswith('.svg') else name
 query='?auto=format&fit=max&w=2200&q=88' if not u.endswith('.svg') else ''
 try:
  data=urllib.request.urlopen(urllib.request.Request(u+query,headers={'User-Agent':'Mozilla/5.0'})).read();(out/name).write_bytes(data);return {'file':name,'alt':alt,'source':u}
 except Exception as e:return {'error':str(e),'source':u}
rows=list(concurrent.futures.ThreadPoolExecutor(8).map(get,urls.items()));Path('artifacts/reference/company/asset-manifest.json').write_text(json.dumps(rows,indent=2));print(json.dumps(rows,indent=2));print('LINKS',[(a.get('href'),a.get('class','')[:60]) for a in p.anchors if a.get('href')])

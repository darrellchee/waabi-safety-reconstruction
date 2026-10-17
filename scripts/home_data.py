import json,re,pathlib,urllib.parse,subprocess,concurrent.futures
partners=json.load(open('artifacts/reference/home/partners.json'));out=pathlib.Path('public/assets/home')
def dl(u):
 name=pathlib.Path(urllib.parse.urlparse(u).path).name
 if not (out/name).exists():subprocess.run(['curl','-Ls','--max-time','60',u,'-o',str(out/name)])
 return name
for p in partners:
 p['image']=dl(p['image']['src']);p['logo']=dl(p['logo']['src']);p['review']=re.sub('<[^>]+>','',p['review']);p['slug']=p['button']['link']['link']['slug'] if p['button'] else None
pathlib.Path('components/home-data.json').write_text(json.dumps(partners,indent=2))

"""Create readable summaries and extract REA's requested PNG artifact."""
from pathlib import Path
import json,base64,gzip,re
root=Path('artifacts/reference/rea')
static=json.loads((root/'static-analysis.json').read_text());live=json.loads((root/'live-page-inspection.json').read_text());shot=json.loads((root/'screenshot.json').read_text())
s=static['normalized_result'];l=live['normalized_result']
summary={'version':(root/'version.txt').read_text().strip(),'static':{'evidence_id':static['evidence_id'],'statistics':s['statistics'],'source_selection':s['source_selection'],'limitations':s['limitations']},'live':{'evidence_id':live['evidence_id'],'dom_nodes':l['dom']['total_nodes'],'accessibility_nodes':l['accessibility']['total_nodes'],'scripts':l['scripts']['total'],'resources':len(l['resources']),'completeness':l['completeness']},'screenshot':{'evidence_id':shot['evidence_id'],'viewport':shot['normalized_result']['viewport']}}
(root/'summary.json').write_text(json.dumps(summary,indent=2))
a=shot['normalized_result']['artifact'];print('artifact',a.keys())
for key in ['base64','data_base64','bytes_base64']:
 if key in a:(root/'rea-desktop-1440.png').write_bytes(base64.b64decode(a[key]))
# Retain raw authenticated outputs losslessly while reducing repository footprint.
for n in ['static-analysis.json','live-page-inspection.json','screenshot.json']:
 p=root/n
 with gzip.open(str(p)+'.gz','wb') as f:f.write(p.read_bytes())
 p.unlink()

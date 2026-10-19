"""Download the Careers page's public rendered Next Image derivatives.

Run from the repository root. Image URLs and content are originally captured in
artifacts/reference/careers/careers.html; no authenticated CMS access is used.
"""
import concurrent.futures
import hashlib
import io
import json
from pathlib import Path
import re
import urllib.parse
import urllib.request

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'public/assets/careers'
ACCEPT = 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'


def source_images():
    html = (ROOT / 'artifacts/reference/careers/careers.html').read_text()
    for script in re.findall(r'<script[^>]*>(.*?)</script>', html, re.S):
        if 'Sahil' not in script:
            continue
        flight = json.loads(script[len('self.__next_f.push('):-1])[1]
        payload = json.loads(flight.split(':', 1)[1])
        images = {}
        def walk(value):
            if isinstance(value, dict):
                if value.get('_modelApiKey') == 'asset_image':
                    image = value['image']
                    images[image['url']] = image
                for child in value.values():
                    walk(child)
            elif isinstance(value, list):
                for child in value:
                    walk(child)
        walk(payload)
        return images
    raise RuntimeError('Public Careers image payload missing')


def download(item):
    original, image = item
    width = next((w for w in [1080, 1920, 3840] if w >= image['width']), 3840)
    url = 'https://waabi.ai/_next/image?' + urllib.parse.urlencode({
        'url': image['src'], 'w': width, 'q': 75,
    })
    request = urllib.request.Request(url, headers={'Accept': ACCEPT, 'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(request, timeout=120) as response:
        raw = response.read()
        content_type = response.headers.get_content_type()
    extension = {'image/avif': '.avif', 'image/webp': '.webp', 'image/jpeg': '.jpg', 'image/png': '.png'}[content_type]
    name = Path(urllib.parse.urlparse(original).path).stem + extension
    decoded = Image.open(io.BytesIO(raw))
    decoded.load()
    path = DEST / name
    path.write_bytes(raw)
    return original, {
        'source': original, 'downloadUrl': url, 'accept': ACCEPT,
        'local': '/assets/careers/' + name, 'contentType': content_type,
        'bytes': len(raw), 'sha256': hashlib.sha256(raw).hexdigest(),
        'originalWidth': image['width'], 'originalHeight': image['height'],
        'renderedWidth': decoded.width, 'renderedHeight': decoded.height,
        'nextImageWidth': width, 'nextImageQuality': 75,
    }


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    previous = json.loads((DEST / 'provenance.json').read_text()) if (DEST / 'provenance.json').exists() else {}
    data_path = ROOT / 'components/careers-data.json'
    data = json.loads(data_path.read_text())
    images = source_images()
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        provenance = dict(pool.map(download, images.items()))
    old_to_new = {previous[url]['local']: image['local'] for url, image in provenance.items() if url in previous}
    def replace(value):
        if isinstance(value, dict):
            if value.get('src') in old_to_new:
                value['src'] = old_to_new[value['src']]
            for child in value.values():
                replace(child)
        elif isinstance(value, list):
            for child in value:
                replace(child)
    replace(data)
    data_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')
    (DEST / 'provenance.json').write_text(json.dumps(provenance, indent=2) + '\n')
    used = {p['local'] for p in provenance.values()}
    for image in previous.values():
        old_path = ROOT / 'public' / image['local'].lstrip('/')
        if old_path.parent == DEST and image['local'] not in used:
            old_path.unlink(missing_ok=True)
    print(json.dumps({'images': len(provenance), 'bytes': sum(p['bytes'] for p in provenance.values()),
                      'formats': sorted({p['contentType'] for p in provenance.values()})}, indent=2))


if __name__ == '__main__':
    main()

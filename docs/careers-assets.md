# Careers assets and content

The public HTML at `https://waabi.ai/careers`, captured under `artifacts/reference/careers/careers.html`, contains the page's React Server Component content payload. `components/careers-data.json` transcribes that payload into a small local data structure. The REA source analysis and browser inspection are maintained separately by the page implementation.

## Content mapping

- `hero`: “Find your place in Physical AI.” with the collaborative office photograph.
- `intro`: full introductory paragraph and “Join the team” CTA.
- `pioneering`: title, two original paragraphs and collaborative office photograph.
- `voices`: all nine employee quotes, names and roles, with five source photograph records (the source slideshow truncates this to its first four records: two visible slots plus two retained keys). The photographs are not a one-to-one mapping to the nine quotes; preserving their independent arrays follows the source data.
- `values`: original title, description and all eight numbered value entries. The source's `andcommunicate` typo and trailing whitespace are retained in the underlying data rather than inventing editorial changes.
- `closing`: title, description, “Explore open roles” CTA and six original photographs.

There is **no embedded job list** on the Careers page. Both recruiting CTAs navigate to the public external destination `https://jobs.lever.co/waabi`. No fabricated roles or listings were added.

## Assets

Thirteen distinct images are used. All are isolated under `public/assets/careers`, including the five photographs previously reused from other local pages. Shared assets remain unchanged. `public/assets/careers/provenance.json` records every original public CMS URL, actual optimized response URL, Chromium image Accept header, local path, MIME type, byte size, SHA-256, source dimensions and decoded dimensions.

Final assets use the reference page's public Next Image responses: the CMS `src` URL (`fit=max&h=3000&q=90&w=2000`) is passed to `https://waabi.ai/_next/image` with observed width buckets 1080/1920/3840 and quality 75. Requests send Chromium's image Accept header. All thirteen responses currently return `image/webp`, matching their `.webp` file extension, totaling 1,834,194 bytes. Each was decoded successfully with Pillow. This replaces the initial direct CMS WebP downloads, whose color/compression differed slightly from the actual rendered page.

Reproduce downloads with `python scripts/careers_assets.py`. The script derives image URLs from the captured public HTML payload, downloads the rendered derivatives, updates local data paths and provenance, and removes only superseded files inside the Careers asset directory. No credentials, protected URLs, private CMS calls or access-control bypasses were used.

The Careers page has no unique video. The footer reuses `/assets/Waabi_System_LightTunnel_1.mp4`. All branding and photographs remain the property of their respective owners; these local copies are for this private educational reconstruction, and no new license grant is implied.

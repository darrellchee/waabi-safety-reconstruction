# Careers reference analysis

Reference: https://waabi.ai/careers. REA 6.5.0 was the primary live browser/source inspection tool. `scripts/careers_inspect.py` records native REA viewport screenshots, script-source inspection envelopes, complete screenshots and computed geometry at 1440×900,1920×1080,768×1024 and390×844. Playwright supplies scrolling, ordinary interactions and computed-style sampling because REA's passive CDP provider does not drive input. Evidence is under `artifacts/reference/careers/`. REA live inspection: `ev_b5820253273dede44db5550dfad73510ce4f51a11e038d287650bfecc8e7215c`; independent script-source inspection: `ev_750e603ed59487aa23c80833701cc4bbf363f617df9c2a7730ee193b1973c615`; native desktop hero: `ev_2b584aeecfacd59ea52f2cb646b6f69e9624dadf3c57b26ab1b0b6620058e540`.

## Complete page

The hero is an original office photograph with a left black gradient, large balanced serif title, desktop sticky copy, ±12% image parallax and a pink scroll-down control. An individually revealed introductory paragraph leads to the external recruiting board. The cream mission section contains a rounded, clipped 860px desktop /600px mobile image and a two-column title/paragraph composition that stacks on mobile.

Waabi voices has nine manually selected testimonials and an independent rotating portrait stack. The values section contains all eight original numbered entries in a native horizontal rail with pointer dragging and previous/next controls. The closing section contains a split title/CTA and four overlapping, independently rotating photos. The shared footer completes the page. There is no Careers-specific video, 3D scene, embedded recruitment iframe, job filter or invented job listing. Both recruiting links lead to https://jobs.lever.co/waabi in a new tab.

The title uses Zagma Book; utility/body labels use NeueHaas Medium where computed styles show it. Desktop headings are80px/72px,tracking−3.2px; mobile34px/30.6px,tracking−1.02px. The hero is55px/49.5px on mobile and max(90px,min(9vw,130px)) desktop. The centered content cap is1234px and scales with viewport width; mobile copy gutters are40px. Cream is#e8e6e3, values tint#f9f6f8, pink#ff2c6b.

## Measured reference geometry

|Viewport|Full page height|Intro|Mission|Voices|Values|Closing|
|---|---:|---:|---:|---:|---:|---:|
|1440×900|6730|484|1466|820|854|966|
|1920×1080|7078|484|1466|820|854|1134|
|768×1024|6777|572|1766|833.390625|734|784.796875|
|390×844|5319|514|1082.75|728.4375|637.84375|517.671875|

All section heights are pixels. Source main content has120px gaps at1024px and above,60px below1024px, and40px bottom padding. The hero is one viewport tall. At1440px the sections start at1020,1624,3210,4150 and5124px. Detailed rectangles and typography are in `metrics-*.json`. Source-rendered file URLs are retained with SHA-256 in `public/assets/careers/provenance.json`.

## Motion and interaction

`docs/careers-motion-analysis.md` records recovered public modules and exact transition parameters. Titles use per-word x20/opacity reveals with0.07s stagger and0.4s snappy easing. The intro uses0.1s linear per-word opacity/color changes. Photo stacks use actual nested Motion layout projection and retained exits,0.8s quart easing, and a2000ms timer enabled only in view while the document is visible. Quote selection wraps all nine records but does not autoplay. Values arrows use the first card width plus integer-parsed CSS gap; the observed desktop step is339px.

The source still shows a promotional announcement and cookie UI. These remain removed from this reconstruction under the owner's prior instruction. The header still contains only Home, Safety and Company, also following that instruction. Careers links in the existing page content and footer now navigate locally.

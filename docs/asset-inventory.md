# Public reference assets

Assets were downloaded from publicly accessible resources referenced by the Safety page HTML on 16 October 2026. They are retained for this private educational prototype; downloading does not imply a transfer of copyright or broader reuse rights.

`public/assets/manifest.json` maps original CMS asset URLs to local files. Images were requested from the existing public CMS image transformation endpoint at a maximum width of 2000 pixels, quality 90, in WebP format. Original filename stems are preserved. Three original WOFF2 web fonts, the valid footer light tunnel video, and inline logo / icon SVGs are available locally.

Observed visible image mapping:

| Location | Local filename stem |
| --- | --- |
| Hero | `1760007662-e65a0af926da45b75ba890d3d0a5bb24469ce5be` |
| Waabi Driver | `1761183903-waabi_road2_04462` |
| Waabi World | `1761947979-screenshot-2025-10-31-at-2-59-29-pm` |
| Mixed Reality Testing | `1762294277-screenshot-2025-11-04-at-2-11-01-pm` |
| Safety practices slide 1 | `1761183902-waabi_road2_04965` |
| Safety practices slide 2 | `1761183937-waabi_garageinterior_03851` |
| Safety practices slide 3 | `1761183980-waabi_road1_01029` |
| Safety practices slide 4 | `1760350326-waabi_laptop_03392_final` |

The `Waabi_System_LightTunnel_1.mp4` file is a valid 1.06 MB MP4 from `static.ext.waabi.ai`. An additional video URL found in a generic shared JavaScript component, `/temp/Web-Tunnel_Rectangle_Loop.mp4`, returns a Git LFS pointer rather than playable media. That invalid response is not retained or used.

Exact fonts:

- Zagma Book: `F37ZagmaSerif_Book-s.p.07ww.6n-k2vcw.woff2`
- Zagma Book Italic: `F37ZagmaSerif_BookItalic-s.p.0.zzxoe5d~3ao.woff2`
- Neue Haas Grotesk Text Medium with round dots: `NeueHaasGroteskText(RoundDots)_65Medium_Web-s.p.0nqb_m3xq-4gg.woff2`

The small header and large footer logo have slightly different SVG viewboxes and are saved separately as `waabi-logo.svg` and `footer-logo.svg`.

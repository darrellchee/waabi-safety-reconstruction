# Reference interactions inspection

Inspected https://waabi.ai/safety on 16 October 2026 using Chromium and Python Playwright. Desktop 1440×900 and mobile 390×844. Evidence: `artifacts/reference/interactions.json` (DOM, computed rectangles, styles at eleven scroll positions), `controls-behavior.json` (actual control tests), and accompanying screenshots.

## Global navigation

A fixed white announcement bar is 42px tall, with centered “Let's talk autonomous trucking”, underlined “Get in touch” and a northeast arrow. The contact destination is https://42di74.share-na2.hsforms.com/2iMiF5OoTRLWyYPBKhOxpsg . A top-right X has accessible name “Close news banner”.

The desktop navigation floats centrally at x551, y76, width338, height55. It contains Waabi's SVG wordmark, “Safety”, and a two-line menu glyph (12×8). The white panel has a fine gray outline and 12px corners. A 2px pink line across the bottom tracks document scroll progress. With the announcement present the header's nominal top34px receives an additional 42px translation.

Clicking Menu opens a white rounded dropdown x552, y142, width336, height437. It has a small gray “Menu” label and six vertically stacked destinations: Home, Safety, Research, Company, Careers, Insights. Each pairs a 75×50 rounded thumbnail with a 34px serif label. Safety is pink. The menu glyph becomes a horizontal minus. The page behind remains visible. Clicking the same control closes it. See `menu-desktop.png`.

At 390px, opening the menu fills the screen in white below the announcement, with a ~102px header row and horizontal divider at y143. The links start at x40, y203 with 65×43 thumbnails and 34px serif names. See `menu-mobile.png`. It is not a tiny desktop popup on mobile.

## General reveals and scroll

Headings split into individual words, initially opacity0 with translateX(20px), and reveal on entry. Rows/cards initially translate vertically by 200px, 400px, and 600px respectively, then animate to zero as they enter the viewport. Jumping past sections can leave unrevealed styles, so comparison capture must scroll progressively. The hero contains an accessible “Scroll Down” pink circular button.

## Philosophy: Safety is core to our DNA

Desktop is a long cream section, with a centered 80px serif headline and explanatory 24px paragraph, followed by a two-column scroll composition. Right: one stationary rounded image, aspect525/600, in a top0 sticky viewport-height column with 100px vertical padding. Left: sticky changing 40px serif number “01 /3”, and three vertically spaced text groups. Each text group container is viewport-height; subsequent groups overlap its layout by negative50svh margin. A central 2px pink vertical line with a 12px round endpoint fills with scroll progress.

Active text group opacity is1; inactive groups opacity0.15. Each has a 40px serif heading, 24px gap, and 15px sans paragraph at 50% black. Observed active numbers by document scrollY: 2300/2700 →01; 3100/3500 →02; 3900/4300 →03. Progress and active states respond to scroll position rather than requiring button presses. The media changes with the active philosophy item. The initial DOM snapshot was already on item03, which showed the highway interchange image; initial mobile viewport screenshots show the first image, trucks approaching on a highway at dusk.

Mobile rearranges: heading/intro, square image (40px horizontal inset), then horizontal progress line, centered number, and horizontally scrollable full-width text cards. Desktop sticky treatment and vertical pink divider are hidden. Each card has 40px inner horizontal padding; 24px gaps; bottom60px padding in the scrolling strip. No arrow buttons are provided for this strip.

The “VSSA” inline link is public and opens a new tab:
https://research-assets.waabi.ai/Waabi%20VSSA/231030%20StAn%20Waabi%20Voluntary%20Safety%20Self-Assessment%2A.pdf

## Technology accordion

This is an expanding panel accordion, rather than a horizontal carousel. Its first panel, Waabi Driver, starts expanded. Three media panels are separated by24px, with24px page inset and12px corners. At1440px the expanded panel is1022.84×720, inactive panels160.58×720. Hovering Waabi World expanded the second panel to1022.84px and reduced the first to160.58px; title and body fade in near bottom48px, left48px, body width400px. Inactive panels show a circular50px plus near the bottom, and omit their descriptions. The active state persists when the cursor moves away. See `tech-hover-second.png`.

Each desktop panel has an overlay anchor leading to a corresponding insight article. The apparent plus is part of this card affordance; the anchor covers the panel, including the plus. Actual destinations:

- `/insights/introducing-the-waabi-driver#waabi-driver`
- `/insights/simulator-realism-the-new-safety-standard-for-the-av-industry#waabi-world`
- `/insights/mixed-reality-testing-pushes-the-boundaries-of-av-safety#mixed-reality-testing`

On mobile the accordion becomes vertical. At390px each is342px wide, using24px page inset and24px gaps. Active panel height600px, inactive height112px. Tapping an inactive panel expands it and collapses the previously active panel. Tested Waabi World expansion; see `tech-mobile-second.png`. Inactive mobile anchor pointer events are disabled, allowing the first tap to expand. Mobile body is inset28px horizontally and40px from the bottom. Plus circles are32px.

The section's pink “Explore our approach” pill points to `/insights`.

## Safety-first best practices

Four full-viewport-height slides with full-bleed photographic media and dark/left-gradient overlays. It is a horizontal carousel, with `blossom-carousel`, nowrap, snap-center slides. At1440×900 each slide is1440×900. Initial slide Design has “01 /4”, heading “Safety-first best practices.”, gray subheading Design, and supporting paragraph in a bottom-left column. Text is inset to the page grid x103 and ends158px above the bottom. Two50px circular arrow controls sit x103 and165, bottom60px.

Clicking Next changes scrollLeft0→1440, and shows Testing & Validation (screenshot `best-next.png`). Further clicks show Deployment and Monitoring. An extra Next at the fourth slide clamps at scrollLeft4320; it does not wrap. Both arrow controls remain visually enabled (opacity1, disabled false) at the end. Previous allows returning through the slides. On mobile arrows shrink to32px, text is bottom110px, and controls bottom40px. Titles/number become24px, paragraph14px.

No automatic slide advance was observed during inspection; the carousel remained on the initial slide until clicked.

## Insights

Horizontally scrollable row of nine article links; desktop width450px per card and24px gap, mobile width `100vw - 80px` and28px gap. Images approximately4:3. There are Previous/Next controls, and a pink View all link to `/insights` (desktop alongside arrows, mobile below row). Each card contains categories, publication date, and article title, and navigates to its specific article URL. The DOM contains all nine cards; overflow is clipped horizontally by the section.

## Footer and cookies

Footer links go to Home, Safety, Research, Company, Careers, Insights. `press@waabi.ai` and `info@waabi.ai` are mailto links. Social circles link to LinkedIn https://www.linkedin.com/company/waabi/ , YouTube https://www.youtube.com/channel/UCNJWh6U6vfTz77SJCeWZloQ , X https://x.com/waabi_ai?lang=en . Privacy Policy links to https://waabi.ai/privacy-policy . A pointer-events-none canvas occupies the footer's large brand treatment; there is no evidence that interactive 3D rendering is necessary for page functionality.

A bottom-left cookie consent panel is440px wide at desktop (x15, bottom15) and370px wide on390px mobile (x10, bottom10). It offers Reject All, Accept All, Customize. Reject All was clicked successfully and removed the panel before control captures. Mobile first two controls share a row, Customize spans the following row. Its UI font differs from the main page. The panel is shown in initial reference screenshots.

## Inspection caveats

Measurements are actual rendered DOM values. The mobile accordion screenshot was taken after changing the viewport from desktop, so the previously active panel carried across; fresh-load initial state is still expected to be the first panel. Exact easing curves and timings were not recoverable from the downloaded bundles: the downloaded script inventory omitted the page-specific content strings. Scroll style snapshots confirm transforms/opacities, but numerical duration guesses are intentionally omitted. REA was subsequently installed and used through its official CLI without a session restart; see rea-analysis.md for direct source timing evidence.


## Measured mobile section geometry

Fresh390×844 render after progressive scroll initialization (public page, fonts ready):

| Section | Document top | Height |
| --- | ---: | ---: |
| Hero | 0 | 844 |
| Statistics | 904 | 696.625 |
| Philosophy | 1660.625 | 1259.1875 |
| Technology | 2979.8125 | 1196.578 |
| Best practices | 4236.391 | 844 |
| Insights | 5140.391 | 600.844 |

Main content gutter40px, width310px. Section gap60px. Hero h1 x40,y120,55px/49.5px. Main h2=34px/30.6px. Statistics heading61.1875px high; introduction18px/19.8px,59.3906px high; statistics margin-top60px. Each stat row162.0156px high, padding-top20px, gap20px,padding-bottom15px. Descriptions14px/22.4px and44.8125px high; numerals72px/61.2px, aligned left.

Philosophy heading y1720.625,h61.1875. Intro y1829.8125,h240,24px/30px. Image x40,y2117.8125,size310×310. Pink progress y2475.8125. Counter y2501.8125,height30. Text strip y2555.8125,full height364 including60px bottom padding. Each card390px wide,24px gap,40px horizontal inner padding; first heading88px high,body192px high at15px/24px and24px heading/body gap. The shorter other cards are vertically centered to the first card's304px content height.

Technology card row begins y3256.3906, height920. Active title24px/30px, content inner gutter28px. Pills36px high. Insights mobile article titles18px/19.8px; intro14px/22.4px. View all is centered below the card row. See `mobile-metrics.json` for source measurements.

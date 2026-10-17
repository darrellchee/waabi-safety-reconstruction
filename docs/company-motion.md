# Company motion correction

This pass replaces earlier visual approximations with mechanisms read from the public page bundles, analyzed with the official `rea-agents@6.5.0` CLI, and checked in normal-motion Chromium against the live page.

REA static evidence: `ev_a39fb475da72fa99d2077c2b74e0c85113926f286ba5a17c4858c1ab73d546c9`. The full immutable envelope is retained at `artifacts/reference/company/motion-static-rea.json.gz`; source URLs, SHA-256 hashes, byte offsets and excerpts are in `motion-source-excerpts.json`. REA also captured the live desktop and mobile team section screenshots in `artifacts/comparison/motion-company/`. Playwright drives scrolling and supplies computed-style measurements because REA's passive provider cannot execute page JavaScript.

## Observed and implemented

- Hero heading: each word independently enters from `x:20px`, opacity 0, over 400ms with `cubic-bezier(.19,1,.22,1)` and 70ms word staggering. The original hero title stays at 120px while its containing section scrolls on desktop. Its background maps section progress from `start end` to `end start` to -12%…12% vertical translation.
- Story: the original is a timed, once-per-word viewport reveal, not text painted according to scroll percentage. Words begin at opacity .1 and pink `rgb(255,44,107)`, then animate to opacity 1 and black over 100ms linear, with an index delay of 70ms, independently for each paragraph. Reveals remain complete when scrolling back.
- Quote image: the same reversible -12%…12% section-progress parallax, with the existing dual gradients remaining stationary.
- People: the previously static pair is a four-image rotating stack. It advances every 2000ms while visible and the document is active. Original movement uses 800ms `cubic-bezier(.77,0,.175,1)` layout transitions: the large right portrait moves into the small left slot, the old small portrait exits at scale .5 and x20, and the next portrait slides in from x100% while its image scales 1.5→1. Native FLIP and Web Animations reproduce this sequence, retaining the exact original slot geometry. Two additional public portrait assets were required and are stored locally.
- Investor marquee: two groups containing three copies of the 15 original logos each. Each group translates -100% in 40 seconds, linear, only while in view. The earlier 95-second, 2-copy version had a materially different speed. The source does not pause on hover.
- News thumbnails: original hover zoom 1.2, 500ms with the source snappy easing. Event cards change title color but do not zoom their images. Round buttons use the original 1.05 hover/.95 press scaling.
- Map: five original SVG road paths draw with the source mass1/stiffness3.2/damping4 spring and staggered starts, followed by a shared fade/repeat. City markers pulse at the source scale and stagger. Paths and pulse animations stop outside the viewport and respect reduced motion.
- Down control: scrolls one viewport height, as the source does.

Reduced motion displays complete text, keeps portraits and marquee still, removes parallax, and uses immediate scrolling.

## Verification

Normal-motion reference and local inspections at 1440×900 and 390×844 produced no page exceptions. Every Company section start and height remains identical to the reference at both widths (including fractional positions). Sampling the portrait sequence confirms the same two visible images and transient three-image exit state, with advances after each two-second interval. Story words reach opacity 1 and black in both pages. Screenshots, native REA envelopes and sampled metrics are in `artifacts/comparison/motion-company/`.

Animation phase depends on entry time and browser scheduling. The timing constants, curves, sequence, in-view gates and scroll mapping are source based; these checks do not certify every rendered pixel of every intermediate frame across all browser engines.

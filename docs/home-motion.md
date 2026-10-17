# Home motion reconstruction

This pass replaces the earlier timer and opacity approximations with the mechanisms observed in the public Home JavaScript and normal-motion browser captures.

## Evidence

Primary source reconstruction used REA 6.5.0 `analyze-javascript-application` against the public Home client bundle `01~o_8v7-rduf.js`. The complete evidence envelope is `artifacts/reference/home-motion/rea-source-analysis.json.gz` (evidence `ev_6b852224eba3751dd52c69f1dd07b991a5fb10dce262c94c9cbda3c8cc81d2c0`). Public source was downloaded without authentication. REA's native screenshot capture owns the images and provenance envelopes in the same directory. Playwright positions the external Chromium browser and supplies computed geometry, which the passive REA provider cannot evaluate.

Relevant source module IDs: Hero 84071, Parallax 62083, Benefits 31164, Images 93757, easing config 30397. The public shared bundle `0nqb4gsffynqw.js` supplies testimonial timing. Downloaded source bundles are excluded from Git; the REA envelope contains inventory hashes and reconstruction results.

## Corrections

- The original title appears immediately, word by word with 0.07-second staggering, 0.4-second duration, and cubic Bezier `(0.19,1,0.22,1)`. There is **no 1.9-second title/intro timer**. The title moves away with the document. Its parallax is separate from the pinned film.
- The supporting hero paragraph is scroll controlled. It appears over hero progress 0.1–0.2, then fades out over 87.5–100 viewport percent of document scroll. The film begins shrinking at 100vh and reaches the 133/1440 viewport-width square at 150vh. Scaling uses `(0.25,0.1,0.25,1)`, while cropping uses `(0.19,1,0.22,1)`. Cropping preserves a square without stretching the film. The arrow targets 165vh.
- The road scene is a 150vh document scene rather than a pinned montage. Its four columns evenly distribute four square assets. Outer columns translate from +600px to −600px across `start end → end start`; inner columns remain fixed. Desktop copy translates −200px to +200px across `center end → end end`. Its 30px line height and the centered stack's additional square account for the former 79px copy-position mismatch.
- Strengths desktop selection is driven by clicks, not arbitrarily changed by scrolling. A scroll threshold at section start +25vh brings in Safe. Videos enter from 100vh below with a one-second `(0.19,1,0.22,1)` transition and 0.07-second index delay; earlier cards stack at −3vh and 0.95 scale increments. The original introduction flows out independently of the sticky list. The media contracts to 0.9 scale and translates −50px over section scroll 50–100vh. The source 527px image and 157px desktop gap are retained.
- Mobile strengths advance every five seconds while the media is at least half visible.
- All Home headings use the source word reveal. Safety copy uses 0.1-second linear opacity with 0.07-second word stagger. Technology and Insights cards reveal with a 0.6-second clip transition and 0.15-second index delay. Insights hover scales images to 1.2 over 0.5 seconds.
- Testimonials advance after ten seconds only while visible on desktop. The ring uses `easeInOut`, quote words reveal with 0.03-second stagger after 0.4 seconds, and author information appears after one second.
- The careers strip was previously static. It now advances every two seconds while visible and the document is active. Its six keyed image window matches the source repeated-image buffer; retained images morph between four sizes over 0.8 seconds using `(0.77,0,0.175,1)`, and the new right image enters from 100% with a 1.5-scale crop.

All observers, timers, and animation frames are cleaned up. Reduced motion shows text immediately, stops film/carousel autoplay, and suppresses transforms/reveals.

## Verification

Normal-motion Playwright forward/reverse sampling at 1440×900 returned no browser exceptions after a fresh browser context. Local hero film widths were 1440px at scroll 0, 455.28px at 1125, and 212.8px from 1350 onward, matching reference computed widths. The last width is the film's uncropped bounds; its visible square is 133px. Reverse scrolling restored 455.28px and then 1440px. Careers changed the first retained image from slot 0 to slot 3 after 2.2 seconds. Numeric results and local screenshots are under `artifacts/comparison/home-motion/`; independent parent QA also records matched scroll states under `artifacts/comparison/motion/`. TypeScript passed after the changes.

Remaining limits: exact cross-platform spring/layout interpolation during an interrupted image transition is not established by these samples. Native CSS layout interpolation replaces Framer Motion's layout projection; the choreography, explicit durations, and cubic curves come from source evidence. Video decoder/frame scheduling is asynchronous. Therefore these checks establish the corrected sampled geometry and source timings, not a claim of pixel identity for every animation frame.

# Careers fidelity and verification

The complete Careers page is implemented at `/careers`, using the original public images, complete text, all nine quotes and all eight values. Recruiting links from Home, Company and the shared footer now lead locally. Both in-page recruiting CTAs open the source's external Lever job board. The previously removed header links, promotional banner and cookie popup remain removed under the owner's instruction.

## Verified behavior and layout

Fresh REA browser/script inspection, native screenshots and ordinary browser interaction established the source implementation. Motion uses the recovered per-word reveals, ±12% parallax, nested photo-stack layout projection and retained exits, 2000ms visible-document rotation timers, wrapped manual testimonial selection, author/counter/progress transitions, native values scrolling and pointer drag enhancement. Reduced motion shows readable text, disables parallax/photo rotation, and preserves usable controls. A reduced-motion SSR/client style mismatch caught during development was fixed with a stable motion-value DOM and CSS media override.

All five section starting positions and heights match the reference at1440×900,1920×1080,768×1024 and390×844. Full page heights match exactly:6730,7078,6777 and5319px. Typography/wrapping, mission image clipping, portrait and landscape stack geometry, carousel card dimensions and source-specific responsive spacing were measured rather than estimated. The testimonial area also matches the reference's exact section height at every viewport, including728.4375px on mobile.

Two visual passes corrected computed typography/line-height details and replaced direct CMS WebP derivatives with the exact optimized public image responses used by the source. `scripts/careers_compare.py` generates native REA screenshots, full pages, numeric geometry, half-opacity overlays and amplified differences. For static alignment only, both browsers suppress the2000ms photo interval equally and keep RAF/scroll motion active. Separate tests exercise the unmodified rotating application. Source cookie consent and announcement are dismissed in reference comparison browsers to match the owner's intended UI. Evidence is under `artifacts/reference/careers/` and `artifacts/comparison/careers/`.

## Actual checks

The final optimized build (`NEXT_DIST_DIR=.next-careers-refined npm run build`), `npm run lint` and `npm run typecheck` passed. The final production server on port3009 passed **39/39 Playwright tests in2.5minutes**, covering all existing pages and six new Careers cases. New checks cover all four reference section geometries, runtime/console errors, healthy images, responsive overflow, exact retained header links, both recruiting destinations, all nine quotes and wraparound, the measured339px desktop values step, reversible hero parallax, independent photo rotation and offscreen timer pause. Tests can be rerun with `npm test` or `npx playwright test tests/careers.spec.ts`.

## Remaining limits

Independent browsers do not share animation start times or decoder clocks, so these finite captures cannot establish equality at every frame or for every browser/gesture/width. Static screenshot differences are evidence, not a percentage of fidelity. The shared reconstructed footer retains the existing mobile tunnel/logo approximation documented in the site fidelity report; its video phase can also differ. The Careers content and motion do not introduce a screenshot/iframe implementation, generic replacement photographs or fabricated job listings.

The final static comparison is recorded in `artifacts/comparison/careers/final-comparison.json`. At1440×900, mean absolute RGB channel differences (0–255) were: hero 0.093, intro 0.054, mission 0.111, voices 0.075, values 0.054, closing 0.058. These compare the selected matched states and are not an all-frame fidelity percentage. All four full page heights and all five section start/height pairs match exactly in the final capture.

A final mobile overlay exposed balanced-title line breaks that section-height checks alone missed. The reference wraps each trailing word space in a separate span. Reproducing that nested whitespace structure corrected the values heading without changing its total height. The390px regression now asserts row groups `[0,0,0,1,1,2]` for its six words, matching the source.


Safety regression QA: the pre-existing interrupted-expansion test used a fixed 160px first-frame movement limit. Five fresh public-reference runs measured 73.71, 54.27, 209.53, 59.15, and 89.54px at first-frame elapsed 8.7, 7.6, 22.9, 9.6, and 10.9ms respectively; the unmodified reference itself exceeds that limit. The test now measures the new expanded panel's fraction of remaining width against the source's .4s cubic-bezier(.19,1,.22,1) curve with one 16.67ms cached-frame allowance and .03 numerical margin. It also requires an early sample under 80ms, further intermediate progress, and correct settled/restored expansion. No Safety implementation was changed for this test correction. Raw five-run-per-side evidence: `artifacts/reference/careers/safety-interruption-audit.json`.

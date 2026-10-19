# Careers navigation and global page transitions

## Change

Careers is restored in the header, after Company. Research and Insights remain removed from the header, and the promotional banner and cookie popup remain absent.

The reconstruction previously used ordinary Next links and some raw content anchors without the reference's global View Transition provider. Local section/entrance animations did not supply the missing route transition. The root now uses the native snapshot provider identified in fresh REA public-source evidence. Internal header/footer links, Home's Safety/Careers buttons and Company's Careers button all participate, including browser back/forward. No artificial route-loading timeout is used.

## Reference evidence and visual verification

`page-transition-source.md` records the REA evidence ID and public source hashes. `artifacts/reference/page-transitions/` contains REA native screenshots, source/CSS evidence, desktop/mobile CDP screencast frames and runtime samples of the actual native pseudo-elements. Both live viewport traces report an 800ms root animation with the same 0%, 90%, 100% clipping/transform frames.

`artifacts/comparison/page-transitions/` contains reference/local screenshots paused at exactly 200, 400 and 720ms after native transition readiness, side-by-side contact sheets, 50% overlays and full runtime keyframes. `keyframe-comparison.json` confirms equivalent root keyframes and timing at all six viewport/time combinations. The production CSS optimizer serializes the equivalent easing as `ease` and zero percentage clips as `0px`; comparisons normalize those equivalent forms only.

The 1440×900 and 390×844 contact sheets were visually reviewed. The central rounded reveal, outgoing scale/fade and separate header snapshots match. Existing differences in hero crop and independently timed background-video frames remain visible in overlays; these do not indicate different transition geometry. This does not assert pixel identity for unrelated page content or every possible browser. Native snapshot behavior depends on browser support. Reduced motion deliberately disables the root animation, and unsupported browsers retain working client navigation.

## Re-run

Start a production server on port 3010, then run:

```sh
python scripts/page_transition_inspect.py
python scripts/page_transition_compare.py
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3010 npx playwright test
```

The inspection script requires Python Playwright, Chromium, REA via npm, and the managed outbound HTTPS proxy for the reference. The comparison script requires Python Playwright and Pillow. Frame comparisons pause real browser animations rather than estimating route-fetch latency from click time.

The seven added Playwright cases cover exact desktop/mobile keyframes, same-document navigation, history, reduced motion, absent API fallback, content/footer links, same-route/hash behavior and actual modified-click new tabs. Existing responsive suites now assert four header links.

## Completed local verification

The optimized Next.js build passed. All **46 Playwright tests passed in one full run (3.2 minutes)** against the production build on port 3010, including all seven new transition cases and the existing motion, responsive, asset and interaction suites. Lint and TypeScript checks also passed. Six matched-time desktop/mobile root animation comparisons report equivalent runtime keyframes and timing.

# Animation fidelity correction

This pass replaces the previous approximate animation choreography with behavior recovered from the public reference runtime, inspected with REA 6.5.0. Playwright drives the browser because REA's passive CDP provider cannot scroll or click. Source observations are distinguished from measured browser states in the page-specific motion reports.

The original site's root Scroll component uses Lenis 1.3.14 with `lerp: .2`, `smoothWheel: true`, and `syncTouch: false`. Both Home and Company server payloads render this provider with `root: true` and no options override. The reconstruction now uses that exact version and configuration, with native scrolling when reduced motion is requested. REA source analysis: `artifacts/reference/rea/scroll-provider-analysis.json.gz`, evidence `ev_048125bc1789d99c857ddeefebf726c4ed4004b33ca9795e6ac6cc002fa9572e`.

The previous verification suite intentionally disabled motion. It verified functionality, layout and assets, but could not establish animation fidelity. The new `tests/motion.spec.ts` and `scripts/motion_compare.py` exercise normal motion, forward/backward scroll and persistent word reveals. Static image differences alone are not a reliable motion metric: videos, rotating portraits and the procedural footer can be at different phases.

Detailed implementation and evidence:

- `docs/home-motion.md`
- `docs/company-motion.md`
- `docs/safety-motion.md`
- `docs/chrome-motion.md`
- `docs/motion-validation.md`

This is a source-informed reconstruction rather than the original runtime. Matching constants and sampled states does not prove that every frame, browser, loading schedule or video phase is identical. Test outcomes and remaining differences are recorded after verification below.


## Verified release checks

- Optimized production build, ESLint and TypeScript passed.
- All 24 Playwright tests passed against the production server in 1.6 minutes, including 5 explicit normal/reduced-motion tests.
- Complete normal-motion forward scroll checks for Home, Company and Safety at 1440×900 and 390×844 found no runtime exceptions and 0px horizontal overflow. The Company map paths had active animations, and all footer text reached its final visible state. Results: `artifacts/comparison/motion/production-normal-complete.json`.
- Final overlay refinement corrected source montage tracking (−.72px desktop/−.54px mobile) and mobile 19.8px line height. Its 390px title y-position at scroll 1477 measured 468.414px against reference 468.406px. Desktop montage title y-position at scroll 1575 is 427.8px in both. Strengths copy starts at x877 in both; heading y differs by about .6px.

REA screenshots, compressed evidence envelopes, numeric timelines and overlays are retained under `artifacts/comparison/motion/`. Source-specific evidence is linked in the four motion reports. Independent video/canvas phases and interrupted native layout interpolation remain practical limits; no all-frame 1:1 guarantee is asserted.

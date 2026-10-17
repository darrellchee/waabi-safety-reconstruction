# Shared header and footer animation correction

REA 6.5.0 analyzed the captured public shared chunks `09l34yiix_nv9.js` (header/footer), `11jbb01nkl6hp.js` (canvas), with easing/color literals cross-checked in `0ln5tys141le5.js` and `0qgpligpdhtxv.js`. Evidence `ev_1665ffeca558b1b529eaad34a2f21c5711216e636191acaf40f21004aa538a22` is retained in `artifacts/reference/rea/chrome-motion-static.json.gz`.

The previous implementation omitted pointer-driven menu opening, the menu blur/scale reveal, footer entry parallax/fade, and the interactive footer background. The source observations and corresponding corrections are:

- Fine pointer enters header: open; leaves header: close. Touch/click and Escape remain supported.
- Menu container: height 0 to measured final height and opacity 0 to 1, duration 400ms, delay 150ms, easing `cubic-bezier(.19,1,.22,1)`.
- Menu contents: scale 1.1 to 1, blur 10px to 0, opacity 0 to 1 with the same timing. Exit removes the panel immediately, matching the explicit source exit duration 0.
- Header position/size changes use the source 400ms snappy layout timing. The hamburger inherits the root MotionConfig: duration400ms, ease[.19,1,.22,1]. This was confirmed in the reference serialized App Router document (Home offset582509 / Company offset582159) and by live per-frame browser measurements. It overrides Motion's library spring defaults, so no spring approximation is used.
- Footer scroll range is from its top reaching viewport bottom to its bottom reaching viewport bottom. Its surface translates from -200px to 0; text opacity stays 0 until 75% progress, then rises linearly to 1. Scroll reversal restores the same states.
- The footer logo is an ordinary static SVG in the original. The moving effect belongs to a 2D background canvas. The reconstruction now renders its actual mechanism: 250 concentric rectangles, scale factor .99, max dimensions 4.5× width / 4.2× height, color flow multiplier 5.5, per-frame time .007, and mouse smoothing .15. Colors are `#FCB3F7`, `#FF2C6B`, `#80031C`, `#977E75`. The canvas starts after the first mouse movement, renders only in view, and is enabled at 768px and above. No Three.js/WebGL dependency is needed.
- Removed invented thumbnail shrinking and social button lift/pink hover, which are absent from the public source.
- Reduced motion disables menu/position transitions, footer parallax/fade, video and canvas movement. Nested menus carry `data-lenis-prevent` for usable native scrolling.

Local browser verification at 1440×900 and 390×844 found menu final opacity 1, no residual blur, canvas visible only on desktop, footer heights 600px/654px, and Company document heights 7848px/6278px unchanged. Screenshots and metrics are under `artifacts/comparison/chrome-motion/`. TypeScript and component ESLint checks passed. Native REA reference capture and browser metrics are retained alongside the static evidence.

Native Framer Motion layout interpolation is represented with CSS/WAAPI transitions using its explicit source duration/easing where provided. The hamburger uses the actual inherited 400ms easing. Frame-based canvas phase depends on when the footer first enters view, as on the reference, so independent sessions need not show the same instantaneous colors.

A live reference browser confirmed the desktop menu bounds exactly: x551, y141, width338, height438.796875 at1440×900. Native REA screenshot evidence `ev_65e2993a78941e99710cf79f8eb06da56498a989f82e718cc84c1026467cd292` is saved as `chrome-footer-capture.json.gz` / `chrome-footer-reference.png`; computed metrics are `chrome-motion-browser.json`. Footer composition and rectangle perspective agree visually; frame phase is intentionally not asserted pixel-identical.

Follow-up: `artifacts/comparison/chrome-motion/hamburger-spring.json` contains raw requestAnimationFrame samples. The filename reflects the hypothesis being tested; reference samples showed a monotonic easing with no spring overshoot. Root MotionConfig explicitly supplies `{duration:0.4,ease:[0.19,1,0.22,1],reducedMotion:"user"}`. The reconstruction uses those values.

The announcement now also preserves its source -100% to0 entrance and0 to-100% exit over400ms with the root easing; DOM removal waits for the exit. Header position updates start concurrently.

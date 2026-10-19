# Page navigation transition: fresh REA source inspection

Fresh inspection of `https://waabi.ai/careers` used official REA `rea-agents@6.5.0 inspect-web-page --include-script-sources`, attached to Chromium CDP. REA evidence: `ev_a43b7b41c3531a760007af41692358482599adb44f633f8b2c32a001e1973993`. Full evidence, computed CSSOM, DOM and relevant public source bundles are in `artifacts/reference/page-transitions/`.

## Mechanism

The reference uses the browser View Transition API, with a `next-view-transitions`-style `ViewTransitions` provider and `Link`/`useTransitionRouter` exports (public chunk `0ln5tys141le5.js`, source SHA-256 `faac7ff4b3adab8d55c54bf9706d70c61f03c4ae63fdd19c70744a6fc51a44a6`, source module 96348). An internal navigation captures the old route via `document.startViewTransition()`, performs the Next navigation in `React.startTransition`, then resolves its callback promise when the new route has committed. This keeps the old snapshot until the destination exists; it does not run an independent arbitrary loading timeout.

The provider also installs a `popstate` listener: browser back/forward transitions wait for the changed pathname to commit. Unsupported browsers receive normal Next navigation. The document CSS includes `@view-transition { navigation: auto; }`, enabling the same keyframes for supported same-origin document navigations. It does not create a first-load reveal by itself.

The custom site Link (module 99084) adds same-route checks, hash navigation through Lenis with offset -100, external-link target handling, and hover-triggered prefetch. An array of transition-disabled route pairs exists but is empty in this capture. Regular internal clicks therefore use the root transition. External links are separate navigation. Destination scrolling uses Next’s normal `scroll` option, rather than an extra scroll tween.

## Exact visual settings

The live DOM sets `<html style="--duration:0.4">`. The transition CSS doubles that value: **800 ms**, with **`cubic-bezier(.25,.1,.25,1)`**, `animation-fill-mode: both`.

- `::view-transition-group(root)` and `::view-transition-image-pair(root)` use background **`#191818`**.
- The **outgoing** root animates opacity **1 → 0.5**, and the independent CSS `scale` property **1 → 1.1**.
- The **incoming** root starts with `clip-path: inset(50% round 12px)` and `transform: scale3d(1.1,1.1,1.1)`. At **90%** it reaches `clip-path: inset(0% round 12px)` and `transform: scale(1)`. At **100%** the clipping becomes `inset(0%)`, removing the residual corner rounding.
- `.css-header` has `view-transition-name: header`. The header is therefore its own native snapshot group, separate from the scaling/clipping root. Its CSS also sets `animation-duration` to the doubled duration; no custom header pseudo-element keyframes are present in the captured CSS.
- These custom root/header rules are enclosed in `@media not all and (prefers-reduced-motion: reduce)`. Reduced-motion users do not receive the scale/clip transition. Browser-default view-transition behavior is separate from the custom motion.

```css
@keyframes css-page-out {
  0% { opacity: 1; scale: 1; }
  100% { opacity: .5; scale: 1.1; }
}
@keyframes css-page-in {
  0% { clip-path: inset(50% round 12px); transform: scale3d(1.1,1.1,1.1); }
  90% { clip-path: inset(0% round 12px); transform: scale(1); }
  100% { clip-path: inset(0%); transform: scale(1); }
}
```

## Evidence and limits

`fresh-inspection.json.gz` is the full fresh REA envelope. `source-22.js.gz` contains the actual transition provider and shared Link. `source-index.json` records URL/hash mappings. `dom.html.gz` records the inline duration. `stylesheets.json` and compressed `style-*.css.gz` record the CSSOM, including the root transition rules and keyframes. No authenticated or nonpublic resources were used.

This source inspection identifies animation geometry and duration exactly. Wall-clock route-fetch latency is variable and is intentionally outside the 800 ms visual animation; browser traces and screenshots should be measured relative to the native transition’s ready time, not the initial click.

# Implementation notes

Next.js15 App Router renders `/safety`; the root route uses Next’s redirect. React19 and TypeScript implement local UI state. No backend, authentication, analytics, deployment or unrelated routes are required.

`components/SafetyPage.tsx` contains typed content arrays and the page sections. `components/SiteChrome.tsx` owns global navigation, footer and cookie preferences. Styles are in `app/globals.css` and `components/chrome.css`. Original public media is served locally from `public/assets`; its manifest records source URLs. Native images avoid network dependencies and preserve image cropping.

## Motion and interaction

- Hero entrance uses CSS animation; reduced motion removes animation.
- Philosophy uses native sticky positioning and a passive scroll listener batched through requestAnimationFrame. It selects the active story, counter and crossfaded image in either scroll direction. On mobile a native scroll-snap rail selects the image/counter as cards move.
- Technology uses flex expansion and height transitions, selected on desktop hover or mobile click. Real links cover active image panels. Separate keyboard buttons expose `aria-expanded`.
- Practices uses a bounded index and translated flex track with touch swipe and labeled previous/next buttons.
- Insights uses native overflow and scroll snapping. Buttons call scrollBy; article links use exact observed destinations.
- Menus support outside click, Escape, focus management and keyboard access. Cookie preferences are localStorage-only and never sent to a server.

CSS replaces heavyweight animation/3D dependencies where equivalent layout and interactions are practical. Footer video supplies the original animated tunnel. Reduced-motion users see its pink fallback and no entrance/transition animation. Exact original per-word reveal orchestration and canvas logo treatment remain approximations, as documented in the fidelity report.

Responsive rules preserve the measured mobile, tablet and desktop typography and proportions. Later CSS corrections are annotated with their evidence source. `NEXT_DIST_DIR` optionally isolates production builds from the active dev server. Playwright runs in installed Chromium; tests cover responsive overflow, interactions, persistent consent, assets and runtime errors.

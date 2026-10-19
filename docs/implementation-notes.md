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

## Home and Company extension

The root now renders `HomePage`; `/company` renders `CompanyPage`. Route metadata, shared header labels, logo navigation and footer links cover all three local routes. Insights content is shared in `insights-data.ts` while page-specific classes keep Home and Company styling isolated.

Home combines local films and extracted poster frames, viewport-aware playback, native sticky sections, three product strengths, article links, four original partner quotes with a 10-second rotation, a snapping Insights rail and a careers collage. The timer pauses for hover/focus and reduced motion. Company contains scroll-linked text coloring and portrait movement, original investor logos, news/events rails and focus/touch/pointer office details on the original SVG map. Both use the original fonts and media. The shared footer now follows the measured tablet/mobile stacked layout and source dimensions.

`tests/pages.spec.ts` supplements the Safety regression suite. `PLAYWRIGHT_BASE_URL` selects a running production build; `PLAYWRIGHT_PROXY` and `PLAYWRIGHT_IGNORE_HTTPS_ERRORS` are optional browser-test settings for this managed environment's outbound proxy and CA handling. They are not application configuration.

## Motion refinement

The subsequent source-informed animation pass is documented in `animation-refinement.md`. Root wheel scrolling now uses the reference's exact Lenis 1.3.14 configuration. Page-specific word reveals, scroll transforms, timed portrait buffers, native snap rails and the footer canvas are implemented with React, CSS, requestAnimationFrame and Web Animations. The shared root timing is 400ms cubic-bezier(.19,1,.22,1); explicit component timings override it. Reduced-motion users receive visible text and stationary media rather than delayed hidden content. No WebGL rendering is needed: the reference footer effect is a 2D canvas.


## Careers route

`app/careers/page.tsx` renders `CareersPage.tsx`. The complete content is in `careers-data.json`; assets and public source hashes are recorded separately. `CareersVoices.tsx` owns wrapped testimonial selection and its presence/layout/word/author/counter animations. `CareersPhotoStack.tsx` implements the source's shared portrait/landscape layout-projection slideshow, including visible-document timers and retained outgoing crops. `CareersPage.tsx` owns hero and mission parallax, per-word reveals, the values rail and the recruiting CTAs. The rail reuses the existing source-derived `useCarouselMotion` hook. All styles use distinct Careers names and avoid changing existing page layouts. Original public optimized raster files are isolated under `/assets/careers/`.

The shared header remains limited to Home, Safety and Company and the removed promotional/cookie UI stays absent. Existing recruiting links and the footer now lead to local `/careers`. Both in-page recruiting CTAs retain the external public Lever destination. No recruitment backend or application form is invented.

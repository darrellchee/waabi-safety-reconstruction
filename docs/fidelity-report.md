Current update: Careers is in the four-link header, and the global route transition has been restored from fresh REA source and runtime evidence. See [page-transition-validation.md](page-transition-validation.md) for matched-frame desktop/mobile comparisons and current verification. The initial release notes below are historical.

# Fidelity report

This records the initial Safety-only release. Home now renders at `/`, and `/company` has been added. See `pages-qa.md` and the Home/Company fidelity reports for the current three-page verification.

## Delivered

The complete `/safety` page is implemented with the original public photos, logo, fonts and footer video. Layout covers all four requested viewport sizes. Menus, cookie preferences, technology accordion, philosophy sequence, practices slider, insight navigation and hover states work. The root redirects locally to `/safety`.

REA6.5.0 was installed and actually used for live CDP inspection, native screenshots and public JavaScript analysis. Following the user's clarification, it was the primary tool for later source/layout inspection. Playwright remains the interaction driver and test/screenshot tool because REA's passive browser provider cannot scroll/click or compute CSS. Evidence is retained in `artifacts/reference/rea/` and explained in `docs/rea-analysis.md`.

## Refinement performed

Multiple implementation/capture passes corrected the initial mobile stacked-story assumption, desktop technology widths, hover activation, mobile panel heights, mobile typography/gutters, stats spacing, carousel bounds, original destination URLs and the1234px content cap at1920px. Desktop page length was brought from roughly8704px to within a few pixels of the8554px reference at1440×900 before final media-state comparisons. Mobile was refined using actual section geometry rather than proportional scaling.

Final viewport screenshots, selected scrolled desktop screenshots, 50% opacity overlays and RGB differences are in `artifacts/comparison/`. `results.json` records final section positions and raw image errors. `scripts/validate_visuals.py` regenerates local comparisons. Pixel errors include independently timed video frames, lazy reveals, viewport resize state and cookie UI differences; they are not a measured percentage of fidelity.

## Remaining differences

- Shared original per-word and clipped scroll entrance sequences are not reproduced exactly. The prototype uses a simpler hero entrance, sticky positioning, active-story opacity and image crossfades. Exact smooth-scroll inertia, parallax and intermediate animation timing differ.
- Footer uses the original animated tunnel video and static brand SVG. The original canvas logo treatment and mobile tunnel effect are approximated. The public mobile tunnel URL returns a Git LFS pointer rather than playable media; the valid desktop video is reused responsively.
- Responsive text wrapping, tablet technology image crops/letterboxing, story counter positioning and some section/footer heights can differ. Initial reference captures resized a shared browser context; later REA and fresh mobile measurements were used to resolve major discrepancies.
- Cookie notice/preferences are a local reproduction, not the original consent provider. No consent or analytics is sent externally.
- Public images were downloaded as2000px WebP variants rather than all original full-resolution files. Assets are local; no main section uses stock replacement art, an embedded target page or a screenshot as implementation.
- External links use destinations observed in the source but were not all followed in automated tests. Other Waabi pages are outside reconstruction scope.

## Verification

`npm install`, development startup, lint, TypeScript and production build succeeded. The final production application was started on port3003 and its full Playwright suite passed **8/8 in15.8seconds**, including all four viewport overflow checks, assets/runtime errors, keyboard/menu behavior, panel controls, carousel boundaries and cookie persistence. Detailed coverage is in `docs/qa-results.md`.

No connected repository or remote was present. A local Git repository and working branch were created for the deliverable; no PR can be opened without a remote. Nothing was externally deployed or published. This is a private educational prototype, not an official Waabi service.

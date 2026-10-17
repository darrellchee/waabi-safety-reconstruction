# QA results

This records the initial Safety-only release. Home now renders at `/`, and `/company` has been added. See `pages-qa.md` and the Home/Company fidelity reports for the current three-page verification.

Environment: Codex Cloud, Node.js, Next.js 15.5.28, system Chromium `/usr/bin/chromium`. Local application URL: `http://127.0.0.1:3000/safety`. Tests run with reduced motion to make state assertions deterministic.

## Verified commands

- `npm install --ignore-scripts`: succeeded; installed four missing optional packages. The repository uses no custom install scripts.
- `npm run dev`: running successfully on port 3000 and serving the page.
- `npm run lint`: passed after excluding Next-generated type declaration files and build folders from ESLint.
- `npm run typecheck`: passed.
- `NEXT_DIST_DIR=.next-build npm run build`: passed. Static routes include `/`, `/safety`, and Next's not-found page. The isolated build folder avoids invalidating a running development server.
- `npm test`: **8 passed in 20.3 seconds** on the development server.

## Browser coverage

The eight Playwright tests verify:

1. `/` redirects to `/safety`; hero, five main sections, and footer navigation exist; all image assets load; no page exceptions or failed local HTTP responses during initial loading.
2. Global navigation opens; Safety resolves locally; Escape closes it and returns keyboard focus to the menu toggle.
3. Technology panels expand with keyboard Enter, maintaining the correct expanded state. Safety practices advance, reverse, and remain on the final slide when Next is pressed again.
4. Cookie preferences open, save an analytics selection, dismiss the notice, and persist through reload.
5. Desktop 1440×900: menu usable; no document horizontal overflow at top or footer.
6. Desktop 1920×1080: same checks.
7. Tablet 768×1024: same checks.
8. Mobile 390×844: same checks.

Tests are in `tests/safety.spec.ts`. HTML results are written to `artifacts/playwright-report/`. Failed tests retain screenshots and traces in `artifacts/test-results/`. The final successful run has no failure traces.

## Rerun

```sh
npm install
npm test
npm run lint
npm run typecheck
npm run build
```

Playwright starts a dev server automatically if none is running. Set `CHROMIUM_PATH` to use another existing browser executable. For an already running production server, set `PLAYWRIGHT_BASE_URL`, for example `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001 npm test`.

## Limits

These are functional smoke tests and asset checks, not a claim of pixel-identical rendering. Reference/local screenshots and visual comparison evidence are described separately in the fidelity report. External Waabi links are preserved as destinations and are not navigated during automated tests.

## Final production confirmation

After the final build, a fresh isolated production process was started with `NEXT_DIST_DIR=.next-build npm start -- --port 3002`. `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3002 npm test` passed **8/8 in15.8seconds**. Screenshots were also regenerated against this fresh process, avoiding stale asset hashes from a previously running build.

After final overlay corrections, `NEXT_DIST_DIR=.next-final npm run build` passed. A fresh server on port3003 passed all8 tests in15.8seconds; final lint and typecheck also passed.

# Home, Company and Safety release verification

The final source was built with `NEXT_DIST_DIR=.next-release npm run build`, then started with `NEXT_DIST_DIR=.next-release npm start -- --port 3005`. The isolated output prevents the production build from invalidating the development server.

Verified commands:

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `git diff --check`: passed.
- `NEXT_DIST_DIR=.next-release npm run build`: passed. Home, Company and Safety are prerendered static routes.
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3005 npm test`: **19 passed in 42.9 seconds** against the production build.

Coverage includes all four requested viewports for Home, Company and Safety, full-page scrolling with no horizontal overflow, loaded images and local HTTP errors, runtime exceptions, local navigation across all three routes, keyboard/Escape menu behavior, Home strengths and partner selection, original technology article destinations, bidirectional insight/news controls, Company scroll action and keyboard office details, Safety panel/slider controls and consent persistence.

The suite uses reduced motion for deterministic assertions. Native REA captures and normal-motion Playwright visual passes cover the separate animation and media appearance review. Final screenshots and geometry are in `artifacts/comparison/`, with a dedicated `release-layouts.json` from `scripts/release_capture.py`. Earlier reference and iteration captures are retained alongside final captures. Video frames, marquee phases and scroll choreography are not pixel-identical; see the page fidelity reports for those limits.

No external forms are submitted and no emails are sent by these tests. External links are checked as destinations, not used to contact third parties. Live deployment verification is performed after the GitHub push and Vercel build.

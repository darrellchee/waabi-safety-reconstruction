# Waabi Safety — educational reconstruction

A standalone Next.js App Router / React / TypeScript reconstruction of https://waabi.ai/safety. This private educational prototype is not an official Waabi product. Original trademarks, fonts and media remain their owners’ property; no redistribution license is asserted.

## Run locally

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000/safety. `/` redirects to `/safety`.

```bash
npm run build
npm start
npm run lint
npm run typecheck
npm test
```

Playwright uses `/usr/bin/chromium` by default; set `CHROMIUM_PATH` to an installed Chromium executable. Alternatively install Chromium with `npx playwright install chromium` and use its executable path. Tests start a dev server unless one already exists; `PLAYWRIGHT_BASE_URL` can select an existing server. See `docs/qa-results.md` for the commands actually verified.

## Included

- Complete hero, statistics, safety philosophy, technology accordion, practices slider, nine insight cards and footer.
- Desktop sticky story and mobile swipeable story, hover/tap technology panels, bounded practices carousel, horizontally scrollable insights.
- Responsive global navigation, original brand/media/font assets, cookie preference UI, keyboard controls and reduced motion.
- All non-Safety routes and article links lead to their known official public destinations. The prototype sends no analytics or cookie preference data.

## Evidence and validation

REA 6.5.0 inspected the live page through CDP and analyzed public JavaScript. Playwright supplemented interaction driving/computed measurements and provides automated QA. REA does not require MCP registration to rerun its CLI commands. See `docs/rea-analysis.md` and `docs/reference-analysis.md`.

Screenshots: `artifacts/reference/` and `artifacts/comparison/`. Rerun local screenshot comparison with `python scripts/validate_visuals.py` after starting the server (Python Playwright and Pillow required). Reference captures require network access through the environment proxy. `scripts/download-assets.py` records public asset provenance.

See `docs/implementation-notes.md` and `docs/fidelity-report.md` for architecture and remaining differences. No external deployment is included.

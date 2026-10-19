# Waabi — educational reconstruction

A standalone Next.js App Router / React / TypeScript reconstruction of Waabi’s Home, Safety, Company, and Careers pages. This private educational prototype is not an official Waabi product. Original trademarks, fonts and media remain their owners’ property; no redistribution license is asserted.

## Run locally

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000/ for Home, `/safety` for Safety, `/company` for Company, or `/careers` for Careers. Shared navigation connects the local pages.

```bash
npm run build
npm start
npm run lint
npm run typecheck
npm test
```

Playwright uses `/usr/bin/chromium` by default; set `CHROMIUM_PATH` to an installed Chromium executable. Alternatively install Chromium with `npx playwright install chromium` and use its executable path. Tests start a dev server unless one already exists; `PLAYWRIGHT_BASE_URL` can select an existing server. See `docs/qa-results.md` for the commands actually verified.

## Included

- Complete Home, Safety, Company, and Careers pages with original photography, video, typography, shared navigation and footer.
- Home video hero, collage, product strengths, technology panels, safety showcase, partners, insights and careers.
- Company founder story, team, investors, latest news, events and locations map.
- Safety statistics, philosophy, technology accordion and practices slider.
- Desktop sticky story and mobile swipeable story, hover/tap technology panels, bounded practices carousel, horizontally scrollable insights.
- Responsive global navigation, original brand/media/font assets, keyboard controls and reduced motion.
- Routes outside Home, Safety, Company, and Careers and article links lead to their known official public destinations. The prototype sends no analytics.

The header menu contains Home, Safety, and Company. Careers is available through the Home/Company recruiting links and footer at `/careers`. The promotional announcement and cookie consent UI were removed at the owner's request.

## Evidence and validation

REA 6.5.0 inspected the live page through CDP and analyzed public JavaScript. Playwright supplemented interaction driving/computed measurements and provides automated QA. REA does not require MCP registration to rerun its CLI commands. See `docs/rea-analysis.md` and `docs/reference-analysis.md`.

Screenshots: `artifacts/reference/` and `artifacts/comparison/`. Rerun local screenshot comparison with `python scripts/validate_visuals.py` after starting the server (Python Playwright and Pillow required). Reference captures require network access through the environment proxy. `scripts/download-assets.py` records public asset provenance.

See `docs/implementation-notes.md` and `docs/fidelity-report.md` for architecture and remaining differences. The project is deployed through the connected Vercel project `waabi-safety-reconstruction`; production is https://waabi-safety-reconstruction.vercel.app/.

Animation refinement and normal-motion verification: `docs/animation-refinement.md` and `docs/motion-validation.md`. Rerun motion checks with `npx playwright test tests/motion.spec.ts`; normal motion is enabled explicitly for those tests.

New page inspection and fidelity evidence: `docs/home-reference-analysis.md`, `docs/home-fidelity.md`, `docs/company-reference-analysis.md`, `docs/company-fidelity.md`, and `docs/pages-qa.md`.


The second measured motion pass uses Motion primitives for source spring/layout/presence behavior and a shared pointer-drag carousel hook. Current evidence and measured regression checks: `docs/home-motion-round2.md`, `docs/safety-motion-round2.md`, and `docs/motion-round2-validation.md`. Run `npx playwright test tests/motion-round2.spec.ts` for source-coordinate, transient, playback and drag checks.

The latest optimized-build verification passed all 39 Playwright cases, lint and TypeScript checks. Careers adds six cases covering source geometry, assets, testimonials, values, parallax and photo lifecycle; responsive checks also assert the three-link header and absence of both popups. See `docs/motion-round2-validation.md` for measurements, corrected defects and the limits of independently timed animation comparisons.

Careers inspection, source motion details, original asset provenance and responsive comparisons: `docs/careers-reference-analysis.md`, `docs/careers-motion-analysis.md`, `docs/careers-assets.md`, and `docs/careers-fidelity.md`. Run `npx playwright test tests/careers.spec.ts` for Careers geometry, assets, controls, parallax and slideshow lifecycle.

# Reverse Engineer Anything inspection

Official REA served as the primary tool for the later reverse-engineering inspection of the live target and captured public JavaScript, without installing an MCP registration or restarting the session. The npm package was `rea-agents@6.5.0`; its npm repository metadata identifies `https://github.com/morluto/rea.git`. The CLI reported `6.5.0`.

## Executed commands

Run from the project directory:

```bash
npm view rea-agents version bin repository --json
npm exec --yes --package=rea-agents@6.5.0 -- rea --help
npm exec --yes --package=rea-agents@6.5.0 -- rea --version
npm exec --yes --package=rea-agents@6.5.0 -- rea inspect-web-page --help
npm exec --yes --package=rea-agents@6.5.0 -- rea analyze-javascript-application --help
python scripts/rea_browser.py
```

`rea_browser.py` loads the live page in a separate disposable Chromium profile with loopback-only CDP port 9223. In another terminal, these commands were executed against that browser:

```bash
npm exec --yes --package=rea-agents@6.5.0 -- rea list-browser-targets http://127.0.0.1:9223 --format json
npm exec --yes --package=rea-agents@6.5.0 -- rea inspect-web-page http://127.0.0.1:9223 9B0113921E5AD1DBCCE4A547B340A687 --observation-ms 1500 --include-accessibility-text --include-console-text --include-script-sources --format json
npm exec --yes --package=rea-agents@6.5.0 -- rea capture-web-screenshot http://127.0.0.1:9223 9B0113921E5AD1DBCCE4A547B340A687 --format json
npm exec --yes --package=rea-agents@6.5.0 -- rea analyze-javascript-application artifacts/reference/js --source-path '0nqb4gsffynqw.js' --source-path '0-vu8s34k5js5.js' --max-semantic-nodes 12000 --max-semantic-nodes-per-file 6000 --analysis-timeout-ms 60000 --format json
```

Target IDs change when the browser restarts; obtain the current ID from `list-browser-targets`. Standard output from these commands is retained under `artifacts/reference/rea/`. The three large authenticated output envelopes are gzip-compressed without alteration. `scripts/summarize_rea.py` extracted `rea-desktop-1440.png` from REA's actual screenshot artifact and created the readable `summary.json`.

## Results

- Live inspection evidence: `ev_b38027663bfac4aa97a0ee239b6e40a02c88fe1c9340f1bbbdef4d99c2daa92b`.
- Browser: Chrome 154.0.8037.57, live URL `https://waabi.ai/safety`, 1440×900 viewport.
- Captured 783 DOM nodes, 795 accessibility nodes, 33 scripts and 20 allowed-origin resources.
- Static analysis evidence: `ev_0f2166f6b0fd13df5c2d88d7d97ecf96c5b0d1145d5089f878c49892ab7716e5`.
- Static inventory: 17 JavaScript files; two explicitly selected for semantic analysis. REA parsed 22,451 AST nodes across the two sources, with zero parse failures.
- Exact fonts in the browser resource evidence match the locally downloaded Zagma and Neue Haas files.

`interaction-excerpts.json` contains source hashes, URLs, offsets and literal code excerpts selected from JavaScript source returned by REA's live CDP capture. These excerpts corroborate:

- Technology panels activate on mouse enter. Their desktop height is 720px and inactive width is 15.7%; active mobile height is 600px and inactive mobile height is 112px.
- The shared paragraph reveal uses a default 0.07-second word stagger, 0.1-second linear opacity transitions, and one-time in-view triggering.
- Shared clipped card reveals use a 0.6-second cubic ease and 0.15-second index stagger.
- Insights image hover uses a scale of 1.2 and a 500ms CSS transition.
- A shared testimonial component has a 10-second progress ring. This is a generic shared-code capability, not proof that the Safety page uses timed testimonial rotation.

These findings supplement the direct Playwright interaction observations. Shared components included in a loaded bundle are not automatically treated as page behavior.

## Evidence limitations

REA's passive CDP provider does not click, scroll or run arbitrary JavaScript; Playwright drove the separate interaction and scrolling captures. Live inspection coverage was `policy_filtered`, with attach-limited network and console history. External-origin resources were intentionally filtered by the default exact-origin policy. Earlier network events are unavailable; omitted events do not prove they never occurred.

The static analysis was intentionally scoped to two page/shared chunks; relationships through the other 15 inventoried files remain unknown. Bundles were parsed as inert syntax, not executed. Timings above are literal public-source observations cross-checked against browser behavior where relevant; REA does not certify visual equivalence or complete application semantics.

Official workflow references read during this run: [browser observation](https://github.com/morluto/rea/blob/main/docs/browser-observation.md), [CLI guide](https://github.com/morluto/rea/blob/main/docs/cli.md), and [JavaScript application workflows](https://github.com/morluto/rea/blob/main/docs/javascript-application-workflows.md).

## Follow-up responsive layout evidence

`python scripts/rea_layout_inspection.py` used REA `capture-web-screenshot` as the primary capture surface for statistics and philosophy at 1440×900, 1920×1080 and 768×1024. Six `layout-*.png` files and their original gzip-compressed REA envelopes are retained. Fresh-profile screenshots include the reference consent notice. Playwright only positioned the caller-owned browser and supplied the computed CSS fallback in `layout-metrics.json`, since REA's passive API does not expose computed styles.

| Measurement | 1440 | 1920 | 768 |
| --- | ---: | ---: | ---: |
| Statistics content left inset | 103 | 343 | 54.94 |
| Statistics heading width | 546.98 | 547 | 658.13 |
| Statistics section height | 957 | 957 | 1005 |
| Philosophy heading width | 525 | 525 | 525 |
| Philosophy top padding | 180 | 180 | 90 |
| Philosophy section height | 2674 | 3034 | 2832 |

All three widths use Zagma 80px with 72px line height for those two main headings; both headings occupy 144px of height. Desktop statistics content is capped at 1234px. Philosophy subsection titles use Zagma 40px/44px and a maximum width of 290px; at 768px the available title width is 188.25px and each measured title occupies three lines. Heights are scroll-stage dependent and should be considered together with the captured viewport dimensions.

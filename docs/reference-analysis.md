# Reference analysis

Target: https://waabi.ai/safety, inspected October 16, 2026. Content reflects that date, including October 2026 insights. Full-page and scrolled screenshots exist for 1440×900, 1920×1080, 768×1024 and 390×844 under `artifacts/reference/`.

## Method and evidence

Initial discovery used Chromium/Playwright, HTML and public asset URLs. At the user's request, official **REA 6.5.0 became the primary later inspection tool**, with actual live CDP DOM, accessibility, script-source and screenshot captures plus static JavaScript analysis. Native REA screenshots and evidence envelopes are under `artifacts/reference/rea/`. Commands, evidence IDs, capabilities and limitations are in [rea-analysis.md](rea-analysis.md). Playwright drives interactions/scrolling and supplies computed CSS because REA’s passive provider does not expose those operations. No access controls were bypassed.

Reference screenshots were taken after fonts and media initialized and after scrolling through the page. Lazy reveals and viewport resize state can still affect full-page captures; sectional screenshots are the stronger evidence for revealed content. `dom.json`, `mobile-metrics.json`, `interactions.json`, and REA layout metrics preserve measurements.

## Design

- White background, dark #191818 typography, warm cream philosophy section, vivid pink controls and tunnel footer.
- Original Zagma Book serif, Book Italic, and Neue Haas Grotesk Medium fonts are public resources and locally mirrored.
- Main desktop content caps at 1234px: x103 at 1440 and x343 at 1920. Tablet uses proportional gutters; mobile content gutters40px. Technology cards use24px gutters/gaps.
- Hero uses the original overhead truck photograph with a directional black gradient and large, two-line heading. Desktop font clamps90–130px; mobile55px/49.5px. Fixed42px announcement and centered338×55px navigation.
- Desktop section headings80px/72px, tracking−3.2px; mobile34px/30.6px. Desktop statistics200px/170px, mobile72px/61.2px.

## Structure and behavior

1. Full viewport photograph hero; fixed announcement and floating menu.
2. “The stakes are real and rising.” introduction and three bordered statistics:39,345,5,472,87%.
3. Cream philosophy: centered heading, explanatory copy, pink progress line, three numbered stories and original photographs. Desktop text moves past sticky image and counter; mobile has square image and horizontally swipeable cards.
4. Technology heading/copy/link and three expanding image panels. Desktop hover selects a panel; mobile tap selects it. Active desktop panel is approximately1023×720px at1440; inactive161px. Mobile active600px, inactive112px high. Active panels link to corresponding articles.
5. Four full viewport practices slides with original photography, overlaid copy and Previous/Next controls. The slider clamps at its first and last slides.
6. Insights: introduction, View all, nine horizontally scrollable article cards, desktop arrows, image hover enlargement and text color change.
7. Pink tunnel video footer with contact emails, navigation, social links, legal links and oversized white Waabi logo. The source uses a canvas brand effect; its appearance does not require interactive3D for this prototype.
8. Cookie notice440px desktop/viewport−20px mobile, with reject/accept/customize behavior.

REA source evidence found paragraph opacity reveals with0.07s word stagger and0.1s transitions, plus shared clipped card reveals with0.6s easing and0.15s index stagger. These shared-source findings are distinguished from directly observed page behavior in the REA report.

No page-specific interactive WebGL scene was observed. Exact private implementation details are not inferred from unrelated bundled components. Additional interaction evidence: [reference-interactions.md](reference-interactions.md). Public asset map and inaccessible mobile tunnel resource: [asset-inventory.md](asset-inventory.md).

## Additional routes

Home and Company evidence, original media, page-specific measurements and refinement reports are documented in `home-reference-analysis.md`, `home-fidelity.md`, `company-reference-analysis.md`, and `company-fidelity.md`. REA native captures remain the primary inspection evidence for those routes; Playwright supplements interaction and computed-style measurement.

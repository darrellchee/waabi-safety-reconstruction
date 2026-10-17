# Company fidelity review

> Historical layout review. The animation approximations described below were subsequently replaced; see [animation refinement](animation-refinement.md) and the page-specific motion report for current behavior and verification.

Two local visual passes were made against the native reference screenshots, using Chromium for local screenshots and computed layout measurements. The comparison includes 1440px, 1920px, 768px and 390px layouts. Evidence and repeatable capture script: `artifacts/reference/company/`, `artifacts/comparison/company/`, and `scripts/company_compare.py`.

The refinement corrects the tablet story width and section height, tablet people columns, desktop portrait alignment, balanced heading/copy wrapping, mobile line heights, investor logo dimensions, news pill sizes and spacing, event spacing and type, quote image framing/scroll movement, and map copy alignment. News/event hover titles and touch/keyboard office details are implemented.

The final saved desktop/tablet measurements match all seven content section start positions at 1440px, 1920px and 768px. The final 390px capture also matches all seven section starts to subpixel precision. Total document height still differs where the separately managed shared footer joins the page. Local captures load the original assets without broken images or horizontal document overflow.

Remaining differences: the reference's scroll-driven word coloring and portrait/image transitions depend on capture timing; the reconstruction uses a lightweight scroll approximation. The investor marquee phase varies with elapsed time. The map retains source geography and markers but does not reproduce every geographic overlay transition from the source implementation. News/event carousels use native scrolling rather than the source carousel engine. The parent review also corrected the source’s 40px tablet/desktop bottom padding and measured shared footer geometry: 600px desktop, about 723px tablet and 654px mobile. This is a visual reconstruction, not a pixel-identical implementation of the original runtime.

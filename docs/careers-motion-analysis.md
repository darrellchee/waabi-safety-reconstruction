# Careers motion and control analysis

Fresh public-page inspection of <https://waabi.ai/careers>, using REA 6.5.0 as the primary inspection tool. REA `inspect-web-page --include-script-sources` CDP envelope is saved as `artifacts/reference/careers/rea-source.json.gz`; public client chunks are saved as `source-00.js.gz` through `source-17.js.gz`, with URL order in `controls-source.json`. Playwright drives ordinary clicks/scrolls because REA's attached passive CDP inspection does not drive user input. REA screenshots after actual clicks are `control-0-next.png` and `control-1-next.png`.

## Mechanisms read from the public modules

- Shared Motion config (source06/module30397): duration **0.4s**, ease **[.19,1,.22,1]**, including layout projection. Quart config **[.77,0,.175,1]**.
- Careers hero (source12/module29924): full viewport background media; `useParallax` target offsets `start end`/`end start`, transform **-12% to +12%**, with left black60% gradient. Text stack sticky on desktop, top120px. Down button calls smooth `scrollTo` to viewport height. This is the generic Hero used for Careers, not Home's opposing-title hero.
- Titles (source12/module29229): each word starts x20px/opacity0, ends x0/opacity1, shared .4s snappy easing and .07s stagger. Each explicit literal `\n` line resets word index and adds lineIndex*.07s. Each individual word observes viewport once. Regular h1: mobile55px, desktop `max(90px,min(9vw,130px))`, line-height90%.
- Paragraphs (source13/module56131): per-word opacity default .1 to1, **.1s linear**, stagger default .07; individual word in-view once. Testimonial explicitly overrides opacity0 and stagger.03 and animates on mount rather than in-view.
- Rotating photo pairs (source12/module93757): actual Motion `layout` at **.8s quart**, retained `AnimatePresence` exits. New crop x100%→0%, inner image scale1.5→1, outgoing crop scale.5 and x20. Timer **2000ms**, enabled only while the image group is in-view AND document visible. Does not stop merely because a pointer hovers. Initial `AnimatePresence initial=false`. The list contains visible slot count+2 records (four records for this two-photo variant), cycling those keys, irrespective of how many source records exist.
- Large team image (source13/module69139 ImageText): image transform uses the same ±12% scroll parallax. Desktop clip h860px; mobile h600px. No generic card replacement or fake 3D renderer.
- Voices (source13/module80213 Testimonial): **manual** wrapped selection (9 quotes), no automatic quote advance. Photo-pair timer is independent of quote selection. Wrapper and quote/author stacks use layout projection. Review fades with shared .4s config, words .1s linear with .03s stagger. Author group begins at .4s; name x10→0 begins .4s; title x10→0 begins .5s. Their exits have opacity0 without entry delay. Counter uses `AnimatePresence mode=popLayout initial=false`, y120%→0→-120%, spring **stiffness140,damping22**. Progress line spring140/22 maps current index0..8 to scaleX0..1, resets on wrap.
- Values (source13/module2463 TextCarousel): native horizontal scroll with Blossom pointer enhancement. Shared source14/module80315 Carousel computes step from first child's width plus integer parsed gap, then native smooth scrollTo(left±step). No repeat. Desktop cards215px, mobile245px; gap40px below1024; desktop larger gap `(min(1234px,1234/1440*100vw)-215*4)/3`. At1440,124.66px computed gap is parsed124 and step339px. Mobile and desktop arrow groups are separate CSS-visibility copies.
- Round arrows (source12/module22635): 1.05 hover scale, .95 tap scale; pink hover fill, transparent border, white arrow. Desktop50px circles, mobile32px. Pink CTA links scale same values; external HTTP links open a new tab.
- The final career CTA has no carousel, tabs, or map controls in the rendered page. Generic BenefitsModule/FullBleedSlider code is bundled but **not instantiated** here.

## Observed click results

`controls-observed.json` records actual text and scroll outcomes. Voices Next changes Sahil Jain, Software Developer II/Sensor Simulation (1/9) to Jaime Villalta, Senior Test Engineer (2/9). Values Next lands at **scrollLeft339px** at1440px after settling. Hidden duplicate values arrows account for a raw query finding three Previous/Next pairs; there are only two visible pairs at each width.

Both recruitment links, **Join the team** and **Explore open roles**, point directly to <https://jobs.lever.co/waabi>. The Careers page contains **no iframe, filter controls, embedded job listings, or job search input**. The recruitment board stays external.

## Geometry of the live reference

At1440×900, with source's promotional header still present, main section coordinates are: intro y1020/h484; image+mission y1624/h1466; voices y3210/h820; values y4150/h854; final CTA y5124/h966. These are evidence of the reference state, not a requirement to restore the promotional banner or cookie prompt the user explicitly removed from the reconstruction.

No WebGL/Three canvas is instantiated in the Careers hero: the generic optional squares animation prop is false for this page. All visible motion can use existing Motion and native browser scrolling. Finite snapshots cannot prove every video frame or scheduling phase is identical; independent autoplay clocks must be accounted for in comparisons.

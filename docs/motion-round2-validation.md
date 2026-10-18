# Independent second animation audit

The previous release's normal-motion smoke tests established working controls and reversible scroll poses, but missed visible animation differences. This audit separately records the live source, the deployed previous release (`4ad2149`), and the working reconstruction. REA 6.5.0 owns the native screenshots and inspection envelopes. Playwright drives the external Chromium browser and records computed styles at approximately 50 ms intervals. REA's passive browser provider cannot drive scroll or evaluate these values.

Evidence is under `artifacts/comparison/motion-round2/audit/`. `scripts/motion_round2_audit.py reference|baseline|local 1440|390` reruns the principal trace. Run local only after implementation is complete: early `local` captures were collected during development and must not be treated as the final release.

## Confirmed prior-release defects

- Home at desktop scroll540: source H1 itself stays at x103 while its first line moves +29.2208px and second line moves −29.2208px. The previous release moved the entire H1 to x119.169px. This changes both direction and displacement.
- Safety DNA's first copy enters from +400px with stiffness80/damping20. At source scroll2430 it remained +177.063px after approximately313ms and +14.106px after783ms. The deployed previous release had no entrance transform at any sampled time. Checking only the settled state concealed this defect.
- The DNA line needs its actual nested flex structure. At desktop scroll3400, source outer root is x713.984,y−709,w12,h2080 with450px bottom padding. Its1630px track translates−471px; the2px bar begins at y−1168 and the dot is at y450.094. Static percentage placement cannot reproduce these intermediate states accurately.

## Additional source measurements

- At390px, the DNA copy rail has390px client width and1218px scroll width. Counter01 persists at horizontal offsets100,200,300,390;02 appears at414 and600;03 appears at828. Reverse traversal restores02 at600 and01 at300. This follows `clamp(round(progress*3),1,3)`, where progress is horizontal offset/828. The line translates from−378px to0 with the same fraction.
- Home benefit title fonts compute to Zagma40/44 on desktop. The description computes to Zagma16/22.4 despite its `text-s-14 md:text-s-15` class names. Mobile title computes to Zagma24/30. Inferences from class names alone would introduce a regression.
- Repeated source scrolls restore Home title positions and Safety DNA active copy; once-only entrance reveals remain completed on reverse traversal.

`tests/motion-round2.spec.ts` includes normal-motion regression cases for: exact opposing hero displacement and reversal; captured DNA entrance frames with the200/400/600px spring distance relationship; interrupted technology expansion continuity; the source 600px mobile expanded panel / 1196.578px complete section height and narrow-viewport hover; and hero playback pause/resume across reverse scrolling. These complement rather than replace screenshot comparisons.

Final optimized-build results appear below. Matching source constants or a finite sample does not establish equality at every rendered frame, particularly for decoder timing and interrupted browser animation schedules.

## Regression caught during this correction

The independent 390px audit caught an unscoped desktop flex rule overriding the mobile expanded panel. The technology section collapsed from the source1196.578px to627.172px and moved subsequent sections about570px upward. This was reported to the implementation agent before release; a dedicated measured-height regression test now covers it. Pre-fix captures must not be interpreted as final release evidence.

## Production spring comparison

The optimized production server on port3005 was compared with a fresh source browser. Video play calls were disabled equally in both browsers for this numeric probe only, separating DOM motion from decoder load. The separate playback probe keeps normal video behavior enabled.

Both runs recorded133 animation frames. The initial counter/copy/image entrance displacements were exactly200/400/600px. After aligning the observed onset by43ms, the first1400ms of the three spring trajectories had0.227px mean absolute error and7.168px maximum error. Counter and copy settled positions matched exactly; the image wrapper differed by1.14px vertically. Raw frame data and fit metadata are retained in `*-paused-video-dna-raf-transient.json` and `production-dna-transient-fit.json`.

The43ms onset difference is reported explicitly: curve agreement does not imply identical frame scheduling. An earlier development-server run showed larger decoder/main-thread stalls and was superseded by this isolated optimized-production measurement.

## Playback defect established separately

The unmodified normal playback probe found a real mismatch that scroll transforms alone cannot detect. At scroll3500, the live source paused its27.166667-second hero video at2.953571s and retained that exact time for1.26s. Reversing to the top resumed it. The production reconstruction continued playing offscreen (4.034146s→5.302159s). The implementation agent was asked to correct this and a new regression test requires retained-frame pause/resume. `reference-hero-video-clock.json` and the pre-fix local clock record preserve the evidence; the corrected local result is recorded separately after the fix.


## Final optimized-build verification

The frozen application was built successfully with `NEXT_DIST_DIR=.next-motion2-final npm run build` and served with `NEXT_DIST_DIR=.next-motion2-final npm start -- --port 3006`. All **34 Playwright tests passed in 2.1 minutes** against that production server. `npm run lint` and `npm run typecheck` also passed. The final suite includes ten new measured-motion cases, the existing reversible-motion checks, reduced-motion playback/hydration, all three complete pages at four viewport sizes, healthy assets, overflow, navigation, cookie preferences and interactive controls.

The added cases pin Home's opposing title movement, the DNA spring-distance relationship, interrupted accordion projection, the mobile 600px panel, retained-frame offscreen video pause/resume, desktop drag snapping, sticky DNA composition at 1440/1920/768px, and the separate 1080×1920 mobile video source. The sticky layout correction followed a final cross-viewport inspection: the previous fixed image top was about89px too high at1920px, and its tablet image was substantially too wide. Viewport-height sticky positioners and the actual two-column flex geometry resolve those defects.

The corrected normal-playback probe recorded the hero playing at2.465580s at the top, pausing offscreen at2.555854s, retaining that exact frame for1.207s, then resuming at2.875800s and3.528400s after reverse scrolling. Pure native autoplay is significant: calling `play()` from the reveal observer had overridden the browser's offscreen autoplay policy. The new regression requires this pause/resume behavior.

Final QA also found and fixed a reduced-motion React hydration error caused by conditionally inserting a generated fallback poster. The poster DOM is now stable and CSS gates its visibility. Testimonial entry delays no longer delay exiting quotes; retained outgoing quotes are hidden from accessibility and duplicate panel IDs are avoided.

Final production-browser captures replace the development `local-*-state-*` audit files. The `final-*-dna-*` REA screenshots and `corrected-dna-geometry.json` contain the settled cross-viewport composition. Older captures elsewhere in this directory remain historical evidence of the investigation. Pink differences, video-frame differences and onset differences in independently timed overlays must be interpreted alongside numeric traces, rather than reported as an all-frame identity score.

The measured controls and source motion primitives now agree in the cases tested. Remaining limits: separately initialized video clocks and decoder delivery differ; main-thread scheduling can shift animation onset; finite Chromium captures do not establish equality for every frame, browser, gesture or viewport. The recovered horizontal carousel behavior covers the target's usage, rather than every capability of the original Blossom library.

Final fresh source/local settled geometry at scroll3400 confirmed image y=148.859375px at1440×900 and238.859375px at1920×1080 in both browsers. Counter positions match exactly at both desktop sizes. At768×1024, all measured image bounds differed by at most0.078125px and counter x differed by0.03125px. These are settled geometry measurements, separate from transient timing. Native REA screenshots, half-opacity overlays and amplified pixel differences are retained as `final-*-dna-*` / `final-dna-*-overlay.png` / `final-dna-*-diff.png`.

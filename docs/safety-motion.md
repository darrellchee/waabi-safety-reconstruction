# Safety motion corrections

Inspected the public Safety page through REA 6.5.0 on CDP port 9236, supplemented with Playwright scrolling and computed-style samples. REA evidence `ev_20c4eef49e1559621b874bfc9dce9b5799fc7f7f1e910cf264d6fb7a59818177` is preserved in `artifacts/reference/rea/safety-motion-inspection.json.gz`. Public module bodies in the previously captured scripts supply the following values:

- `29229` Title: each word starts at x20 and opacity0; .4 seconds, cubic bezier(.19,1,.22,1), .07-second stagger (each new line adds .07 seconds).
- `60931` FadeIn: y200 × (index +1), spring stiffness80/damping20, once at20% parent visibility. Applied to statistics, expandable panels and insights.
- `21342` DNA: progress from start/center to end/end, current section clamp(round(progress×3),1,3). Images scale1.2 to1 with stiffness140/damping22; numbered counter moves120% in scroll direction. These spring curves are sampled analytically through the Web Animations API without an additional animation dependency.
- `30397` default layout: .4 seconds, cubic bezier(.19,1,.22,1). Used for technology expansion instead of the previous arbitrary .8-second timing; plus controls disappear on active cards.
- `65381` parallax: target offset start/end to end/start mapped from −12% to12%. Applied to hero media.
- `53703` FullBleedSlider/`80315` Carousel: native horizontal scroll, mandatory snap and browser smooth scrolling. Replaced the prior translated flex rail with the actual mechanism, including native touch dragging.

Normal-motion local verification samples, page-error results and screenshots are under `artifacts/comparison/safety-motion/`. Story counters match the reference sample positions at1440×900: scroll2600→01,3000→01,3400→02,3800→03; reverse direction3400→02 and3000→01. Practices advances to Testing & Validation. No page exceptions or invalid transforms were observed. The full project release checks are recorded separately by the parent task.

`dna-transition-samples.json` additionally verifies simultaneous count layers150ms into forward and backward transitions. At scroll3400, incoming02 is translated+15.05px while outgoing01 is−37.75px; reverse traversal produces incoming02 at−5.25px and outgoing03 at+47.55px. The line position changes by exactly400px between each400px scroll step (−871,−471,−71px).

The counter now keeps the exiting digit as an aria-hidden overlay while the incoming digit follows its spring. Both use the reference's ±120% direction-dependent displacement. The DNA line uses a clipped full-height track padded by50svh, with its inner line translated from−100% to0 using the same section progress; mobile uses the corresponding horizontal translation. These replace the earlier sticky endpoint approximation.

Remaining limits: the locally sampled springs use91 keyframes at60Hz, while the reference Framer runtime integrates its springs per animation frame. Shared navigation/footer animation is maintained in its separate component. These differences preclude claiming mathematically identical motion at every frame.

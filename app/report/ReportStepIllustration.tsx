"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import styles from "./ReportDesign.module.css";

type Point = readonly [number, number];
type Pose = { at: number; elbow: Point; hand: Point; item: Point };

// The hand and the held object share contact points during each transfer.
// Short holds at either end keep the starting and finished actions readable.
const poses: Pose[][] = [
  [
    { at: 0, elbow: [121, 105], hand: [142, 108], item: [142, 108] },
    { at: .12, elbow: [121, 105], hand: [142, 108], item: [142, 108] },
    { at: .3, elbow: [130, 114], hand: [162, 130], item: [162, 130] },
    { at: .45, elbow: [134, 112], hand: [178, 130], item: [178, 130] },
    { at: .55, elbow: [130, 118], hand: [162, 138], item: [162, 138] },
    { at: .72, elbow: [134, 118], hand: [180, 138], item: [180, 138] },
    { at: .85, elbow: [130, 110], hand: [166, 112], item: [166, 112] },
    { at: 1, elbow: [130, 110], hand: [166, 112], item: [166, 112] },
  ],
  [
    { at: 0, elbow: [112, 124], hand: [132, 145], item: [181, 133] },
    { at: .12, elbow: [112, 124], hand: [132, 145], item: [181, 133] },
    { at: .3, elbow: [138, 110], hand: [181, 133], item: [181, 133] },
    { at: .5, elbow: [129, 95], hand: [172, 110], item: [172, 110] },
    { at: .85, elbow: [114, 115], hand: [138, 132], item: [138, 132] },
    { at: 1, elbow: [114, 115], hand: [138, 132], item: [138, 132] },
  ],
  [
    { at: 0, elbow: [114, 115], hand: [138, 132], item: [138, 132] },
    { at: .12, elbow: [114, 115], hand: [138, 132], item: [138, 132] },
    { at: .45, elbow: [129, 95], hand: [172, 110], item: [172, 110] },
    { at: .7, elbow: [138, 110], hand: [181, 133], item: [181, 133] },
    { at: .88, elbow: [112, 124], hand: [132, 145], item: [181, 133] },
    { at: 1, elbow: [112, 124], hand: [132, 145], item: [181, 133] },
  ],
  [
    { at: 0, elbow: [130, 121], hand: [150, 146], item: [150, 146] },
    { at: .12, elbow: [130, 121], hand: [150, 146], item: [150, 146] },
    { at: .4, elbow: [144, 94], hand: [176, 103], item: [176, 103] },
    { at: .7, elbow: [158, 78], hand: [208, 94], item: [208, 94] },
    { at: .88, elbow: [132, 119], hand: [150, 138], item: [208, 94] },
    { at: 1, elbow: [132, 119], hand: [150, 138], item: [208, 94] },
  ],
  [
    { at: 0, elbow: [121, 100], hand: [153, 108], item: [153, 108] },
    { at: .12, elbow: [121, 100], hand: [153, 108], item: [153, 108] },
    { at: .35, elbow: [126, 89], hand: [164, 98], item: [164, 98] },
    { at: .65, elbow: [129, 119], hand: [164, 140], item: [164, 140] },
    { at: .85, elbow: [122, 127], hand: [148, 156], item: [148, 156] },
    { at: 1, elbow: [122, 127], hand: [148, 156], item: [148, 156] },
  ],
];

function poseAt(step: number, progress: number) {
  const frames = poses[step] ?? poses[0];
  const next = frames.findIndex(frame => frame.at >= progress);
  if (next <= 0) return frames[next === 0 ? 0 : frames.length - 1];
  const from = frames[next - 1];
  const to = frames[next];
  const amount = (progress - from.at) / (to.at - from.at);
  const mix = (a: Point, b: Point): Point => [a[0] + (b[0] - a[0]) * amount, a[1] + (b[1] - a[1]) * amount];
  return { elbow: mix(from.elbow, to.elbow), hand: mix(from.hand, to.hand), item: mix(from.item, to.item) };
}

// Every pose derives from rail position: no timers, autoplay or independent motion.
export function ReportStepIllustration({ step, progress, start, end, reduced }: {
  step: number; progress: MotionValue<number>; start: number; end: number; reduced: boolean;
}) {
  const action = useTransform(progress, value => reduced ? 1 : Math.max(0, Math.min(1, (value - start) / Math.max(.001, end - start))));
  const pose = useTransform(action, value => poseAt(step, value));
  const shoulder = step === 3 ? 112 : 92;
  const arm = useTransform(pose, value => `M${shoulder} 94 ${value.elbow.join(" ")} ${value.hand.join(" ")}`);
  const itemX = useTransform(pose, value => value.item[0]);
  const itemY = useTransform(pose, value => value.item[1]);
  const signature = useTransform(action, [.3, .72], [0, 1]);
  const tick = useTransform(action, [.7, .88], [0, 1]);
  const signatureOpacity = useTransform(signature, [0, .01], [0, 1]);
  const tickOpacity = useTransform(tick, [0, .01], [0, 1]);
  const coinY = useTransform(action, [0, .12, .78, 1], [0, 0, 103, 103]);
  const coinOpacity = useTransform(action, [0, .66, .78, 1], [1, 1, 0, 0]);
  const ranger = step === 3 || step === 4;

  return <svg className={styles.stepIllustration} viewBox="0 0 320 240" fill="none" aria-hidden="true" focusable="false" data-step-illustration={step + 1}>
    <path d="M34 216h252" className={styles.illustrationGround} />

    <g className={styles.illustrationProps}>
      {step === 0 && <>
        <path d="M146 153h136m-124 0v59m112-59v59" />
        <path d="m151 119 75 0 17 31h-75Z" className={styles.illustrationPaper} />
        <path d="M161 125h26m-21 20h54" className={styles.illustrationDetail} />
        <motion.path d="m162 132 4-4 2 6 6-4 3 3m-15 6 5-4 4 5 8-3" style={{ pathLength: signature, opacity: signatureOpacity }} />
        <motion.path d="m205 134 5 5 9-10" className={styles.illustrationAccent} style={{ pathLength: tick, opacity: tickOpacity }} />
      </>}
      {(step === 1 || step === 2) && <>
        <path d="M166 180h116m-104 0v32m92-32v32" />
        <path d={step === 1 ? "M217 76h-60m12-10-12 10 12 10" : "M157 76h60m-12-10 12 10-12 10"} className={styles.illustrationAccent} />
      </>}
      {step === 3 && <>
        <path d="M183 68v144m96-144v144m-96-83h96m-96 61h96" />
        <path d="M240 99h23v30h-23Zm5 0v-7h13v7M197 159h27v31h-27Zm37 3h29v28h-29Z" className={styles.illustrationPaper} />
        <path d="M202 167h17m20 3h19" className={styles.illustrationDetail} />
      </>}
      {step === 4 && <>
        <path d="m183 93 48-39 49 39m-88-7v96h78V86m-62 96v30m48-30v30m-62-30h76" />
        <path d="M222 182v-42h23v42m-41-78h17v20h-17Zm32 0h17v20h-17Z" className={styles.illustrationPaper} />
        <path d="M39 120h35v58H39Zm9 0v-6h17v6" className={styles.illustrationPaper} />
        <motion.path d="m46 137 4 4 8-9m-12 22 4 4 8-9" className={styles.illustrationAccent} style={{ pathLength: tick, opacity: tickOpacity }} />
      </>}
    </g>

    {step < 5 && <>
      <g className={styles.stickFigure} transform={step === 3 ? "translate(20 0)" : undefined}>
        <circle cx="92" cy="54" r="16" className={styles.illustrationHead} />
        <path d="M92 72v76m0 0-21 64m21-64 25 64" />
        <path d={step === 4 ? "M92 94 72 112 66 128" : "M92 94 68 116 81 141"} />
        {ranger ? <><path d="M68 42h48M78 41l3-13h22l4 13" /><path d="m85 79 7 9 7-9" /></> : <path d="M77 85q-16 0-16 19v35h18V91" />}
      </g>
      <motion.path className={styles.stickFigure} d={arm} data-action-arm="" />
      <motion.g className={styles.illustrationProps} style={{ x: itemX, y: itemY }} data-action-item="">
        {step === 0 && <path d="m0 0 12-19m-12 19 1-6 4 3Z" />}
        {(step === 1 || step === 2) && <>
          <path d="M-21 12h42v35h-42Zm11 0V0h20v12" className={styles.illustrationPaper} />
          <path d="M-21 22h42m-5 0v8H6v-8" />
          <path d="M-7 39H7" className={styles.illustrationAccent} />
        </>}
        {step === 3 && <>
          <path d="M-20 5h40v30h-40ZM-8 5V0H8v5" className={styles.illustrationPaper} />
          <path d="M-10 14v12m10-12v12m10-12v12" className={styles.illustrationAccent} />
        </>}
        {step === 4 && <>
          <path d="m0 0 14-14" />
          <circle cx="23" cy="-23" r="13" className={styles.illustrationLens} />
          <path d="m18-26 3-3" className={styles.illustrationDetail} />
        </>}
      </motion.g>
    </>}

    {step === 5 && <g className={styles.illustrationProps}>
      <motion.g style={{ y: coinY, opacity: coinOpacity }} data-action-item="">
        <circle cx="160" cy="46" r="18" className={styles.pinkCoin} />
        <path d="M160 34v24m6-19c-11-8-18 3-6 7s5 13-7 6" className={styles.coinMark} />
      </motion.g>
      <path d="M128 132h64v14l13 16v39q0 11-11 11h-68q-11 0-11-11v-39l13-16Zm0 14h64" className={styles.illustrationPaper} />
      <path d="M144 132h32m-38 44 22-17 22 17m-38-4v24h32v-24" />
      <motion.path d="m151 184 7 6 13-15" className={styles.illustrationAccent} style={{ pathLength: tick, opacity: tickOpacity }} />
      <circle cx="235" cy="193" r="17" className={styles.pinkCoin} />
      <path d="M235 182v22m5-18c-10-7-16 3-5 7s4 12-6 5" className={styles.coinMark} />
    </g>}
  </svg>;
}

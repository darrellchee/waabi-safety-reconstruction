import type { CSSProperties } from "react";
import art from "./ReportImplementationMotion.module.css";
import styles from "./ReportImplementation.module.css";

export const ownershipCards = [
  { title: "Community handover", subtitle: "Transfer the finished shelter to YAC and Rangers." },
  { title: "YAC management", subtitle: "Manage the shelter in line with local cultural rules." },
  { title: "Daily operation", subtitle: "Rangers manage the shelter and equipment rentals." },
  { title: "Weekly restocking", subtitle: "Rangers top up supplies each week." },
  { title: "Routine inspections", subtitle: "Rangers carry out regular facility checks." },
  { title: "Community independence", subtitle: "Sales and hire income sustain community-run operations." },
];

function Person({ x, ranger = false }: { x: number; ranger?: boolean }) {
  return <g className={styles.figure}>
    <circle cx={x} cy="54" r="16" className={styles.paper} />
    <path d={`M${x} 72v76m0 0-21 64m21-64 25 64`} />
    {ranger && <>
      <path d={`M${x - 24} 42h48m-38-1 3-13h22l4 13`} />
      <path d={`m${x - 7} 79 7 9 7-9`} />
    </>}
  </g>;
}

export function ReportOwnershipIllustration({ step }: { step: number }) {
  return <svg className={styles.stageIllustration} viewBox="0 0 320 240" fill="none"
    aria-hidden="true" focusable="false" data-ownership-illustration={step + 1}>
    <path d="M28 216h264" className={styles.ground} />

    {step === 0 && <>
      <Person x={72} />
      <Person x={248} ranger />
      <path d="M72 94 109 116 137 129m-65-35-20 26 14 22M248 94 215 116 187 129m61-35 20 26-14 22" className={`${styles.figure} ${art.draw}`} pathLength={1} />
      <g className={styles.props}>
        <g className={art.reveal}>
          <circle cx="147" cy="129" r="10" className={styles.paper} />
          <path d="M157 129h30m-8 0v9m8-9v9" />
        </g>
        <path d="m133 175 27-21 27 21m-49-4v34h44v-34m-29 34v-21h14v21" className={styles.paper} />
      </g>
    </>}

    {step === 1 && <>
      <Person x={84} />
      <path d="M84 94 63 116 75 141m9-47 41 22 42 22" className={styles.figure} />
      <g className={styles.props}>
        <path d="M141 169h142m-128 0v43m115-43v43" />
        <path d="M155 112q28-9 57 1 29-10 57-1v48q-28-9-57 1-29-10-57-1Zm57 1v48" className={styles.paper} />
        <path d="m168 133 17-13 17 13m-29-4v20h24v-20m-15 20v-10h7v10M224 123h31m-31 8h19" className={art.reveal} />
        <path d="m228 145 7 7 16-18" className={`${styles.accent} ${art.draw}`} pathLength={1} />
      </g>
    </>}

    {step === 2 && <>
      <Person x={76} ranger />
      <Person x={244} />
      <path d="M76 94 104 116 139 138m-63-44-20 26 14 22M244 94 216 116 181 138m63-44 20 26-14 22m9-57q16 0 16 19v35h-18V91" className={`${styles.figure} ${art.draw}`} pathLength={1} />
      <g className={styles.props}>
        <path d="M123 182h80m-70 0v30m60-30v30" />
        <path d="M139 132h42v35h-42Zm11 0v-12h20v12" className={styles.paper} />
        <path d="M139 142h42m-6 0v8h-10v-8" />
        <path d="M154 159h13" className={`${styles.accent} ${art.pulse}`} />
        <path d="M140 87h40m-10-10 10 10-10 10" className={`${styles.accent} ${art.move}`} style={{ "--art-x": "8px", "--art-y": "0px" } as CSSProperties} />
      </g>
    </>}

    {step === 3 && <>
      <Person x={104} ranger />
      <g className={art.rotate} style={{ transformOrigin: "104px 94px", "--art-angle": "-4deg" } as CSSProperties}>
        <path d="M104 94 82 116 93 141m11-47 42-15 40 24" className={styles.figure} />
        <g className={styles.props}>
          <path d="M186 102h42v30h-42Zm12 0v-7h18v7" className={styles.paper} />
          <path d="M196 112v11m11-11v11m11-11v11" className={styles.accent} />
        </g>
      </g>
      <g className={styles.props}>
        <path d="M176 70v142m102-142v142m-102-80h102m-102 63h102" />
        <path d="M241 101h21v31h-21Zm6 0v-7h9v7" className={styles.paper} />
        <path d="M189 163h28v32h-28Zm41 0h31v32h-31ZM195 172h16m25 0h19" className={styles.paper} />
      </g>
    </>}

    {step === 4 && <>
      <Person x={92} ranger />
      <g className={art.rotate} style={{ transformOrigin: "92px 94px", "--art-angle": "-5deg" } as CSSProperties}>
        <path d="M92 94 72 112 66 128m26-34 37 25 35 21" className={styles.figure} />
      </g>
      <g className={styles.props}>
        <path d="m183 93 48-39 49 39m-88-7v96h78V86m-62 96v30m48-30v30m-62-30h76" />
        <path d="M222 182v-42h23v42m-41-78h17v20h-17Zm32 0h17v20h-17Z" className={styles.paper} />
      </g>
      <g className={art.rotate} style={{ transformOrigin: "92px 94px", "--art-angle": "-5deg" } as CSSProperties}>
        <g className={styles.props}>
          <path d="M39 120h35v58H39Zm9 0v-6h17v6" className={styles.paper} />
          <path d="m46 137 4 4 8-9m-12 22 4 4 8-9" className={`${styles.accent} ${art.draw}`} pathLength={1} />
          <path d="m164 140 14-14" />
          <circle cx="187" cy="117" r="13" className={styles.lens} />
          <path d="m182 114 3-3" className={styles.detail} />
        </g>
      </g>
    </>}

    {step === 5 && <g className={styles.props}>
      <path d="M54 132h64v14l13 16v39q0 11-11 11H52q-11 0-11-11v-39l13-16Zm0 14h64" className={styles.paper} />
      <path d="M70 132h32m-38 44 22-17 22 17m-38-4v24h32v-24" />
      <path d="m77 184 7 6 13-15" className={`${styles.accent} ${art.draw}`} pathLength={1} />
      <path d="M145 151h37m-11-10 11 10-11 10" className={`${styles.accent} ${art.move}`} style={{ "--art-x": "5px", "--art-y": "0px" } as CSSProperties} />
      <g className={art.move} style={{ "--art-x": "0px", "--art-y": "32px" } as CSSProperties}>
        <circle cx="86" cy="87" r="18" fill="#ff286b" />
        <path d="M86 75v24m6-19c-11-8-18 3-6 7s5 13-7 6" stroke="#faf9f5" strokeWidth="2.5" />
      </g>
      <path d="m191 93 43-35 44 35m-79-7v96h70V86m-58 96v30m46-30v30m-58-30h70" />
      <path d="M224 182v-39h20v39m-34-77h14v19h-14Zm30 0h15v19h-15Z" className={styles.paper} />
      <path d="m221 44 8 8 17-19" className={`${styles.accent} ${art.draw}`} pathLength={1} />
    </g>}
  </svg>;
}

import type { CSSProperties } from "react";
import styles from "./ReportImplementation.module.css";
import art from "./ReportImplementationMotion.module.css";

const shoulderMotion = { transformOrigin: "84px 94px", "--art-angle": "-4deg" } as CSSProperties;

export const repairCards = [
  { title: "Document faults", subtitle: "Rangers record equipment or facility malfunctions." },
  { title: "Report the issue", subtitle: "Rangers report malfunctions for follow-up." },
  { title: "Remove from service", subtitle: "Keep damaged equipment out of use." },
  { title: "Repair or replace", subtitle: "Repair damaged gear or replace it." },
  { title: "Qualified contractors", subtitle: "Specialists handle structural and electrical damage." },
  { title: "Return to service", subtitle: "Complete repairs and safety checks before reuse." },
];

function Person({ x, ranger = true }: { x: number; ranger?: boolean }) {
  return <g className={styles.figure}>
    <circle cx={x} cy="54" r="16" className={styles.paper} />
    <path d={`M${x} 72v76m0 0-21 64m21-64 25 64`} />
    {ranger ? <>
      <path d={`M${x - 24} 42h48m-38-1 3-13h22l4 13`} />
      <path d={`m${x - 7} 79 7 9 7-9`} />
    </> : <path d={`M${x - 24} 43h48m-41 0v-6a17 17 0 0 1 34 0v6m-17-23v18`} />}
  </g>;
}

function Kit({ x, y }: { x: number; y: number }) {
  return <g className={styles.props}>
    <path d={`M${x} ${y}h42v35h-42Zm11 0v-12h20v12`} className={styles.paper} />
    <path d={`M${x} ${y + 10}h42m-6 0v8H${x + 26}v-8`} />
    <path d={`M${x + 15} ${y + 27}h13`} className={styles.accent} />
  </g>;
}

export function ReportRepairIllustration({ step }: { step: number }) {
  return <svg className={styles.stageIllustration} viewBox="0 0 320 240" fill="none"
    aria-hidden="true" focusable="false" data-repair-illustration={step + 1}>
    <path d="M28 216h264" className={styles.ground} />

    {step === 0 && <>
      <Person x={84} />
      <path d="M84 94 63 116 75 141" className={styles.figure} />
      <g className={art.rotate} style={shoulderMotion}>
        <path d="M84 94 126 113 173 138" className={styles.figure} />
      </g>
      <g className={styles.props}>
        <path d="M169 104h65v82h-65Zm20 0v-7h25v7" className={styles.paper} />
        <path d="M182 119h39m-39 35h39m-39 15h28" />
        <g className={art.rotate} style={shoulderMotion}>
          <path d="m172 138 10-22" />
        </g>
        <path d="m186 137 8-6 7 7 10-6" className={`${styles.accent} ${art.draw}`} pathLength={1} />
      </g>
      <Kit x={244} y={176} />
      <path d="m263 179-6 9 9 5-6 9" className={`${styles.accent} ${art.pulse}`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>}

    {step === 1 && <>
      <Person x={84} />
      <path d="M84 94 63 116 75 141" className={styles.figure} />
      <g className={art.rotate} style={shoulderMotion}>
        <path d="M84 94 109 109 122 92" className={styles.figure} />
        <g className={styles.props}>
          <path d="M119 68h23v40h-23Zm5 0V50m1 43h10m-10 7h10" className={styles.paper} />
          <path d="M130 77h1m7 0h1" className={`${styles.accent} ${art.pulse}`} />
          <path d="m156 68q14 11 0 23" className={`${styles.accent} ${art.reveal}`} />
          <path d="m165 61q23 18 0 38" className={`${styles.accent} ${art.reveal}`} />
        </g>
      </g>
      <g className={styles.props}>
        <path d="M177 124h22m-9-9 9 9-9 9" className={styles.accent} />
        <path d="M211 105h60v81h-60Zm18 0v-7h24v7" className={styles.paper} />
        <path d="M223 120h36m-36 15h36m-36 15h25" />
        <path d="m228 168 6 6 13-15" className={`${styles.accent} ${art.draw}`} pathLength={1} />
      </g>
    </>}

    {step === 2 && <>
      <Person x={84} />
      <path d="M84 94 63 116 75 141m9-47 39 24 29 25" className={styles.figure} />
      <Kit x={202} y={110} />
      <g className={styles.props}>
        <g className={art.pulse}>
          <circle cx="223" cy="128" r="36" className={styles.accent} />
          <path d="m198 103 50 50" className={styles.accent} />
        </g>
        <path d="M151 169h133v17H151Zm9 17v26m115-26v26" className={styles.paper} />
        {[168, 191, 214, 237, 260].map(x => <path key={x} d={`M${x} 170l-10 14`} className={`${styles.accent} ${art.draw}`} pathLength={1} />)}
      </g>
    </>}

    {step === 3 && <>
      <Person x={84} ranger={false} />
      <path d="M84 94 63 116 75 141" className={styles.figure} />
      <g className={art.rotate} style={shoulderMotion}>
        <path d="M84 94 136 119 184 141" className={styles.figure} />
      </g>
      <Kit x={204} y={151} />
      <g className={styles.props}>
        <path d="M178 189h99m-88 0v23m76-23v23" />
        <g className={art.rotate} style={shoulderMotion}>
          <path d="m180 145 25-25a12 12 0 0 1 15-15l-7 7 7 7 7-7a12 12 0 0 1-15 15l-25 25Z" className={styles.paper} />
        </g>
        <path d="m252 116 6 6 12-14" className={`${styles.accent} ${art.draw}`} pathLength={1} />
      </g>
    </>}

    {step === 4 && <>
      <Person x={84} ranger={false} />
      <path d="M84 94 63 116 75 141" className={styles.figure} />
      <g className={art.rotate} style={shoulderMotion}>
        <path d="M84 94 110 117 143 138" className={styles.figure} />
        <Kit x={143} y={133} />
      </g>
      <g className={styles.props}>
        <path d="m191 93 45-38 46 38m-81-9v98h70V84m-58 98v30m45-30v30m-57-30h70" />
        <path d="M216 112h39v48h-39Zm4-15h15v10h-15Z" className={styles.paper} />
        <path d="m239 121-10 15h10l-8 15" className={styles.accent} />
        <path d="M249 132v8" />
        <path d="M134 49h35v39h-35Zm7 39-4 13 11-5 10 5-3-13" className={styles.paper} />
        <path d="m142 68 6 6 12-14" className={`${styles.accent} ${art.draw}`} pathLength={1} />
      </g>
    </>}

    {step === 5 && <>
      <Person x={84} />
      <path d="M84 94 62 116 50 134" className={styles.figure} />
      <g className={art.rotate} style={shoulderMotion}>
        <path d="M84 94 127 113 159 128" className={styles.figure} />
      </g>
      <g className={styles.props}>
        <path d="M32 127h34v59H32Zm8 0v-7h18v7" className={styles.paper} />
        <path d="m39 142 4 4 10-11" className={`${styles.accent} ${art.draw}`} pathLength={1} />
        <path d="m39 161 4 4 10-11" className={`${styles.accent} ${art.draw}`} pathLength={1} />
        <g className={art.rotate} style={shoulderMotion}>
          <path d="m159 128 10-10" />
          <circle cx="178" cy="108" r="14" className={styles.lens} />
          <path d="m173 105 3-3" className={styles.detail} />
        </g>
        <path d="M182 184h101m-91 0v28m81-28v28" />
        <path d="m221 103 12 12 23-29" className={`${styles.accent} ${art.draw}`} pathLength={1} />
      </g>
      <Kit x={211} y={145} />
    </>}
  </svg>;
}

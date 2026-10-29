import type { CSSProperties } from "react";
import styles from "./ReportImplementation.module.css";
import art from "./ReportImplementationMotion.module.css";

export const constructionCards = [
  { title: "Flood-safe site", subtitle: "Choose dry, flood-safe terrain for the shelter." },
  { title: "Construction crew", subtitle: "Plan eight weeks for a crew of four workers." },
  { title: "Reinforced foundations", subtitle: "Raise the shelter on reinforced concrete piles." },
  { title: "Walls and roof", subtitle: "Use watertight concrete and a corrugated fibre cement roof." },
  { title: "Warehouse storage", subtitle: "Use the community warehouse to store materials." },
  { title: "Ranger training and manuals", subtitle: "Provide four hours of training and leave instruction manuals." },
];

function Person({ x, worker = false, ranger = false }: { x: number; worker?: boolean; ranger?: boolean }) {
  return <g className={styles.figure}>
    <circle cx={x} cy="54" r="16" className={styles.paper} />
    <path d={`M${x} 72v76m0 0-21 64m21-64 25 64`} />
    {worker && <>
      <path d={`M${x - 20} 43h40M${x - 14} 41a14 14 0 0 1 28 0m-14-13v10`} />
    </>}
    {ranger && <>
      <path d={`M${x - 24} 42h48m-38-1 3-13h22l4 13m-22 38 7 9 7-9`} />
    </>}
  </g>;
}

export function ReportConstructionIllustration({ step }: { step: number }) {
  return <svg className={styles.stageIllustration} viewBox="0 0 320 240" fill="none"
    aria-hidden="true" focusable="false" data-construction-illustration={step + 1}>
    <path d="M28 216h264" className={styles.ground} />

    {step === 0 && <>
      <Person x={72} />
      <path d="M72 94 104 116 143 139m-71-45-20 26 14 22" className={styles.figure} />
      <g className={styles.props}>
        <path d="M137 183q72-29 148 0m-132-56v41h109v-41m-97 41v9m85-9v9m-112-49 69-44 70 44Z" className={styles.paper} />
        <path d="M198 168v-27h22v27m-54-27h18v16h-18Zm70 0h16v16h-16Z" />
        <path d="m185 62 7 7 13-16" className={`${styles.accent} ${art.draw}`} pathLength={1} />
        <path d="M153 200q9-7 18 0t18 0m13 0q9-7 18 0t18 0m13 0q9-7 18 0t18 0" className={`${styles.detail} ${art.move}`} style={{ "--art-x": "4px", "--art-y": "0px" } as CSSProperties} />
      </g>
    </>}

    {step === 1 && <>
      <g transform="translate(0 55) scale(.74)">
        {[62, 151, 240, 329].map(x => <g key={x}>
          <Person x={x} worker />
          <path d={`M${x} 94l-22 24 10 25`} className={styles.figure} />
          <path d={`M${x} 94l23 23-10 26`} className={`${styles.figure} ${art.rotate}`} style={{ transformOrigin: `${x}px 94px`, "--art-angle": "-12deg" } as CSSProperties} />
        </g>)}
      </g>
      <g className={styles.props}>
        <rect x="132" y="28" width="138" height="46" rx="3" className={styles.paper} />
        <path d="M132 42h138m-124-20v12m110-12v12m-94 8v32m32-32v32m32-32v32m-94-16h138" />
        {[49, 65].flatMap(y => [145, 177, 209, 241].map(x => <path key={`${x}-${y}`} d={`M${x} ${y}h8`} className={`${styles.accent} ${art.draw}`} pathLength={1} />))}
      </g>
    </>}

    {step === 2 && <>
      <Person x={76} worker />
      <path d="M76 94 111 121 142 121m-66-27-21 24 12 25" className={styles.figure} />
      <g className={styles.props}>
        <path d="M142 111h145v14H142ZM153 125h25v87h-25Zm83 0h25v87h-25Z" className={styles.paper} />
        <path d="M160 135v68m11-68v68m-13-52h15m-15 20h15m-15 20h15M243 135v68m11-68v68m-13-52h15m-15 20h15m-15 20h15" className={`${styles.accent} ${art.draw}`} pathLength={1} />
        <path d="M186 194h42m-7-7 7 7-7 7" className={`${styles.detail} ${art.move}`} style={{ "--art-x": "6px", "--art-y": "0px" } as CSSProperties} />
      </g>
    </>}

    {step === 3 && <>
      <Person x={72} worker />
      <path d="M72 94 52 120 66 142" className={styles.figure} />
      <g className={styles.props}>
        <path d="M149 98v84h125V98m-112 84v30m100-30v30" className={styles.paper} />
        <path d="M224 182v-42h24v42m-84-66h25v26h-25Z" className={art.reveal} />
        <path d="m164 160 7 7 13-16" className={`${styles.accent} ${art.draw}`} pathLength={1} />
      </g>
      <g className={art.rotate} style={{ transformOrigin: "72px 94px", "--art-angle": "-4deg" } as CSSProperties}>
        <path d="M72 94 112 82 151 96" className={styles.figure} />
        <g className={styles.props}>
          <path d="m135 96 75-48 76 48-8 6-8-4-8 4-8-4-8 4-8-4-8 4-8-4-8 4-8-4-8 4-8-4-8 4-8-4-8 4-8-4-8 4-8-4Z" className={styles.paper} />
          <path d="m171 84 39-25 39 25" />
        </g>
      </g>
    </>}

    {step === 4 && <>
      <Person x={72} />
      <path d="M72 94 52 120 66 142" className={styles.figure} />
      <g className={styles.props}>
        <path d="m137 78 70-39 75 39m-136-5v139h128V73" />
        <path d="M167 111h87v101h-87Zm0 12h87m-87 12h87" />
        <path d="M183 177h31v35h-31Zm11 0v35M222 157h27v27h-27Zm8 0v27" className={styles.paper} />
        <path d="M195 151h43m-35 13h27" className={`${styles.accent} ${art.reveal}`} />
      </g>
      <g className={art.rotate} style={{ transformOrigin: "72px 94px", "--art-angle": "-6deg" } as CSSProperties}>
        <path d="M72 94 96 114 120 135" className={styles.figure} />
        <path d="M120 130h42v35h-42Zm14 0v35m-14-24h42" className={`${styles.props} ${styles.paper}`} />
      </g>
    </>}

    {step === 5 && <>
      <Person x={72} />
      <Person x={248} ranger />
      <path d="M72 94 106 118 134 134m-62-40-20 26 14 22M248 94 215 118 186 134m62-40 20 26-14 22" className={styles.figure} />
      <g className={styles.props}>
        <path d="M111 160h98m-89 0v52m80-52v52" />
        <path d="M128 116q16-4 32 3 16-7 32-3v36q-16-4-32 3-16-7-32-3Zm32 3v36" className={styles.paper} />
        {[126, 135].flatMap(y => [136, 169].map(x => <path key={`${x}-${y}`} d={`M${x} ${y}h15`} className={`${styles.detail} ${art.draw}`} pathLength={1} />))}
        <circle cx="160" cy="62" r="22" className={styles.paper} />
        <path d="M160 45v17h12" className={`${styles.accent} ${art.rotate}`} style={{ transformOrigin: "160px 62px", "--art-angle": "90deg" } as CSSProperties} />
        <path d="M160 40v4m22 18h-4m-18 22v-4m-22-18h4" className={styles.accent} />
      </g>
    </>}
  </svg>;
}

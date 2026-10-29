import type { CSSProperties } from "react";
import styles from "./ReportImplementation.module.css";
import art from "./ReportImplementationMotion.module.css";

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

function Kit({ x, y }: { x: number; y: number }) {
  return <g className={styles.props}>
    <path d={`M${x} ${y}h42v35h-42Zm11 0v-12h20v12`} className={styles.paper} />
    <path d={`M${x} ${y + 10}h42m-6 0v8H${x + 26}v-8`} />
    <path d={`M${x + 15} ${y + 27}h13`} className={`${styles.accent} ${art.reveal}`} />
  </g>;
}

// The existing scenes share one inherited play state and keep their resting artwork.
export function ReportImplementationIllustration({ step }: { step: number }) {
  return <svg className={styles.stageIllustration} viewBox="0 0 320 240" fill="none"
    aria-hidden="true" focusable="false" data-implementation-illustration={step + 1}>
    <path d="M28 216h264" className={styles.ground} />

    {step === 0 && <>
      <Person x={72} />
      <Person x={248} />
      <path d="M72 94 102 114 136 130m-64-36-20 26 14 22M248 94l20 26-14 22" className={styles.figure} />
      <g className={art.rotate} style={{ transformOrigin: "248px 94px", "--art-angle": "-4deg" } as CSSProperties}>
        <path d="M248 94 219 113 183 135" className={styles.figure} />
      </g>
      <g className={styles.props}>
        <path d="M111 156h98m-89 0v56m80-56v56" />
        <path d="m121 119 66 0 14 34h-66Z" className={styles.paper} />
        <path d="m144 134 13-10 15 10m-25-2v13h21v-13m-14 13v-8h7v8" pathLength={1} className={art.draw} />
        <g className={art.rotate} style={{ transformOrigin: "248px 94px", "--art-angle": "-4deg" } as CSSProperties}>
          <path d="m183 135 8-18" />
        </g>
      </g>
    </>}

    {step === 1 && <>
      <Person x={84} />
      <path d="M84 94 63 116 75 141" className={styles.figure} />
      <g className={art.rotate} style={{ transformOrigin: "84px 94px", "--art-angle": "-3deg" } as CSSProperties}>
        <path d="M84 94l42 21 45 22" className={styles.figure} />
      </g>
      <g className={styles.props}>
        <path d="M141 161h142m-128 0v51m115-51v51" />
        <path d="m150 115 86 0 22 43h-86Z" className={styles.paper} />
        <path d="M165 123h31m-25 28h59" />
        <path d="M171 137l11-6 6 6 8-3m-26 10 10-4 5 5 9-3" pathLength={1} className={art.draw} />
        <g className={art.rotate} style={{ transformOrigin: "84px 94px", "--art-angle": "-3deg" } as CSSProperties}>
          <path d="m171 137 8-20" />
        </g>
        <path d="m210 137 7 7 13-16" pathLength={1} className={`${styles.accent} ${art.draw}`} />
        <rect x="202" y="38" width="64" height="51" rx="3" className={styles.paper} />
        <path d="M202 52h64m-50-20v12m36-12v12M224 52v37m20-37v37m-42-18h64" />
      </g>
    </>}

    {step === 2 && <>
      <Person x={70} ranger />
      <Person x={250} />
      <path d="M70 94l-19 25 14 22M250 94l19 25-14 22m10-56q16 0 16 19v35h-18V91" className={styles.figure} />
      <path d="M70 94 101 116 139 137M250 94 219 116 181 137" pathLength={1} className={`${styles.figure} ${art.draw}`} />
      <g className={styles.props}>
        <path d="M123 180h80m-70 0v32m60-32v32" />
        <path d="M135 81h50m-11-10 11 10-11 10" className={`${styles.accent} ${art.move}`} style={{ "--art-x": "8px", "--art-y": "0px" } as CSSProperties} />
      </g>
      <Kit x={139} y={132} />
    </>}

    {step === 3 && <>
      <Person x={104} ranger />
      <path d="M104 94 82 116 93 141" className={styles.figure} />
      <g className={art.rotate} style={{ transformOrigin: "104px 94px", "--art-angle": "-4deg" } as CSSProperties}>
        <path d="M104 94l47-16 38 23" className={styles.figure} />
      </g>
      <g className={styles.props}>
        <path d="M182 68v144m96-144v144m-96-83h96m-96 61h96" />
        <path d="M240 99h23v30h-23Zm5 0v-7h13v7M196 159h27v31h-27Zm38 3h29v28h-29Z" className={styles.paper} />
        <path d="M202 167h15m22 3h18" />
        <g className={art.rotate} style={{ transformOrigin: "104px 94px", "--art-angle": "-4deg" } as CSSProperties}>
          <path d="M189 99h40v30h-40Zm12 0v-6h16v6" className={styles.paper} />
          <path d="M199 109v11m10-11v11m10-11v11" className={styles.accent} />
        </g>
      </g>
    </>}

    {step === 4 && <>
      <Person x={64} ranger />
      <Person x={133} ranger />
      <path d="M64 94 45 113 42 129m22-35 17 19 5 21M133 94 111 116 115 140" className={styles.figure} />
      <g className={art.rotate} style={{ transformOrigin: "133px 94px", "--art-angle": "-5deg" } as CSSProperties}>
        <path d="M133 94l28 25 17 23" className={styles.figure} />
      </g>
      <g className={styles.props}>
        <path d="M25 123h30v59H25Zm7 0v-7h16v7" className={styles.paper} />
        <path d="m31 138 4 4 9-10m-13 25 4 4 9-10" pathLength={1} className={`${styles.accent} ${art.draw}`} />
        <path d="m199 92 41-34 42 34m-75-6v96h66V86m-54 96v30m42-30v30m-54-30h66" />
        <path d="M231 182v-40h20v40m-35-77h14v18h-14Zm26 0h14v18h-14Z" className={styles.paper} />
        <g className={art.rotate} style={{ transformOrigin: "133px 94px", "--art-angle": "-5deg" } as CSSProperties}>
          <path d="m178 142 13-13" />
          <circle cx="199" cy="121" r="13" className={styles.lens} />
          <path d="m194 118 3-3" className={styles.detail} />
        </g>
      </g>
    </>}

    {step === 5 && <g className={styles.props}>
      <path d="M46 97v115m75-115v115m-75-60h75m-75 59h75" />
      <Kit x={60} y={114} />
      <path d="M62 170h43v39H62Zm9 9h25m-25 9h25" className={styles.paper} />
      <path d="m205 160 48-16 28 22-48 16Zm0 10 28 22 48-16m-76 4 28 22 48-16m-64-30 28 22m-16-26 28 22m-16-26 28 22" className={styles.paper} />
      <path d="M205 206h78v8h-78Zm0 0 8-6h70v6" />
      <g className={art.rotate} style={{ transformOrigin: "174px 98px", "--art-angle": "-8deg" } as CSSProperties}>
        <path d="M142 101c-2-32 27-53 54-43m-11-15 11 15-18 4m22 7c26 20 19 53-6 66m18 1-18-1 5-17m-21 23c-28 10-52-6-56-27m-10 15 10-15 12 13" pathLength={1} className={`${styles.accent} ${art.draw}`} />
      </g>
    </g>}
  </svg>;
}

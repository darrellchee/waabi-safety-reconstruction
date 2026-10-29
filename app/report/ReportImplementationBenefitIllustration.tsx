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
    <path d={`M${x + 15} ${y + 27}h13`} className={styles.accent} />
  </g>;
}

export function ReportImplementationBenefitIllustration({ benefit }: { benefit: number }) {
  return <svg className={styles.stageIllustration} viewBox="0 0 320 240" fill="none"
    aria-hidden="true" focusable="false" data-community-benefit-illustration={benefit + 1}>
    <path d="M28 216h264" className={styles.ground} />

    {benefit === 0 && <>
      <Person x={84} />
      <path d="M84 94 64 116 76 141m8-47 39 23 35 16m-89-48q-16 0-16 19v35h18V91" className={styles.figure} />
      <g className={styles.props}>
        <path d="m158 84 47-16 47 16v59q0 44-47 69-47-25-47-69Z" className={styles.paper} />
        <path d="m183 136 17 17 31-38" className={`${styles.accent} ${art.draw}`} pathLength={1} />
      </g>
    </>}

    {benefit === 1 && <>
      <g className={styles.figure}>
        <circle cx="82" cy="105" r="16" className={styles.paper} />
        <path d="m82 123 12 37m0 0-29 25-22 27m51-52 32 34 19 18M82 137l-19 20 11 15" />
      </g>
      <g className={styles.props}>
        <path d="M142 187v-40l20-15 17-35h64l25 35h17v55Z" className={styles.paper} />
        <path d="m183 107-13 25h34v-25Zm31 0v25h42l-18-25Zm-4 34h12m-79 30h16m111 0h15" />
        <circle cx="169" cy="196" r="16" className={styles.paper} />
        <circle cx="261" cy="196" r="16" className={styles.paper} />
        <circle cx="169" cy="196" r="5" />
        <circle cx="261" cy="196" r="5" />
      </g>
      <g className={art.rotate} style={{ transformOrigin: "82px 137px", "--art-angle": "-3deg" } as CSSProperties}>
        <path d="M82 137l35 26 32 41" className={styles.figure} />
        <path d="m140 210 40-8 3 7-40 8Zm8-2 2 7m8-9 2 7m8-9 2 7" className={`${styles.props} ${styles.accent}`} />
      </g>
    </>}

    {benefit === 2 && <>
      <Person x={86} />
      <path d="M86 94 66 116 78 141M71 85q-16 0-16 19v35h18V91" className={styles.figure} />
      <g className={styles.props}>
        <path d="M182 68v144m96-144v144m-96-80h96m-96 64h96" />
        <path d="M191 101h20v31h-20Zm5 0v-7h10v7M230 101h20v31h-20Zm5 0v-7h10v7" className={styles.paper} />
        <path d="M198 155h65v41h-65Zm20 0v-8h25v8" className={styles.paper} />
        <path d="M230 164v23m-11-12h22" className={`${styles.accent} ${art.draw}`} pathLength={1} />
        <path d="M184 121h20m17 0h20" className={styles.accent} />
      </g>
      <g className={art.rotate} style={{ transformOrigin: "86px 94px", "--art-angle": "-5deg" } as CSSProperties}>
        <path d="M86 94l36 14 36 11" className={styles.figure} />
        <path d="M158 115h20v36h-20Zm5 0v-7h10v7" className={`${styles.props} ${styles.paper}`} />
      </g>
    </>}

    {benefit === 3 && <>
      <Person x={84} ranger />
      <path d="M84 94 63 116 51 134m33-40 40 18 57 0" className={styles.figure} />
      <g className={styles.props}>
        <path d="M33 126h34v59H33Zm8 0v-7h18v7" className={styles.paper} />
        <path d="m40 141 4 4 10-11" className={`${styles.accent} ${art.draw}`} pathLength={1} />
        <path d="m40 160 4 4 10-11" className={`${styles.accent} ${art.draw}`} pathLength={1} />
        <circle cx="225" cy="117" r="44" className={styles.paper} />
        <path d="M225 79v6m38 32h-6m-32 38v-6m-38-32h6" />
        <path d="M225 92v25l21 14" className={`${styles.accent} ${art.spin}`} style={{ transformBox: "view-box", transformOrigin: "225px 117px" }} />
        <path d="m206 179 9 9 19-23" className={`${styles.accent} ${art.draw}`} pathLength={1} />
      </g>
    </>}

    {benefit === 4 && <>
      <Person x={72} />
      <Person x={248} ranger />
      <path d="M72 94 52 120 66 142M248 94l-37 24-30 29m67-53 20 26-14 22" className={styles.figure} />
      <g className={art.rotate} style={{ transformOrigin: "72px 94px", "--art-angle": "-4deg" } as CSSProperties}>
        <path d="M72 94 105 105 146 114" className={styles.figure} />
        <g className={styles.props}>
          <circle cx="156" cy="113" r="12" fill="#ff286b" />
          <path d="M156 105v16m4-12c-7-5-12 2-4 5s3 9-5 4" stroke="#faf9f5" strokeWidth="2" />
        </g>
      </g>
      <Kit x={139} y={146} />
      <g className={styles.props}>
        <path d="M123 186h80m-70 0v26m60-26v26" />
      </g>
    </>}

    {benefit === 5 && <>
      <Person x={238} ranger />
      <path d="M238 94 213 110 194 117m44-23 22 22-11 25" className={styles.figure} />
      <g className={styles.props}>
        <path d="M68 132h64v14l13 16v39q0 11-11 11H66q-11 0-11-11v-39l13-16Zm0 14h64" className={styles.paper} />
        <path d="M84 132h32m-38 44 22-17 22 17m-38-4v24h32v-24" />
        <path d="m91 184 7 6 13-15" className={`${styles.accent} ${art.draw}`} pathLength={1} />
        <path d="M151 117h35m-10-10 10 10-10 10" className={`${styles.accent} ${art.draw}`} pathLength={1} />
        <g className={art.move} style={{ "--art-y": "20px" } as CSSProperties}>
          <circle cx="100" cy="88" r="18" fill="#ff286b" />
          <path d="M100 76v24m6-19c-11-8-18 3-6 7s5 13-7 6" stroke="#faf9f5" strokeWidth="2.5" />
        </g>
      </g>
    </>}
  </svg>;
}

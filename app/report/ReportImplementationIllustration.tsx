import styles from "./ReportImplementation.module.css";

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

// Static scenes use the same palette, proportions and rounded linework as 7.3.
export function ReportImplementationIllustration({ step }: { step: number }) {
  return <svg className={styles.stageIllustration} viewBox="0 0 320 240" fill="none"
    aria-hidden="true" focusable="false" data-implementation-illustration={step + 1}>
    <path d="M28 216h264" className={styles.ground} />

    {step === 0 && <>
      <Person x={72} />
      <Person x={248} />
      <path d="M72 94 102 114 136 130m-64-36-20 26 14 22M248 94 219 113 183 135m65-41 20 26-14 22" className={styles.figure} />
      <g className={styles.props}>
        <path d="M111 156h98m-89 0v56m80-56v56" />
        <path d="m121 119 66 0 14 34h-66Z" className={styles.paper} />
        <path d="m144 134 13-10 15 10m-25-2v13h21v-13m-14 13v-8h7v8" />
        <path d="m183 135 8-18" />
      </g>
    </>}

    {step === 1 && <>
      <Person x={84} />
      <path d="M84 94 63 116 75 141m9-47 42 21 45 22" className={styles.figure} />
      <g className={styles.props}>
        <path d="M141 161h142m-128 0v51m115-51v51" />
        <path d="m150 115 86 0 22 43h-86Z" className={styles.paper} />
        <path d="M165 123h31m-25 28h59m-59-14 11-6 6 6 8-3m-26 10 10-4 5 5 9-3m-23-5 8-20" />
        <path d="m210 137 7 7 13-16" className={styles.accent} />
        <rect x="202" y="38" width="64" height="51" rx="3" className={styles.paper} />
        <path d="M202 52h64m-50-20v12m36-12v12M224 52v37m20-37v37m-42-18h64" />
      </g>
    </>}

    {step === 2 && <>
      <Person x={70} ranger />
      <Person x={250} />
      <path d="M70 94 101 116 139 137m-69-43-19 25 14 22M250 94 219 116 181 137m69-43 19 25-14 22m10-56q16 0 16 19v35h-18V91" className={styles.figure} />
      <g className={styles.props}>
        <path d="M123 180h80m-70 0v32m60-32v32" />
        <path d="M135 81h50m-11-10 11 10-11 10" className={styles.accent} />
      </g>
      <Kit x={139} y={132} />
    </>}

    {step === 3 && <>
      <Person x={104} ranger />
      <path d="M104 94 82 116 93 141m11-47 47-16 38 23" className={styles.figure} />
      <g className={styles.props}>
        <path d="M182 68v144m96-144v144m-96-83h96m-96 61h96" />
        <path d="M240 99h23v30h-23Zm5 0v-7h13v7M196 159h27v31h-27Zm38 3h29v28h-29Z" className={styles.paper} />
        <path d="M202 167h15m22 3h18" />
        <path d="M189 99h40v30h-40Zm12 0v-6h16v6" className={styles.paper} />
        <path d="M199 109v11m10-11v11m10-11v11" className={styles.accent} />
      </g>
    </>}

    {step === 4 && <>
      <Person x={64} ranger />
      <Person x={133} ranger />
      <path d="M64 94 45 113 42 129m22-35 17 19 5 21M133 94 111 116 115 140m18-46 28 25 17 23" className={styles.figure} />
      <g className={styles.props}>
        <path d="M25 123h30v59H25Zm7 0v-7h16v7" className={styles.paper} />
        <path d="m31 138 4 4 9-10m-13 25 4 4 9-10" className={styles.accent} />
        <path d="m199 92 41-34 42 34m-75-6v96h66V86m-54 96v30m42-30v30m-54-30h66" />
        <path d="M231 182v-40h20v40m-35-77h14v18h-14Zm26 0h14v18h-14Z" className={styles.paper} />
        <path d="m178 142 13-13" />
        <circle cx="199" cy="121" r="13" className={styles.lens} />
        <path d="m194 118 3-3" className={styles.detail} />
      </g>
    </>}

    {step === 5 && <g className={styles.props}>
      <path d="M46 97v115m75-115v115m-75-60h75m-75 59h75" />
      <Kit x={60} y={114} />
      <path d="M62 170h43v39H62Zm9 9h25m-25 9h25" className={styles.paper} />
      <path d="m205 160 48-16 28 22-48 16Zm0 10 28 22 48-16m-76 4 28 22 48-16m-64-30 28 22m-16-26 28 22m-16-26 28 22" className={styles.paper} />
      <path d="M205 206h78v8h-78Zm0 0 8-6h70v6" />
      <path d="M142 101c-2-32 27-53 54-43m-11-15 11 15-18 4m22 7c26 20 19 53-6 66m18 1-18-1 5-17m-21 23c-28 10-52-6-56-27m-10 15 10-15 12 13" className={styles.accent} />
    </g>}
  </svg>;
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
        <path d="m183 136 17 17 31-38" className={styles.accent} />
      </g>
    </>}

    {benefit === 1 && <>
      <g className={styles.figure}>
        <circle cx="82" cy="105" r="16" className={styles.paper} />
        <path d="m82 123 12 37m0 0-29 25-22 27m51-52 32 34 19 18M82 137l35 26 32 41m-67-67-19 20 11 15" />
      </g>
      <g className={styles.props}>
        <path d="M142 187v-40l20-15 17-35h64l25 35h17v55Z" className={styles.paper} />
        <path d="m183 107-13 25h34v-25Zm31 0v25h42l-18-25Zm-4 34h12m-79 30h16m111 0h15" />
        <circle cx="169" cy="196" r="16" className={styles.paper} />
        <circle cx="261" cy="196" r="16" className={styles.paper} />
        <circle cx="169" cy="196" r="5" />
        <circle cx="261" cy="196" r="5" />
        <path d="m140 210 40-8 3 7-40 8Zm8-2 2 7m8-9 2 7m8-9 2 7" className={styles.accent} />
      </g>
    </>}

    {benefit === 2 && <>
      <Person x={86} />
      <path d="M86 94 66 116 78 141m8-47 36 14 36 11m-87-34q-16 0-16 19v35h18V91" className={styles.figure} />
      <g className={styles.props}>
        <path d="M182 68v144m96-144v144m-96-80h96m-96 64h96" />
        <path d="M158 115h20v36h-20Zm5 0v-7h10v7M191 101h20v31h-20Zm5 0v-7h10v7M230 101h20v31h-20Zm5 0v-7h10v7" className={styles.paper} />
        <path d="M198 155h65v41h-65Zm20 0v-8h25v8" className={styles.paper} />
        <path d="M230 164v23m-11-12h22m-57-54h20m17 0h20" className={styles.accent} />
      </g>
    </>}

    {benefit === 3 && <>
      <Person x={84} ranger />
      <path d="M84 94 63 116 51 134m33-40 40 18 57 0" className={styles.figure} />
      <g className={styles.props}>
        <path d="M33 126h34v59H33Zm8 0v-7h18v7" className={styles.paper} />
        <path d="m40 141 4 4 10-11m-14 26 4 4 10-11" className={styles.accent} />
        <circle cx="225" cy="117" r="44" className={styles.paper} />
        <path d="M225 79v6m38 32h-6m-32 38v-6m-38-32h6" />
        <path d="M225 92v25l21 14m-40 48 9 9 19-23" className={styles.accent} />
      </g>
    </>}

    {benefit === 4 && <>
      <Person x={72} />
      <Person x={248} ranger />
      <path d="M72 94 105 105 146 114m-74-20-20 26 14 22M248 94l-37 24-30 29m67-53 20 26-14 22" className={styles.figure} />
      <Kit x={139} y={146} />
      <g className={styles.props}>
        <path d="M123 186h80m-70 0v26m60-26v26" />
        <circle cx="156" cy="113" r="12" fill="#ff286b" />
        <path d="M156 105v16m4-12c-7-5-12 2-4 5s3 9-5 4" stroke="#faf9f5" strokeWidth="2" />
      </g>
    </>}

    {benefit === 5 && <>
      <Person x={238} ranger />
      <path d="M238 94 213 110 194 117m44-23 22 22-11 25" className={styles.figure} />
      <g className={styles.props}>
        <path d="M68 132h64v14l13 16v39q0 11-11 11H66q-11 0-11-11v-39l13-16Zm0 14h64" className={styles.paper} />
        <path d="M84 132h32m-38 44 22-17 22 17m-38-4v24h32v-24" />
        <path d="m91 184 7 6 13-15M151 117h35m-10-10 10 10-10 10" className={styles.accent} />
        <circle cx="100" cy="88" r="18" fill="#ff286b" />
        <path d="M100 76v24m6-19c-11-8-18 3-6 7s5 13-7 6" stroke="#faf9f5" strokeWidth="2.5" />
      </g>
    </>}
  </svg>;
}

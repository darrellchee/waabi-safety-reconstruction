import styles from "./ReportImplementation.module.css";

export const evaluationCards = [
  { title: "Collect feedback", subtitle: "Ask tourists and residents about their experience." },
  { title: "Satisfaction target", subtitle: "Aim for at least 80% satisfaction." },
  { title: "Monthly equipment checks", subtitle: "Inspect rental equipment every month." },
  { title: "Repair or replace", subtitle: "Repair damaged items or replace them." },
  { title: "Wet-season reviews", subtitle: "Check conditions before and after the wet season." },
  { title: "Annual financial review", subtitle: "Track yearly spending and income for sustainable operation." },
];

function Evaluator({ x, ranger = false }: { x: number; ranger?: boolean }) {
  return <g className={styles.figure}>
    <circle cx={x} cy="54" r="16" className={styles.paper} />
    <path d={`M${x} 72v76m0 0-21 64m21-64 25 64`} />
    {ranger && <>
      <path d={`M${x - 24} 42h48m-38-1 3-13h22l4 13`} />
      <path d={`m${x - 7} 79 7 9 7-9`} />
    </>}
  </g>;
}

export function ReportEvaluationIllustration({ step }: { step: number }) {
  return <svg className={styles.stageIllustration} viewBox="0 0 320 240" fill="none"
    aria-hidden="true" focusable="false" data-evaluation-illustration={step + 1}>
    <path d="M28 216h264" className={styles.ground} />

    {step === 0 && <>
      <Evaluator x={72} />
      <Evaluator x={248} />
      <path d="M72 94 106 114 139 135m-67-41-20 26 14 22M248 94l-32 24-36 25m68-49 20 26-14 22m-197-57q-16 0-16 19v35h18V91" className={styles.figure} />
      <g className={styles.props}>
        <path d="M137 119h46v69h-46Zm12 0v-7h22v7" className={styles.paper} />
        <path d="M148 135h24m-24 10h16m-16 10h24m-24 10h16" />
        <path d="M113 42h72q10 0 10 10v22q0 10-10 10h-37l-15 11V84h-20q-10 0-10-10V52q0-10 10-10Z" className={styles.paper} />
        <path d="M117 57h51m-51 13h38" className={styles.accent} />
      </g>
    </>}

    {step === 1 && <g className={styles.props}>
      <circle cx="149" cy="119" r="65" className={styles.paper} />
      <circle cx="149" cy="119" r="42" />
      <circle cx="149" cy="119" r="17" className={styles.accent} />
      <path d="M123 179v33m52-33v33m-65 0h78" />
      <path d="M237 40 149 119m2-20-2 20 20-2m42-55 18 2-2-18" className={styles.accent} />
    </g>}

    {step === 2 && <>
      <Evaluator x={84} ranger />
      <path d="M84 94 64 116 76 141m8-47 42 23 47 22" className={styles.figure} />
      <g className={styles.props}>
        <rect x="215" y="39" width="64" height="51" rx="3" className={styles.paper} />
        <path d="M215 53h64m-50-20v12m36-12v12m-41 21h11m12 0h11m-34 13h11" />
        <path d="m247 77 5 5 12-14" className={styles.accent} />
        <path d="M184 188h99m-89 0v24m79-24v24M203 147h60v38h-60Zm16 0v-12h28v12m-44 11h60m-11 0v8h-10v-8" className={styles.paper} />
        <path d="M226 176h14" className={styles.accent} />
        <path d="m173 139 13-14" />
        <circle cx="196" cy="114" r="15" className={styles.lens} />
        <path d="m190 111 4-4" className={styles.detail} />
      </g>
    </>}

    {step === 3 && <g className={styles.props}>
      <path d="M46 130h62v64H46Zm16 0v-13h30v13m-46 30h62M211 130h62v64h-62Zm16 0v-13h30v13m-46 30h62" className={styles.paper} />
      <path d="m80 141-10 17 14 11-12 16m156-11 8 8 19-23M126 163h65m-10-10 10 10-10 10" className={styles.accent} />
      <path d="m136 83 20-20q-3-12 9-19l2 14 12 3 10-10q6 15-10 20l-24 25Z" className={styles.paper} />
      <path d="m133 77 21 21m-8-27 18 18" />
    </g>}

    {step === 4 && <g className={styles.props}>
      <circle cx="76" cy="56" r="14" className={styles.accent} />
      <path d="M76 31v-7m0 64v-7M51 56h-7m64 0h-7M58 38l-5-5m46 46-5-5M58 74l-5 5m46-46-5 5" className={styles.accent} />
      <path d="M222 72h49q13 0 13-12 0-11-12-12-1-16-17-16-11 0-15 10-18-3-23 10-12 2-12 11 0 9 17 9Z" className={styles.paper} />
      <path d="m223 84-4 7m23-7-4 7m23-7-4 7" className={styles.accent} />
      <path d="m31 125 45-34 45 34m-82-6v70h74v-70m-63 70v23m52-23v23m-63-23h74M199 125l45-34 45 34m-82-6v70h74v-70m-63 70v23m52-23v23m-63-23h74" />
      <path d="m61 151 10 10 19-23m139 13 10 10 19-23M135 150h49m-10-10 10 10-10 10m-29-20-10 10 10 10" className={styles.accent} />
    </g>}

    {step === 5 && <>
      <Evaluator x={84} ranger />
      <path d="M84 94 64 116 76 141m8-47 39 23 40 19" className={styles.figure} />
      <g className={styles.props}>
        <path d="M142 177h142m-130 0v35m118-35v35" />
        <path d="m152 120 58-6 13 48-58 6Zm58-6 58 6 12 48-57-6Z" className={styles.paper} />
        <path d="m170 131 28-3m-25 13 28-3m-25 13 28-3m20-20 29 3m-26 7 29 3m-26 7 29 3" />
        <path d="m177 158 28-3m25 0 29 3" className={styles.accent} />
        <rect x="203" y="34" width="75" height="56" rx="3" className={styles.paper} />
        <path d="M203 48h75m-61-20v12m47-12v12m-42 8v42m19-42v42m19-42v42m-57-28h75m-75 14h75" />
      </g>
    </>}
  </svg>;
}

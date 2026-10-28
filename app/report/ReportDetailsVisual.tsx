import { useId } from "react";
import Image from "next/image";
import needsIllustration from "./assets/project-details-needs.webp";
import styles from "./ReportDetailsVisual.module.css";

export const detailsVisuals = [
  {
    title: "The setting",
    description: "Simplified location diagram of Cape York Peninsula, showing Coen and access towards Warokutal at Port Stewart in Lama Lama Country. The highlighted road represents access affected by wet season flooding; it does not show current road conditions or Country boundaries.",
  },
  {
    title: "From disruption to support",
    description: "Four connected steps: flooding closes roads, travellers become stranded, the supply point provides essentials and communication, and visitors manage the disruption. The intended outcome is fewer high risk ranger interventions and protection of cultural and environmental assets.",
  },
  {
    title: "The supply point",
    description: "An elevated shelter with a raised floor and supporting piles. Labels identify water and long shelf life rations, radios and personal locator beacons, and vehicle recovery equipment.",
  },
  {
    title: "Dependable access to essentials",
    description: "Concept illustration of two travellers at an elevated supply shelter in remote bushland. One accesses water and food while the other uses a handheld radio. Recovery equipment is stored below the shelves, a four-wheel-drive is parked on dry ground, and an eroded road is visible in the distance.",
  },
];

function Location() {
  return <>
    <path d="M94 405 106 354 128 311 143 260 156 204 174 161 194 115 204 86 217 127 226 166 250 207 260 243 280 277 286 312 310 335 331 373 345 405Z" fill="#dce5d3" stroke="#596b50" strokeWidth="2" />
    <text x="54" y="69" className={styles.small}>CAPE YORK PENINSULA</text>
    <path d="M196 160 205 223 217 279 215 334 205 398" fill="none" stroke="#94a488" strokeWidth="3" strokeDasharray="5 7" />
    <circle cx="217" cy="279" r="5" fill="#324a30" />
    <text x="159" y="270">Coen</text>
    <path d="M217 279 240 296 270 303 286 312" fill="none" stroke="#ac653e" strokeWidth="4" strokeLinecap="round" />
    <circle cx="286" cy="312" r="10" fill="#fffdf5" stroke="#ac653e" strokeWidth="3" />
    <path d="M293 305 340 247h122" fill="none" stroke="#596b50" strokeWidth="1.5" />
    <text x="338" y="184" className={styles.emphasis}>Warokutal</text>
    <text x="338" y="210">Port Stewart</text>
    <text x="338" y="235" className={styles.small}>Lama Lama Country</text>
    <path d="M260 303 346 349h116" fill="none" stroke="#ac653e" strokeWidth="1.5" />
    <text x="347" y="376" className={styles.small}>Road access</text>
    <path d="M44 445h26" stroke="#ac653e" strokeWidth="4" strokeLinecap="round" />
    <text x="83" y="451" className={styles.small}>Wet season flooding can disrupt access</text>
    <path d="M481 92V54m-6 9 6-9 6 9" fill="none" stroke="#596b50" strokeWidth="2" />
    <text x="474" y="42" className={styles.small}>N</text>
  </>;
}

function SupplyPoint() {
  return <>
    <path d="M103 340v79h16v-79m150 0v79h16v-79m150 0v79h16v-79" fill="#b8c5ae" stroke="#53684a" strokeWidth="2" />
    <path d="M88 190h382v150H88Z" fill="#fffdf5" stroke="#53684a" strokeWidth="2" />
    <path d="m70 190 47-57h320l51 57Z" fill="#b8cbaa" stroke="#53684a" strokeWidth="2" strokeLinejoin="round" />
    <path d="M80 340h398v12H80Z" fill="#a0b18f" stroke="#53684a" strokeWidth="2" />
    <path d="M106 216h127v108H106Zm0 54h127" fill="#e5ece0" stroke="#53684a" strokeWidth="2" />
    {[122, 160, 198].map(x => <g key={x} fill="#9bb9c3" stroke="#53684a" strokeWidth="1.5"><rect x={x} y="235" width="20" height="28" rx="3" /><path d={`M${x + 6} 235v-7h8v7`} /></g>)}
    {[121, 157, 193].map(x => <rect key={x} x={x} y="286" width="25" height="26" rx="3" fill="#d7c49b" stroke="#8b7652" />)}
    <rect x="264" y="222" width="66" height="50" rx="5" fill="#e1e9db" stroke="#53684a" strokeWidth="2" />
    <path d="M277 234h12v25h-12Zm25 0h12v25h-12Zm-19 0v-16m25 16v-11" fill="#9eae90" stroke="#53684a" strokeWidth="2" />
    <rect x="350" y="276" width="96" height="46" rx="6" fill="#d7c49b" stroke="#8b7652" strokeWidth="2" />
    <path d="M382 276v-9h30v9m-29 24h29" fill="none" stroke="#8b7652" strokeWidth="2" />
    <path d="M169 236V86H40m257 138V60h180M399 298h100v123M109 380H40v41" fill="none" stroke="#738467" strokeWidth="1.5" />
    <text x="40" y="55">Water + long shelf</text><text x="40" y="78">life rations</text>
    <text x="329" y="45">Radios + PLBs</text>
    <text x="340" y="443">Vehicle recovery</text><text x="340" y="466">equipment</text>
    <text x="40" y="443">Raised floor</text>
    
    <text x="40" y="486" className={styles.small}>Essential supplies in one place</text>
  </>;
}

function Response() {
  const steps = [
    ["01", "Flooding closes roads", "Unsealed access becomes unusable"],
    ["02", "Travellers become stranded", "Supplies and support may be far away"],
    ["03", "Access the supply point", "Essentials, communication + recovery kits"],
    ["04", "Manage the disruption", "Reduce the need for risky interventions"],
  ];
  return <>
    {steps.map(([number, title, detail], i) => <g key={number}>
      <rect x="32" y={36 + i * 100} width="496" height="78" rx="10" fill={i < 2 ? "#f1e8dd" : "#e1ead9"} stroke={i < 2 ? "#d8c6b0" : "#b4c5a8"} />
      <text x="49" y={66 + i * 100} className={styles.small}>{number}</text>
      <text x="88" y={66 + i * 100} className={styles.stepTitle}>{title}</text>
      <text x="88" y={93 + i * 100} className={styles.small}>{detail}</text>
      {i < 3 && <path d={`M280 ${118 + i * 100}v14m-5-5 5 5 5-5`} fill="none" stroke="#738467" strokeWidth="2" />}
    </g>)}
    <text x="280" y="458" textAnchor="middle" className={styles.small}>Protect cultural + environmental assets</text>
  </>;
}

export function ReportDetailsVisual({ current }: { current: number }) {
  const id = useId();
  const visual = detailsVisuals[current];
  return <figure className={styles.figure} data-nocount="">
    <div className={styles.heading}><span>0{current + 1}</span>{visual.title}</div>
    {current === 3 ? <Image className={styles.diagram} src={needsIllustration} alt={visual.description} sizes="(max-width: 767px) 332px, 398px" /> : <svg className={styles.diagram} viewBox="0 0 560 490" role="img" aria-labelledby={`${id}-title ${id}-description`}>
      <title id={`${id}-title`}>{visual.title}</title>
      <desc id={`${id}-description`}>{visual.description}</desc>
      {current === 0 ? <Location /> : current === 1 ? <Response /> : <SupplyPoint />}
    </svg>}
  </figure>;
}

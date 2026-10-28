import type { ReactNode } from "react";
import styles from "./ReportOverviewDiagram.module.css";

export const overviewDiagrams = [
  { title: "Raised for resilience", description: "Side elevation of Provisions Point: a building on reinforced concrete piles, with its floor 2 m above ground, a seasonal Ranger service area and an emergency cabinet available at all times. The dimension measures ground to floor, not flood clearance." },
  { title: "A locally supported facility", description: "Operating cycle: community partnerships support stocking, Lama Lama Rangers staff the visitor season, and routine maintenance keeps the durable building ready. Clear signage guides users during flooding." },
  { title: "Supplies, equipment and power", description: "Cutaway of the building showing watertight concrete walls, corrugated fibre cement roofing, solar-powered lighting and charging, drinking water, food, firewood, first aid, recovery kits, personal locator beacons and UHF radios." },
  { title: "Support when roads close", description: "Visitors, Traditional Owners and Rangers travelling through Warokutal face unusable unsealed roads during or after severe floods. At Provisions Point they can obtain essential supplies and communication or vehicle recovery equipment, with an emergency cabinet available outside staffed hours." },
];

function Label({ x, y, children, muted = false }: { x: number; y: number; children: ReactNode; muted?: boolean }) {
  return <text x={x} y={y} fill={muted ? "#625f56" : "#20251e"} fontSize="19">{children}</text>;
}

function Arrow({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y}v28m-7-7 7 7 7-7`} fill="none" stroke="#647c5b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />;
}

function Building({ cutaway = false }: { cutaway?: boolean }) {
  return <g stroke="#303a2c" strokeWidth="2.5" strokeLinejoin="round">
    <path d="M135 440v112h20V440m140 0v112h20V440m140 0v112h20V440" fill="#c8cdc2" />
    <path d="M112 279h376v161H112z" fill={cutaway ? "#fffdf5" : "#dce2d3"} />
    <path d="m92 279 59-65h297l60 65Z" fill="#b8c9aa" />
    {[168, 204, 240, 276, 312, 348, 384, 420, 456].map(x => <path key={x} d={`m${x} 220-24 52`} stroke="#869b76" strokeWidth="1.5" />)}
    <path d="M102 440h396v13H102z" fill="#aebba2" />
    {cutaway ? <>
      <path d="M134 310h146v112H134zM134 352h146m-146 36h146" fill="none" />
      <path d="M148 328h18v18h-18zm29-8h18v26h-18zm29 4h22v22h-22zm35 0h22v22h-22z" fill="#9eb8c3" />
      <path d="M148 365h38v16h-38zm52 0h26v16h-26zm39 0h25v16h-25z" fill="#c6b889" />
      <path d="m148 404 42-10 8 16-42 10zm59 0 42-10 8 16-42 10z" fill="#b79d7c" />
      <path d="M304 322h53v39h-53z" fill="#f2e7db" />
      <path d="M324 329h13v25h-13m-6-19h25v13h-25" fill="#af775d" stroke="none" />
      <path d="M379 331h88v85h-88z" fill="#e5eadc" />
      <path d="M392 347h13v23h-13zm29-3h13v26h-13zm26 3h10v23h-10zM399 347v-11m29 8v-13m24 16v-11" fill="#a4b495" />
      <path d="M315 390h43v26h-43z" fill="#c6b889" />
      <path d="M298 300h161m-81 0v12m-7 0h14" fill="none" />
    </> : <>
      <path d="M147 306h161v75H147z" fill="#f7f5e9" />
      <path d="M147 368h161" />
      <text x="162" y="335" fontSize="18" fill="#303a2c" stroke="none">RANGER</text>
      <text x="162" y="357" fontSize="18" fill="#303a2c" stroke="none">SERVICE</text>
      <path d="M344 307h107v111H344z" fill="#f7f5e9" />
      <path d="M360 328h75v56h-75z" fill="#d1b786" />
      <path d="M391 338h13v34h-13m-10-24h33v13h-33" fill="#fffdf5" stroke="none" />
    </>}
    <path d="M75 552h450" stroke="#9d9f8b" />
  </g>;
}

function Elevation() {
  return <>
    <Label x={40} y={141}>Raised floor · secure supplies</Label>
    <Building />
    <path d="M66 445v107m-7-100 7-7 7 7m-14 93 7 7 7-7M78 445h22M78 552h22" fill="none" stroke="#303a2c" strokeWidth="2" />
    <text x="49" y="520" transform="rotate(-90 49 520)" fontSize="18" fill="#303a2c">2 m</text>
    <path d="M222 304V179H40M400 385h140v180h-190" fill="none" stroke="#647c5b" strokeWidth="1.5" />
    <Label x={40} y={170}>Staffed in the visitor season</Label>
    <Label x={330} y={595}>Emergency cabinet</Label>
    <Label x={330} y={624} muted>Available at all times</Label>
    <Label x={40} y={595}>Reinforced concrete piles</Label>
    <Label x={40} y={624} muted>Dimension: ground to floor</Label>
  </>;
}

function Operations() {
  const steps = [
    ["01", "Community partnerships", "Support stocking and maintenance"],
    ["02", "Stock the essentials", "Water, food, firewood and first aid"],
    ["03", "Ranger operation", "Staffed during the visitor season"],
    ["04", "Maintain and replenish", "Care for the building and equipment"],
  ];
  return <>
    {steps.map(([number, title, detail], i) => <g key={number}>
      <rect x="40" y={133 + i * 110} width="520" height="82" rx="12" fill={i === 2 ? "#e0e8d7" : "#fffdf5"} stroke="#c3cbbb" />
      <text x="60" y={166 + i * 110} fontSize="18" fill="#647c5b">{number}</text>
      <text x="103" y={165 + i * 110} fontSize="23" fill="#20251e">{title}</text>
      <Label x={103} y={193 + i * 110} muted>{detail}</Label>
      {i < 3 && <Arrow x={300} y={215 + i * 110} />}
    </g>)}
    <path d="M40 588h520" stroke="#c3cbbb" />
    <Label x={40} y={621}>Clear signs guide users during flooding</Label>
  </>;
}

function Components() {
  return <>
    <Building cutaway />
    <path d="m270 229 25-35h113l-25 35Z" fill="#597b8a" stroke="#303a2c" strokeWidth="2" />
    <path d="m311 194-25 35m63-35-25 35m64-35-25 35m-81-18h113" stroke="#c2d4d6" strokeWidth="1.5" />
    <path d="M343 193v-40H40M453 246h85v-66M486 294h52v274" fill="none" stroke="#647c5b" strokeWidth="1.5" />
    <Label x={40} y={143}>Solar → lighting + charging</Label>
    <Label x={330} y={166}>Corrugated fibre cement roof</Label>
    <Label x={40} y={585}>Watertight concrete walls</Label>
    <Label x={40} y={615}>Water · food · firewood · first aid</Label>
    <text x="40" y="645" fontSize="18" fill="#625f56">Hire: recovery kits · locator beacons · UHF radios</text>
  </>;
}

function Users() {
  return <>
    <rect x="40" y="132" width="520" height="104" rx="12" fill="#e0e8d7" />
    <Label x={62} y={168}>Travelling through Warokutal</Label>
    <text x="62" y="201" fontSize="22" fill="#20251e">Visitors · Traditional Owners · Rangers</text>
    <Arrow x={300} y={242} />
    <rect x="40" y="278" width="520" height="95" rx="12" fill="#e2ebed" />
    <path d="M61 340q12-12 24 0t24 0t24 0" fill="none" stroke="#597b8a" strokeWidth="2" />
    <text x="62" y="312" fontSize="23" fill="#20251e">During or after severe floods</text>
    <Label x={150} y={345} muted>Unsealed roads become unusable</Label>
    <Arrow x={300} y={379} />
    <rect x="40" y="415" width="520" height="216" rx="12" fill="#fffdf5" stroke="#c3cbbb" />
    <text x="62" y="454" fontSize="27" fill="#20251e">Provisions Point</text>
    <Label x={62} y={494}>Essential supplies</Label>
    <Label x={62} y={526}>Communication + recovery equipment</Label>
    <path d="M62 550h476" stroke="#c3cbbb" />
    <Label x={62} y={580} muted>Outside staffed hours:</Label>
    <Label x={62} y={608}>Emergency cabinet available</Label>
  </>;
}

export function ReportOverviewDiagram({ index }: { index: number }) {
  const diagram = overviewDiagrams[index];
  return <svg className={styles.diagram} viewBox="0 0 600 680" role="img" aria-label={diagram.description}>
    <title>{diagram.title}</title>
    <desc>{diagram.description}</desc>
    <rect width="600" height="680" rx="12" fill="#f4f3eb" />
    <text x="40" y="47" fontSize="14" letterSpacing="2" fill="#647c5b">PROVISIONS POINT / 0{index + 1}</text>
    <text x="40" y="88" fontSize="30" fontWeight="600" fill="#20251e">{diagram.title}</text>
    {index === 0 ? <Elevation /> : index === 1 ? <Operations /> : index === 2 ? <Components /> : <Users />}
  </svg>;
}

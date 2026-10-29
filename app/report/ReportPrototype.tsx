import { ReportHeadingAnchor } from "./ReportHeadingAnchor";
import { Block, SectionBadge } from "./ReportCodes";
import { lines, text, title, status, parseTable } from "./blocks";
import styles from "./ReportPrototype.module.css";
import { FootprintComparison, MeasurementLocations, StorageZones, RevisionComparison } from "./ReportPrototypeDiagrams";

type Annotation = "supports" | "roof" | "storage";
function PrototypeImage({ number, alt, priority = false, annotation }: { number: number; alt: string; priority?: boolean; annotation?: Annotation }) {
  const dimensions: Record<number, [number, number]> = {
    1: [442, 300], 2: [460, 297], 3: [442, 300], 4: [458, 298],
    5: [578, 468], 6: [580, 322], 7: [580, 428],
  };
  const [width, height] = dimensions[number];
  const src = `/assets/report/prototype/proto-${number}.png`;
  return <figure className={styles.figure}>
    <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`${alt} Open full-size image in a new tab.`}>
      <div className={styles.imageFrame}>
        <img src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
        {annotation && <svg className={styles.overlay} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
          {annotation === "supports" && <><path d="M310 208H332M310 273H332M326 208V273M322 214L326 208L330 214M322 267L326 273L330 267" /><path d="M326 240H365V159" /><rect x="245" y="133" width="183" height="28" /><text x="254" y="152">Column section ≈ 2 m</text></>}
          {annotation === "roof" && <><path d="M355 112L392 145V164" /><rect x="221" y="164" width="223" height="28" /><text x="230" y="183">Roof-to-wall junction</text></>}
          {annotation === "storage" && <><path d="M212 150L170 202H40M270 150L350 241H431" /><rect x="12" y="203" width="139" height="28" /><text x="21" y="222">Supply shelves</text><rect x="268" y="242" width="180" height="28" /><text x="277" y="261">Table / work surface</text></>}
        </svg>}
      </div>
    </a>
    {annotation && <figcaption>{annotation === "supports" ? "Current prototype: column section described in the recorded measurements." : annotation === "roof" ? "Current prototype: visible roof-to-wall alignment." : "Current prototype: shelves and central work surface. Individual equipment items need clearer detail."}</figcaption>}
  </figure>;
}

function Copy({ code }: { code: string }) {
  return <><h2><ReportHeadingAnchor text={title(code)} />{title(code)}</h2>{lines(code).filter(line => !line.startsWith("|")).map(line => <p key={line}>{line}</p>)}</>;
}


function Footprint() {
  return <figure className={styles.diagram}>
    <svg viewBox="0 0 540 390" role="img" aria-label="Proposed revised rectangular footprint: 6 metres by 4 metres, an area of 24 square metres. Interior layout has not been set.">
      <rect x="130" y="45" width="330" height="220" rx="3" fill="#fff" stroke="#242327" strokeWidth="3" />
      <text x="295" y="143" textAnchor="middle" className={styles.largeLabel}>24 m²</text>
      <text x="295" y="176" textAnchor="middle">Proposed revision</text>
      <g className={styles.dimension}><path d="M130 282V318M460 282V318M130 302H460M140 297L130 302L140 307M450 297L460 302L450 307M105 45H69M105 265H69M85 45V265M80 55L85 45L90 55M80 255L85 265L90 255" /></g>
      <text x="295" y="340" textAnchor="middle">6 m</text><text x="49" y="161" textAnchor="middle">4 m</text>
    </svg>
    <figcaption>Proposed revision: 6 m × 4 m</figcaption>
  </figure>;
}

function WallSection() {
  return <figure className={styles.diagram}>
    <svg viewBox="0 0 480 310" role="img" aria-label="Schematic wall cross-section showing the recorded model wall thickness of approximately 19 centimetres. Not to scale.">
      <rect x="178" y="40" width="124" height="164" fill="#dedbd3" stroke="#242327" strokeWidth="3" />
      <g fill="#b7b3a9">{[60, 100, 140, 180].map(y => <g key={y}><circle cx="198" cy={y} r="4" /><circle cx="270" cy={y + 10} r="6" /><circle cx="233" cy={y + 5} r="3" /></g>)}</g>
      <g className={styles.dimension}><path d="M178 218V251M302 218V251M178 237H302M188 232L178 237L188 242M292 232L302 237L292 242" /></g>
      <text x="240" y="280" textAnchor="middle">≈ 19 cm</text>
    </svg>
    <figcaption>Modelled wall thickness</figcaption>
  </figure>;
}

export function ReportPrototype() {
  const results = parseTable("12.4");
  return <section id="prototyping" className={styles.prototype}>
    <SectionBadge n={12} />
    <div className={styles.purposeRow}>
      <Block code="12.1" status={status("12.1")} className={styles.copy}><h2><ReportHeadingAnchor text={title("12.1")} />{title("12.1")}</h2><p>{text("12.1")}</p></Block>
      <PrototypeImage number={2} priority alt="Exterior Blender model of Provisions Point showing the roof, raised supports and access ramp." />
    </div>
    <div className={styles.buildRow}>
      <Block code="12.2" status={status("12.2")} className={styles.copy}><h2><ReportHeadingAnchor text={title("12.2")} />{title("12.2")}</h2><p>{text("12.2")}</p></Block>
      <PrototypeImage number={3} alt="Side view of the Blender model showing the building and supporting piles." />
    </div>
    <Block code="12.3" status={status("12.3")} className={`${styles.copy} ${styles.testing}`}>
      <Copy code="12.3" />
      <ol className={styles.process} aria-label="Testing and revision process">
        {["Design requirement", "Measure or inspect", "Compare", "Record findings", "Revise", "Retest"].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}
      </ol>
    </Block>
    <Block code="12.5" status={status("12.5")} className={`${styles.copy} ${styles.testSection}`}>
      <div className={styles.areaIntro}><Copy code="12.5" /></div>
      <FootprintComparison />
      <div className={`${styles.checkGallery} ${styles.footprintPair}`}><Footprint /><PrototypeImage number={4} alt="Current Blender interior showing the layout before the proposed footprint revision." /></div>
    </Block>
    <Block code="12.6" status={status("12.6")} className={`${styles.copy} ${styles.testSection}`}>
      <Copy code="12.6" />
      <MeasurementLocations />
      <div className={`${styles.checkGallery} ${styles.measurementPair}`}><PrototypeImage number={3} annotation="supports" alt="Side view of the current Blender model with an indicative annotation identifying an approximately 2 m column section." /><WallSection /></div>
    </Block>
    <Block code="12.7" status={status("12.7")} className={`${styles.copy} ${styles.testSection} ${styles.roofSection}`}>
      <div className={`${styles.checkRow} ${styles.reverseRow}`}><div><Copy code="12.7" /></div><PrototypeImage number={2} annotation="roof" alt="Current exterior Blender model identifying the roof-to-wall junction." /></div>
      <figure className={`${styles.diagram} ${styles.roofDetail}`}>
        <svg viewBox="285 75 115 80" role="img" aria-label="Enlarged detail of the current Blender screenshot showing the roof edge and adjoining wall."><image href="/assets/report/prototype/proto-2.png" width="460" height="297" /></svg>
        <figcaption>Roof-to-wall junction: close-up<span>Enlarged from the current prototype screenshot.</span></figcaption>
      </figure>
    </Block>
    <Block code="12.8" status={status("12.8")} className={`${styles.copy} ${styles.testSection} ${styles.storageSection}`}>
      <div className={styles.checkRow}><div><Copy code="12.8" /></div><PrototypeImage number={4} annotation="storage" alt="Current Blender interior with labels identifying supply shelves and a central table or work surface." /></div>
      <StorageZones />
      <div className={styles.equipmentGallery}>{[1, 7, 5, 6].map(number => <PrototypeImage key={number} number={number} alt={number === 1 ? "Current model: close-up of equipment and supplies on shelving." : number === 7 ? "Current model: storage shelves, work table, bench and chair." : number === 5 ? "Current model: stored supplies and cooking equipment." : "Current model: recovery equipment."} />)}</div>
      <p className={styles.galleryCaption}>Current prototype equipment views: individual items will receive clearer shapes and labels in the next version.</p>
    </Block>
    <Block code="12.4" status={status("12.4")} className={`${styles.copy} ${styles.results}`}>
      <Copy code="12.4" />
      <RevisionComparison />
      <div className={styles.tableWrap}><table><caption>Recorded findings and planned next steps</caption><thead><tr>{results.head.map(cell => <th key={cell} scope="col">{cell}</th>)}</tr></thead><tbody>{results.rows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>
    </Block>
  </section>;
}

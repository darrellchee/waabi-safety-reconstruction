import styles from "./ReportPrototype.module.css";

// Equal drawing scales: 24 SVG units per metre. The unknown current outline
// is represented by an area-equivalent 3:2 rectangle, not measured dimensions.
const SCALE = 24;
const CURRENT_WIDTH = Math.sqrt(85.6 * 1.5) * SCALE;
const CURRENT_HEIGHT = Math.sqrt(85.6 / 1.5) * SCALE;

export function FootprintComparison() {
  return <figure className={`${styles.diagram} ${styles.newDiagram} ${styles.footprintComparison}`} aria-label="Same-scale comparison of approximate current and proposed areas; current outline is illustrative.">
    <div className={styles.comparisonGrid}>
      {[{ label: "Current prototype", area: "≈ 85.6 m²", w: CURRENT_WIDTH, h: CURRENT_HEIGHT, current: true }, { label: "Proposed revision", area: "24 m²", w: 6 * SCALE, h: 4 * SCALE, current: false }].map(item => <div key={item.label}>
        <svg viewBox="0 0 340 300" role="img" aria-label={`${item.label}: ${item.area}. Same drawing scale as the adjacent footprint.`}>
          <rect x={(340 - item.w) / 2} y={230 - item.h} width={item.w} height={item.h} fill={item.current ? "#fbe4ec" : "#eeede7"} stroke={item.current ? "#b41449" : "#242327"} strokeWidth="2" />
          <text x="170" y={230 - item.h / 2} textAnchor="middle" dominantBaseline="central" className={styles.largeLabel}>{item.area}</text>
          <path d="M110 257H230M110 251V263M230 251V263" stroke="#242327" fill="none" />
          <text x="170" y="287" textAnchor="middle">5 m</text>
        </svg>
        <p className={styles.diagramLabel}>{item.label}</p>
      </div>)}
    </div>
  </figure>;
}

export function MeasurementLocations() {
  return <figure className={`${styles.diagram} ${styles.newDiagram}`}>
    <figcaption>Measurement locations</figcaption>
    <svg viewBox="0 0 442 300" role="img" aria-label="Side-view screenshot with approximate check locations: 1, footprint at floor perimeter; 2, exposed column section; 3, wall thickness at a wall edge.">
      <image href="/assets/report/prototype/proto-3.png" width="442" height="300" />
      <g fill="none" stroke="#ff286b" strokeWidth="2"><path d="M145 205L204 183" /><path d="M342 257L291 244" /><path d="M360 140L326 153" /></g>
      {[[145,205,"1"],[342,257,"2"],[360,140,"3"]].map(([x,y,n]) => <g key={n}><circle cx={x} cy={y} r="13" fill="#faf9f5" stroke="#b41449" strokeWidth="1.5" /><text x={x} y={Number(y)+5} textAnchor="middle" style={{ fontSize: 15, fontWeight: 600 }}>{n}</text></g>)}
    </svg>
    <ol className={styles.measurementLegend}>
      <li><strong>Footprint: ≈ 85.6 m²</strong></li>
      <li><strong>Column section: ≈ 2 m</strong></li>
      <li><strong>Wall thickness: ≈ 19 cm</strong></li>
    </ol>
  </figure>;
}

export function StorageZones() {
  return <figure className={`${styles.diagram} ${styles.newDiagram}`}>
    <figcaption>Storage zoning plan</figcaption>
    <svg viewBox="0 0 640 490" role="img" aria-label="Approximate top-down storage zoning: shelves along the left and rear, central table and benches, a counter to the right, and indicative circulation around the table.">
      <rect x="45" y="35" width="550" height="410" fill="#faf9f5" stroke="#242327" strokeWidth="4" />
      <g fill="#e4d8be" stroke="#75654c" strokeWidth="1.5"><rect x="65" y="55" width="72" height="285" rx="2" /><rect x="180" y="55" width="170" height="65" rx="2" /><rect x="390" y="55" width="180" height="65" rx="2" /></g>
      <g stroke="#a19172" strokeWidth="1"><path d="M65 115H137M65 175H137M65 235H137M65 295H137M235 55V120M295 55V120M450 55V120M510 55V120" /></g>
      <rect x="490" y="170" width="80" height="235" rx="2" fill="#dce5e1" stroke="#486355" strokeWidth="1.5" />
      <rect x="237" y="210" width="168" height="88" rx="3" fill="#e6c9a8" stroke="#826347" strokeWidth="2" />
      <g fill="#c79f75"><rect x="237" y="187" width="168" height="12" rx="2" /><rect x="237" y="310" width="168" height="12" rx="2" /></g>
      <path d="M174 367V161H449V367Z" fill="none" stroke="#b41449" strokeWidth="2" strokeDasharray="8 7" />
      <g fill="#b41449">{[[174,350],[449,340],[325,161]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />)}</g>
      <text x="101" y="203" textAnchor="middle" transform="rotate(-90 101 203)">Supply shelves</text>
      <text x="265" y="95" textAnchor="middle">Shelves</text><text x="480" y="95" textAnchor="middle">Shelves</text>
      <text x="321" y="260" textAnchor="middle">Work table</text>
      <text x="530" y="288" textAnchor="middle" transform="rotate(-90 530 288)">Counter / supplies</text>
      <text x="313" y="404" textAnchor="middle" fill="#b41449">Indicative circulation</text>
    </svg>
    <p className={styles.diagramNote}>Shelf runs, the central table and benches follow visible features. The dashed route is a suggested circulation zone.</p>
  </figure>;
}

export function RevisionComparison() {
  return <figure className={`${styles.diagram} ${styles.newDiagram}`}>
    <figcaption>Before and after: planned revision<span>The current model is shown on the left. The proposed version is a schematic, not a completed Blender model.</span></figcaption>
    <div className={styles.comparisonGrid}>
      <div><div className={styles.revisionFrame}><img src="/assets/report/prototype/proto-2.png" width="460" height="297" loading="lazy" alt="Current Blender prototype before the planned size reduction." /></div><p className={styles.diagramLabel}>Current: ≈ 85.6 m²</p></div>
      <div><div className={styles.revisionFrame}><svg viewBox="0 0 460 297" role="img" aria-label="Schematic proposed smaller building: a 6 by 4 metre footprint, raised supports and an indicative interior with shelves and a central table. Not a validated redesign.">
        <g fill="#d9d5cc" stroke="#242327" strokeWidth="2" strokeLinejoin="round"><path d="M121 188V235L132 241V194M207 218V260L218 266V222M329 158V204L340 210V165" /><path d="M105 166L232 209L355 154L228 113Z" fill="#eee9dd" /><path d="M105 166V88L228 42V113M228 42L355 85V154" fill="#e8e5de" /></g>
        <g fill="#d4bb91" stroke="#826347" strokeWidth="1.5"><path d="M139 118V151L191 169V136Z" /><path d="M139 132L191 150M139 143L191 161" /><path d="M209 157L244 170L275 156L240 144Z" /><path d="M213 160V182M244 173V192M271 159V179" /></g>
        <path d="M94 79L228 24L368 74L355 85L228 42L105 88Z" fill="#bfc9ca" stroke="#242327" strokeWidth="2" />
        <path d="M105 246L232 289M108 241L102 251M235 284L229 294" stroke="#b41449" strokeWidth="2" fill="none" />
        <text x="152" y="286">6 m</text><text x="340" y="245" textAnchor="middle">6 × 4 m</text>
      </svg></div><p className={styles.diagramLabel}>Proposed: 24 m²</p></div>
    </div>
    <p className={styles.diagramNote}>Reduce the footprint, clarify equipment and recheck storage and circulation. Interior positions in the proposed schematic are illustrative.</p>
  </figure>;
}

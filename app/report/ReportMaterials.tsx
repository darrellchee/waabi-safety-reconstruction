"use client";

import { ReportHeadingAnchor } from "./ReportHeadingAnchor";

import { useState, type CSSProperties } from "react";
import { Block } from "./ReportCodes";
import { lines, parseTable, status, title } from "./blocks";
import styles from "./ReportMaterials.module.css";
import photos from "./materials-photos.json";

const colours = ["#754b38", "#486b71", "#996126", "#616d39", "#755a85", "#355d86", "#81734b"];

export function ReportMaterials() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const active = hovered ?? focused ?? pinned;
  const table = parseTable("2.10");
  const items = table.rows.map(([name, cost], i) => ({ name, cost, value: Number(cost.replace(/[^\d.]/g, "")), colour: colours[i], photo: photos.find(photo => photo.item === name) }));
  const subtotal = items.reduce((sum, item) => sum + item.value, 0);
  const [total] = lines("2.11");
  return <section className={styles.summary} aria-labelledby="materials-heading">
    <Block code="2.9" status={status("2.9")}>
      <h2 id="materials-heading" className={styles.heading}><ReportHeadingAnchor text={title("2.9")} />{title("2.9")}</h2>
    </Block>
    <div className={styles.chartHeader}><strong>${subtotal.toLocaleString("en-AU")} <small>AUD</small></strong></div>
    <div className={styles.track} role="group" aria-label="Explore the cost breakdown" data-exploring={active !== null} onKeyDown={event => { if (event.key === "Escape") { setPinned(null); event.currentTarget.querySelector<HTMLButtonElement>(":focus")?.blur(); } }}>
      {items.map((item, i) => <button type="button" className={styles.segment} key={item.name} data-active={active === i} aria-pressed={pinned === i} aria-label={`${item.name}: ${item.cost} AUD, ${(item.value / subtotal * 100).toFixed(1)}% of listed costs. Click to pin.`} aria-describedby="materials-selection" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} onFocus={() => setFocused(i)} onBlur={() => setFocused(null)} onClick={() => setPinned(pinned === i ? null : i)} style={{ flexGrow: item.value, "--item-colour": item.colour } as CSSProperties}>
        <span className={styles.segmentNumber}>0{i + 1}</span>
        <span className={styles.percentage}>{(item.value / subtotal * 100).toFixed(1)}%</span>
      </button>)}
    </div>
    <p id="materials-selection" className={styles.selection} aria-live="polite" aria-atomic="true">{active === null ? null : <><span className={styles.swatch} style={{ background: items[active].colour }} aria-hidden="true" /><strong>{items[active].name}</strong><span>{items[active].cost} AUD · {(items[active].value / subtotal * 100).toFixed(1)}%</span></>}</p>
    <div className={styles.cards}>
      {items.map((item, i) => <figure className={styles.card} data-active={active === i} key={item.name} style={{ "--item-colour": item.colour } as CSSProperties}>
        <div className={`${styles.square} ${styles.photoSquare}`}>{item.photo && <img className={styles.photo} src={item.photo.src} alt={item.photo.alt} loading="lazy" decoding="async" width={item.photo.width} height={item.photo.height} style={{ objectPosition: item.photo.position }} />}<span className={styles.number} aria-hidden="true">0{i + 1}</span><strong>{item.cost}<small>AUD</small></strong></div>
        <figcaption>{item.name}{item.photo && <a className={styles.photoCredit} href={item.photo.source} target="_blank" rel="noreferrer">Photo: {item.photo.credit}</a>}</figcaption>
      </figure>)}
      <Block as="figure" code="2.11" status={status("2.11")} className={`${styles.card} ${styles.total}`}>
        <div className={styles.square}><strong>{total}<small>Estimated budget</small></strong></div>
        <figcaption>{title("2.11")}</figcaption>
      </Block>
    </div>
    <Block code="2.10" status={status("2.10")} className={styles.breakdown}>
      <h3><ReportHeadingAnchor text={title("2.10")} />{title("2.10")}</h3>
      <table className={styles.legend} aria-label="Cost breakdown">
        <thead><tr>{table.head.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
        <tbody>{items.map((item, i) => <tr key={item.name} data-active={active === i}>
          <th scope="row"><span className={styles.swatch} style={{ background: item.colour }} aria-hidden="true" /><span className={styles.itemNumber}>0{i + 1}</span>{item.name}</th>
          <td>{item.cost}</td>
        </tr>)}</tbody>
        <tfoot><tr><th scope="row">Estimated total</th><td>{total}</td></tr></tfoot>
      </table>
    </Block>
  </section>;
}

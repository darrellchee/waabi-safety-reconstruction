"use client";

import { ReportHeadingAnchor } from "./ReportHeadingAnchor";

import { useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../../components/useReducedMotion";
import { Block, type Status } from "./ReportCodes";
import styles from "./ReportCost.module.css";
import tableStyles from "./report.module.css";

type Group = { key: string; name: string; color: string; rows: number[] };

// Row indexes refer to content.costRows; the final TOTAL row belongs to no group.
const groups: Group[] = [
  { key: "structure", name: "Building structure", color: "#191818", rows: [0, 1] },
  { key: "contingency", name: "Contingency", color: "#cfcac4", rows: [10] },
  { key: "design", name: "Design documents", color: "#737270", rows: [2] },
  { key: "fitout", name: "Shelves and solar", color: "#ec9fdf", rows: [3] },
  { key: "equipment", name: "Recovery and safety gear", color: "#ff2f7d", rows: [4, 5, 6, 7, 8, 9] },
  { key: "stock", name: "Opening stock", color: "#f9d7f1", rows: [11, 12, 13, 14] },
];

const money = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });
const parse = (value: string) => Number(value.replace(/[$,]/g, ""));

const SIZE = 400, C = SIZE / 2, OUTER = 176, INNER = 104, POP = 12;
const point = (angle: number, radius: number) => `${(C + radius * Math.cos(angle)).toFixed(3)} ${(C + radius * Math.sin(angle)).toFixed(3)}`;
function slicePath(start: number, end: number) {
  const large = end - start > Math.PI ? 1 : 0;
  return `M ${point(start, OUTER)} A ${OUTER} ${OUTER} 0 ${large} 1 ${point(end, OUTER)} L ${point(end, INNER)} A ${INNER} ${INNER} 0 ${large} 0 ${point(start, INNER)} Z`;
}

export function ReportCost({ title, status, caption, headings, rows, introduction }: { title: string; status: Status; caption: string; headings: string[]; rows: string[][]; introduction?: string }) {
  const reduced = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = hover ?? pinned;

  const totalRow = rows.find(row => row[0].toUpperCase() === "TOTAL");
  const total = totalRow ? parse(totalRow[2]) : 0;
  let cursor = -Math.PI / 2;
  const slices = groups.map(group => {
    const value = group.rows.reduce((sum, index) => sum + parse(rows[index][2]), 0);
    const start = cursor;
    cursor += (value / total) * Math.PI * 2;
    const mid = (start + cursor) / 2;
    return { ...group, value, share: value / total, start, end: cursor, dx: Math.cos(mid) * POP, dy: Math.sin(mid) * POP, items: group.rows.length === 1 && rows[group.rows[0]][0] === group.name ? [rows[group.rows[0]][1]] : group.rows.map(index => rows[index][0]) };
  });
  const current = slices.find(slice => slice.key === active);
  const groupOfRow = (index: number) => slices.find(slice => slice.rows.includes(index))?.key;

  const toggle = (key: string) => setPinned(previous => previous === key ? null : key);
  const handlers = (key: string) => ({
    onMouseEnter: () => setHover(key), onMouseLeave: () => setHover(null),
    onFocus: () => setHover(key), onBlur: () => setHover(null),
  });
  const percent = (share: number) => `${(share * 100).toFixed(1)}%`;

  const table = <div className={tableStyles.tableWrap}>
    <table className={`${tableStyles.table} ${styles.table}`}>
      <caption>{caption}</caption>
      <thead><tr>{headings.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => {
        const key = groupOfRow(i);
        return <tr key={i} data-active={Boolean(key) && key === active} data-dim={Boolean(active) && Boolean(key) && key !== active} {...(key ? { onMouseEnter: () => setHover(key), onMouseLeave: () => setHover(null) } : {})}>
          {row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{key && <i style={{ background: slices.find(s => s.key === key)?.color }} aria-hidden />}{cell}</th> : <td key={j}>{cell}</td>)}
        </tr>;
      })}</tbody>
    </table>
  </div>;

  const linkedAmounts: Record<string, string> = { "$38,592": "structure", "$20,000": "structure", "$5,000": "fitout", "$2,756": "equipment" };

  return <>
  {introduction && <Block code="14.1" status="SITE">
    <p className={styles.introduction} onKeyDown={event => { if (event.key === "Escape") { setPinned(null); setHover(null); } }}>{introduction.split(/(\$87,386\.65|\$38,592|\$20,000|\$5,000|\$2,756)/g).map((part, index) => linkedAmounts[part] ? <button key={index} type="button" data-counted="" className={styles.inlineAmount} aria-pressed={pinned === linkedAmounts[part]} aria-controls="construction-cost-chart" onClick={() => toggle(linkedAmounts[part])} {...handlers(linkedAmounts[part])}>{part}</button> : part === "$87,386.65" ? <strong key={index}>{part}</strong> : part)}</p>
  </Block>}
  <Block code="14.2" status={status}>
    <h3><ReportHeadingAnchor text={title} />{title}</h3>
    <div className={styles.layout} onKeyDown={event => { if (event.key === "Escape") { setPinned(null); setHover(null); } }}>
    {table}
    <figure id="construction-cost-chart" className={styles.card} data-nocount="" aria-label="Cost breakdown">
      <div className={styles.chartHeading}><span>Cost breakdown</span><p>Hover to explore · Select to pin</p></div>
      <motion.div className={styles.chart} initial={reduced ? false : { opacity: 0, scale: .9, rotate: -14 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .9, ease: [.19, 1, .22, 1] }}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="group" aria-label="Pie chart of cost by category. Select a slice to highlight its rows in the table.">
          {slices.map(slice => {
            const on = active === slice.key;
            return <path key={slice.key} className={styles.slice} d={slicePath(slice.start, slice.end)} fill={slice.color}
              role="button" tabIndex={0} aria-pressed={pinned === slice.key} aria-label={`${slice.name}: ${money.format(slice.value)}, ${percent(slice.share)} of total`}
              style={{ transform: on ? `translate(${slice.dx}px, ${slice.dy}px)` : "none", opacity: active && !on ? .35 : 1 }}
              onClick={() => toggle(slice.key)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggle(slice.key); } }}
              {...handlers(slice.key)} />;
          })}
        </svg>
        <div className={styles.center} aria-live="polite">
          <span>{current ? current.name : "Total cost"}</span>
          <strong>{money.format(current ? current.value : total)}</strong>
          <small>{current ? `${percent(current.share)} of total` : "Select a slice"}</small>
        </div>
      </motion.div>
      <ul className={styles.legend}>
        {slices.map(slice => <li key={slice.key}>
          <button type="button" aria-pressed={pinned === slice.key} data-active={active === slice.key} data-dim={Boolean(active) && active !== slice.key} onClick={() => toggle(slice.key)} {...handlers(slice.key)}>
            <i style={{ background: slice.color }} />
            <span className={styles.name}>{slice.name}<small>{slice.items.join(" · ")}</small></span>
            <span className={styles.amount}>{money.format(slice.value)}<small>{percent(slice.share)}</small></span>
            <b style={{ width: `${Math.max(slice.share * 100, 1.5)}%`, background: slice.color }} />
          </button>
        </li>)}
      </ul>
      <figcaption>Share of the {money.format(total)} total. Colours match the categories in the table.</figcaption>
    </figure>
    </div>
  </Block></>;
}

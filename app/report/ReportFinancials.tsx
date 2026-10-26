"use client";

import { useState, type ReactNode, type CSSProperties } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../../components/useReducedMotion";
import { Block, type Status } from "./ReportCodes";
import shared from "./ReportCost.module.css";
import styles from "./ReportFinancials.module.css";
import tableStyles from "./report.module.css";

type Props = { code: "14.3" | "14.4"; title: string; status: Status; caption: string; headings: string[]; rows: string[][]; children?: ReactNode };
const money = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
const amount = (value: string) => Number(value.replace(/[+$,]/g, ""));
const revenueMetrics = [
  { label: "Revenue a year", color: "#191818" },
  { label: "Costs a year", color: "#737270" },
  { label: "Profit a year", color: "#ff2f7d" },
];
// Coverage is qualitative: the table does not give funding allocations.
const coverage = [
  { label: "Tourism fund", color: "#191818", areas: ["Build", "Design", "Equipment"] },
  { label: "Rangers program", color: "#ec9fdf", areas: ["Ranger time"] },
  { label: "Own income", color: "#ff2f7d", areas: ["Stock", "Running costs"] },
];
const areas = ["Build", "Design", "Equipment", "Ranger time", "Stock", "Running costs"];

export function ReportFinancials({ code, title, status, caption, headings, rows, children }: Props) {
  const reduced = useReducedMotion();
  const isRevenue = code === "14.3";
  const [scenario, setScenario] = useState(2);
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const active = hover ?? pinned;
  const metrics = revenueMetrics.map(metric => ({ ...metric, row: rows.findIndex(row => row[0] === metric.label) }));
  const max = isRevenue ? Math.max(...metrics.flatMap(metric => rows[metric.row].slice(1).map(amount))) : 1;
  const rowColor = (index: number) => isRevenue ? metrics.find(metric => metric.row === index)?.color : coverage[index]?.color;
  const handlers = (index: number) => ({
    onMouseEnter: () => setHover(index), onMouseLeave: () => setHover(null),
    onFocus: () => setHover(index), onBlur: () => setHover(null),
  });
  const toggle = (index: number) => setPinned(previous => previous === index ? null : index);

  return <Block code={code} status={status}>
    <h3>{title}</h3>
    <div className={shared.layout} onKeyDown={event => { if (event.key === "Escape") { setPinned(null); setHover(null); } }}>
      <div className={tableStyles.tableWrap}>
        <table className={`${tableStyles.table} ${shared.table} ${styles.table}`}>
          <caption>{caption}</caption>
          <thead><tr>{headings.map((heading, i) => <th key={i} scope="col" data-selected={isRevenue && i === scenario}>{heading}</th>)}</tr></thead>
          <tbody>{rows.map((row, i) => <tr key={i} data-active={active === i} data-dim={active !== null && active !== i} {...handlers(i)}>
            {row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{rowColor(i) && <i style={{ background: rowColor(i) }} aria-hidden="true" />}{cell}</th> : <td key={j} data-selected={isRevenue && j === scenario}>{cell}</td>)}
          </tr>)}</tbody>
        </table>
      </div>
      <figure className={`${shared.card} ${styles.card}`} data-nocount="" aria-label={isRevenue ? "Annual revenue, costs and profit comparison" : "Funding coverage chart"}>
        <div className={shared.chartHeading}>
          <span>{isRevenue ? "Annual outlook" : "What funding covers"}</span>
          <p>{isRevenue ? "Choose an estimate · Select a bar to pin" : "Explore a source · Select to pin"}</p>
        </div>
        {isRevenue ? <>
          <div className={styles.scenarios} role="group" aria-label="Revenue estimate">
            {headings.slice(1).map((heading, i) => <button key={heading} type="button" aria-pressed={scenario === i + 1} onClick={() => setScenario(i + 1)}>{heading}</button>)}
          </div>
          <div className={styles.bars} aria-live="polite">
            {metrics.map(metric => {
              const value = amount(rows[metric.row][scenario]);
              return <button key={metric.label} type="button" className={styles.barButton} aria-pressed={pinned === metric.row} data-active={active === metric.row} data-dim={active !== null && active !== metric.row} onClick={() => toggle(metric.row)} {...handlers(metric.row)}>
                <span className={styles.barLabel}><span>{metric.label}</span><strong>{money.format(value)}</strong></span>
                <span className={styles.track}><motion.span className={styles.fill} style={{ background: metric.color }} initial={false} animate={{ width: `${value / max * 100}%` }} transition={{ duration: reduced ? 0 : .55, ease: [.19, 1, .22, 1] }} /></span>
              </button>;
            })}
          </div>
          <figcaption>Annual amounts from Table 4, on the same scale across all estimates. Profit is before the build cost.</figcaption>
        </> : <>
          <div className={styles.matrix}>
            <div className={styles.matrixHeader} aria-hidden="true"><span>Source</span>{areas.map(area => <span key={area}>{area}</span>)}</div>
            {coverage.map((source, i) => <button key={source.label} type="button" className={styles.coverageRow} style={{ "--source-color": source.color } as CSSProperties} aria-label={`${rows[i][0]}: ${source.areas.join(", ")}${i === 1 ? " (potential support)" : ""}`} aria-pressed={pinned === i} data-active={active === i} data-dim={active !== null && active !== i} onClick={() => toggle(i)} {...handlers(i)}>
              <span className={styles.sourceLabel}>{source.label}</span>
              {areas.map(area => <span key={area} className={styles.coverageCell} aria-hidden="true"><span data-covered={source.areas.includes(area)}>{source.areas.includes(area) ? (i === 1 ? "?" : "✓") : "–"}</span></span>)}
            </button>)}
          </div>
          <div className={styles.sourceDetail} aria-live="polite">{active === null ? "Select a source to see its coverage in the table." : rows[active][1]}</div>
          <figcaption>Coverage described in Table 5, not confirmed funding. Ranger time is potential support. No funding proportions are assumed.</figcaption>
        </>}
      </figure>
    </div>
    {children}
  </Block>;
}

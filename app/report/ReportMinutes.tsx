import { lines, parseTable, text, title } from "./blocks";
import { ReportSection } from "./ReportUI";
import report from "./report.module.css";
import styles from "./ReportMinutes.module.css";

export function ReportMinutes() {
  const actions = parseTable("20.4");
  return <ReportSection id="minutes" title={title("20.1")} className={styles.minutes}>
    <p>{text("20.1")}</p>
    <div className={report.tableWrap}>
      <table className={`${report.table} ${styles.details}`}>
        <caption>{title("20.2")}</caption>
        <tbody>{lines("20.2").map(line => {
          const [label, value] = line.split(" | ");
          return <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>;
        })}</tbody>
      </table>
    </div>
    <h3>{title("20.3")}</h3>
    <ul>{lines("20.3").map(line => <li key={line}>{line}</li>)}</ul>
    <h3 id="minutes-actions">{title("20.4")}</h3>
    <div className={report.tableWrap} role="region" aria-labelledby="minutes-actions" tabIndex={0}>
      <table className={`${report.table} ${styles.actions}`}>
        <thead><tr>{actions.head.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
        <tbody>{actions.rows.map(row => <tr key={row[1]}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
    <h3>{title("20.5")}</h3>
    <ul>{lines("20.5").map(line => <li key={line}>{line}</li>)}</ul>
  </ReportSection>;
}

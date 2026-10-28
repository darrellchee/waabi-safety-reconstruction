import { Block } from "./ReportCodes";
import { lines, status, text, title } from "./blocks";
import styles from "./ReportRecommendations.module.css";

const codes = ["16.4", "16.5", "16.6", "16.7", "16.8"];

export function ReportRecommendations() {
  return <div className={styles.layout}>
    <Block code="16.3" status={status("16.3")} className={styles.intro}>
      <h2><span className={styles.sectionNumber}>12.</span> {title("16.3")}</h2>
      {lines("16.3").map(line => <p key={line}>{line}</p>)}
    </Block>
    <ol className={styles.list} aria-label="Recommendations">
      {codes.map((code, index) => <li key={code}>
        <Block code={code} status={status(code)} className={styles.row}>
          <span className={styles.number} data-nocount="" aria-hidden="true">12.{index + 1}</span>
          <div className={styles.copy}>
            <h3>{title(code)}</h3>
            <p>{text(code)}</p>
          </div>
        </Block>
      </li>)}
    </ol>
  </div>;
}

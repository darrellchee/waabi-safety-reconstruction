import { ReportHeadingAnchor } from "./ReportHeadingAnchor";
import { Block } from "./ReportCodes";
import { ReportCost } from "./ReportCost";
import { ReportFinancials } from "./ReportFinancials";
import { Paragraphs } from "./ReportUI";
import { parseTable, status, text, title } from "./blocks";
import styles from "./ReportCostAnalysis.module.css";

function Narrative({ code, closing = false }: { code: string; closing?: boolean }) {
  return <Block code={code} status={status(code)} className={closing ? styles.closing : styles.narrative}>
    <h3><ReportHeadingAnchor text={title(code)} />{title(code)}</h3>
    <Paragraphs text={text(code)} />
  </Block>;
}

export function ReportCostAnalysis() {
  const build = parseTable("14.2");
  const funding = parseTable("14.4");
  const revenue = parseTable("14.3");
  return <>
    <ReportCost title={title("14.2")} status={status("14.2")} caption={build.caption} headings={build.head} rows={build.rows} introduction={text("14.1")} />
    <Narrative code="14.6" />
    <figure className={styles.funding} data-nocount="" aria-label="Proposed funding: $86,600 in grants and $786.65 in community contributions or fundraising">
      <figcaption>Proposed funding · $87,386.65 AUD</figcaption>
      <div className={styles.fundingTrack} aria-hidden="true"><span /><span /></div>
      <div className={styles.fundingLabels}>
        <span><strong>$86,600</strong>Government and community grants</span>
        <span><strong>$786.65</strong>Community contributions or fundraising</span>
      </div>
    </figure>
    <ReportFinancials code="14.4" title={title("14.4")} status={status("14.4")} caption={funding.caption} headings={funding.head} rows={funding.rows}>
      <Paragraphs text={funding.notes.join("\n")} />
    </ReportFinancials>
    <Narrative code="14.7" />
    <Narrative code="14.8" />
    <dl className={styles.metrics} data-nocount="" aria-label="Base scenario planning estimates">
      <div><dt>Visitors annually</dt><dd>220</dd></div>
      <div><dt>Equipment rentals annually</dt><dd>44</dd></div>
      <div><dt>Annual revenue</dt><dd>$8,950</dd></div>
    </dl>
    <ReportFinancials code="14.3" title={title("14.3")} status={status("14.3")} caption={revenue.caption} headings={revenue.head} rows={revenue.rows}
      chartNote={<aside className={styles.chartNote}><strong>Additional supplies · $2,500 annually</strong></aside>}>
      <Paragraphs text={revenue.notes.join("\n")} />
    </ReportFinancials>
    <Narrative code="14.9" />
    <dl className={styles.metrics} data-nocount="" aria-label="Base scenario simplified operating surplus">
      <div><dt>Annual operating surplus</dt><dd>$5,000</dd></div>
      <div><dt>Over 25 years · simplified projection</dt><dd>$125,000</dd></div>
    </dl>
    <div id="maintenance-end-of-life">
      <div className={styles.lifespan} data-nocount="" aria-label="Estimated lifespan: construction to year 25, with $8,000 estimated disposal costs">
        <span>Construction</span><span>Year 25<strong>$8,000</strong><small>Estimated disposal cost</small></span>
      </div>
      <Narrative code="14.5" />
    </div>
    <Narrative code="14.10" closing />
  </>;
}

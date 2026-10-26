import type { Metadata } from "next";
import { ReportHeader, ReportFooter } from "./ReportChrome";
import { ReportFrame, Copy, MaterialsTabs, Placeholder, ReportSection, Paragraphs, Figure, SimpleTable } from "./ReportUI";
import styles from "./report.module.css";
import { ReportOptions, ReportSelection } from "./ReportSolution";
import { ReportCriteria, ReportDesign, ReportStages } from "./ReportScenes";
import { ReportStakeholders } from "./ReportStakeholders";
import { ReportHero } from "./ReportHeroMedia";
import { ReportCost } from "./ReportCost";
import { ReportFinancials } from "./ReportFinancials";
import { ReportMaterials } from "./ReportMaterials";
import { ReportDetails } from "./ReportDetails";
import { Block, ReportProgress, SectionBadge } from "./ReportCodes";
import { lines, parseTable, splitLabel, status, text, title } from "./blocks";

export const metadata: Metadata = { title: "Provisions Point | Report" };

// Every piece of text on this page comes from REPORT_CONTENT.md through report-blocks.json (see tools/export_report_blocks.py).
function Titled({ code, children }: { code: string; children?: React.ReactNode }) {
  return <Block code={code} status={status(code)}><h3>{title(code)}</h3>{children ?? <Paragraphs text={text(code)} />}</Block>;
}
function Table({ code }: { code: string }) {
  const table = parseTable(code);
  if (code === "14.3" || code === "14.4") return <ReportFinancials code={code} title={title(code)} status={status(code)} caption={table.caption} headings={table.head} rows={table.rows}>
    <Paragraphs text={table.notes.join("\n")} />
  </ReportFinancials>;
  return <Block code={code} status={status(code)}>
    <h3>{title(code)}</h3>
    <SimpleTable caption={table.caption} headings={table.head} rows={table.rows} />
    <Paragraphs text={table.notes.join("\n")} />
  </Block>;
}
function Cover({ code }: { code: string }) {
  return <Block code={code} status={status(code)} className={styles.coverRow}>{lines(code).map(line => { const [label, value] = splitLabel(line); return <p key={label}><strong>{label}</strong>{" "}<Copy text={value} /></p>; })}</Block>;
}
const range = (section: number, from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => `${section}.${from + i}`);

export default function ReportPage() {
  const buildCosts = parseTable("14.2");
  return <><ReportFrame>
    <ReportHeader />
    <main>
      <ReportHero acknowledgement={<><h2>Team Acknowledgement</h2><h3>{title("4.1")}</h3><Paragraphs text={text("4.1")} /></>}>
        <div id="title-block" className={styles.coverPanel}>
          <SectionBadge n={1} />
          <h2>Cover details</h2>
          <div className={styles.cover}>
            <Cover code="1.2" /><Cover code="1.3" /><Cover code="2.3" />
          </div>
          <div id="tutorial-group"><Block as="p" code="1.4" status={status("1.4")}><Copy text={text("1.4")} /></Block></div>
        </div>
      </ReportHero>
      <ReportOptions overview />
      <ReportSection id="summary-details">
        <Block code="2.8" status={status("2.8")} className={styles.considerations}>
          <h3 className={styles.considerationsTitle}>{title("2.8")}</h3>
          <ol className={styles.considerationsList}>{text("2.8").split("\n\n").map((group, index) => {
            const [question, ...answers] = group.split("\n");
            return <li key={question} className={styles.considerationRow}>
              <span className={styles.considerationNumber} aria-hidden="true" data-nocount="">{String(index + 1).padStart(2, "0")}</span>
              <h4 className={styles.considerationQuestion} data-counted=""><Copy text={question} /></h4>
              <div className={styles.considerationAnswer}>
                {answers.length > 1
                  ? <ol>{answers.map(answer => <li key={answer}><Copy text={answer} /></li>)}</ol>
                  : <Paragraphs text={answers.join("\n")} />}
              </div>
            </li>;
          })}</ol>
        </Block>
        <ReportMaterials />
        <Figure code="2.12" src="/assets/report/insert-image.svg" alt="(change to our assignment content)" caption={text("2.12")} />
        <Figure code="2.13" src="/assets/report/insert-image.svg" alt="(change to our assignment content)" caption={text("2.13")} />
      </ReportSection>
      <ReportSection id="group-declaration" num={3} title="Group Declaration">
        <Table code="3.1" />
      </ReportSection>
      <ReportSection id="acknowledgement" num={4} title="Team Acknowledgement" className={styles.acknowledgement}>
        <img className={styles.acknowledgementImage} src="/assets/company/1761183960-waabi_portrait_raquel_02880.webp" alt="" loading="lazy" />
        <div className={styles.acknowledgementShade} />
        <Block code="4.1" status={status("4.1")} className={styles.fullWidth}><h3>{title("4.1")}</h3><p>EDIT HERE TEXT</p></Block>
      </ReportSection>
      <ReportSection id="project-details" num={5}>
        <ReportDetails title="Project details" slides={["5.1", "5.2", "5.3", "5.4"].map(code => ({ quote: text(code), name: title(code), code, status: status(code) }))} />
        <ReportStakeholders />
      </ReportSection>
      <ReportSection id="background" num={6}>
        <MaterialsTabs heading="Background" intro="" label="Background" idPrefix="background" items={range(6, 1, 9).map(code => [title(code), text(code)])} codes={range(6, 1, 9).map(code => [code, status(code)])} />
        <Figure code="6.10" src="/assets/company/1761183960-waabi_portrait_raquel_02880.webp" alt="Concept image: red dirt road with floodwater across it and a four-wheel drive stopped at the edge." caption={text("6.10")} />
      </ReportSection>
      <ReportSection id="problem" num={7} title="Problem Description">
        <Titled code="7.1" /><Titled code="7.2" />
      </ReportSection>
      <ReportCriteria />
      <ReportOptions />
      <ReportSelection />
      <ReportDesign images={["1760350326-waabi_washstation_03082_final.webp"]} />
      <ReportSection id="prototyping" num={12} title="Prototyping">
        <Placeholder id="prototyping-placeholder" name="Prototyping" code="12.1" />
      </ReportSection>
      <ReportSection id="implementation" num={13} title="Implementation Plan">
        <Titled code="13.1" /><Titled code="13.2" />
        <Block code="13.3" status={status("13.3")}><ReportStages /></Block>
      </ReportSection>
      <ReportSection id="cost" num={14} title="Cost Analysis">
        <Titled code="14.1" />
        <ReportCost title={title("14.2")} status={status("14.2")} caption={buildCosts.caption} headings={buildCosts.head} rows={buildCosts.rows} /><Table code="14.3" /><Table code="14.4" />
        <Placeholder id="maintenance-end-of-life" name="Maintenance and end-of-life costs" code="14.5" />
      </ReportSection>
      <ReportSection id="other" num={15} title="Other considerations">
        {range(15, 1, 5).map(code => <Titled key={code} code={code} />)}
      </ReportSection>
      <ReportSection id="recommendations" num={16} title="Recommendations">
        <Titled code="16.1" /><Titled code="16.2" />
      </ReportSection>
      <ReportSection id="references" num={17} title="References">
        <Block code="17.1" status={status("17.1")}><ol className={styles.references}>{lines("17.1").map(entry => <li key={entry}>{entry}</li>)}</ol></Block>
      </ReportSection>
      <ReportSection id="appendices" num={18} title="Supporting documentation">
        <h3>{title("18.1")}</h3><Placeholder id="appendix-1" name="Appendix 1: Group charter" code="18.1" note={<Paragraphs text={text("18.1")} />} />
        <h3>{title("18.2")}</h3><Placeholder id="appendix-2" name="Appendix 2: Meeting minutes" code="18.2" note={<Paragraphs text={text("18.2")} />} />
        <Titled code="18.3" />
        <h3>{title("18.4")}</h3><Placeholder id="appendix-3" name="Appendix 3: Prompt screenshots" code="18.4" />
        <h3>{title("18.5")}</h3><Placeholder id="appendix-4" name="Appendix 4: Prototype test results" code="18.5" note={<Paragraphs text={text("18.5")} />} />
        <Titled code="18.6" />
      </ReportSection>
    </main>
    <ReportFooter />
  </ReportFrame><ReportProgress /></>;
}

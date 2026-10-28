import { ReportHeader, ReportFooter } from "./ReportChrome";
import { ReportFrame, Copy, Placeholder, ReportSection, Paragraphs, SimpleTable } from "./ReportUI";
import styles from "./report.module.css";
import { ReportOptions, ReportSelection } from "./ReportSolution";
import { ReportCriteria } from "./ReportScenes";
import { ReportBackgroundSlideshow } from "./ReportStakeholders";
import { ReportHero } from "./ReportHeroMedia";
import { ReportCostAnalysis } from "./ReportCostAnalysis";
import { ReportFinancials } from "./ReportFinancials";
import { ReportImplementation } from "./ReportImplementation";
import { ReportDesign } from "./ReportDesign";
import { ReportMaterials } from "./ReportMaterials";
import { ReportDetails } from "./ReportDetails";
import { Block, ReportProgress, SectionBadge } from "./ReportCodes";
import { lines, parseTable, splitLabel, status, text, title } from "./blocks";

import { ReportRecommendations } from "./ReportRecommendations";
import { ReportUserJourney } from "./ReportUserJourney";
import { ReportTeamCharter } from "./ReportTeamCharter";
import { ReportMinutes } from "./ReportMinutes";
import { ReportPrototype } from "./ReportPrototype";
import { ReportPageHero } from "./ReportPageHero";
import { ReportAiLogs } from "./ReportAiLogs";
import { reportNavigation, type ReportPageId } from "./report-navigation";

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
function ReferenceEntry({ entry }: { entry: string }) {
  return <>{entry.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
    if (!part.startsWith("http")) return part;
    const url = part.replace(/[),.;]+$/, "");
    return <span key={index}><a href={url} target="_blank" rel="noreferrer">{url}</a>{part.slice(url.length)}</span>;
  })}</>;
}
const range = (section: number, from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => `${section}.${from + i}`);

export default function ReportPage({ page = "summary" }: { page?: ReportPageId }) {
  return <><ReportFrame>
    <ReportHeader active={page} />
    <main>
      {page !== "summary" && <ReportPageHero page={page} title={reportNavigation.find(item => item.id === page)!.label} />}
      {page === "summary" && <>
      <ReportHero acknowledgement={<div id="acknowledgement"><h2>Acknowledgment</h2><Paragraphs text={text("4.1")} /></div>}>
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
              <h4 className={styles.considerationQuestion} data-counted="">{question}</h4>
              <div className={styles.considerationAnswer}>
                {answers.length > 1
                  ? <ol>{answers.map(answer => <li key={answer}>{answer}</li>)}</ol>
                  : answers.filter(Boolean).map(answer => <p key={answer}>{answer}</p>)}
              </div>
            </li>;
          })}</ol>
        </Block>
        <ReportMaterials />
      </ReportSection>
      <ReportSection id="group-declaration" num={3} title="Group Declaration">
        <Table code="3.1" />
      </ReportSection>
      </>}
      {page === "project-details" && <ReportSection id="project-details" num={5}>
        <ReportDetails title="Project details" slides={["5.1", "5.6", "5.2", "5.3"].map(code => ({ quote: text(code), name: title(code), code, status: status(code) }))} />
      </ReportSection>}
      {page === "background" && <>
      <ReportSection id="background" num={6}>
        <ReportBackgroundSlideshow slides={range(6, 1, 7).map(code => ({ heading: title(code), paragraph: text(code), code, status: status(code) }))} />
      </ReportSection>
      <ReportSection id="problem" num={7} title="Problem Description">
        <Block code="7.2" status={status("7.2")}><Paragraphs text={text("7.2")} /></Block>
        <Titled code="7.1" />
      </ReportSection>
      <ReportCriteria />
      </>}
      {page === "options" && <>
      <ReportOptions />
      <ReportSelection />
      </>}
      {page === "design" && <ReportDesign />}
      {page === "prototyping" && <ReportPrototype />}
      {page === "implementation" && <ReportImplementation />}
      {page === "cost" && <ReportSection id="cost" num={14} title="Cost Analysis">
        <ReportCostAnalysis />
      </ReportSection>
      }
      {page === "other-considerations" && <ReportSection id="other-considerations">
        <Block code="15.6" status={status("15.6")}><p className={styles.considerationsLead}>{text("15.6")}</p></Block>
        <ReportUserJourney />
        <p className={styles.considerationsBody}>Visitors arrive near Warokutal during the early wet season, encountering deteriorating unsealed roads and unpredictable weather. Feelings of apprehension and isolation emerge.</p>
        <p className={styles.considerationsBody}>Flash flooding washes out the road ahead, preventing forward or backward transit. Travellers notice that their mobile devices have no reception and their supplies are limited.</p>
        <p className={styles.considerationsBody}>Travellers locate the elevated shelter. Clear signage and solar powered lighting offer immediate visual orientation and psychological relief.</p>
        <p className={styles.considerationsBody}>Visitors buy supplies or hire a recovery kit, PLB or radio. If no Ranger is on site, they use the emergency cabinet to get water and radio for help until conditions improve.</p>
      </ReportSection>}
      {page === "recommendations" && <ReportSection id="recommendations">
        <ReportRecommendations />
      </ReportSection>}
      {page === "supporting-documents" && <><ReportTeamCharter /><ReportMinutes /></>}
      {page === "references" && <ReportSection id="references" num={17} title="References">
        <Block code="17.1" status={status("17.1")}><ol className={styles.references}>{lines("17.1").map(entry => <li key={entry}><ReferenceEntry entry={entry} /></li>)}</ol></Block>
      </ReportSection>
      }
      {page === "appendices" && <ReportSection id="appendices" num={18} title="Supporting documentation">
        <h3>{title("18.1")}</h3><Placeholder id="appendix-1" name="Appendix 1: Group charter" code="18.1" note={<Paragraphs text={text("18.1")} />} />
        <h3>{title("18.2")}</h3><Placeholder id="appendix-2" name="Appendix 2: Meeting minutes" code="18.2" note={<Paragraphs text={text("18.2")} />} />
        <Titled code="18.3" />
        <h3>{title("18.4")}</h3><Placeholder id="appendix-3" name="Appendix 3: Prompt screenshots" code="18.4" />
        <h3>{title("18.5")}</h3><Placeholder id="appendix-4" name="Appendix 4: Prototype test results" code="18.5" note={<Paragraphs text={text("18.5")} />} />
        <Titled code="18.6" />
      </ReportSection>
      }
      {page === "ai-logs" && <ReportAiLogs />}
    </main>
    <ReportFooter />
  </ReportFrame><ReportProgress /></>;
}

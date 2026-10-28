import { Block } from "./ReportCodes";
import { ReportConstructionIllustration, constructionCards } from "./ReportConstructionIllustration";
import { ReportEvaluationIllustration, evaluationCards } from "./ReportEvaluationIllustration";
import { ReportImplementationBenefitIllustration, ReportImplementationIllustration } from "./ReportImplementationIllustration";
import { ReportOwnershipIllustration, ownershipCards } from "./ReportOwnershipIllustration";
import { ReportRepairIllustration, repairCards } from "./ReportRepairIllustration";
import { status, text, title } from "./blocks";
import styles from "./ReportImplementation.module.css";

const implementationStages = [
  { title: "Community co-design", subtitle: "Plan the shelter with YAC." },
  { title: "YAC approval", subtitle: "Allow about six months for approval." },
  { title: "Ranger-led operation", subtitle: "Rangers run the supply and hire point." },
  { title: "Weekly restocking", subtitle: "Replenish supplies from July to November." },
  { title: "Seasonal inspections", subtitle: "Two rangers check before and after the wet season." },
  { title: "Reuse and recycling", subtitle: "Reuse shelves and kits; recycle steel and roof sheets." },
];

const communityBenefits = [
  { title: "Visitor safety", subtitle: "Keep essential support close at hand." },
  { title: "Vehicle self-recovery", subtitle: "Visitors recover stranded vehicles with hired gear." },
  { title: "Emergency supplies", subtitle: "Access water and first aid nearby." },
  { title: "Reduced ranger workload", subtitle: "Fewer recovery call-outs free up ranger time." },
  { title: "Community revenue", subtitle: "Equipment hire brings income to the community." },
  { title: "Funding the Rangers", subtitle: "Rental income supports the Lama Lama Rangers." },
];

function BenefitIllustration({ step }: { step: number }) {
  return <ReportImplementationBenefitIllustration benefit={step} />;
}

const galleries = [
  { cards: constructionCards, Illustration: ReportConstructionIllustration, label: "Construction and training for question 9.1" },
  { cards: implementationStages, Illustration: ReportImplementationIllustration, label: "Implementation stages for question 9.2" },
  { cards: evaluationCards, Illustration: ReportEvaluationIllustration, label: "Design evaluation for question 9.3" },
  { cards: communityBenefits, Illustration: BenefitIllustration, label: "Community benefits for question 9.4" },
  { cards: ownershipCards, Illustration: ReportOwnershipIllustration, label: "Community ownership for question 9.5" },
  { cards: repairCards, Illustration: ReportRepairIllustration, label: "Repair and safety procedures for question 9.6" },
];

export function ReportImplementation() {
  return <section id="implementation" className={styles.implementation} aria-label="Implementation Plan">
    {galleries.map(({ cards, Illustration, label }, index) => {
      const code = `13.${index + 1}`;
      const headingId = `implementation-question-${index + 1}`;
      const answer = text(code);
      return <section key={code} className={`${styles.row} ${styles.lifecycleRow}`} aria-labelledby={headingId}>
        <Block code={code} status={status(code)} className={styles.copy}>
          <h2 id={headingId}>{title(code)}</h2>
          {answer && <p>{answer}</p>}
        </Block>
        <div className={`${styles.gallery} ${styles.lifecycleGallery}`} role="group" aria-label={label}>
          {cards.map((stage, step) => <figure key={stage.title}>
            <div className={`${styles.image} ${styles.stageCanvas}`}>
              <Illustration step={step} />
            </div>
            <figcaption>
              <span className={styles.stageNumber} aria-hidden="true">0{step + 1}</span>
              <span className={styles.stageTitle}>{stage.title}</span>
              <span className={styles.stageSubtitle}>{stage.subtitle}</span>
            </figcaption>
          </figure>)}
        </div>
      </section>;
    })}
  </section>;
}

import { ReportHeadingAnchor } from "./ReportHeadingAnchor";
import { lines, title } from "./blocks";
import { ReportSection } from "./ReportUI";
import pageOne from "./assets/team-charter-page-1.png";
import pageTwo from "./assets/team-charter-page-2.png";
import styles from "./ReportTeamCharter.module.css";

const signatures = [
  { image: pageOne, x: 535, y: 1000, width: 350, height: 150 },
  { image: pageTwo, x: 550, y: 40, width: 260, height: 200 },
  { image: pageTwo, x: 548, y: 300, width: 330, height: 140 },
  { image: pageTwo, x: 532, y: 565, width: 300, height: 126 },
  { image: pageTwo, x: 485, y: 698, width: 210, height: 100 },
  { image: pageTwo, x: 480, y: 888, width: 320, height: 187 },
];

function Questions({ code }: { code: string }) {
  const copy = lines(code);
  return <dl className={styles.questions}>{copy.filter((_, index) => index % 2 === 0).map((question, index) =>
    <div key={question}><dt>{question}</dt><dd>{copy[index * 2 + 1]}</dd></div>
  )}</dl>;
}

export function ReportTeamCharter() {
  const intro = lines("21.1");
  const [commitment, nameLabel, signatureLabel, ...names] = lines("21.5");
  return <ReportSection id="team-charter" title={title("21.1")} className={styles.charter}>
    <h3><ReportHeadingAnchor text={intro[0]} />{intro[0]}</h3>
    <p className={styles.documentTitle}>{intro[1]}</p>
    <p className={styles.groupName}><strong>{intro[2]}</strong> <span>{intro[3]}</span></p>
    <div className={styles.columns}>
      <div className={styles.column}>
        <h4><ReportHeadingAnchor text={title("21.2")} />{title("21.2")}</h4>
        <Questions code="21.2" />
      </div>
      <div className={styles.column}>
        <div className={styles.topic}><h4><ReportHeadingAnchor text={title("21.3")} />{title("21.3")}</h4><Questions code="21.3" /></div>
        <div className={styles.topic}><h4><ReportHeadingAnchor text={title("21.4")} />{title("21.4")}</h4><Questions code="21.4" /></div>
        <div className={styles.topic}>
          <h4><ReportHeadingAnchor text={title("21.5")} />{title("21.5")}</h4>
          <p>{commitment}</p>
          <div className={styles.signatureLabels}><span>{nameLabel}</span><span>{signatureLabel}</span></div>
          <dl className={styles.signatures}>{names.map((name, index) => {
            const crop = signatures[index];
            return <div key={name}>
              <dt>{name}</dt>
              <dd><span className={styles.signature} style={{ aspectRatio: `${crop.width} / ${crop.height}` }}>
                {/* Show the original handwriting through a CSS window without altering the source. */}
                <img src={crop.image.src} alt={`${name} signature`} loading="lazy" style={{
                  width: `${crop.image.width / crop.width * 100}%`,
                  left: `${-crop.x / crop.width * 100}%`,
                  top: `${-crop.y / crop.height * 100}%`,
                }} />
              </span></dd>
            </div>;
          })}</dl>
        </div>
      </div>
    </div>
  </ReportSection>;
}

"use client";

import { ReportHeadingAnchor } from "./ReportHeadingAnchor";

import { useRef } from "react";
import { motion } from "motion/react";
import { lines, splitLabel, status, title } from "./blocks";
import { useCarouselMotion } from "../../components/useCarouselMotion";
import { useReducedMotion } from "../../components/useReducedMotion";
import { Copy, MediaReplacement } from "./ReportUI";
import { Block, SectionBadge } from "./ReportCodes";
import styles from "./ReportScenes.module.css";
import reportStyles from "./report.module.css";
import "../../components/company.css";

/** Block 2.7: three stat cards, one md line each ("2 m: Planned floor height ..."). */
export function ReportStats() {
  const reduced = useReducedMotion();
  return <div className={styles.scene}><div className={`home-page ${styles.stats}`}><div className="home-tech-cards">{lines("2.7").map((line, index) => { const [number, label] = splitLabel(line); return <motion.article key={number} initial={reduced ? false : { clipPath: "inset(100% 0 0 0)" }} whileInView={{ clipPath: "inset(0% 0 0 0)" }} viewport={{ once: true }} transition={{ duration: .8, delay: index * .15, ease: [.19, 1, .22, 1] }}>
    <MediaReplacement className={`home-film-poster ${styles.cardMedia}`} /><div className="home-cover-shade" /><div><p>{label}</p><h3 data-counted="">{number.replace(/:$/, "")}</h3></div>
  </motion.article>; })}</div></div></div>;
}
/** Blocks 8.1 to 8.8: criterion, description and justification in screenshot order. */
export function ReportCriteria() {
  const codes = ["8.5", "8.6", "8.3", "8.4", "8.1", "8.7", "8.2", "8.8"];
  return <section id="criteria" className={`${styles.scene} ${styles.criteria}`}><div className="company-page"><div className="co-events"><div className="co-width">
    <SectionBadge n={8} />
    <div className="co-event-heading"><h2 id="criteria-heading"><ReportHeadingAnchor text="3.3 Design Criteria" />3.3 Design Criteria</h2></div>
    <div className={reportStyles.tableWrap} role="region" aria-labelledby="criteria-heading" tabIndex={0}>
      <table className={`${reportStyles.table} ${reportStyles.criteriaTable}`} aria-labelledby="criteria-heading">
        <colgroup><col style={{ width: "19.2%" }} /><col style={{ width: "46.4%" }} /><col style={{ width: "34.4%" }} /></colgroup>
        <thead><tr><th scope="col">Criteria</th><th scope="col">Description</th><th scope="col">Justification</th></tr></thead>
        <tbody>{codes.map(code => {
          const [heading, description, justification] = lines(code);
          const weightingStart = heading.indexOf(" (weighting");
          return <tr key={code}>
            <th scope="row"><strong><Copy text={heading.slice(0, weightingStart)} /><br />{" "}<Copy text={heading.slice(weightingStart + 1)} /></strong></th>
            <td><Block code={code} status={status(code)}><p><Copy text={description} /></p></Block></td>
            <td><p><Copy text={justification} /></p></td>
          </tr>;
        })}</tbody>
      </table>
    </div>
  </div></div></div></section>;
}
/** Block 13.3: the two intro lines, then eight stage cards ("Stage 1: Heading. Detail."). */
export function ReportStages() {
  const rail = useRef<HTMLDivElement>(null);
  useCarouselMotion(rail);
  const reduced = useReducedMotion();
  const [next, student, ...stages] = lines("13.3");
  return <div className={`${styles.scene} ${styles.stages}`}><div className="home-page"><div className="home-insights"><div className="home-insights-top"><h3><ReportHeadingAnchor text={title("13.3")} />{title("13.3")}</h3><div><p><Copy text={next} /></p><p><Copy text={student} /></p><div className="home-insights-controls">{[-1, 1].map(direction => <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} key={direction} aria-label={`${direction < 0 ? "Previous" : "Next"} project stages`} onClick={() => rail.current?.scrollBy({ left: direction * (((rail.current.firstElementChild as HTMLElement)?.clientWidth || 450) + 24), behavior: reduced ? "instant" : "smooth" })}>{direction < 0 ? "←" : "→"}</motion.button>)}</div></div></div><div ref={rail} className="home-insights-rail" role="region" aria-label="project stages" tabIndex={0}>{stages.map(line => { const [label, rest] = splitLabel(line); const dot = rest.indexOf(". "); const heading = dot < 0 ? rest : rest.slice(0, dot + 1); const detail = dot < 0 ? "" : rest.slice(dot + 2); return <a key={label} className="home-insight-card" href="#implementation"><div className="home-insight-image"><MediaReplacement className={styles.cardMedia} /></div><div className="home-insight-meta"><span data-nocount="">Project stage</span><time>{label}</time></div><h3 data-counted="">{heading}</h3>{detail && <p><Copy text={detail} /></p>}</a>; })}</div></div></div></div>;
}

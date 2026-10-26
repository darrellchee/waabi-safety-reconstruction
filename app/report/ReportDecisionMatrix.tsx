"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "../../components/useReducedMotion";
import styles from "./ReportDecisionMatrix.module.css";

type Props = { caption: string; headings: string[]; rows: string[][] };

export function ReportDecisionMatrix({ caption, headings, rows }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);
  const reduced = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [step, setStep] = useState(0);
  const inView = useInView(track, { once: true, amount: .25 });
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const criterionCount = headings.length - 3;
  const lastStep = criterionCount + 2;

  useEffect(() => {
    const query = matchMedia("(min-width: 1100px)");
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const element = surface.current;
    if (!element) return;
    // Keep the enlarged matrix fully visible while it is pinned, even on short screens.
    const fit = () => setFitScale(Math.min(1, Math.max(1, window.innerHeight - 128) / element.offsetHeight));
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    window.addEventListener("resize", fit);
    fit();
    return () => { observer.disconnect(); window.removeEventListener("resize", fit); };
  }, []);
  useMotionValueEvent(scrollYProgress, "change", progress => {
    if (pinned && !reduced) setStep(Math.min(lastStep, Math.floor(progress * (lastStep + 1))));
  });
  useEffect(() => {
    if (pinned || reduced || !inView) return;
    // Smaller viewports keep native scrolling and reveal the arrows once.
    let next = 0;
    const timer = setInterval(() => {
      next += 1;
      setStep(next);
      if (next >= lastStep) clearInterval(timer);
    }, 450);
    return () => clearInterval(timer);
  }, [pinned, reduced, inView, lastStep]);

  const shown = reduced ? lastStep : step;
  const complete = shown >= lastStep;
  const weights = headings.slice(1, -2).map(heading => Number(heading.match(/\((\d+)\)/)?.[1] ?? 1));
  const points = rows.map(row => weights.map((weight, i) => weight * Number(row[i + 1])));
  const totals = points.map(scores => scores.slice(0, Math.min(shown, criterionCount)).reduce((sum, score) => sum + score, 0));
  const low = Math.min(...totals), high = Math.max(...totals);
  const color = (index: number) => high === low ? "#9b762d" : `hsl(${((totals[index] - low) / (high - low) * 140).toFixed(1)} 62% 35%)`;
  const winner = rows.findIndex(row => Number(row[row.length - 1]) === 1);

  return <div ref={track} className={styles.track} data-pinned={pinned && !reduced}>
    <div className={styles.stage}>
      <div ref={surface} className={styles.surface} style={{ transform: pinned && !reduced ? `scale(${fitScale})` : undefined }}>
        <div className={styles.guide} data-nocount="">
          <span>{complete ? "Scores complete" : "Follow the weighted scores"}</span>
          <span>{reduced ? "Final result" : pinned ? "Scroll to follow the arrows" : "Rating × weight = points"}</span>
        </div>
        <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Decision matrix; scroll horizontally on smaller screens">
          <table className={styles.table}>
            <caption>{caption}</caption>
            <colgroup><col className={styles.ideaColumn} />{headings.slice(1).map((_, i) => <col key={i} />)}</colgroup>
            <thead><tr>{headings.map((heading, i) => <th scope="col" key={heading} data-current={!complete && shown === i && i > 0}>{heading}</th>)}</tr></thead>
            <tbody>{rows.map((row, r) => <tr key={row[0]} data-winner={complete && r === winner} style={{ "--score-color": color(r) } as CSSProperties}>
              {row.map((cell, c) => c === 0 ? <th scope="row" key={c}>{cell}</th> : <td key={c} data-reached={shown >= c}>
                <span className={styles.cellValue}>{cell}</span>
                {c > criterionCount && <span className={styles.liveScore} aria-hidden="true" data-nocount="">{c === criterionCount + 1 && !complete ? `${totals[r]} so far` : c === criterionCount + 2 && complete && r === winner ? "Highest score" : ""}</span>}
                <motion.span className={styles.arrow} aria-hidden="true" data-nocount="" initial={false} animate={{ opacity: shown >= c ? 1 : 0, scaleX: shown >= c ? 1 : 0 }} transition={{ duration: reduced ? 0 : .4, ease: [.19, 1, .22, 1] }}>
                  <span className={styles.arrowLine} />
                  <motion.span className={styles.points} initial={false} animate={{ opacity: shown >= c ? 1 : 0, y: shown >= c ? 0 : 8 }} transition={{ duration: reduced ? 0 : .3, delay: reduced ? 0 : .15 }}>
                    {c <= criterionCount ? `+${points[r][c - 1]} pts` : c === criterionCount + 1 ? `${totals[r]} pts` : `#${cell}`}
                  </motion.span>
                </motion.span>
              </td>)}
            </tr>)}</tbody>
          </table>
        </div>
        <div className={styles.footer} data-nocount="">
          <span className={styles.scale}><i />Lower running score → Higher running score</span>
          <span className={styles.result} data-complete={complete}>{complete ? `${rows[winner][0]} · ${rows[winner][criterionCount + 1]} points · Ranked 1st` : `${Math.min(shown, criterionCount)} of ${criterionCount} criteria scored`}</span>
        </div>
        <div className={styles.progress} aria-hidden="true" data-nocount=""><span style={{ transform: `scaleX(${shown / lastStep})` }} /></div>
      </div>
    </div>
  </div>;
}

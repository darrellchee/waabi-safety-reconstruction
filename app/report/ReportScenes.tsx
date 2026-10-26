"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { lines, splitLabel, status, text, title } from "./blocks";
import { useCarouselMotion } from "../../components/useCarouselMotion";
import { useReducedMotion } from "../../components/useReducedMotion";
import { Copy, Figure, MediaReplacement } from "./ReportUI";
import { Block, SectionBadge } from "./ReportCodes";
import styles from "./ReportScenes.module.css";
import "../../components/company.css";

function Text({ text }: { text: string }) {
  return <>{text.split("\n").map((line, i) => <p key={i}><Copy text={line} /></p>)}</>;
}
function Controls({ label, move }: { label: string; move: (direction: number) => void }) {
  return <div className="co-controls">{[-1, 1].map(direction => <motion.button key={direction} whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} aria-label={`${direction < 0 ? "Previous" : "Next"} ${label}`} onClick={() => move(direction)}>{direction < 0 ? "←" : "→"}</motion.button>)}</div>;
}
/** Block 2.7: three stat cards, one md line each ("2 m: Planned floor height ..."). */
export function ReportStats() {
  const reduced = useReducedMotion();
  return <div className={styles.scene}><div className={`home-page ${styles.stats}`}><div className="home-tech-cards">{lines("2.7").map((line, index) => { const [number, label] = splitLabel(line); return <motion.article key={number} initial={reduced ? false : { clipPath: "inset(100% 0 0 0)" }} whileInView={{ clipPath: "inset(0% 0 0 0)" }} viewport={{ once: true }} transition={{ duration: .8, delay: index * .15, ease: [.19, 1, .22, 1] }}>
    <MediaReplacement className={`home-film-poster ${styles.cardMedia}`} /><div className="home-cover-shade" /><div><p>{label}</p><h3 data-counted="">{number.replace(/:$/, "")}</h3></div>
  </motion.article>; })}</div></div></div>;
}
/** Blocks 8.1 to 8.8: one card each. The first md line ("Criterion 1: Safety and access") is the card's number and heading. */
export function ReportCriteria() {
  const rail = useRef<HTMLDivElement>(null);
  useCarouselMotion(rail);
  const codes = Array.from({ length: 8 }, (_, i) => `8.${i + 1}`);
  return <section id="criteria" className={styles.scene}><div className="company-page"><div className="co-events"><div className="co-width"><SectionBadge n={8} /><div className="co-event-heading"><h2>Design Criteria</h2><Controls label="criteria" move={direction => rail.current?.scrollBy({ left: direction * ((rail.current.firstElementChild as HTMLElement)?.clientWidth + 24), behavior: "smooth" })} /></div><div className="co-events-track" ref={rail} role="region" aria-label="Design criteria" tabIndex={0}>{codes.map((code, i) => { const [number, heading] = splitLabel(lines(code)[0]); return <Block as="article" className="co-event" code={code} status={status(code)} key={code}><div className="co-event-image">{i === 2 && <MediaReplacement className={styles.cardMedia} />}<time>{number}</time></div><h3 data-counted="">{heading}</h3><span><Copy text={lines(code).slice(1).join(" ")} /></span></Block>; })}</div></div></div></div></section>;
}
/** Section 11: intro blocks 11.1 and 11.2, the four slides 11.3 to 11.6, then the figures 11.7 and 11.8. */
export function ReportDesign({ images }: { images: string[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const reduced = useReducedMotion();
  useCarouselMotion(rail);
  const slides = ["11.3", "11.4", "11.5", "11.6"];
  return <section id="design" className={`${styles.scene} ${styles.design}`}><div className="safety-page">
    <div className={`container section-space ${styles.designIntro}`}><div className="section-heading"><div><SectionBadge n={11} /><h2>Detailed Design</h2></div><div className="technology-intro"><h3>{title("11.1")}</h3><Block as="p" className="serif-description" code="11.1" status="SITE"><Copy text={text("11.1")} /></Block><Block as="p" code="11.2" status="SITE"><Copy text={text("11.2")} /></Block></div></div></div>
    <div className="practices" aria-label="How Provisions Point would work"><div className="practice-slides" ref={rail} onScroll={event => setSlide(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))} role="region" aria-label="detailed design" tabIndex={0}>{slides.map((code, i) => <Block as="article" className="practice-slide" code={code} status={status(code)} key={code}>
      <MediaReplacement className={styles.slideMedia} /><div className="practice-shade" /><div className={`container practice-copy ${styles.slideCopy}`}><div className="practice-counter" data-nocount="">0{i + 1}<small>/4</small></div><h3>{title(code)}</h3><Text text={text(code)} /></div>
    </Block>)}</div><div className="practice-controls">{[-1, 1].map(direction => <motion.button key={direction} whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} className="circle-button" aria-label={`${direction < 0 ? "Previous" : "Next"} detailed design`} onClick={() => rail.current?.scrollBy({ left: direction * rail.current.clientWidth, behavior: reduced ? "instant" : "smooth" })}>{direction < 0 ? "←" : "→"}</motion.button>)}</div><div className="practice-dots">{slides.map((code, i) => <button key={code} aria-label={`Show ${title(code)}`} aria-current={slide === i} onClick={() => rail.current?.scrollTo({ left: i * rail.current.clientWidth, behavior: reduced ? "instant" : "smooth" })} />)}</div></div>
    <div className="container section-space">
      <Figure code="11.7" src={`/assets/company/${images[0]}`} alt="Concept image: aerial view of a raised shelter in a cleared bush campground in the dry season." caption={text("11.7")} />
      <Figure code="11.8" src="/assets/report/insert-image.svg" alt="(change to our assignment content)" caption={text("11.8")} />
    </div>
  </div></section>;
}
/** Block 13.3: the two intro lines, then eight stage cards ("Stage 1: Heading. Detail."). */
export function ReportStages() {
  const rail = useRef<HTMLDivElement>(null);
  useCarouselMotion(rail);
  const reduced = useReducedMotion();
  const [next, student, ...stages] = lines("13.3");
  return <div className={`${styles.scene} ${styles.stages}`}><div className="home-page"><div className="home-insights"><div className="home-insights-top"><h3>{title("13.3")}</h3><div><p><Copy text={next} /></p><p><Copy text={student} /></p><div className="home-insights-controls">{[-1, 1].map(direction => <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} key={direction} aria-label={`${direction < 0 ? "Previous" : "Next"} project stages`} onClick={() => rail.current?.scrollBy({ left: direction * (((rail.current.firstElementChild as HTMLElement)?.clientWidth || 450) + 24), behavior: reduced ? "instant" : "smooth" })}>{direction < 0 ? "←" : "→"}</motion.button>)}</div></div></div><div ref={rail} className="home-insights-rail" role="region" aria-label="project stages" tabIndex={0}>{stages.map(line => { const [label, rest] = splitLabel(line); const dot = rest.indexOf(". "); const heading = dot < 0 ? rest : rest.slice(0, dot + 1); const detail = dot < 0 ? "" : rest.slice(dot + 2); return <a key={label} className="home-insight-card" href="#implementation"><div className="home-insight-image"><MediaReplacement className={styles.cardMedia} /></div><div className="home-insight-meta"><span data-nocount="">Project stage</span><time>{label}</time></div><h3 data-counted="">{heading}</h3>{detail && <p><Copy text={detail} /></p>}</a>; })}</div></div></div></div>;
}

"use client";

import { Fragment, forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useMotionValue, useMotionValueEvent, usePresenceData, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "../../components/useReducedMotion";
import { useCarouselMotion } from "../../components/useCarouselMotion";
import content from "./report-content.json";
import { Copy } from "./ReportUI";
import { ReportSlideNavigation } from "./ReportSlideNavigation";
import { ReportDecisionMatrix } from "./ReportDecisionMatrix";
import { lines, parseTable, status, text, title } from "./blocks";
import { Block, BlockBadge, SectionBadge } from "./ReportCodes";
import styles from "./ReportSolution.module.css";
import { ReportOverviewDiagram, overviewDiagrams } from "./ReportOverviewDiagram";
import { useOverviewSnap } from "./useOverviewSnap";
import { ReportOptionDiagram } from "./ReportOptionDiagram";

const ease = [.19, 1, .22, 1] as const;
const spring = { type: "spring", stiffness: 140, damping: 22 } as const;
const revealVariants = {
  hidden: (index: number) => ({ y: 200 * (index + 1) }),
  visible: { y: 0, transition: { y: { type: "spring" as const, stiffness: 80, damping: 20 } } },
};

function Title({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return <>{text.split(" ").map((word, index) => <Fragment key={`${word}-${index}`}>
    {index > 0 && " "}<motion.span className="safety-motion-word" initial={reduced ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .4, ease, delay: reduced ? 0 : index * .07 }}>{word}</motion.span>
  </Fragment>)}</>;
}

const StoryNumber = forwardRef<HTMLSpanElement, { current: number }>(function StoryNumber({ current }, ref) {
  const direction = usePresenceData() as { get: () => number };
  return <motion.span ref={ref} initial={{ y: `${120 * direction.get()}%` }} animate={{ y: 0 }} exit={{ y: `${-120 * direction.get()}%` }} transition={spring}>0{current + 1}</motion.span>;
});

function useMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return mobile;
}

export function ReportOptions({ overview = false }: { overview?: boolean }) {
  const items = overview
    ? lines("2.5").map((body, index) => ({ heading: overviewDiagrams[index].title, body, code: undefined, image: undefined, alt: overviewDiagrams[index].description }))
    : content.options.map((item, index) => ({ heading: title(`9.${index + 2}`), body: text(`9.${index + 2}`), code: `9.${index + 2}`, image: `/assets/${item.image}`, alt: "Concept image: a raised shelter on concrete piles with brown floodwater around the piles in the wet season" }));
  const count = items.length;
  const heading = overview ? "Overview of Design" : "Design Options";
  const [active, setActive] = useState(0);
  const mobile = useMobile();
  const reduced = useReducedMotion();
  const story = useRef<HTMLDivElement>(null);
  const storyCopies = useRef<HTMLDivElement>(null);
  const direction = useMotionValue(1);
  const inView = useInView(story, { once: true, amount: .2 });
  const { scrollY, scrollYProgress } = useScroll({ target: story, offset: ["start center", "end end"] });
  const { scrollXProgress } = useScroll({ container: storyCopies });
  const lineY = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const lineX = useTransform(scrollXProgress, [0, 1], ["-100%", "0%"]);
  useCarouselMotion(storyCopies);
  useOverviewSnap(storyCopies, overview && !mobile, reduced);
  useMotionValueEvent(scrollY, "change", position => {
    if (mobile || !storyCopies.current) return;
    direction.set(position > (scrollY.getPrevious() ?? position) ? 1 : -1);
    const articles = Array.from(storyCopies.current.children);
    let nearest = 0;
    let distance = Infinity;
    articles.forEach((article, index) => {
      const rect = article.getBoundingClientRect();
      const nextDistance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
      if (nextDistance < distance) { nearest = index; distance = nextDistance; }
    });
    setActive(nearest);
  });
  useMotionValueEvent(scrollXProgress, "change", progress => {
    if (!mobile) return;
    direction.set(progress > (scrollXProgress.getPrevious() ?? 0) ? 1 : -1);
    setActive(Math.max(0, Math.min(count - 1, Math.round(progress * (count - 1)))));
  });
  function selectStorySlide(index: number) {
    const container = storyCopies.current;
    const article = container?.children[index] as HTMLElement | undefined;
    if (!container || !article) return;
    direction.set(index >= active ? 1 : -1);
    if (mobile) {
      const parentRect = container.getBoundingClientRect();
      const rect = article.getBoundingClientRect();
      container.scrollTo({ left: container.scrollLeft + rect.left - parentRect.left + (rect.width - container.clientWidth) / 2, behavior: "instant" });
    } else {
      // Layout offsets ignore the story's entrance animation transforms.
      let top = 0;
      let node: HTMLElement | null = article;
      while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
      window.scrollTo({ top: Math.max(0, top + article.offsetHeight / 2 - window.innerHeight / 2), behavior: "instant" });
    }
    setActive(index);
  }
  const reveal = (index: number) => reduced ? {} : { custom: index, variants: revealVariants, initial: "hidden", animate: inView ? "visible" : "hidden" };
  return <MotionConfig transition={{ duration: .4, ease }} reducedMotion="user">
    <section id={overview ? "summary" : "options"} className={`safety-page philosophy ${styles.options} ${overview ? styles.overview : styles.designOptions}`}>
      <div className="philosophy-intro container">
        <SectionBadge n={overview ? 2 : 9} />
        {overview && <>
          <h3>{title("2.4")}</h3>
          <Block as="p" code="2.4" status={status("2.4")}><Copy text={text("2.4")} /></Block>
        </>}
        <h2 className={overview ? styles.overviewHeading : undefined}>{overview ? <Title text={heading} /> : heading}</h2>
        {!overview && <>
          <Block as="p" code="9.1" status={status("9.1")}><Copy text={text("9.1")} /></Block>
        </>}
      </div>
      <div className="story container" ref={story} data-code={overview ? "2.5" : undefined} data-status={overview ? status("2.5") : undefined}>
        {overview && <BlockBadge code="2.5" status={status("2.5")} top={-18} />}
        <div className="story-content">
          <div className="story-counter-positioner" data-nocount=""><motion.div className="story-counter" {...(overview ? reveal(0) : {})}>
            <div className="story-number">{overview ? <AnimatePresence initial={false} mode="popLayout" custom={direction}><StoryNumber key={active} current={active} /></AnimatePresence> : <span>0{active + 1}</span>}</div><small>/{count}</small>
          </motion.div>
            <div className={styles.slideNavigation}>
              <ReportSlideNavigation label={overview ? "Overview of Design" : "Design options"} orientation="vertical"
                points={items.map((item, index) => ({ id: item.code ?? `overview-${index}`, number: overview ? String(index + 1) : item.heading.split(" ")[0].replace(/\.$/, "") }))}
                current={active} onSelect={selectStorySlide} />
            </div>
          </div>
          <div className="story-line" aria-hidden="true"><motion.div className="story-line-track" style={mobile ? { x: reduced ? 0 : lineX } : { y: reduced ? 0 : lineY }}><b /><i /></motion.div></div>
          <div className="story-copies" ref={storyCopies} tabIndex={0} role="region" aria-label={heading}>
            {items.map((item, index) => <motion.article id={overview ? undefined : `design-option-${item.heading.match(/^\d+\.\d+/)?.[0]}`} tabIndex={overview ? undefined : -1} className={`story-copy ${active === index ? "is-active" : ""}`} key={item.heading} {...(overview ? reveal(index === 0 ? 1 : index) : {})}>
              <motion.div className="story-copy-content" data-code={item.code} data-status={item.code ? status(item.code) : undefined} style={{ position: "relative" }} initial={false} animate={{ opacity: 1 }}>
                {item.code && <BlockBadge code={item.code} status={status(item.code)} top={-18} />}
                {!overview && <h3>{item.heading}</h3>}{item.body.split("\n").filter(Boolean).map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
              </motion.div>
            </motion.article>)}
          </div>
        </div>
        <div className="story-visual"><div className="story-visual-frame"><motion.div className="story-visual-inner" {...reveal(2)}>
          <AnimatePresence initial={false} mode="popLayout">
            {overview
              ? <motion.div key={active} className={styles.overviewDiagram} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .25 }}><ReportOverviewDiagram index={active} /></motion.div>
              : active === 1 || active === 2
              ? <motion.div key={active} className={styles.overviewDiagram} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .35 }}><ReportOptionDiagram option={active === 1 ? "platform" : "checkpoints"} /></motion.div>
              : <motion.img key={active} src={items[active].image} alt={items[active].alt} className="is-active" initial={reduced ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .35, ease: "easeOut" }} />}
          </AnimatePresence>
        </motion.div></div></div>
      </div>
    </section>
  </MotionConfig>;
}

/** Section 10: weighted matrix, rating scale and reasons for each option's ratings. */
export function ReportSelection() {
  const reduced = useReducedMotion();
  const matrix = parseTable("10.2");
  const ratingScale = parseTable("10.5");
  return <section id="selection" className={`safety-page technology section-space ${styles.selection}`}>
    <div className={`container section-heading ${styles.selectionHeading}`}>
      <div><SectionBadge n={10} /><h2>Design Selection</h2></div>
      <Block as="p" className="serif-description" code="10.1" status={status("10.1")}><Copy text={text("10.1")} /></Block>
    </div>
    <div className="container">
      <Block code="10.2" status={status("10.2")}><h3>{title("10.2")}</h3><ReportDecisionMatrix caption={matrix.caption} headings={matrix.head} rows={matrix.rows} /></Block>
      <div className={styles.ratingDetails}>
        <Block code="10.5" status={status("10.5")} className={styles.ratingScale}>
          <table>
            <caption>{ratingScale.caption}</caption>
            <thead><tr>{ratingScale.head.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
            <tbody>{ratingScale.rows.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td></tr>)}</tbody>
          </table>
        </Block>
        <Block as="p" code="10.6" status={status("10.6")} className={styles.weightingExplanation}><Copy text={text("10.6")} /></Block>
      </div>
      <div className={styles.optionRatings}>
        {[["10.7", "10.3"], ["10.8", "10.10"], ["10.9", "10.11"]].map(([code, explanationCode]) => {
          const table = parseTable(code);
          const heading = title(code);
          const optionLabel = heading.match(/\(Design option (\d+\.\d+)\)$/);
          return <div className={styles.optionRating} key={code}>
            <h3 className={styles.optionRatingHeading}>{heading.replace(/\s*\(Design option \d+\.\d+\)$/, "")} {optionLabel && <a className={styles.optionLink} href={`#design-option-${optionLabel[1]}`} onClick={event => {
              if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              const target = document.getElementById(`design-option-${optionLabel[1]}`);
              if (!target) return;
              event.preventDefault();
              target.scrollIntoView({ behavior: "instant", block: "center", inline: "center" });
              target.focus({ preventScroll: true });
              if (location.hash !== event.currentTarget.hash) history.pushState(history.state, "", event.currentTarget.hash);
            }}>{optionLabel[0]}</a>}</h3>
            <Block code={code} status={status(code)}>
              <table className={styles.reasonsTable}>
                <caption>{table.caption}</caption>
                <colgroup><col className={styles.criterionColumn} /><col className={styles.scoreColumn} /><col /></colgroup>
                <thead><tr>{table.head.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
                <tbody>{table.rows.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody>
              </table>
            </Block>
            <div className={styles.optionRatingText}>
              <Block code={explanationCode} status={status(explanationCode)}><p><Copy text={text(explanationCode)} /></p></Block>
            </div>
          </div>;
        })}
      </div>
      <Block as="h3" code="10.4" status={status("10.4")} className={styles.selectionConclusion}>
        <motion.span className={styles.conclusionUnderline} initial={reduced ? false : { backgroundSize: "0% 2px" }} whileInView={{ backgroundSize: "100% 2px" }} viewport={{ once: true, amount: .5 }} transition={{ duration: reduced ? 0 : .9, ease }}>
          {text("10.4")}
        </motion.span>
      </Block>
    </div>
  </section>;
}

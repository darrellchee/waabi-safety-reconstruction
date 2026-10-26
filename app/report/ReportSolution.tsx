"use client";

import { Fragment, forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useMotionValue, useMotionValueEvent, usePresenceData, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "../../components/useReducedMotion";
import { useCarouselMotion } from "../../components/useCarouselMotion";
import content from "./report-content.json";
import { Copy, Paragraphs } from "./ReportUI";
import { ReportDecisionMatrix } from "./ReportDecisionMatrix";
import { lines, parseTable, status, text, title } from "./blocks";
import { Block, BlockBadge, SectionBadge } from "./ReportCodes";
import styles from "./ReportSolution.module.css";

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
  const overviewHeadings = ["Flood resilience and supply security", "Implementation", "Physical components", "Facility users"];
  const items = overview
    ? lines("2.5").map((body, index) => ({ heading: overviewHeadings[index], body, code: undefined, image: content.overviewImages[index].image, alt: content.overviewImages[index].alt }))
    : content.options.map((item, index) => ({ heading: title(`9.${index + 2}`), body: text(`9.${index + 2}`), code: `9.${index + 2}`, image: index === 1 ? "/assets/report/insert-image.svg" : `/assets/${item.image}`, alt: index === 1 ? "(change to our assignment content)" : index === 0 ? "Concept image: a raised shelter on concrete piles with brown floodwater around the piles in the wet season" : "Concept image: a bench with a concrete pile cross-section, a watertight concrete sample and a roof sheet sample" }));
  const count = items.length;
  const heading = overview ? "Overview of Design" : "Design solution options";
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
  useMotionValueEvent(scrollYProgress, "change", progress => {
    if (mobile || !overview) return;
    direction.set(progress > (scrollYProgress.getPrevious() ?? 0) ? 1 : -1);
    setActive(Math.max(1, Math.min(count, Math.round(progress * count))) - 1);
  });
  useMotionValueEvent(scrollY, "change", position => {
    if (mobile || overview || !storyCopies.current) return;
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
  const reveal = (index: number) => reduced ? {} : { custom: index, variants: revealVariants, initial: "hidden", animate: inView ? "visible" : "hidden" };
  return <MotionConfig transition={{ duration: .4, ease }} reducedMotion="user">
    <section id={overview ? "summary" : "options"} className={`safety-page philosophy ${styles.options} ${overview ? "" : styles.designOptions}`}>
      <div className="philosophy-intro container">
        <SectionBadge n={overview ? 2 : 9} />
        {overview && <>
          <h3>{title("2.4")}</h3>
          <Block as="p" code="2.4" status={status("2.4")}><Copy text={text("2.4")} /></Block>
        </>}
        <h2 className={overview ? styles.overviewHeading : undefined}><Title text={heading} /></h2>
        {!overview && <>
          <h3>Design options</h3>
          <Block as="p" code="9.1" status={status("9.1")}><Copy text={text("9.1")} /></Block>
        </>}
      </div>
      <div className="story container" ref={story} data-code={overview ? "2.5" : undefined} data-status={overview ? status("2.5") : undefined}>
        {overview && <BlockBadge code="2.5" status={status("2.5")} top={-18} />}
        <div className="story-content">
          <div className="story-counter-positioner" data-nocount=""><motion.div className="story-counter" {...reveal(0)}>
            <div className="story-number"><AnimatePresence initial={false} mode="popLayout" custom={direction}><StoryNumber key={active} current={active} /></AnimatePresence></div><small>/{count}</small>
          </motion.div></div>
          <div className="story-line" aria-hidden="true"><motion.div className="story-line-track" style={mobile ? { x: reduced ? 0 : lineX } : { y: reduced ? 0 : lineY }}><b /><i /></motion.div></div>
          <div className="story-copies" ref={storyCopies} tabIndex={0} role="region" aria-label={heading}>
            {items.map((item, index) => <motion.article className={`story-copy ${active === index ? "is-active" : ""}`} key={item.heading} {...(overview ? reveal(index === 0 ? 1 : index) : {})}>
              <motion.div className="story-copy-content" data-code={item.code} data-status={item.code ? status(item.code) : undefined} style={{ position: "relative" }} initial={{ opacity: index === 0 ? 1 : overview ? .15 : 0 }} animate={{ opacity: mobile || active === index ? 1 : overview ? .15 : 0 }} transition={overview ? undefined : { duration: reduced ? 0 : .2, ease: "easeOut" }}>
                {item.code && <BlockBadge code={item.code} status={status(item.code)} top={-18} />}
                <h3>{item.heading}</h3>{overview ? <Paragraphs text={item.body} /> : item.body.split("\n").filter(Boolean).map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
              </motion.div>
            </motion.article>)}
          </div>
        </div>
        <div className="story-visual"><div className="story-visual-frame"><motion.div className="story-visual-inner" {...reveal(2)}>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img key={active} src={items[active].image} alt={items[active].alt} style={overview ? { objectPosition: content.overviewImages[active].position } : undefined} className="is-active" initial={reduced ? false : { opacity: 0, scale: overview ? 1.2 : 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={overview ? spring : { duration: reduced ? 0 : .35, ease: "easeOut" }} />
          </AnimatePresence>
        </motion.div></div></div>
      </div>
    </section>
  </MotionConfig>;
}

/** Section 10: intro 10.1, the decision matrix as one real table (10.2), the reading of the scores (10.3) and the decision (10.4). */
export function ReportSelection() {
  const matrix = parseTable("10.2");
  return <section id="selection" className={`safety-page technology section-space ${styles.selection}`}>
    <div className="container section-heading">
      <div><SectionBadge n={10} /><h2><Title text="Design Selection" /></h2></div>
      <div className="technology-intro"><h3>{title("10.1")}</h3><Block as="p" className="serif-description" code="10.1" status={status("10.1")}><Copy text={text("10.1")} /></Block></div>
    </div>
    <div className="container">
      <Block code="10.2" status={status("10.2")}><h3>{title("10.2")}</h3><ReportDecisionMatrix caption={matrix.caption} headings={matrix.head} rows={matrix.rows} /></Block>
      <Block code="10.3" status={status("10.3")}><h3>{title("10.3")}</h3><p><Copy text={text("10.3")} /></p></Block>
      <Block code="10.4" status={status("10.4")}><h3>{title("10.4")}</h3><p><Copy text={text("10.4")} /></p></Block>
    </div>
  </section>;
}

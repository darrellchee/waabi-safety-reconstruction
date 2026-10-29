"use client";

import { ReportHeadingAnchor } from "./ReportHeadingAnchor";

import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useIsPresent, useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "../../components/useReducedMotion";
import { ReportSlideNavigation } from "./ReportSlideNavigation";
import { ReportDetailsVisual } from "./ReportDetailsVisual";
import { BlockBadge, type Status } from "./ReportCodes";
import styles from "./ReportDetails.module.css";

const ease = [.19, 1, .22, 1] as const;
const spring = { type: "spring" as const, stiffness: 140, damping: 22 };

type Slide = { quote: string; name: string; code?: string; status?: Status };

// The Delivery page's "What it costs" quote card, with the report's text in place of the cost notes.
const SlideQuote = forwardRef<HTMLDivElement, { slide: Slide }>(function SlideQuote({ slide }, ref) {
  const present = useIsPresent();
  return <motion.div ref={ref} layout className={styles.quote} aria-hidden={!present} style={{ position: "relative" }} data-code={slide.code} data-status={slide.status}>
    {slide.code && slide.status && <BlockBadge code={slide.code} status={slide.status} />}
    <p className={styles.words}>{slide.quote}</p>
  </motion.div>;
});

export function ReportDetails({ title, slides }: { title: string; slides: Slide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const reduced = useReducedMotion();
  // Scrolling through the pinned stage steps through the slides in equal spans.
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const indexAt = (progress: number) => Math.max(0, Math.min(slides.length - 1, Math.floor(progress * slides.length)));
  useMotionValueEvent(scrollYProgress, "change", progress => setCurrent(indexAt(progress)));
  useEffect(() => setCurrent(indexAt(scrollYProgress.get())), []); // eslint-disable-line react-hooks/exhaustive-deps
  function selectSlide(index: number) {
    const node = track.current;
    if (!node || index < 0 || index >= slides.length) return;
    const start = node.getBoundingClientRect().top + window.scrollY;
    const range = Math.max(0, node.offsetHeight - window.innerHeight);
    // Land in the middle of the slide's scroll interval so scrolling and buttons stay in sync.
    window.scrollTo({ top: start + range * (index + .5) / slides.length, behavior: "instant" });
    setCurrent(index);
  }
  return <div ref={track} className={styles.details} style={{ "--slides": slides.length } as React.CSSProperties} aria-label={title} role="region">
    <div className={styles.mobileSlides}>
      {slides.map((slide, index) => <section key={slide.code ?? index} className={styles.mobileSlide}>
        <h2 className={styles.subheading}><ReportHeadingAnchor text={slide.name} mobile />{slide.name}</h2>
        <p className={styles.words}>{slide.quote}</p>
        <ReportDetailsVisual current={index} />
      </section>)}
    </div>
    <div className={styles.stage}>
    <div className={styles.layout}>
      <motion.div layout className={styles.copy}>
        <motion.div layout className={styles.quoteArea}>
          <AnimatePresence initial={false} mode="popLayout"><motion.h2 key={current} className={styles.subheading}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : .4, ease }}><ReportHeadingAnchor text={slides[current].name} />{slides[current].name}</motion.h2></AnimatePresence>
          <div className={styles.progress} aria-hidden="true">
            <motion.div initial={false} animate={{ scaleX: current / (slides.length - 1) }} transition={reduced ? { duration: 0 } : spring} />
          </div>
          <AnimatePresence initial={false} mode="popLayout"><SlideQuote key={current} slide={slides[current]} /></AnimatePresence>
          {/* The other slides stay in the document, hidden, so every block is on the page whichever slide is showing. */}
          {slides.map((slide, i) => i !== current && <div key={slide.code} hidden data-code={slide.code} data-status={slide.status}><p>{slide.quote}</p></div>)}
        </motion.div>
        <motion.div layout className={styles.controls}>
          <div className={styles.counter} data-nocount="" aria-label={`Project detail ${current + 1} of ${slides.length}`}>
            <AnimatePresence mode="popLayout" initial={false}><motion.span className={styles.number} key={current}
              initial={{ y: "120%" }} animate={{ y: 0 }} exit={{ y: "-120%" }} transition={reduced ? { duration: 0 } : spring}>{current + 1}</motion.span></AnimatePresence>
            <span className={styles.total}>/ {slides.length}</span>
          </div>
          <ReportSlideNavigation label="Project details" points={slides.map((slide, i) => ({ id: slide.code ?? String(i), number: slide.name.split(" ")[0] }))}
            current={current} onSelect={selectSlide} />
          <div className={styles.arrows} data-nocount="">
            <button type="button" className={styles.arrow} aria-label="Previous project detail" disabled={current === 0} onClick={() => selectSlide(current - 1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className={styles.arrow} aria-label="Next project detail" disabled={current === slides.length - 1} onClick={() => selectSlide(current + 1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </motion.div>
      </motion.div>
      <div className={styles.visual}><ReportDetailsVisual current={current} /></div>
    </div>
    </div>
  </div>;
}

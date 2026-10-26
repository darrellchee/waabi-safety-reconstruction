"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useIsPresent, useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "../../components/useReducedMotion";
import { ReportPhotoStack } from "./ReportPhotoStack";
import { BlockBadge, type Status } from "./ReportCodes";
import styles from "./ReportDetails.module.css";

const ease = [.19, 1, .22, 1] as const;
const spring = { type: "spring" as const, stiffness: 140, damping: 22 };
const placeholders = Array.from({ length: 5 }, () => ({ src: "/assets/report/insert-image.svg", width: 1200, height: 1600, alt: "" }));

type Slide = { quote: string; name: string; code?: string; status?: Status };

// The Delivery page's "What it costs" quote card, with the report's text in place of the cost notes.
const SlideQuote = forwardRef<HTMLDivElement, { slide: Slide }>(function SlideQuote({ slide }, ref) {
  const present = useIsPresent();
  const reduced = useReducedMotion();
  const transition = { duration: reduced ? 0 : .4, ease };
  return <motion.div ref={ref} layout className={styles.quote} aria-hidden={!present} style={{ position: "relative" }} data-code={slide.code} data-status={slide.status}
    initial={{ opacity: 0 }} animate={{ opacity: 1, transition }} exit={{ opacity: 0 }}>
    {slide.code && slide.status && <BlockBadge code={slide.code} status={slide.status} />}
    <motion.p layout className={styles.words}>
      {slide.quote.split(/\s+/).map((word, i, words) => <span key={i}><motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : .1, ease: "linear", delay: reduced ? 0 : i * .03 }}
        className={styles.word}>{word}</motion.span>{i < words.length - 1 ? " " : ""}</span>)}
    </motion.p>
  </motion.div>;
});

function Heading({ title, mobile = false }: { title: string; mobile?: boolean }) {
  const reduced = useReducedMotion();
  return <div className={mobile ? styles.titleMobile : styles.titleDesktop}>
    <h2>{title.split(" ").map((word, i, words) => <span key={word}><motion.span className={styles.titleWord}
      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : .4, ease, delay: reduced ? 0 : i * .07 }}>{word}</motion.span>{i < words.length - 1 ? " " : ""}</span>)}</h2>
  </div>;
}

export function ReportDetails({ title, slides }: { title: string; slides: Slide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const reduced = useReducedMotion();
  // Scrolling through the pinned stage steps through the slides in equal spans.
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const indexAt = (progress: number) => Math.max(0, Math.min(slides.length - 1, Math.floor(progress * slides.length)));
  useMotionValueEvent(scrollYProgress, "change", progress => setCurrent(indexAt(progress)));
  useEffect(() => setCurrent(indexAt(scrollYProgress.get())), []); // eslint-disable-line react-hooks/exhaustive-deps
  return <div ref={track} className={styles.details} style={{ "--slides": slides.length } as React.CSSProperties} aria-label={title} role="region">
    <div className={styles.stage}>
    <div className={styles.layout}>
      <motion.div layout className={styles.copy}>
        <motion.div layout className={styles.headingWrapper}><Heading title={title} /></motion.div>
        <motion.div layout className={styles.quoteArea}>
          <AnimatePresence initial={false} mode="popLayout"><motion.h3 key={current} className={styles.subheading}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : .4, ease }}>{slides[current].name}</motion.h3></AnimatePresence>
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
        </motion.div>
      </motion.div>
      <ReportPhotoStack images={placeholders} current={current} />
      <Heading title={title} mobile />
    </div>
    </div>
  </div>;
}

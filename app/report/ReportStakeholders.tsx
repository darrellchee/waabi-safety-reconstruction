"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useIsPresent, useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "../../components/useReducedMotion";
import { lines, status } from "./blocks";
import { Block, type Status } from "./ReportCodes";
import { ReportSlideNavigation } from "./ReportSlideNavigation";
import styles from "./ReportStakeholders.module.css";
import backgroundPhotos from "./background-photos.json";

const transition = { duration: 0.8, ease: [0.77, 0, 0.175, 1] as const };
const visibleCards = 5;
const photos = [
  "1760350326-assignment_portrait_felicia_00336_final.webp",
  "1760350326-assignment_scout_00761_final.webp",
  "1761184004-251006_assignment_collab_05_1012_a.webp",
  "1760350326-assignment_inspection_02613_final.webp",
  "1760350326-assignment_portrait_felicia_00336_final.webp",
  "1760350326-assignment_scout_00761_final.webp",
  "1761184004-251006_assignment_collab_05_1012_a.webp",
  "1760350326-assignment_inspection_02613_final.webp",
  "1760350326-assignment_portrait_felicia_00336_final.webp",
];

/** Report-local copy of the overview's careers collage. */
export function ReportStakeholders() {
  const collage = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = collage.current;
    if (!node || reducedMotion) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let inView = false;
    const refresh = () => {
      clearInterval(timer);
      if (inView && !document.hidden)
        timer = setInterval(() => setIndex(value => (value + 1) % photos.length), 2000);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      refresh();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", refresh);
      clearInterval(timer);
    };
  }, [reducedMotion]);

  return <Block code="5.5" status={status("5.5")}>
    <h3>Stakeholders and organisations</h3>
    <ul className={styles.names}>{lines("5.5").map(name => <li key={name}>{name}</li>)}</ul>
    <StakeholderCards index={index} reducedMotion={reducedMotion} collage={collage} />
  </Block>;
}

function StakeholderCards({ index, reducedMotion, collage, paired = false }: {
  index: number; reducedMotion: boolean; collage?: React.RefObject<HTMLDivElement | null>; paired?: boolean;
}) {
  const cards = paired ? backgroundPhotos : photos.map(name => ({ src: `/assets/home/${name}`, alt: "" }));
  return (
    <div className={styles.bleed} aria-hidden="true">
      <div className={styles.collage} ref={collage}>
        <AnimatePresence initial={false}>
          {cards.map((photo, i) => {
            const slot = (i - index + (paired ? visibleCards - 1 : 0) + cards.length) % cards.length;
            return slot < visibleCards ? <StakeholderCard key={i} src={photo.src} alt={photo.alt} slot={slot} reducedMotion={reducedMotion} /> : null;
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StakeholderCard({ src, alt, slot, reducedMotion }: { src: string; alt: string; slot: number; reducedMotion: boolean }) {
  const present = useIsPresent();
  // Presence can reverse before an exit finishes. Keep stacking outside Motion's
  // exit animation and explicitly animate both directions back to their full state.
  return <motion.div layout data-slot={slot} className={styles.frame} style={{ zIndex: present ? slot + 1 : 0 }}
    transition={reducedMotion ? { duration: 0 } : transition}>
    <motion.div layout initial={{ x: "100%" }} animate={present ? { x: "0%", scale: 1 } : { x: 20, scale: .5 }}
      exit={{ scale: .5, x: 20 }} transition={reducedMotion ? { duration: 0 } : transition} className={styles.window} style={{ borderRadius: 12 }}>
      <motion.div layout initial={{ scale: 1.5 }} animate={{ scale: 1 }} transition={reducedMotion ? { duration: 0 } : transition} className={styles.crop}>
        <img src={src} alt={alt} />
      </motion.div>
    </motion.div>
  </motion.div>;
}

type BackgroundSlide = { heading: string; paragraph: string; code: string; status: Status };

export function ReportBackgroundSlideshow({ slides }: { slides: BackgroundSlide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", progress => {
    setCurrent(Math.max(0, Math.min(slides.length - 1, Math.floor(progress * slides.length))));
  });
  useEffect(() => {
    setCurrent(Math.max(0, Math.min(slides.length - 1, Math.floor(scrollYProgress.get() * slides.length))));
  }, [scrollYProgress, slides.length]);

  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    // On short screens, let the full copy scroll into view before pinning the stage.
    const measure = () => node.style.setProperty("--stage-top", `${Math.min(100, window.innerHeight - node.offsetHeight)}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  function selectSlide(index: number) {
    const node = track.current;
    if (!node || index < 0 || index >= slides.length) return;
    const start = node.getBoundingClientRect().top + window.scrollY;
    const distance = Math.max(0, node.offsetHeight - window.innerHeight);
    window.scrollTo({ top: start + distance * (index + .5) / slides.length, behavior: "instant" });
    setCurrent(index);
  }

  return <div ref={track} className={styles.slideshow} style={{ "--slides": slides.length } as CSSProperties} role="region" aria-label="Background slideshow">
    <div ref={stage} className={styles.stage}>
      <div className={styles.slideCopy}>
        <h2 className={styles.heading}>Background</h2>
        <div className={styles.slides}>
          {slides.map((slide, i) => <div key={slide.code} hidden={i !== current}>
            <Block code={slide.code} status={slide.status}>
              <h3 className={styles.slideHeading}>{slide.heading}</h3>
              <p className={styles.paragraph}>{slide.paragraph}</p>
            </Block>
          </div>)}
        </div>
        <div className={styles.controls} data-nocount="">
          <span aria-live="polite" aria-atomic="true">{current + 1} / {slides.length}</span>
          <ReportSlideNavigation label="Background" points={slides.map(slide => ({ id: slide.code, number: slide.heading.split(" ")[0] }))}
            current={current} onSelect={selectSlide} />
          <div className={styles.arrows}>
            <button type="button" aria-label="Previous background slide" disabled={current === 0} onClick={() => selectSlide(current - 1)}>←</button>
            <button type="button" aria-label="Next background slide" disabled={current === slides.length - 1} onClick={() => selectSlide(current + 1)}>→</button>
          </div>
        </div>
      </div>
      <StakeholderCards index={current} reducedMotion={reducedMotion} paired />
    </div>
  </div>;
}

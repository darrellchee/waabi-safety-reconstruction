"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "../../components/useReducedMotion";
import { lines, status } from "./blocks";
import { Block } from "./ReportCodes";
import styles from "./ReportStakeholders.module.css";

const transition = { duration: 0.8, ease: [0.77, 0, 0.175, 1] as const };
const photos = [
  "1760350326-waabi_portrait_felicia_00336_final.webp",
  "1760350326-waabi_scout_00761_final.webp",
  "1761184004-251006_waabi_collab_05_1012_a.webp",
  "1760350326-waabi_inspection_02613_final.webp",
  "1760350326-waabi_portrait_felicia_00336_final.webp",
  "1760350326-waabi_scout_00761_final.webp",
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
    <div className={styles.bleed} aria-hidden="true">
      <div className={styles.collage} ref={collage}>
        <AnimatePresence initial={false}>
          {photos.map((name, i) => {
            const slot = (i - index + photos.length) % photos.length;
            return slot < 4 ? <motion.div layout key={i} data-slot={slot} className={styles.frame} exit={{ zIndex: 0 }} transition={reducedMotion ? { duration: 0 } : { layout: transition, ...transition, zIndex: { duration: 0 } }}>
              <motion.div layout initial={{ x: "100%" }} animate={{ x: "0%" }} exit={{ scale: .5, x: 20 }} transition={reducedMotion ? { duration: 0 } : transition} className={styles.window} style={{ borderRadius: 12 }}>
                <motion.div layout initial={{ scale: 1.5 }} animate={{ scale: 1 }} transition={reducedMotion ? { duration: 0 } : transition} className={styles.crop}>
                  <img src={`/assets/home/${name}`} alt="" />
                </motion.div>
              </motion.div>
            </motion.div> : null;
          })}
        </AnimatePresence>
      </div>
    </div>
  </Block>;
}

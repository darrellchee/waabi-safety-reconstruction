"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "../../components/useReducedMotion";
import photos from "./hero-photos.json";
import type { ReportPageId } from "./report-navigation";
import styles from "./ReportPageHero.module.css";

const ease = [.19, 1, .22, 1] as const;

// Report-only copy of CareersHero and TitleWords; the reference page stays unchanged.
export function ReportPageHero({ title, page }: { title: string; page: Exclude<ReportPageId, "summary"> }) {
  const photo = photos.find(photo => photo.page === (page === "supporting-documents" ? "recommendations" : page))!;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return <div ref={ref} className={styles.hero} data-page={page}>
    <div className={styles.clip}>
      <motion.div className={styles.image} style={{ y }}>
        <img src={photo.src} alt={photo.alt} fetchPriority="high" width={photo.width} height={photo.height} style={{ objectPosition: photo.position }} />
        {photo.videoSrc && !reduced && <video src={photo.videoSrc} poster={photo.src} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} style={{ objectPosition: photo.position }} />}
      </motion.div>
      <div className={styles.shade} />
      <div className={styles.content}>
        <div className={styles.title}><h1><span className={styles.lines}><span className={styles.line}>{title.split(" ").map((word, index, words) => <span key={index}>
          {page === "options" ? <span className={styles.word}>{word}</span> : <motion.span className={styles.word} initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : .4, ease, delay: reduced ? 0 : index * .07 }}>{word}</motion.span>}
          <span>{index < words.length - 1 ? " " : ""}</span>
        </span>)}</span></span></h1></div>
      </div>
    </div>
  </div>;
}

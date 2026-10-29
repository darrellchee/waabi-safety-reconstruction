"use client";

import { useEffect, useId, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { useReducedMotion } from "../../components/useReducedMotion";
import { ART_CYCLE_DURATION, CARD_START_INTERVAL, implementationConnector, implementationSequence } from "./implementation-sequence";
import styles from "./ReportImplementation.module.css";

export function ReportImplementationGallery({ cards, Illustration, label }: {
  cards: { title: string; subtitle: string }[];
  Illustration: ComponentType<{ step: number }>;
  label: string;
}) {
  const gallery = useRef<HTMLDivElement>(null);
  const figures = useRef<(HTMLElement | null)[]>([]);
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [geometry, setGeometry] = useState({ width: 0, height: 0, paths: [] as string[] });
  const marker = `implementation-arrow-${useId().replace(/:/g, "")}`;
  const playing = visible && pageVisible && !reduced;
  const started = elapsed > 0;
  const sequence = implementationSequence(reduced ? Infinity : elapsed, cards.length, started || reduced);

  useEffect(() => {
    const node = gallery.current;
    if (!node) return;
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting));
    observer.observe(node);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const node = gallery.current;
    if (!node || reduced) return;
    let frame = 0;
    const duration = (cards.length - 1) * CARD_START_INTERVAL + ART_CYCLE_DURATION;
    function update() {
      frame = 0;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * .35 - rect.top) / (rect.height - window.innerHeight * .3)));
      setElapsed(progress * duration);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    const observer = new ResizeObserver(schedule);
    observer.observe(node);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [cards.length, reduced]);

  useEffect(() => {
    const node = gallery.current;
    if (!node) return;
    let cancelled = false;
    function measure() {
      if (!node || cancelled) return;
      const container = node.getBoundingClientRect();
      const bounds = figures.current.slice(0, cards.length).map(figure => {
        const canvas = figure?.firstElementChild?.getBoundingClientRect();
        if (!figure || !canvas) return null;
        return { left: canvas.left - container.left, top: canvas.top - container.top,
          width: canvas.width, height: canvas.height };
      });
      const twoColumns = bounds[0] && bounds[1] && Math.abs(bounds[0].left - bounds[1].left) > 1;
      const paths = bounds.slice(1).map((to, index) => {
        const from = bounds[index];
        if (!from || !to) return "";
        const side = twoColumns && from.left < container.width / 2 ? "left" : "right";
        return implementationConnector(from, to, side);
      });
      const next = { width: container.width, height: container.height, paths };
      setGeometry(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    figures.current.forEach(figure => { if (figure) observer.observe(figure); });
    document.fonts.ready.then(measure);
    measure();
    return () => { cancelled = true; observer.disconnect(); };
  }, [cards.length]);

  return <div ref={gallery} className={`${styles.gallery} ${styles.lifecycleGallery} ${styles.sequenceGallery}`}
    role="group" aria-label={label} data-playing={playing} data-sequence-complete={sequence.complete}
    style={{ "--art-duration": `${ART_CYCLE_DURATION}ms`, "--sequence-play-state": "paused" } as CSSProperties}>
    {cards.map((card, step) => {
      const hasStarted = step < sequence.startedCards;
      const state = sequence.complete ? "complete" : step === sequence.activeCard ? "active" : hasStarted ? "started" : "waiting";
      return <figure key={card.title} ref={node => { figures.current[step] = node; }} className={styles.sequenceCard}
        data-card-state={state} data-started={hasStarted}
        style={{ "--art-play-state": playing ? "running" : "paused" } as CSSProperties}>
        <div className={`${styles.image} ${styles.stageCanvas}`}><Illustration step={step} /></div>
        <figcaption>
          <span className={styles.stageNumber} aria-hidden="true">0{step + 1}</span>
          <span className={styles.stageTitle}>{card.title}</span>
          <span className={styles.stageSubtitle}>{card.subtitle}</span>
        </figcaption>
      </figure>;
    })}
    {geometry.width > 0 && <svg className={styles.sequenceArrows} viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      aria-hidden="true" focusable="false">
      <defs><marker id={marker} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto">
        <path d="m2 2 6 3-6 3" fill="none" stroke="#ff286b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </marker></defs>
      {geometry.paths.map((path, index) => index + 1 < sequence.startedCards && path && <g key={index} style={{ "--connector-delay": `${-Math.max(0, elapsed - (index + 1) * CARD_START_INTERVAL)}ms` } as CSSProperties}>
        <path className={styles.arrowLine} d={path} pathLength={1} data-connector={index + 1} />
        <path className={styles.arrowHead} d={path} markerEnd={`url(#${marker})`} />
      </g>)}
    </svg>}
  </div>;
}

"use client";

import { ReportHeadingAnchor } from "./ReportHeadingAnchor";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "../../components/useReducedMotion";
import { Block } from "./ReportCodes";
import { ReportStepIllustration } from "./ReportStepIllustration";
import { lines, status, text, title } from "./blocks";
import styles from "./ReportDesign.module.css";
import "../../components/home.css";

function StepConnector({ index, count, progress }: { index: number; count: number; progress: MotionValue<number> }) {
  const draw = useTransform(progress, [index / count, (index + 1) / count], [0, 1]);
  const curveOpacity = useTransform(draw, [0, .01], [0, 1]);
  const tipOpacity = useTransform(draw, [.85, 1], [0, 1]);

  return <svg className={`${styles.stepConnector} ${index % 2 ? styles.connectorBottom : styles.connectorTop}`}
    viewBox="0 0 80 60" fill="none" aria-hidden="true" focusable="false">
    <motion.path d="M8 52 C4 -8 76 -8 72 52" style={{ pathLength: draw, opacity: curveOpacity }} />
    <motion.path d="m62 41 10 11 9-13" style={{ opacity: tipOpacity }} />
  </svg>;
}

export function ReportDesignStages() {
  const steps = lines("11.9");
  const scene = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [size, setSize] = useState({ travel: 0, height: 0, nav: 56, card: 0, inset: 0, viewport: 0 });
  const { scrollYProgress } = useScroll({ target: scene, offset: [`start ${size.nav}px`, `end ${size.nav + size.height}px`] });
  const x = useTransform(scrollYProgress, progress => -size.travel * progress);

  const progress = useTransform(x, position => size.travel > 0 ? -position / size.travel : 0);

  useLayoutEffect(() => {
    const stageNode = stage.current;
    const railNode = rail.current;
    const navigation = document.querySelector("header nav");
    if (!stageNode || !railNode) return;
    function measure() {
      if (!stageNode || !railNode) return;
      const travel = Math.max(0, railNode.scrollWidth - railNode.clientWidth);
      const height = stageNode.getBoundingClientRect().height;
      const navigationHeight = Math.ceil(navigation?.getBoundingClientRect().height ?? 48) + 8;
      // A tall mobile introduction can scroll above the header before pinning,
      // leaving the full-size illustration and its caption inside the viewport.
      const nav = window.innerWidth < 768 ? Math.min(navigationHeight, Math.floor(window.innerHeight - height)) : navigationHeight;
      const card = railNode.firstElementChild?.getBoundingClientRect().width ?? 0;
      const inset = parseFloat(getComputedStyle(railNode).paddingLeft) || 0;
      const viewport = railNode.clientWidth;
      setSize(previous => previous.travel === travel && previous.height === height && previous.nav === nav && previous.card === card && previous.inset === inset && previous.viewport === viewport ? previous : { travel, height, nav, card, inset, viewport });
    }
    const observer = new ResizeObserver(measure);
    observer.observe(stageNode);
    observer.observe(railNode);
    if (navigation) observer.observe(navigation);
    window.addEventListener("resize", measure);
    document.fonts.ready.then(measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  return <div ref={scene} data-operating-steps="" className={styles.scrollScene} style={{ "--step-nav": `${size.nav}px`, "--step-travel": `${reduced ? 0 : size.travel}px`, "--step-height": `${size.height}px` } as CSSProperties}>
    <section ref={stage} className={`home-page ${styles.carousel}`} aria-labelledby="design-how-heading">
    <div className="home-insights">
      <div className="home-insights-top">
        <Block code="11.5" status={status("11.5")} className={`${styles.copy} ${styles.howIntro}`}>
          <h2 id="design-how-heading"><ReportHeadingAnchor text={title("11.5")} />{title("11.5")}</h2>
          <p>{text("11.5")}</p>
        </Block>
      </div>
      <Block code="11.9" status={status("11.9")}>
      <div className={styles.railViewport}>
      <motion.div className="home-insights-rail" ref={rail} style={{ x: reduced ? 0 : x }} role="group" aria-label="Operating steps">
        {steps.map((detail, index) => <article key={detail} className="home-insight-card">
          <div className={`home-insight-image ${styles.stepCanvas}`}>
            <ReportStepIllustration step={index} progress={progress} reduced={reduced}
              start={size.travel > 0 ? Math.max(0, (size.inset + index * (size.card + 16) - size.viewport + size.card * .5) / size.travel) : 0}
              end={size.travel > 0 ? Math.min(1, (size.inset + index * (size.card + 16) + size.card * .5) / size.travel) : 1} />
          </div>
          <h3><ReportHeadingAnchor text={detail} />{detail}</h3>
          {!reduced && index < steps.length - 1 && <StepConnector index={index} count={steps.length - 1} progress={progress} />}
        </article>)}
      </motion.div>
      </div>
      </Block>
      <div className={styles.stepProgress} aria-hidden="true" data-nocount="">
        <motion.div style={{ scaleX: progress }} />
      </div>
    </div>
    </section>
  </div>;
}

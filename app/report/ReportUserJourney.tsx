"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "../../components/useReducedMotion";
import styles from "./ReportUserJourney.module.css";

/* ── journey data (adapted from the reference image) ──────────────── */

interface Stage {
  title: string;
  subtitle: string;
  /** 0 = centre line, positive = satisfied, negative = unsatisfied. Range roughly -2 … +2. */
  emotionStart: number;
  emotionEnd: number;
  event: string;
  breakthrough: string;
  pain: string;
}

const stages: Stage[] = [
  {
    title: "Stage 1",
    subtitle: "Arriving at Warokutal",
    emotionStart: 1.6,
    emotionEnd: 0.6,
    event:
      "Visitor drives in early in the wet season and checks in at the Provisions Point.",
    breakthrough:
      "Gets a safety flyer, a road update and the emergency cabinet code.",
    pain: "Rough roads and unpredictable weather make the trip tiring.",
  },
  {
    title: "Stage 2",
    subtitle: "Flood cuts the road",
    emotionStart: 0.6,
    emotionEnd: -1.6,
    event:
      "Flash flooding washes out the track. There is no phone reception and supplies are running low.",
    breakthrough:
      "Remembers there is a supply point close by at the campground.",
    pain: "Feels stranded and isolated, with no way to call for help.",
  },
  {
    title: "Stage 3",
    subtitle: "Reaching the Provisions Point",
    emotionStart: -0.4,
    emotionEnd: -0.2,
    event:
      "Walks or drives to the raised building on higher ground.",
    breakthrough:
      "The building sits above the water, with lighting and clear signage.",
    pain: "May arrive outside Ranger hours.",
  },
  {
    title: "Stage 4",
    subtitle: "Getting help",
    emotionStart: 1.4,
    emotionEnd: 0.8,
    event:
      "Buys water and food, and hires a recovery kit, PLB or UHF radio, or uses the emergency cabinet.",
    breakthrough:
      "Can contact Rangers and has the gear to recover the vehicle.",
    pain: "Hire fees and a deposit add to the cost of the trip.",
  },
  {
    title: "Stage 5",
    subtitle: "Recovering and leaving",
    emotionStart: 1.6,
    emotionEnd: 1.8,
    event:
      "Recovers the vehicle once the water drops, returns the gear and gets the deposit back.",
    breakthrough:
      "Leaves safely without needing a Ranger call out.",
    pain: "Waiting for the road to reopen can take time.",
  },
];

/* ── helpers ───────────────────────────────────────────────────────── */

/** Map an emotion value (−2…+2) to a Y pixel within the curve canvas. */
function emotionToY(value: number, height: number) {
  // +2 → top (padding), −2 → bottom
  const padding = 40;
  const range = height - padding * 2;
  return padding + range * (1 - (value + 2) / 4);
}

/** Build an SVG path through the dot positions using smooth cubic curves. */
function buildCurvePath(
  points: { x: number; y: number }[]
): string {
  if (points.length === 0) return "";
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` C${cpx},${prev.y} ${cpx},${curr.y} ${curr.x},${curr.y}`;
  }
  return d;
}

/* ── component ────────────────────────────────────────────────────── */

const ease = [0.19, 1, 0.22, 1] as const;

export function ReportUserJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();
  const [canvasSize, setCanvasSize] = useState({ w: 800, h: 240 });

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    function measure() {
      if (!node) return;
      setCanvasSize({ w: node.clientWidth, h: node.clientHeight });
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    measure();
    return () => observer.disconnect();
  }, []);

  // Build points for the curve – two per stage (start & end emotion)
  const stageWidth = canvasSize.w / stages.length;
  const allPoints: { x: number; y: number; stage: number; satisfied: boolean }[] = [];
  stages.forEach((stage, i) => {
    const xStart = stageWidth * i + stageWidth * 0.2;
    const xEnd = stageWidth * i + stageWidth * 0.8;
    allPoints.push({
      x: xStart,
      y: emotionToY(stage.emotionStart, canvasSize.h),
      stage: i,
      satisfied: stage.emotionStart >= 0,
    });
    allPoints.push({
      x: xEnd,
      y: emotionToY(stage.emotionEnd, canvasSize.h),
      stage: i,
      satisfied: stage.emotionEnd >= 0,
    });
  });

  const curvePath = buildCurvePath(allPoints);
  const midY = emotionToY(0, canvasSize.h);

  return (
    <div ref={ref} className={styles.wrapper}>
      <h3 className={styles.heading}>User Journey Map</h3>
      <p className={styles.subheading}>
        A visitor stranded by flooding at Warokutal
      </p>

      <div className={styles.card}>
        {/* Stage headers */}
        <div className={styles.stageStrip}>
          <div className={styles.touchpointLabel}>Touchpoints</div>
          {stages.map((stage, i) => (
            <motion.div
              key={stage.title}
              className={styles.stageCell}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                ease,
                delay: reduced ? 0 : 0.1 + i * 0.08,
              }}
            >
              <div className={styles.stageNumber}>{i + 1}</div>
              <p className={styles.stageTitle}>{stage.title}</p>
              <p className={styles.stageSubtitle}>{stage.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* Emotion curve */}
        <div className={styles.curveArea}>
          <div className={styles.curveLabels}>
            <span className={styles.satisfiedLabel}>Satisfied</span>
            <div className={styles.emotionTag}>
              <span>Emotional</span>
              <span>experience</span>
            </div>
            <span className={styles.unsatisfiedLabel}>Unsatisfied</span>
          </div>

          <div ref={canvasRef} className={styles.curveCanvas}>
            {/* Centre line */}
            <svg className={styles.curveSvg}>
              <line
                x1={0}
                y1={midY}
                x2={canvasSize.w}
                y2={midY}
                stroke="#e9e7e4"
                strokeWidth={1}
                strokeDasharray="6 4"
              />
            </svg>

            {/* Animated curve */}
            <motion.svg className={styles.curveSvg}>
              <defs>
                <linearGradient id="journeyCurveGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0b6e4f" />
                  <stop offset="35%" stopColor="#c03744" />
                  <stop offset="55%" stopColor="#c03744" />
                  <stop offset="75%" stopColor="#0b6e4f" />
                  <stop offset="100%" stopColor="#0b6e4f" />
                </linearGradient>
              </defs>
              {/* Glow trail */}
              <motion.path
                d={curvePath}
                className={styles.curveGradient}
                stroke="url(#journeyCurveGrad)"
                initial={reduced ? false : { pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{
                  duration: reduced ? 0 : 2.4,
                  ease: [0.33, 1, 0.68, 1],
                  delay: reduced ? 0 : 0.5,
                }}
              />
              {/* Main curve */}
              <motion.path
                d={curvePath}
                className={styles.curvePath}
                stroke="url(#journeyCurveGrad)"
                initial={reduced ? false : { pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{
                  duration: reduced ? 0 : 2.4,
                  ease: [0.33, 1, 0.68, 1],
                  delay: reduced ? 0 : 0.5,
                }}
              />
            </motion.svg>

            {/* Dots */}
            {allPoints.map((point, i) => (
              <motion.div
                key={i}
                className={`${styles.dot} ${
                  point.satisfied
                    ? styles.dotSatisfied
                    : styles.dotUnsatisfied
                }`}
                style={{
                  left: point.x - 21,
                  top: point.y - 21,
                }}
                initial={reduced ? false : { scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: reduced ? 0 : 0.6 + i * 0.16,
                }}
              >
                {Math.floor(i / 2) + 1}
                {/* Pulse ring */}
                <motion.span
                  className={styles.dotPulse}
                  initial={reduced ? false : { scale: 1, opacity: 0 }}
                  animate={
                    inView && !reduced
                      ? {
                          scale: [1, 1.8, 1.8],
                          opacity: [0.6, 0, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.6,
                    ease: "easeOut",
                    delay: reduced ? 0 : 1 + i * 0.16,
                    repeat: 0,
                  }}
                />
              </motion.div>
            ))}

            {/* Stage dividers */}
            <svg className={styles.curveSvg}>
              {stages.map(
                (_, i) =>
                  i > 0 && (
                    <line
                      key={i}
                      x1={stageWidth * i}
                      y1={0}
                      x2={stageWidth * i}
                      y2={canvasSize.h}
                      stroke="#e9e7e4"
                      strokeWidth={1}
                    />
                  )
              )}
            </svg>
          </div>
        </div>

        {/* Detail rows */}
        <div className={styles.detailRows}>
          {(["event", "breakthrough", "pain"] as const).map((type) => (
            <div key={type} className={styles.detailRow}>
              <div
                className={`${styles.detailLabel} ${
                  type === "event"
                    ? styles.detailLabelEvent
                    : type === "breakthrough"
                    ? styles.detailLabelBreakthrough
                    : styles.detailLabelPain
                }`}
              >
                {type === "event"
                  ? "Event"
                  : type === "breakthrough"
                  ? "Breakthrough"
                  : "Pain point"}
              </div>
              {stages.map((stage, i) => (
                <motion.div
                  key={i}
                  className={styles.detailCell}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.45,
                    ease,
                    delay: reduced
                      ? 0
                      : 1.6 +
                        (type === "event"
                          ? 0
                          : type === "breakthrough"
                          ? 0.15
                          : 0.3) +
                        i * 0.06,
                  }}
                >
                  {stage[type]}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

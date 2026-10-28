"use client";

import { useId } from "react";
import styles from "./ReportSlideNavigation.module.css";

type Point = { id: string; number: string };

export function ReportSlideNavigation({ label, points, current, onSelect, orientation = "horizontal" }: {
  label: string; points: Point[]; current: number; onSelect: (index: number) => void; orientation?: "horizontal" | "vertical";
}) {
  const id = useId();
  return <div className={`${styles.markers} ${orientation === "vertical" ? styles.vertical : ""}`} role="group" aria-label={`${label} points`} data-nocount="">
    {points.map((point, i) => {
      const tooltipId = `${id}-${point.id}`;
      return <button key={point.id} type="button" className={styles.marker}
        aria-label={`Go to ${label.toLowerCase()} point ${point.number}`} aria-describedby={tooltipId}
        aria-current={i === current ? "step" : undefined} onClick={() => onSelect(i)}>
        <span className={styles.markerLine} aria-hidden="true" />
        <span id={tooltipId} role="tooltip" className={styles.markerTooltip}>{point.number}</span>
      </button>;
    })}
  </div>;
}

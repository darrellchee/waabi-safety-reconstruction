"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import "./motion.css";

/** Public reference root MotionConfig, inherited by page animation primitives. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </MotionConfig>
  );
}

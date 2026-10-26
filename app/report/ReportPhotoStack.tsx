"use client";

import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { forwardRef, useMemo } from "react";
import { useReducedMotion } from "../../components/useReducedMotion";
import "../../components/careers-photo-stack.css";

export interface StackImage { src: string; width: number; height: number; alt?: string }
interface StackEntry extends StackImage { key: number }

const SLOTS = 2;
const stackTransition = {
  layout: { duration: 0.8, ease: [0.77, 0, 0.175, 1] as const },
  duration: 0.8,
  ease: [0.77, 0, 0.175, 1] as const,
};

const StackPhoto = forwardRef<HTMLDivElement, { image: StackEntry; slot: number; reduced: boolean }>(
  function StackPhoto({ image, slot, reduced }, ref) {
    const present = useIsPresent();
    const transition = reduced ? { duration: 0, layout: { duration: 0 } } : stackTransition;
    return <motion.div ref={ref} layout data-index={image.key} data-slot={slot} transition={transition}
      className={`careers-stack-photo${present ? "" : " is-exiting"}`}>
      <motion.div layout initial={{ x: "100%" }} animate={{ x: "0%" }} exit={present ? {} : { scale: 0.5, x: 20 }}
        transition={transition} className="careers-stack-crop" style={{ borderRadius: 12 }}>
        <motion.div layout initial={{ scale: 1.5 }} animate={{ scale: 1 }} transition={transition} className="careers-stack-image">
          <img src={image.src} width={image.width} height={image.height} alt={image.alt || ""} loading="lazy" decoding="async" draggable={false} />
        </motion.div>
      </motion.div>
    </motion.div>;
  },
);

/** The Delivery page's portrait photo stack, advanced by the caller (scroll position) instead of its own timer. */
export function ReportPhotoStack({ images, current }: { images: StackImage[]; current: number }) {
  const reduced = useReducedMotion();
  const entries = useMemo(() => images.length ? Array.from({ length: SLOTS + 2 }, (_, key) => ({ ...images[key % images.length], key })) : [], [images]);
  if (!entries.length) return null;
  return <div className="careers-photo-stack careers-photo-stack--portrait">
    <div className="careers-stack-track">
      <AnimatePresence initial={false}>
        {Array.from({ length: SLOTS }, (_, slot) => {
          const image = entries[(current + slot) % entries.length];
          return <StackPhoto key={image.key} image={image} slot={slot} reduced={!!reduced} />;
        })}
      </AnimatePresence>
    </div>
  </div>;
}

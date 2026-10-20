"use client";

import { AnimatePresence, motion, useInView, useIsPresent } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import "./careers-photo-stack.css";

export interface CareersStackImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

interface StackEntry extends CareersStackImage { key: number }
interface Props {
  images: CareersStackImage[];
  variant?: "portrait" | "landscape";
  className?: string;
}

const stackTransition = {
  layout: { duration: 0.8, ease: [0.77, 0, 0.175, 1] as const },
  duration: 0.8,
  ease: [0.77, 0, 0.175, 1] as const,
};

const StackPhoto = forwardRef<HTMLDivElement, { image: StackEntry; slot: number; reduced: boolean }>(
  function StackPhoto({ image, slot, reduced }, ref) {
    const present = useIsPresent();
    const transition = reduced ? { duration: 0, layout: { duration: 0 } } : stackTransition;
    return (
      <motion.div
        ref={ref}
        layout
        data-index={image.key}
        data-slot={slot}
        transition={transition}
        className={`careers-stack-photo${present ? "" : " is-exiting"}`}
      >
        <motion.div
          layout
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={present ? {} : { scale: 0.5, x: 20 }}
          transition={transition}
          className="careers-stack-crop"
          style={{ borderRadius: 12 }}
        >
          <motion.div
            layout
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            transition={transition}
            className="careers-stack-image"
          >
            {/* Public reference uses lazy native image decoding inside three projection layers. */}
            <img src={image.src} width={image.width} height={image.height} alt={image.alt || ""} loading="lazy" decoding="async" draggable={false} />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  },
);

/** Source's rotating Images module: slot count + two keys, a two-second visible-page timer. */
export default function CareersPhotoStack({ images, variant = "portrait", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();
  const [documentVisible, setDocumentVisible] = useState(true);
  const [current, setCurrent] = useState(0);
  const slots = variant === "portrait" ? 2 : 4;
  const entries = useMemo(() => {
    if (!images.length) return [];
    return Array.from({ length: slots + 2 }, (_, key) => ({ ...images[key % images.length], key }));
  }, [images, slots]);

  useEffect(() => {
    const update = () => setDocumentVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!inView || !documentVisible || reducedMotion || !entries.length) return;
    const timer = setInterval(() => setCurrent(value => (value + 1) % entries.length), 2000);
    return () => clearInterval(timer);
  }, [inView, documentVisible, reducedMotion, entries.length]);

  if (!entries.length) return null;
  return (
    <div ref={ref} className={`careers-photo-stack careers-photo-stack--${variant} ${className}`}>
      <div className="careers-stack-track">
        <AnimatePresence initial={false}>
          {Array.from({ length: slots }, (_, slot) => {
            const image = entries[(current + slot) % entries.length];
            return <StackPhoto key={image.key} image={image} slot={slot} reduced={!!reducedMotion} />;
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

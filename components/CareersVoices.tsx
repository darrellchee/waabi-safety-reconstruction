"use client";

import { forwardRef, useState } from "react";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";
import CareersPhotoStack from "./CareersPhotoStack";
import data from "./careers-data.json";
import "./careers-voices.css";

const ease = [.19, 1, .22, 1] as const;
const spring = { type: "spring" as const, stiffness: 140, damping: 22 };

type Voice = (typeof data.voices.quotes)[number];
const VoiceQuote = forwardRef<HTMLDivElement, { voice: Voice }>(function VoiceQuote({ voice }, ref) {
  const present = useIsPresent();
  const reduced = useReducedMotion();
  const transition = { duration: reduced ? 0 : .4, ease };
  return <motion.div ref={ref} layout className="careers-voice-quote" aria-hidden={!present}
    initial={{ opacity: 0 }} animate={{ opacity: 1, transition }} exit={{ opacity: 0 }}>
    <motion.p layout className="careers-voice-words">
      {voice.quote.split(/\s+/).map((word, i, words) => <span key={i}><motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : .1, ease: "linear", delay: reduced ? 0 : i * .03 }}
        className="careers-voice-word">{word}</motion.span>{i < words.length - 1 ? " " : ""}</span>)}
    </motion.p>
    <motion.div layout className="careers-voice-author" initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { ...transition, delay: reduced ? 0 : .4 } }} exit={{ opacity: 0 }}>
      <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0, transition: { ...transition, delay: reduced ? 0 : .4 } }} exit={{ opacity: 0 }}>{voice.name}</motion.span>
      <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0, transition: { ...transition, delay: reduced ? 0 : .5 } }} exit={{ opacity: 0 }}>{voice.role}</motion.span>
    </motion.div>
  </motion.div>;
});

function VoiceHeading({ mobile = false }: { mobile?: boolean }) {
  const reduced = useReducedMotion();
  return <div className={mobile ? "careers-voice-title-mobile" : "careers-voice-title-desktop"}>
    <h2>{data.voices.title.split(" ").map((word, i, words) => <span key={word}><motion.span className="careers-voice-word"
      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : .4, ease, delay: reduced ? 0 : i * .07 }}>{word}</motion.span>{i < words.length - 1 ? " " : ""}</span>)}</h2>
  </div>;
}

export default function CareersVoices() {
  const [current, setCurrent] = useState(0);
  const [progressCycle, setProgressCycle] = useState(0);
  const reduced = useReducedMotion();
  function move(direction: number) {
    const next = (current + direction + data.voices.quotes.length) % data.voices.quotes.length;
    if (current === data.voices.quotes.length - 1 && next === 0) setProgressCycle(value => value + 1);
    setCurrent(next);
  }
  return <section className="careers-voices" aria-label="Cost analysis">
    <div className="careers-shell careers-voices-layout">
      <motion.div layout className="careers-voices-copy">
        <motion.div layout className="careers-voice-heading-wrapper"><VoiceHeading /></motion.div>
        <motion.div layout className="careers-voices-quote-area">
          <div className="careers-voices-progress" aria-hidden="true">
            <AnimatePresence initial={false}><motion.div key={progressCycle}
              initial={{ scaleX: 0 }} animate={{ scaleX: current / (data.voices.quotes.length - 1) }}
              exit={{ scaleX: 1, x: "100%" }} transition={reduced ? { duration: 0 } : spring} /></AnimatePresence>
          </div>
          <AnimatePresence initial={false} mode="popLayout"><VoiceQuote key={current} voice={data.voices.quotes[current]} /></AnimatePresence>
        </motion.div>
        <motion.div layout className="careers-voices-controls">
          <div className="careers-voices-counter" aria-label={`Cost note ${current + 1} of ${data.voices.quotes.length}`}>
            <AnimatePresence mode="popLayout" initial={false}><motion.span className="careers-voices-number" key={current}
              initial={{ y: "120%" }} animate={{ y: 0 }} exit={{ y: "-120%" }} transition={reduced ? { duration: 0 } : spring}>{current + 1}</motion.span></AnimatePresence>
            <span className="careers-voices-total">/ {data.voices.quotes.length}</span>
          </div>
          <div className="careers-voices-arrows">
            {[-1, 1].map(direction => <motion.button key={direction} type="button" aria-label={direction < 0 ? "Previous cost note" : "Next cost note"}
              onClick={() => move(direction)} whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}>
              <img src={`/assets/arrow-${direction < 0 ? "left" : "right"}.svg`} alt="" width="10" height="10" />
            </motion.button>)}
          </div>
        </motion.div>
      </motion.div>
      <CareersPhotoStack variant="portrait" images={data.voices.images} />
      <VoiceHeading mobile />
    </div>
  </section>;
}

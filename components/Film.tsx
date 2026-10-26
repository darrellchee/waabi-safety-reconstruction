"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";
const media = (name: string) => `/assets/home/${name}`;
const sourceEase = [0.19, 1, 0.22, 1] as const;
export default function Film({ name, className = "", responsiveName, poster }: { name: string; className?: string; responsiveName?: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    // Observe once only to reveal media. Native autoplay owns playback;
    // calling play() here would disable Chromium's offscreen autoplay pause.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    observer.observe(video);
    return () => observer.disconnect();
  }, [responsiveName]);
  return <>
    <motion.img className={`home-film-poster${poster ? "" : " home-reduced-poster"}`} src={media(poster || `${name}.jpg`)} alt="" initial={false} animate={{opacity:playing && !reduced ? 0 : 1}} transition={{duration:.4,ease:sourceEase}} />
    <motion.video ref={ref} className={className} src={responsiveName ? undefined : media(name)} muted loop playsInline autoPlay poster={poster ? media(poster) : undefined} preload="auto" aria-hidden="true" tabIndex={-1} onPlay={() => setPlaying(true)} initial={{opacity:0}} animate={{opacity:visible && !reduced ? 1 : 0}} transition={{duration:.4,ease:"linear"}}>
      {responsiveName && <><source src={media(name)} media="(min-width:768px)" /><source src={media(responsiveName)} /></>}
    </motion.video>
  </>;
}

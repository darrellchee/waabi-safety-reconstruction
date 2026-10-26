"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import Film from "../../components/Film";
import { useReducedMotion } from "../../components/useReducedMotion";
import { Block, SectionBadge } from "./ReportCodes";
import { lines } from "./blocks";
import "../../components/home.css";

const heroIntroWords = lines("0.1")[1].split(" ");
const titleLineOne = ["Provisions"];
const titleLineTwo = ["Point"];
// Extend the index hero sequence to read the report's taller cover details.
export default function ReportHomeHero({ children, id, introClassName = "" }: { children?: ReactNode; id?: string; introClassName?: string }) {
  const hero = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [introEntered, setIntroEntered] = useState(false);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    // Solve the same cubic Bezier used by the source's useTransform easing.
    const ease = (
      progress: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ) => {
      const value = (t: number, a: number, b: number) =>
        3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t * t * b + t * t * t;
      let lo = 0,
        hi = 1;
      for (let i = 0; i < 16; i++) {
        const mid = (lo + hi) / 2;
        if (value(mid, x1, x2) < clamp(progress)) lo = mid;
        else hi = mid;
      }
      return value((lo + hi) / 2, y1, y2);
    };
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = innerHeight;
      const h = hero.current;
      if (h) {
        const pageY = -h.getBoundingClientRect().top;
        const intro = h.querySelector<HTMLElement>(".home-hero-intro");
        const holdStart = vh * .75;
        const coverHeight = Math.min(holdStart - 32, vh - 150);
        const coverTravel = Math.max(0, (intro?.scrollHeight ?? 0) - Math.max(0, coverHeight));
        h.style.setProperty("--hero-cover-travel", `${coverTravel}px`);
        // Spend the extra page distance reading the cover before fading/shrinking.
        const coverScrolled = Math.max(0, Math.min(coverTravel, pageY - holdStart));
        const y = pageY - coverScrolled;
        if (intro && !reduced.matches) intro.scrollTop = coverScrolled;
        const shrink = clamp((y - vh) / (vh * 0.5));
        const target = innerWidth >= 768 ? (innerWidth * 133) / 1440 : 133;
        const targetScale = target / Math.min(innerWidth, vh);
        const scale = 1 + (targetScale - 1) * ease(shrink, 0.25, 0.1, 0.25, 1);
        const clip = (Math.max(innerWidth, vh) - Math.min(innerWidth, vh)) / 2;
        h.style.setProperty(
          "--hero-scale",
          String(reduced.matches ? 1 : scale),
        );
        h.style.setProperty(
          "--hero-clip-x",
          `${innerWidth > vh ? clip * ease(shrink, 0.19, 1, 0.22, 1) : 0}px`,
        );
        h.style.setProperty(
          "--hero-clip-y",
          `${innerWidth <= vh ? clip * ease(shrink, 0.19, 1, 0.22, 1) : 0}px`,
        );
        h.style.setProperty(
          "--hero-radius",
          `${(16 * (1 - clamp((scale - 0.95) / 0.05))) / scale}px`,
        );
        h.style.setProperty(
          "--hero-shade",
          String(1 - clamp((shrink - 0.35) / 0.65)),
        );
        h.style.setProperty("--hero-title-y", `${-Math.min(y, vh * 1.5)}px`);
        h.style.setProperty(
          "--hero-title-x",
          `${innerWidth >= 768 ? clamp(((y + vh - (h.querySelector("h1")?.offsetTop || 0)) / (vh + (h.querySelector("h1")?.offsetHeight || 255)) - 0.5) * 2) * 50 : 0}px`,
        );
        h.style.setProperty(
          "--hero-intro",
          String(
            clamp((y / (vh * 1.5) - 0.1) / 0.1) *
              (1 - clamp((y - vh * 0.875) / (vh * 0.125))),
          ),
        );
        h.style.setProperty("--hero-dot", String(1 - clamp(y / (vh * 0.15))));
        setIntroEntered(y > vh * 0.225);
      }
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    const observer = new ResizeObserver(scroll);
    const intro = hero.current?.querySelector(".home-hero-intro");
    if (intro) observer.observe(intro);
    update();
    return () => {
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
        <section ref={hero} className="home-hero-scroll" id={id}>
          <div className="home-hero">
            <SectionBadge n={0} top={172} />
            <Block code="0.2" status="MEDIA" top={146}>
            <div className="home-hero-film">
                <Film name="gayini-aerial-overview.mp4" poster="gayini-aerial-overview.jpg" />
                <div className="home-hero-shade" />
              </div>
            </Block>
            <div className={`home-hero-intro ${introClassName}`}>
              <Block code="0.1" status="SITE" top={0} badge={false}>{heroIntroWords.map((word, i) => <span key={i}><motion.span initial={{ opacity: 0 }} animate={{ opacity: reducedMotion || introEntered ? 1 : 0 }} transition={{ duration: .1, ease: "linear", delay: i * .07 }} className="home-intro-word">{word}</motion.span>{i < heroIntroWords.length - 1 ? " " : ""}</span>)}</Block>
              {children}
            </div>
            <Block code="0.1" status="SITE" top={120}>
            <h1 data-counted="">
              <span className="home-title-line">
                {titleLineOne.map((word, i) => (
                  <span key={word} style={{ animationDelay: `${i * 0.07}s` }}>
                    {word}
                    {i < titleLineOne.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
              <br />
              <span className="home-title-line">
                {titleLineTwo.map((word, i) => (
                  <span
                    key={word}
                    style={{ animationDelay: `${0.07 + i * 0.07}s` }}
                  >
                    {word}
                    {i < titleLineTwo.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            </h1>
            </Block>
          </div>
        </section>
  );
}

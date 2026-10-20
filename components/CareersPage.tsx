"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";
import { Header, Footer } from "./SiteChrome";
import CareersVoices from "./CareersVoices";
import CareersPhotoStack from "./CareersPhotoStack";
import { useCarouselMotion } from "./useCarouselMotion";
import data from "./careers-data.json";
import "./careers.css";

const ease = [.19, 1, .22, 1] as const;

function TitleWords({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return <span className="careers-title-lines"><span className="careers-title-line">{text.split(" ").map((word, index, words) => <span key={index}>
    <motion.span className="careers-title-word" initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : .4, ease, delay: reduced ? 0 : index * .07 }}>{word}</motion.span>
    <span>{index < words.length - 1 ? " " : ""}</span>
  </span>)}</span></span>;
}

function CareersHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return <div ref={ref} className="careers-hero">
    <div className="careers-hero-clip">
      <motion.div className="careers-hero-image" style={{ y }}>
        <img src={data.hero.image.src} alt="" fetchPriority="high" width={data.hero.image.width} height={data.hero.image.height} />
      </motion.div>
      <div className="careers-hero-shade" />
      <div className="careers-shell careers-hero-content">
        <div className="careers-hero-title"><h1><TitleWords text={data.hero.title} /></h1></div>
        <button className="careers-down" aria-label="Scroll Down" onClick={() => window.scrollTo({ top: innerHeight, behavior: reduced ? "instant" : "smooth" })}>
          <img src="/assets/careers/scroll-down.svg" width="24" height="24" alt="" />
        </button>
      </div>
    </div>
  </div>;
}

function RecruitingLink({ children, href }: { children: string; href: string }) {
  return <div className="careers-cta-row"><motion.a href={href}
    className="careers-pill" whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}>{children}</motion.a></div>;
}

function CareersIntro() {
  const reduced = useReducedMotion();
  return <section className="careers-intro" aria-label="Delivery plan">
    <div className="careers-shell careers-intro-content">
      <motion.p layout>{data.intro.paragraph.split(" ").map((word, index, words) => <span key={index}>
        <motion.span className="careers-copy-word" initial={{ opacity: .1, color: "rgba(255,44,107,1)" }}
          whileInView={{ opacity: 1, color: "rgba(0,0,0,1)" }} viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : .1, ease: "linear", delay: reduced ? 0 : index * .07 }}>{word}</motion.span>
        {index < words.length - 1 ? " " : ""}</span>)}</motion.p>
      <RecruitingLink href={data.intro.href}>{data.intro.button}</RecruitingLink>
    </div>
  </section>;
}

function CareersMission() {
  const image = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: image, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return <section className="careers-mission">
    <div ref={image} className="careers-mission-media">
      <div className="careers-mission-window"><motion.div style={{ y }}>
        <img src={data.pioneering.image.src} alt="Concept image: a bench with a concrete pile cross-section, a watertight concrete sample and a corrugated roof sheet." loading="lazy" width={data.pioneering.image.width} height={data.pioneering.image.height} />
      </motion.div></div>
    </div>
    <div className="careers-shell careers-mission-copy">
      <div className="careers-mission-title"><h2><TitleWords text={data.pioneering.title} /></h2></div>
      <p>{data.pioneering.paragraph.split("\n").map((line, i, lines) => <Fragment key={i}>{line}{i < lines.length - 1 && <br />}</Fragment>)}</p>
    </div>
  </section>;
}

function CareersValues() {
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useCarouselMotion(rail);
  function move(direction: number) {
    const node = rail.current;
    if (!node) return;
    const step = (node.firstElementChild as HTMLElement).clientWidth + (parseInt(getComputedStyle(node).gap) || 0);
    node.scrollBy({ left: direction * step, behavior: reduced ? "instant" : "smooth" });
  }
  const arrows = (mobile: boolean) => <div className={`careers-values-arrows ${mobile ? "is-mobile" : "is-desktop"}`}>
    {[-1, 1].map(direction => <motion.button key={direction} type="button" aria-label={direction < 0 ? "Previous reference group" : "Next reference group"}
      onClick={() => move(direction)} whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}>
      <img src={`/assets/arrow-${direction < 0 ? "left" : "right"}.svg`} width="10" height="10" alt="" />
    </motion.button>)}
  </div>;
  return <section id="values" className="careers-values">
    <div className="careers-shell careers-values-header">
      <div className="careers-values-title"><h2><TitleWords text={data.values.title} /></h2>{arrows(true)}</div>
      <div className="careers-values-description"><p>{data.values.description}</p>{arrows(false)}</div>
    </div>
    <div ref={rail} className="careers-values-rail" role="region" aria-label="References and appendices" tabIndex={0}>
      {data.values.slides.map((value, i) => <article key={value.title} className="careers-value">
        <div className="careers-value-heading"><span className="careers-value-number">{String(i + 1).padStart(2, "0")}.</span><h3>{value.title}</h3></div>
        <p>{value.paragraph}</p>
      </article>)}
    </div>
  </section>;
}

export default function CareersPage() {
  return <>
    <Header />
    <main className="careers-page">
      <CareersHero />
      <CareersIntro />
      <CareersMission />
      <CareersVoices />
      <CareersValues />
      <section className="careers-closing">
        <div className="careers-shell careers-closing-header">
          <div className="careers-closing-title"><h2><TitleWords text={data.closing.title} /></h2></div>
          <div className="careers-closing-copy"><p>{data.closing.description}</p><RecruitingLink href={data.closing.href}>{data.closing.button}</RecruitingLink></div>
        </div>
        <CareersPhotoStack variant="landscape" images={data.closing.images} />
      </section>
    </main>
    <Footer />
  </>;
}

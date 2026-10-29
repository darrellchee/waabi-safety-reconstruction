"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type KeyboardEvent, type MouseEvent } from "react";
import { motion } from "motion/react";
import { useCarouselMotion } from "../../components/useCarouselMotion";
import { useReducedMotion } from "../../components/useReducedMotion";
import styles from "./report.module.css";
import { Block, SectionBadge, BlockBadge, type Status } from "./ReportCodes";
import elements from "./report-elements.module.css";
import "../../components/home.css";

const sourceEase = [.19, 1, .22, 1] as const;

export function ReportFrame({ children }: { children: ReactNode }) {
  function navigate(event: MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href^='#']");
    if (!anchor) return;
    const target = document.getElementById(anchor.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    // Native fragment navigation fires popstate in the shared transition provider.
    // Keep report navigation within this document, including in background tabs.
    if (location.hash !== anchor.hash) history.pushState(history.state, "", anchor.hash);
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 150, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  return <div className={styles.report} data-report="" onClick={navigate}>{children}</div>;
}

// Keep the per-word entrance animation for section headings only.
function Words({ text }: { text: string }) {
  const reduced = useReducedMotion();
  let index = 0;
  return <>{text.split(/(\s+)/).map((word, i) => /\S/.test(word) ? <motion.span
    className={elements.word}
    initial={reduced ? false : { opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
    transition={{ duration: .4, ease: sourceEase, delay: reduced ? 0 : index++ * .07 }}
    key={i}>{word}</motion.span> : word)}</>;
}

export function Copy({ text }: { text: string }) {
  return <>{text.split(/(TEAM TO ADD:[^\n]*)/g).map((part, i) => part.startsWith("TEAM TO ADD:") ? <mark key={i}>{part}</mark> : part)}</>;
}

export function Paragraphs({ text }: { text: string }) {
  return <>{text.split("\n").filter(Boolean).map((line, i) => <p key={i}><Copy text={line} /></p>)}</>;
}

/** A MEDIA block: frame, number and caption. With no image file supplied the frame shows the placeholder image. */
export function Figure({ code, src, alt, caption }: { code: string; src: string; alt: string; caption: string }) {
  return <Block as="figure" className={styles.figure} code={code} status="MEDIA"><img src={src} alt={alt} loading="lazy" /><figcaption>{caption}</figcaption></Block>;
}

export function SimpleTable({ caption, headings, rows, wide = false }: { caption: string; headings: string[]; rows: string[][]; wide?: boolean }) {
  return <div className={styles.tableWrap}><table className={styles.table} style={wide ? { minWidth: 760 } : undefined}><caption>{caption}</caption><thead><tr>{headings.map((heading, i) => <th scope="col" key={i}>{heading}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

export function ReportSection({ id, num, title, centered, className, children }: { id: string; num?: number; title?: string; centered?: boolean; className?: string; children: ReactNode }) {
  return <section id={id} className={className ? `${styles.section} ${className}` : styles.section}>
    {num !== undefined && <SectionBadge n={num} />}
    {title && <h2 className={centered ? styles.centered : undefined}><Words text={title} /></h2>}
    {children}
  </section>;
}

/** A MISSING block: an optional note, then the badge directly above the box. The box holds only its "insert: ..." text. */
export function Placeholder({ id, name, code, note }: { id: string; name: string; code: string; note?: ReactNode }) {
  return <div data-code={code} data-status="MISSING">
    {note}
    <BlockBadge code={code} status="MISSING" inline />
    <div id={id} className={styles.placeholder} data-placeholder="">insert: {name}</div>
  </div>;
}

export function MediaReplacement({ className = "" }: { className?: string }) {
  return <img src="/assets/report/insert-image.svg" alt="(change to our assignment content)" className={`${styles.mediaReplacement} ${className}`} />;
}

export function MaterialsTabs({ items, heading = "Proposed Materials and Cost Summary", intro = "Provisions Point would improve visitor safety by raising a small supply shelter above the ground and filling it with what a stranded visitor needs.", label = "Materials and cost summary", idPrefix = "material", scrollTabs = false, codes }: { items: string[][]; codes?: [string, Status][]; heading?: string; intro?: string; label?: string; idPrefix?: string; scrollTabs?: boolean }) {
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(true);
  const [entered, setEntered] = useState(false);
  const reduced = useReducedMotion();
  const tabs = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLElement>(null);
  useEffect(() => {
    const query = matchMedia("(min-width: 768px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      setDesktop(query.matches);
      const node = scene.current;
      if (!node) return;
      if (!query.matches) return;
      const top = node.getBoundingClientRect().top;
      setEntered(top < -innerHeight * .25);
      if (scrollTabs) {
        const start = innerHeight * .25, range = node.offsetHeight - innerHeight - start;
        const progress = Math.max(0, Math.min(1, (-top - start) / Math.max(1, range)));
        setActive(Math.min(items.length - 1, Math.floor(progress * items.length)));
      }
      node.style.setProperty("--strength-heading-y", `${Math.max(-innerHeight, Math.min(0, top))}px`);
      node.style.setProperty("--strength-tabs-y", `${Math.max(0, innerHeight * .5 + top)}px`);
      const stackProgress = Math.max(0, Math.min(1, (-top - innerHeight * .5) / (innerHeight * .5)));
      node.style.setProperty("--strength-stack-y", `${-50 * stackProgress}px`);
      node.style.setProperty("--strength-stack-scale", String(1 - .1 * stackProgress));
      // Match the original preview's cubic Bézier and its measured tile origin.
      const intro = Math.max(0, Math.min(1, (innerHeight * .75 - top) / (innerHeight * .75)));
      const value = (t: number, a: number, b: number) => 3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t * t * b + t * t * t;
      let lo = 0, hi = 1;
      for (let i = 0; i < 16; i++) { const mid = (lo + hi) / 2; if (value(mid, .645, .355) < intro) lo = mid; else hi = mid; }
      const eased = value((lo + hi) / 2, .045, 1);
      const image = node.querySelector<HTMLElement>(".home-scale-media");
      if (image) {
        const size = image.offsetWidth;
        const target = innerWidth * 133 / 1440;
        const x = innerWidth / 6 + target / 2 - (image.offsetLeft + (innerWidth >= 1600 ? innerWidth / 2 - 543 : innerWidth * .1389) + size / 2);
        const y = -innerWidth * 133 / 1440 - (innerHeight - size) / 2;
        image.style.setProperty("--strength-scale", String(target / size + (1 - target / size) * eased));
        image.style.setProperty("--strength-x", `${x * (1 - eased)}px`);
        image.style.setProperty("--strength-y", `${y * (1 - eased)}px`);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => { removeEventListener("scroll", schedule); removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
  }, [scrollTabs, items.length]);
  function select(i: number) {
    const node = scene.current;
    if (!scrollTabs || !desktop || !node) { setActive(i); return; }
    const start = innerHeight * .25, range = node.offsetHeight - innerHeight - start;
    const top = node.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top + start + range * (i + .5) / items.length, behavior: reduced ? "instant" : "smooth" });
  }
  function onKey(event: KeyboardEvent<HTMLButtonElement>, i: number) {
    const next = event.key === "ArrowRight" || event.key === "ArrowDown" ? (i + 1) % items.length : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (i + items.length - 1) % items.length : event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault();
    select(next);
    tabs.current?.querySelectorAll<HTMLButtonElement>("[role='tab']")[next]?.focus();
  }
  useEffect(() => {
    const node = scene.current;
    if (!node || desktop || reduced) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (timer) clearInterval(timer);
      if (entry.isIntersecting) timer = setInterval(() => setActive(value => (value + 1) % items.length), 5000);
    }, { threshold: .5 });
    observer.observe(node.querySelector(".home-scale-media") || node);
    return () => { observer.disconnect(); if (timer) clearInterval(timer); };
  }, [active, desktop, reduced, items.length]);
  return <div className={`home-page ${elements.materials}`}>
    <section className="home-scale" ref={scene} style={scrollTabs && desktop ? { height: `${150 + 60 * items.length}vh` } : undefined}>
      <div className={`home-scale-sticky ${entered ? "is-entered" : ""}`}>
        <div className="home-scale-media">
          <motion.div className="home-preview-visibility" animate={{ opacity: entered && desktop ? 0 : 1, scale: entered && desktop ? .6 : 1 }}>
            <img className="home-scale-preview" src="/assets/report/insert-image.svg" alt="(change to our assignment content)" />
          </motion.div>
          {items.map(([name], i) => <motion.div key={name}
            initial={false}
            animate={!desktop || reduced ? { y: 0, scale: 1, opacity: i === active ? 1 : 0 } : { opacity: 1, y: !entered || i > active ? "100vh" : `${-3 * (active - i)}vh`, scale: i === active ? 1 : 1 - .05 * (active - i) }}
            transition={{ duration: reduced ? 0 : 1, ease: sourceEase, delay: reduced ? 0 : entered ? .07 * i : .07 * (active - i) - .07 }}
            className={i === active ? "is-active" : i < active ? "is-stacked" : ""}
            style={{ "--stack-index": i, "--stack-offset": active - i } as CSSProperties}>
            <img className="home-film-poster" src="/assets/report/insert-image.svg" alt="(change to our assignment content)" />
            <motion.div className="home-strength-shade" animate={{ opacity: i === active ? 0 : 1 }} />
          </motion.div>)}
        </div>
        <div className="home-scale-copy">
          <div className="home-scale-heading">
            <h2><Words text={heading} /></h2>
            {intro && <p className="home-sans">{intro}</p>}
          </div>
          <div className="home-scale-tabs" role="tablist" aria-label={label} ref={tabs}>
            {items.map(([name, text], i) => <motion.div layout key={name} data-active={active === i} {...(codes ? { "data-code": codes[i][0], "data-status": codes[i][1], style: { position: "relative" as const } } : {})} initial={{ opacity: .3 }} animate={{ opacity: active === i ? 1 : .46 }}>
              {codes && <BlockBadge code={codes[i][0]} status={codes[i][1]} top={-14} />}
              <motion.button layout id={`${idPrefix}-tab-${i}`} role="tab" aria-selected={active === i} aria-controls={`${idPrefix}-panel-${i}`} tabIndex={active === i ? 0 : -1} onClick={() => select(i)} onKeyDown={event => onKey(event, i)}>{name}</motion.button>
              <motion.p layout className="home-sans" hidden={active !== i} style={active === i ? undefined : { display: "none" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="tabpanel" id={`${idPrefix}-panel-${i}`} aria-labelledby={`${idPrefix}-tab-${i}`} tabIndex={0}><Copy text={text} /></motion.p>
            </motion.div>)}
            <div className="home-mobile-strength-controls">
              <div className="home-mobile-strength-track"><motion.div key={active} initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: reduced ? 0 : 5, ease: "easeInOut" }} /></div>
              <div className="home-mobile-strength-arrows">{[-1, 1].map(direction => <motion.button type="button" key={direction} whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} aria-label={`${direction < 0 ? "Previous" : "Next"} summary item`} onClick={() => setActive(value => (value + direction + items.length) % items.length)}>{direction < 0 ? "←" : "→"}</motion.button>)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>;
}

export function ReportCarousel({ label, children }: { label: string; children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useCarouselMotion(rail);
  function move(direction: number) {
    const node = rail.current;
    if (!node) return;
    const card = node.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth || 450) + parseFloat(getComputedStyle(node).gap || "24");
    node.scrollBy({ left: direction * step, behavior: reduced ? "instant" : "smooth" });
  }
  return <div className={elements.carousel}>
    <div className={elements.controls}>{[-1, 1].map(direction => <motion.button type="button" key={direction} whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} aria-label={`${direction < 0 ? "Previous" : "Next"} ${label}`} onClick={() => move(direction)}>{direction < 0 ? "←" : "→"}</motion.button>)}</div>
    <div ref={rail} className={`${styles.rail} ${elements.rail}`} role="region" aria-label={label} tabIndex={0}>{children}</div>
  </div>;
}

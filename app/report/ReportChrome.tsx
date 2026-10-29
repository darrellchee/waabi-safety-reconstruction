"use client";

import { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import Link from "../../components/AppLink";
import { Block, SectionBadge } from "./ReportCodes";
import { lines, status } from "./blocks";
import styles from "./ReportChrome.module.css";
import { headerToneAtPoint } from "./header-contrast";

import { reportNavigation as navigation, type ReportPageId } from "./report-navigation";

const navigationFont = localFont({
  src: "../../public/assets/F37ZagmaSerif_Book-s.p.07ww.6n-k2vcw.woff2",
  weight: "400",
  style: "normal",
  display: "block",
  variable: "--font-report-nav",
});

// The report pages share the same full-width header and destinations.
export function ReportHeader({ active }: { active: ReportPageId }) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const header = useRef<HTMLElement>(null);
  const bar = useRef<HTMLElement>(null);
  const more = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const primary = navigation.filter(item => item.id !== "other-considerations" && item.id !== "recommendations" && item.id !== "supporting-documents" && item.id !== "references" && item.id !== "appendices" && item.id !== "ai-logs");
  const secondary = navigation.filter(item => item.id === "other-considerations" || item.id === "recommendations" || item.id === "supporting-documents" || item.id === "references" || item.id === "appendices" || item.id === "ai-logs");
  useEffect(() => {
    let frame = 0;
    const updateContrast = () => {
      frame = 0;
      const root = header.current;
      if (!root || !bar.current) return;
      const targets = bar.current.querySelectorAll<HTMLElement>(
        `.${styles["nav-brand"]}, .${styles["nav-links"]} > a, .${styles["more-menu"]} > button`,
      );
      let awaitingPage = false;
      targets.forEach(target => {
        const rect = target.getBoundingClientRect();
        const tone = headerToneAtPoint(rect.left + rect.width / 2, rect.top + rect.height / 2, root);
        if (tone) target.dataset.tone = tone;
        else awaitingPage = true;
      });
      // Snapshot animations can block hit testing beyond animation.finished.
      // Retry only while the browser cannot expose the incoming page yet.
      if (awaitingPage) frame = requestAnimationFrame(updateContrast);
    };
    const update = () => {
      if (!frame) frame = requestAnimationFrame(updateContrast);
      setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    };
    const dismiss = (event: PointerEvent) => {
      if (more.current && !more.current.contains(event.target as Node)) setOpen(false);
    };
    const resize = new ResizeObserver(([entry]) => {
      header.current?.style.setProperty("--report-header-height", `${entry.target.getBoundingClientRect().height}px`);
      update();
    });
    if (bar.current) resize.observe(bar.current);
    // Refresh reused headers before the incoming page snapshot is captured.
    updateContrast();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("load", update, true);
    document.addEventListener("animationend", update, true);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("load", update, true);
      document.removeEventListener("animationend", update, true);
    };
  }, [active]);
  return <header ref={header} className={`${styles["site-header"]} ${navigationFont.variable}`}>
    <div className={styles["header-glass"]} aria-hidden="true">
      <div className={styles["page-progress"]} style={{ transform: `scaleX(${progress})` }} />
    </div>
    <nav ref={bar} className={styles["nav-bar"]} aria-label="Report navigation">
      <span className={styles["nav-brand"]}>Provisions Point</span>
      <div className={styles["nav-links"]}>
      {primary.map(({ label, id, href }) => <Link key={id} href={href} className={active === id ? styles.active : undefined} aria-current={active === id ? "page" : undefined}>{label}</Link>)}
      <div ref={more} className={styles["more-menu"]}
        onPointerEnter={event => { if (event.pointerType === "mouse") setOpen(true); }}
        onPointerLeave={event => { if (event.pointerType === "mouse" && !more.current?.contains(document.activeElement)) setOpen(false); }}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
        onKeyDown={event => {
          if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
          if (event.key === "ArrowDown" && event.target === toggle.current) {
            event.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => more.current?.querySelector("a")?.focus());
          }
        }}>
        <button ref={toggle} className={secondary.some(item => item.id === active) ? styles.active : undefined} aria-expanded={open} aria-controls="report-more-navigation" onClick={() => setOpen(!open)}>
          <span className={styles["desktop-label"]}>More</span><span className={styles["mobile-label"]}>Menu</span> <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
        <div id="report-more-navigation" className={styles["menu-panel"]} hidden={!open}>
          <div className={styles["mobile-destinations"]}>{primary.map(({ label, id, href }) => <Link key={id} href={href} className={active === id ? styles.active : undefined} aria-current={active === id ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}</div>
          {secondary.map(({ label, id, href }) => <Link key={id} href={href} className={active === id ? styles.active : undefined} aria-current={active === id ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
        </div>
      </div>
      </div>
    </nav>
  </header>;
}

export function ReportFooter() {
  const footer = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const root = footer.current;
    const media = video.current;
    if (!root || !media) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (visible && !reduced.matches) void media.play().catch(() => {});
      else media.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(root);
    reduced.addEventListener("change", update);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", update);
      media.pause();
    };
  }, []);
  return <footer ref={footer} id="closing" className={styles["site-footer"]}>
    <div className={styles["footer-motion"]}>
      <img className={styles["footer-poster"]} src="/assets/report/footer/river-forest.jpg" alt="" aria-hidden="true" />
      <video ref={video} className={styles["footer-video"]} src="/assets/report/footer/river-forest.mp4" poster="/assets/report/footer/river-forest.jpg" muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
      <div className={styles["footer-top"]}>
        <Block className={styles["footer-contact"]} code="19.1" status={status("19.1")}>
          <SectionBadge n={19} />
          <h2 data-counted="">{lines("19.1")[0]}</h2>
          <p>{lines("19.1")[1]}<br />{lines("19.1")[2]}</p>
        </Block>
        <nav className={styles["footer-navigation"]} data-nocount="" aria-label="Report footer navigation">
          <p>Provisions Point</p>
          {navigation.map(({ label, id, href }) => <Link key={id} href={href}>{label}</Link>)}
        </nav>
      </div>
    </div>
  </footer>;
}

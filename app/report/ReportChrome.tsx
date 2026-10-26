"use client";

import { useEffect, useRef, useState } from "react";
import { Copy } from "./ReportUI";
import { Block, SectionBadge } from "./ReportCodes";
import { lines, status } from "./blocks";
import styles from "./ReportChrome.module.css";

const navigation = [
  ["Summary", "summary"], ["Background", "background"], ["Options", "options"],
  ["Design", "design"], ["Prototype", "prototyping"], ["Delivery", "implementation"],
  ["Cost", "cost"], ["References", "references"], ["Appendices", "appendices"],
];


// Report-specific copies preserve SiteChrome's geometry and motion.
export function ReportHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("summary");
  const [progress, setProgress] = useState(0);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    const update = () => {
      let current = "summary";
      for (const [, id] of navigation) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 180) current = id;
      }
      setActive(current);
      setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    };
    const dismiss = (event: PointerEvent) => {
      if (header.current && !header.current.contains(event.target as Node)) setOpen(false);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    document.addEventListener("pointerdown", dismiss);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const menu = panel.current;
    if (menu && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      menu.animate([{ height: "0px", opacity: 0 }, { height: `${menu.getBoundingClientRect().height}px`, opacity: 1 }], { duration: 400, delay: 150, easing: "cubic-bezier(.19,1,.22,1)", fill: "backwards" });
    }
    const previous = document.body.style.overflow;
    if (window.innerWidth < 640) document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key === "Tab" && header.current) {
        const links = [...header.current.querySelectorAll<HTMLElement>("a,button")];
        if (event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); links.at(-1)?.focus(); }
        else if (!event.shiftKey && document.activeElement === links.at(-1)) { event.preventDefault(); links[0]?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return <header ref={header}
    onPointerEnter={event => { if (event.pointerType === "mouse") setOpen(true); }}
    onPointerLeave={event => { if (event.pointerType === "mouse") setOpen(false); }}
    className={`${styles["site-header"]} ${open ? styles["menu-is-open"] : ""}`}>
    <div className={styles["nav-bar"]}>
      <span className={styles["nav-page"]}>{navigation.find(([, id]) => id === active)?.[0]}</span>
      <button ref={toggle} className={styles["menu-toggle"]} aria-label={open ? "Close menu" : "Menu"} aria-expanded={open} aria-controls="report-navigation" onClick={() => setOpen(!open)}><span /><span /></button>
      <div className={styles["page-progress"]} style={{ transform: `scaleX(${progress})` }} />
    </div>
    {open && <nav ref={panel} id="report-navigation" className={styles["menu-panel"]} aria-label="Report navigation" data-lenis-prevent>
      <div className={styles["menu-content"]}>
        <span className={styles["menu-caption"]}>Menu</span>
        <div className={styles["menu-links"]}>
          {navigation.map(([label, id]) => <a key={id} href={`#${id}`} className={active === id ? styles.active : ""} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}><span>{label}</span></a>)}
        </div>
      </div>
    </nav>}
  </header>;
}

function SocialIcon({ kind }: { kind: string }) {
  if (kind === "YouTube")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="1" y="3" width="22" height="18" rx="6" fill="currentColor" />
        <path d="m10 8 6 4-6 4z" fill="white" />
      </svg>
    );
  if (kind === "LinkedIn")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
        <path
          d="M7 10v8m0-12v1m4 11v-8m0 3c0-4 6-4 6 0v5"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    );
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="5" fill="currentColor" />
      <path
        d="m6 5 12 14h-3L3 5zm0 14L17 5"
        fill="none"
        stroke="white"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function ReportFooter() {
  const footer = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const root = footer.current;
    const surface = canvas.current;
    if (!root || !surface) return;
    const context = surface.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    let frame = 0;
    let raf = 0;
    let visible = false;
    let started = false;
    let width = 0;
    let height = 0;
    const raw = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const colors = [[252, 179, 247], [255, 44, 107], [128, 3, 28], [151, 126, 117]];
    const resize = () => {
      width = root.clientWidth;
      height = root.clientHeight;
      const ratio = window.devicePixelRatio || 1;
      surface.width = Math.round(width * ratio);
      surface.height = Math.round(height * ratio);
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);
      raw.x = smooth.x = width / 2;
      raw.y = smooth.y = height / 2;
    };
    const scroll = () => {
      const top = root.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, (window.innerHeight - top) / height));
      root.style.setProperty("--footer-y", `${reduced.matches ? 0 : -200 * (1 - progress)}px`);
      root.style.setProperty("--footer-opacity", `${reduced.matches ? 1 : Math.max(0, Math.min(1, (progress - .75) / .25))}`);
    };
    const move = (event: MouseEvent) => {
      raw.x = width * Math.max(0, Math.min(1, event.clientX / window.innerWidth));
      raw.y = height * Math.max(0, Math.min(1, event.clientY / window.innerHeight));
      started = true;
    };
    const draw = () => {
      if (visible && started && desktop.matches && !reduced.matches && context) {
        surface.style.visibility = "visible";
        smooth.x += (raw.x - smooth.x) * .15;
        smooth.y += (raw.y - smooth.y) * .15;
        context.clearRect(0, 0, width, height);
        for (let layer = 0; layer < 250; layer++) {
          const amount = layer / 249;
          const cycle = amount * 5.5 + frame * .007;
          const index = Math.floor(cycle) % colors.length;
          const next = (index + 1) % colors.length;
          const mix = cycle % 1;
          const color = colors[index].map((value, channel) => Math.round(value + (colors[next][channel] - value) * mix));
          const w = width * 4.5 * Math.pow(.99, layer);
          const h = height * 4.2 * Math.pow(.99, layer);
          const x = smooth.x + (width / 2 - smooth.x) * amount;
          const y = smooth.y + (height / 2 - smooth.y) * amount;
          context.fillStyle = `rgb(${color.join(",")})`;
          context.fillRect(x - w / 2, y - h / 2, w, h);
        }
        frame++;
      } else if (reduced.matches || !desktop.matches) surface.style.visibility = "hidden";
      raf = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(root);
    const sizeObserver = new ResizeObserver(() => { resize(); scroll(); });
    sizeObserver.observe(root);
    resize();
    scroll();
    raf = requestAnimationFrame(draw);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("mousemove", move, { passive: true });
    reduced.addEventListener("change", scroll);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      sizeObserver.disconnect();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("mousemove", move);
      reduced.removeEventListener("change", scroll);
    };
  }, []);
  return <footer ref={footer} id="closing" className={styles["site-footer"]}>
    <div className={styles["footer-motion"]}>
      <img className={styles["footer-video"]} src="/assets/report/insert-image.svg" alt="" />
      <canvas ref={canvas} className={styles["footer-canvas"]} aria-hidden="true" />
      <div className={styles["footer-top"]}>
        <Block className={styles["footer-contact"]} code="19.1" status={status("19.1")}>
          <SectionBadge n={19} />
          <h2 data-counted="">{lines("19.1")[0].split(", ")[0]},<br className={styles["footer-heading-break"]} /> {lines("19.1")[0].split(", ").slice(1).join(", ")}</h2>
          <p><Copy text={lines("19.1")[1]} /></p>
          <div className={styles["footer-buttons"]}><a className="pink-button" href="#closing">{lines("19.1")[2]}</a>{" "}<a className="pink-button" href="#implementation">{lines("19.1")[3]}</a></div>
        </Block>
        <nav className={styles["footer-navigation"]} data-nocount="" aria-label="Report footer navigation">
          <p>Provisions Point</p>
          {navigation.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <div className={styles["footer-socials"]}>
          {[["LinkedIn", "summary", "Summary"], ["YouTube", "implementation", "View the plan"], ["X", "acknowledgement", "Acknowledgement of Country"]].map(([kind, id, label]) => <a key={kind} href={`#${id}`} aria-label={label}><SocialIcon kind={kind} /></a>)}
        </div>
      </div>
      <div className={styles["footer-bottom"]}>
        <Block className={styles["footer-legal"]} code="19.2" status={status("19.2")}><p>{lines("19.2")[0]}</p><a href="#acknowledgement">{lines("19.2")[1]}</a></Block>
        <img className={styles["footer-logo"]} src="/assets/waabi-logo-footer.svg" alt="Provisions Point" />
      </div>
    </div>
  </footer>;
}

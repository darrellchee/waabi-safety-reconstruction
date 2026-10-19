"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./chrome.css";

const pages = [
  ["Home", "/", "1761183902-waabi_road2_05483.webp"],
  ["Safety", "/safety", "1761183903-waabi_scout_00376.webp"],
  ["Research", "/research", "1761218483-waabi_research_lighttunnel_wip.webp"],
  ["Company", "/company", "1761185043-waabi_scout_00739.webp"],
  ["Careers", "/careers", "1761187390-251006_waabi_collab_03_0781.webp"],
  ["Insights", "/insights", "1761183903-waabi_road2_04225.webp"],
];
const navigationPages = pages.filter(([, href]) => ["/", "/safety", "/company"].includes(href));
const destination = (url: string) =>
  ["/", "/safety", "/company", "/careers"].includes(url) ? url : `https://waabi.ai${url}`;

export function Header() {
  const pathname = usePathname();
  const currentPage =
    pages.find(([, href]) => href === pathname)?.[0] || "Home";
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    const scroll = () =>
      setProgress(
        window.scrollY /
          Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight,
          ),
      );
    const dismiss = (event: PointerEvent) => {
      if (header.current && !header.current.contains(event.target as Node))
        setOpen(false);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("pointerdown", dismiss);
    return () => {
      window.removeEventListener("scroll", scroll);
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
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab" && header.current) {
        const links = [
          ...header.current.querySelectorAll<HTMLElement>("a,button"),
        ];
        if (event.shiftKey && document.activeElement === links[0]) {
          event.preventDefault();
          links.at(-1)?.focus();
        } else if (!event.shiftKey && document.activeElement === links.at(-1)) {
          event.preventDefault();
          links[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <>
      <header
        ref={header}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setOpen(true); }}
        onPointerLeave={(event) => { if (event.pointerType === "mouse") setOpen(false); }}
        className={`site-header ${open ? "menu-is-open" : ""}`}
      >
        <div className="nav-bar">
          <Link href="/" aria-label="Waabi home">
            <img
              className="nav-logo"
              src="/assets/waabi-logo.svg"
              alt="Waabi"
            />
          </Link>
          <span className="nav-page">{currentPage}</span>
          <button
            ref={toggle}
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Menu"}
            aria-expanded={open}
            aria-controls="global-navigation"
          >
            <span />
            <span />
          </button>
          <div
            className="page-progress"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
        {open && (
          <nav
            ref={panel}
            id="global-navigation"
            aria-label="Global navigation"
            className="menu-panel"
            data-lenis-prevent
          >
            <div className="menu-content">
            <span className="menu-caption">Menu</span>
            <div className="menu-links">
              {navigationPages.map(([label, href, image]) => (
                <Link
                  key={label}
                  className={href === pathname ? "active" : ""}
                  aria-current={href === pathname ? "page" : undefined}
                  href={destination(href)}
                  onClick={() => setOpen(false)}
                >
                  <img src={`/assets/${image}`} alt="" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
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

export function Footer() {
  const footer = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const video = useRef<HTMLVideoElement>(null);
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
      if (visible && !reduced.matches) void video.current?.play().catch(() => {});
      else video.current?.pause();
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
  return (
    <footer ref={footer} className="site-footer">
      <div className="footer-motion">
      <video
        ref={video}
        className="footer-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
        src="/assets/Waabi_System_LightTunnel_1.mp4"
      />
      <canvas ref={canvas} className="footer-canvas" aria-hidden="true" />
      <div className="footer-top">
        <div className="footer-contact">
          <h2>
            We&apos;re just
            <br className="footer-heading-break" /> getting started
          </h2>
          <p>
            Follow along or reach out directly at
            <br />
            <a href="mailto:press@waabi.ai">press@waabi.ai</a>
            <span className="mail-divider">|</span>
            <a href="mailto:info@waabi.ai">info@waabi.ai</a>
          </p>
        </div>
        <nav className="footer-navigation" aria-label="Footer navigation">
          <p>About us</p>
          {pages.map(([label, href]) => (
            <Link key={label} href={destination(href)}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="footer-socials">
          {[
            ["LinkedIn", "https://www.linkedin.com/company/waabi/"],
            [
              "YouTube",
              "https://www.youtube.com/channel/UCNJWh6U6vfTz77SJCeWZloQ",
            ],
            ["X", "https://x.com/waabi_ai?lang=en"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon kind={label} />
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-legal">
          <p>© 2026 Waabi. All Rights Reserved.</p>
          <a href="https://waabi.ai/privacy-policy">Privacy Policy</a>
        </div>
        <img
          className="footer-logo"
          src="/assets/waabi-logo-footer.svg"
          alt="Waabi"
        />
      </div>
      </div>
    </footer>
  );
}

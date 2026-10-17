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
const destination = (url: string) =>
  ["/", "/safety", "/company"].includes(url) ? url : `https://waabi.ai${url}`;

export function Header() {
  const pathname = usePathname();
  const currentPage =
    pages.find(([, href]) => href === pathname)?.[0] || "Home";
  const [banner, setBanner] = useState(true);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
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
      {banner && (
        <div className="announcement">
          <span>
            Let&apos;s talk autonomous trucking{" "}
            <a
              href="https://42di74.share-na2.hsforms.com/2iMiF5OoTRLWyYPBKhOxpsg"
              target="_blank"
              rel="noreferrer"
            >
              Get in touch<span aria-hidden="true">↗</span>
            </a>
          </span>
          <button
            aria-label="Dismiss announcement"
            onClick={() => setBanner(false)}
          >
            ×
          </button>
        </div>
      )}
      <header
        ref={header}
        className={`site-header ${open ? "menu-is-open" : ""} ${banner ? "with-announcement" : ""}`}
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
            id="global-navigation"
            aria-label="Global navigation"
            className="menu-panel"
          >
            <span className="menu-caption">Menu</span>
            <div className="menu-links">
              {pages.map(([label, href, image]) => (
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
  return (
    <footer className="site-footer">
      <video
        className="footer-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
        src="/assets/Waabi_System_LightTunnel_1.mp4"
      />
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
    </footer>
  );
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const customizeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setVisible(!localStorage.getItem("waabi-prototype-cookie-consent"));
  }, []);
  useEffect(() => {
    if (!customize) return;
    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCustomize(false);
        customizeButton.current?.focus();
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [customize]);
  const save = (value: string) => {
    localStorage.setItem("waabi-prototype-cookie-consent", value);
    setVisible(false);
    setCustomize(false);
  };
  if (!visible) return null;
  return (
    <>
      <aside className="cookie-notice" aria-label="Cookie privacy preferences">
        <div className="cookie-copy">
          <h2>We value your privacy</h2>
          <p>
            This site uses cookies to improve your browsing experience, analyze
            site traffic, and show personalized content.
          </p>
        </div>
        <div className="cookie-actions">
          <button onClick={() => save("rejected")}>Reject All</button>
          <button onClick={() => save("accepted")}>Accept All</button>
          <button
            ref={customizeButton}
            className="cookie-customize"
            onClick={() => setCustomize(true)}
          >
            Customize
          </button>
        </div>
      </aside>
      {customize && (
        <div
          className="cookie-modal-backdrop"
          onClick={() => setCustomize(false)}
        >
          <section
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              autoFocus
              className="cookie-close"
              aria-label="Close cookie preferences"
              onClick={() => setCustomize(false)}
            >
              ×
            </button>
            <h2 id="cookie-preferences-title">Customize consent preferences</h2>
            <p>
              Choose which cookies you allow. Necessary cookies support basic
              site functionality and are always enabled.
            </p>
            <label>
              Necessary cookies <input type="checkbox" checked disabled />
            </label>
            <label>
              Analytics cookies{" "}
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
            </label>
            <label>
              Personalized content{" "}
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
              />
            </label>
            <div className="preference-actions">
              <button onClick={() => save("rejected")}>Reject All</button>
              <button
                onClick={() => save(JSON.stringify({ analytics, marketing }))}
              >
                Save preferences
              </button>
              <button onClick={() => save("accepted")}>Accept All</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

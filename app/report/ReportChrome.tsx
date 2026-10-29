"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import Link from "../../components/AppLink";
import { Block, SectionBadge } from "./ReportCodes";
import { lines, status } from "./blocks";
import styles from "./ReportChrome.module.css";
import { pageHeadings } from "./report-heading-navigation";
import { scrollToReportHeading } from "./heading-scroll";
import { headerToneAtPoint } from "./header-contrast";

import { reportNavigation as navigation, type ReportPageId } from "./report-navigation";

const navigationFont = localFont({
  src: "../../public/assets/F37ZagmaSerif_Book-s.p.07ww.6n-k2vcw.woff2",
  weight: "400",
  style: "normal",
  display: "block",
  variable: "--font-report-nav",
});

function PageNavigationMenu({ page, active, nested = false, onNavigate }: {
  page: typeof navigation[number]; active: ReportPageId; nested?: boolean; onNavigate?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [expandedHeadings, setExpandedHeadings] = useState<Record<string, boolean>>({});
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const headings = pageHeadings(page.id);
  const groups = headings.filter(heading => !heading.subheading).map(heading => ({
    heading,
    children: headings.filter(child => child.subheading && child.number.startsWith(heading.number)),
  }));
  const panelId = `report-${nested ? "nested-" : ""}${page.id}-headings`;
  const headingLink = (heading: typeof headings[number]) => <Link href={`${page.href}#${heading.anchor}`}
    title={heading.title} className={heading.subheading ? styles["subheading-link"] : undefined}
    onClick={event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      setExpanded(false); onNavigate?.();
      if (location.pathname === page.href || (page.id === "summary" && location.pathname === "/")) {
        event.preventDefault();
        history.pushState(history.state, "", `${page.href}#${heading.anchor}`);
        scrollToReportHeading(heading.number);
      }
    }}>{heading.label}</Link>;
  useLayoutEffect(() => {
    if (!expanded || nested) return;
    const placePanel = () => {
      const menu = root.current;
      const panel = menu?.querySelector<HTMLElement>(`#${panelId}`);
      if (!menu || !panel) return;
      const left = menu.getBoundingClientRect().left;
      const offset = Math.max(12 - left, Math.min(0, window.innerWidth - 12 - left - panel.offsetWidth));
      menu.style.setProperty("--outline-left", `${offset}px`);
    };
    placePanel();
    window.addEventListener("resize", placePanel);
    return () => window.removeEventListener("resize", placePanel);
  }, [expanded, nested, panelId]);
  useEffect(() => { setExpanded(false); }, [active]);
  useEffect(() => {
    if (!expanded) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setExpanded(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [expanded]);
  return <div ref={root} className={`${styles["more-menu"]} ${styles["page-menu"]} ${nested ? styles["nested-menu"] : ""}`}
    onPointerEnter={event => { if (event.pointerType === "mouse") setExpanded(true); }}
    onPointerLeave={event => { if (event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) setExpanded(false); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }}
    onKeyDown={event => {
      if (event.key === "Escape" && expanded) { event.stopPropagation(); setExpanded(false); trigger.current?.focus(); }
      if (event.key === "ArrowDown" && (event.target === trigger.current || (event.target as HTMLElement).dataset.pageLink)) {
        event.preventDefault(); setExpanded(true);
        requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>(`#${panelId} a`)?.focus());
      }
    }}>
    <div className={styles["page-trigger"]}>
      <Link ref={trigger} data-page-link="true" href={page.href} aria-expanded={expanded} aria-controls={panelId} className={active === page.id ? styles.active : undefined}
        aria-current={active === page.id ? "page" : undefined} onClick={event => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          setExpanded(false); onNavigate?.();
        }}>{page.label}</Link>
      {headings.length > 0 && <button type="button" className={styles["page-outline-toggle"]}
        aria-label={`Headings of ${page.label}`} aria-expanded={expanded} aria-controls={panelId}
        onClick={() => setExpanded(value => !value)}>
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>}
    </div>
    <div id={panelId} className={styles["menu-panel"]} hidden={!expanded} aria-label={`${page.label} headings`}>
      {groups.length ? groups.map(({ heading, children }) => {
        const childrenId = `${panelId}-${heading.anchor}-children`;
        return <div key={heading.number} className={styles["heading-group"]}>
          <div className={styles["heading-trigger"]}>
            {headingLink(heading)}
            {children.length > 0 && <button type="button" aria-label={`Subheadings of ${heading.title}`}
              aria-expanded={Boolean(expandedHeadings[heading.number])} aria-controls={childrenId}
              onClick={() => setExpandedHeadings(value => ({ ...value, [heading.number]: !value[heading.number] }))}>
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>}
          </div>
          {children.length > 0 && <div id={childrenId} hidden={!expandedHeadings[heading.number]}>
            {children.map(child => <div key={child.number}>{headingLink(child)}</div>)}
          </div>}
        </div>;
      }) : <Link href={page.href} onClick={() => { setExpanded(false); onNavigate?.(); }}>AI Logs</Link>}
    </div>
  </div>;
}

// The report pages share the same full-width header and destinations.
export function ReportHeader({ active }: { active: ReportPageId }) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const header = useRef<HTMLElement>(null);
  const bar = useRef<HTMLElement>(null);
  const more = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const primary = navigation.filter(item => item.id !== "other-considerations" && item.id !== "recommendations" && item.id !== "supporting-documents" && item.id !== "references" && item.id !== "ai-logs");
  const secondary = navigation.filter(item => item.id === "other-considerations" || item.id === "recommendations" || item.id === "supporting-documents" || item.id === "references" || item.id === "ai-logs");
  useEffect(() => {
    let frame = 0;
    const updateContrast = () => {
      frame = 0;
      const root = header.current;
      if (!root || !bar.current) return;
      const targets = bar.current.querySelectorAll<HTMLElement>(
        `.${styles["nav-brand"]}, .${styles["nav-links"]} > .${styles["page-menu"]} > .${styles["page-trigger"]}, .${styles["nav-links"]} > .${styles["more-menu"]} > button`,
      );
      let awaitingPage = false;
      targets.forEach(target => {
        const rect = target.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
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
  useEffect(() => {
    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;
    const jump = () => {
      const number = location.hash.match(/^#report-heading-(\d+)-(\d+)$/);
      if (number) scrollToReportHeading(`${number[1]}.${number[2]}`);
    };
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      firstFrame = requestAnimationFrame(() => { secondFrame = requestAnimationFrame(jump); });
    });
    window.addEventListener("hashchange", jump);
    window.addEventListener("popstate", jump);
    return () => { cancelled = true; cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); window.removeEventListener("hashchange", jump); window.removeEventListener("popstate", jump); };
  }, [active]);
  return <header ref={header} className={`${styles["site-header"]} ${navigationFont.variable}`}>
    <div className={styles["header-glass"]} aria-hidden="true">
      <div className={styles["page-progress"]} style={{ transform: `scaleX(${progress})` }} />
    </div>
    <nav ref={bar} className={styles["nav-bar"]} aria-label="Report navigation">
      <span className={styles["nav-brand"]}>Provisions Point</span>
      <div className={styles["nav-links"]}>
      {primary.map(page => <PageNavigationMenu key={page.id} page={page} active={active} />)}
      <div ref={more} className={styles["more-menu"]}
        onPointerEnter={event => { if (event.pointerType === "mouse") setOpen(true); }}
        onPointerLeave={event => { if (event.pointerType === "mouse" && !more.current?.contains(document.activeElement)) setOpen(false); }}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
        onKeyDown={event => {
          if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
          if (event.key === "ArrowDown" && event.target === toggle.current) {
            event.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => Array.from(more.current?.querySelectorAll<HTMLAnchorElement>("a[data-page-link]") ?? []).find(link => link.getClientRects().length > 0)?.focus());
          }
        }}>
        <button ref={toggle} className={secondary.some(item => item.id === active) ? styles.active : undefined} aria-expanded={open} aria-controls="report-more-navigation" onClick={() => setOpen(!open)}>
          <span className={styles["desktop-label"]}>More</span><span className={styles["mobile-label"]}>Menu</span> <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
        <div id="report-more-navigation" className={styles["menu-panel"]} hidden={!open}>
          <div className={styles["mobile-destinations"]}>{primary.map(page => <PageNavigationMenu key={page.id} page={page} active={active} nested onNavigate={() => setOpen(false)} />)}</div>
          {secondary.map(page => <PageNavigationMenu key={page.id} page={page} active={active} nested onNavigate={() => setOpen(false)} />)}
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

"use client";

import { createElement, useEffect, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import styles from "./ReportCodes.module.css";

export type Status = "SITE" | "SLIDES" | "DRAFT" | "MISSING" | "MEDIA";
const STATUSES: Status[] = ["SITE", "SLIDES", "DRAFT", "MISSING", "MEDIA"];
const OFF_CLASS = "report-codes-off";
const WORD_LIMIT = 4000;
// Section ids for sections 3 to 16 (the body that counts toward the word limit).
const BODY_IDS = ["group-declaration", "acknowledgement", "project-details", "background", "problem", "criteria", "options", "selection", "design", "prototyping", "implementation", "cost", "other", "recommendations"];

async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* fall through to the legacy path */ }
  try {
    const field = document.createElement("textarea");
    field.value = text; field.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(field); field.select();
    const ok = document.execCommand("copy");
    field.remove();
    return ok;
  } catch { return false; }
}

// An <i>, not a <span>: some copied card styles target "> span" and would restyle the badge.
function Badge({ code, label, status, className = "", style }: { code: string; label: string; status?: Status; className?: string; style?: CSSProperties }) {
  const [copied, setCopied] = useState(false);
  return <i data-badge="" data-status={status} aria-hidden="true" className={`${styles.badge} ${className}`} style={style}
    onClick={async event => { event.stopPropagation(); if (await copyText(code)) { setCopied(true); setTimeout(() => setCopied(false), 1200); } }}>{copied ? "copied" : label}</i>;
}

/** The "S6" badge that goes above a section heading. */
export function SectionBadge({ n, top }: { n: number; top?: number }) {
  return top === undefined
    ? <Badge code={`S${n}`} label={`S${n}`} className={styles.section} />
    : <Badge code={`S${n}`} label={`S${n}`} className={styles.fixed} style={{ top }} />;
}

/** Badge for a block whose element is rendered elsewhere (a tab item that already carries data-code). */
export function BlockBadge({ code, status, top, inline = false }: { code: string; status: Status; top?: number; inline?: boolean }) {
  return <Badge code={code} label={`${code} ${status}`} status={status} className={inline ? styles.inline : ""} style={top === undefined ? undefined : { top }} />;
}

/**
 * One block from REPORT_CONTENT.md. Renders a single element carrying data-code and data-status, with the badge inside it.
 * `as` lets an existing element (an article card, a figure) be the block itself so its CSS child selectors keep working.
 * `above` leaves room for the badge over a placeholder box, so the box itself holds only its "insert: ..." text.
 * `top` is for blocks laid over the hero: the wrapper has no box, so the badge is placed from the nearest positioned parent.
 */
export function Block({ code, status, as = "div", className = "", above = false, top, badge = true, children }: { code: string; status: Status; as?: ElementType; className?: string; above?: boolean; top?: number; badge?: boolean; children: ReactNode }) {
  const classes = [top === undefined ? styles.block : styles.contents, above ? styles.above : "", top === undefined && (as === "p" || as === "figure") ? styles.pad : "", className].filter(Boolean).join(" ");
  return createElement(as, { className: classes, "data-code": code, "data-status": status },
    badge && <Badge code={code} label={`${code} ${status}`} status={status} className={top === undefined ? "" : styles.fixed} style={top === undefined ? undefined : { top }} />,
    children);
}

// Inline tags join their neighbours; everything else separates words. The checker in tools/check_report.py uses the same sets.
const INLINE = new Set(["SPAN", "MARK", "A", "EM", "STRONG", "B", "I", "SUP", "SUB", "ABBR", "CITE", "SMALL", "TIME", "CODE"]);
const SKIP = new Set(["H1", "H2", "H3", "H4", "H5", "H6", "SVG", "SCRIPT", "STYLE", "NOSCRIPT", "BUTTON", "IMG"]);

function collect(node: Node, out: string[]) {
  if (node.nodeType === 3) { out.push(node.nodeValue || ""); return; }
  if (node.nodeType !== 1) return;
  const el = node as Element;
  const tag = el.tagName.toUpperCase();
  // data-counted keeps a heading whose text is page text in the md; data-nocount drops UI chrome such as slide counters.
  if ((SKIP.has(tag) && !el.hasAttribute("data-counted")) || el.hasAttribute("data-badge") || el.hasAttribute("data-placeholder") || el.hasAttribute("data-nocount")) return;
  const separate = !INLINE.has(tag);
  if (separate) out.push(" ");
  el.childNodes.forEach(child => collect(child, out));
  if (separate) out.push(" ");
}

/** Whitespace split; a token counts only if it has a letter or digit (same rule as fill_wordcounts.py). */
export function countWords(root: Element) {
  const out: string[] = [];
  collect(root, out);
  return out.join("").split(/\s+/).filter(token => /[A-Za-z0-9]/.test(token)).length;
}

type Stats = { statuses: Record<Status, number>; notes: number; media: number; words: number };
const empty: Stats = { statuses: { SITE: 0, SLIDES: 0, DRAFT: 0, MISSING: 0, MEDIA: 0 }, notes: 0, media: 0, words: 0 };

function measure(): Stats {
  const seen = new Map<string, Status>();
  document.querySelectorAll<HTMLElement>("[data-code][data-status]").forEach(el => seen.set(el.dataset.code!, el.dataset.status as Status));
  const statuses = { ...empty.statuses };
  seen.forEach(status => { if (status in statuses) statuses[status]++; });
  const root = document.querySelector("[data-report]");
  const notes = ((root?.textContent || "").match(/TEAM TO ADD:/g) || []).length;
  let media = root?.querySelectorAll('img[src$="insert-image.svg"]').length || 0;
  const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) if ((n.nodeValue || "").includes("(change to our assignment content)")) media++;
  const words = BODY_IDS.reduce((sum, id) => { const el = document.getElementById(id); return sum + (el ? countWords(el) : 0); }, 0);
  return { statuses, notes, media, words };
}

/** Fixed, collapsible progress panel with the show/hide toggle for every badge. */
export function ReportProgress() {
  const [collapsed, setCollapsed] = useState(true);
  const [codesOn, setCodesOn] = useState(true);
  const [stats, setStats] = useState<Stats>(empty);

  useEffect(() => {
    if (new URLSearchParams(location.search).get("codes") === "off") setCodesOn(false);
    setCollapsed(matchMedia("(max-width: 767px)").matches);
  }, []);
  useEffect(() => { document.body.classList.toggle(OFF_CLASS, !codesOn); return () => document.body.classList.remove(OFF_CLASS); }, [codesOn]);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = () => setStats(measure());
    const schedule = () => { clearTimeout(timer); timer = setTimeout(update, 250); };
    update();
    // Text and structure changes only: scroll animations rewrite styles constantly and are ignored.
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, []);

  return <aside className={styles.panel} aria-label="Report progress">
    <div className={styles.bar}>
      <button type="button" aria-expanded={!collapsed} onClick={() => setCollapsed(value => !value)}>{collapsed ? "Progress +" : "Progress -"}</button>
      <button type="button" aria-pressed={codesOn} onClick={() => setCodesOn(value => !value)}>Labels: {codesOn ? "on" : "off"}</button>
    </div>
    {!collapsed && <div className={styles.body}>
      <h2>Blocks by status</h2>
      <ul className={styles.statuses}>{STATUSES.map(status => <li key={status} data-status={status}>{status} {stats.statuses[status]}</li>)}</ul>
      <h2>Still to do</h2>
      <dl className={styles.rows}>
        <dt>TEAM TO ADD notes</dt><dd>{stats.notes}</dd>
        <dt>Media frames to replace</dt><dd>{stats.media}</dd>
      </dl>
      <h2>Body words, sections 3 to 16</h2>
      <p className={styles.words} data-over={stats.words > WORD_LIMIT} aria-live="polite" style={{ margin: 0, fontWeight: 600 }}>{stats.words} / {WORD_LIMIT}</p>
    </div>}
  </aside>;
}

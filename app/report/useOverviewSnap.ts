"use client";

import { useEffect, type RefObject } from "react";

/** Choose the nearest paragraph centre without pulling users back on exit. */
export function overviewSnapTarget(centres: number[], scrollTop: number, viewportHeight: number) {
  const targets = centres.map(centre => Math.max(0, centre - viewportHeight / 2));
  if (!targets.length || scrollTop < targets[0] || scrollTop > targets[targets.length - 1]) return null;
  const nearest = targets.reduce((best, target) => Math.abs(target - scrollTop) < Math.abs(best - scrollTop) ? target : best);
  return Math.abs(nearest - scrollTop) > 2 ? nearest : null;
}

export function useOverviewSnap(ref: RefObject<HTMLDivElement | null>, enabled: boolean, reduced: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;
    let pressed = false;
    const cancel = () => clearTimeout(timer);
    const settle = () => {
      cancel();
      if (pressed) return;
      timer = setTimeout(() => {
        const centres = Array.from(ref.current?.children ?? []).map(child => {
          const article = child as HTMLElement;
          // Layout offsets exclude the entrance animation's transforms.
          let top = 0;
          let node: HTMLElement | null = article;
          while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
          return top + article.offsetHeight / 2;
        });
        const target = overviewSnapTarget(centres, window.scrollY, window.innerHeight);
        if (target !== null) window.scrollTo({ top: target, behavior: reduced ? "instant" : "smooth" });
      }, 180);
    };
    const down = () => { pressed = true; cancel(); };
    const up = () => { pressed = false; settle(); };
    window.addEventListener("scroll", settle, { passive: true });
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", up, { passive: true });
    window.addEventListener("resize", cancel);
    return () => {
      cancel();
      window.removeEventListener("scroll", settle);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("resize", cancel);
    };
  }, [ref, enabled, reduced]);
}

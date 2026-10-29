/** Reveal scroll-controlled slides before jumping to their heading. */
export function scrollToReportHeading(number: string) {
  const candidates = () => Array.from(document.querySelectorAll<HTMLElement>(`[data-heading-number="${number}"]`));
  const visible = () => candidates().find(node => node.getClientRects().length > 0);
  // Desktop Project details and Background pin their slides to scroll positions.
  // Design options uses the same selection controls on both desktop and mobile.
  const slideshow = number.startsWith("4.1") && number !== "4.1" ? "Design options"
    : window.innerWidth >= 768 && /^2\.[1-4]$/.test(number) ? "Project details"
    : window.innerWidth >= 768 && /^3\.1[1-7]$/.test(number) ? "Background" : null;
  if (slideshow) {
    const marker = document.querySelector<HTMLButtonElement>(`button[aria-label="Go to ${slideshow.toLowerCase()} point ${number}"]`);
    if (marker) { marker.click(); return; }
  }
  const target = visible();
  if (!target) return;
  // The operating-step rail moves with page scroll rather than native horizontal scrolling.
  const scene = target.closest<HTMLElement>("[data-operating-steps]");
  if (scene && /^5\.3[1-6]$/.test(number) && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const travel = parseFloat(scene.style.getPropertyValue("--step-travel")) || 0;
    const index = Number(number.slice(-1)) - 1;
    window.scrollTo({ top: window.scrollY + scene.getBoundingClientRect().top + travel * index / 5, behavior: "instant" });
    return;
  }
  const offset = (document.querySelector("nav[aria-label=\"Report navigation\"]")?.getBoundingClientRect().bottom ?? 64) + 20;
  // scrollIntoView also scrolls ancestor frames, clipping the header in Google Sites.
  // Move only this document, keeping the embedded frame in its original position.
  window.scrollTo({ top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset), behavior: "instant" });
}

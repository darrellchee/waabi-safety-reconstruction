"use client";
import { useLayoutEffect } from "react";
import "./carousel-motion.css";

/** Horizontal subset of the public Blossom carousel mechanics (67990).
 * Touch stays native. Desktop dragging uses its measured .72 velocity decay and
 * frame-rate-independent .72/.12 interpolation, snapping to the predicted item.
 */
export function useCarouselMotion(ref: { current: HTMLDivElement | null }) {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || "ontouchmove" in window) return;
    element.setAttribute("data-carousel-motion", "true");
    const nativeTo = element.scrollTo.bind(element), nativeBy = element.scrollBy.bind(element);
    const snap = getComputedStyle(element).scrollSnapType;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dragging = false, active = false, distance = 0, lastX = 0;
    let target = 0, velocity = 0, displayed = 0, frame = 0, lastTime = 0, elastic = 0;
    const easeFrame = (from: number, to: number, amount: number, dt: number) =>
      from + (to - from) * (1 - Math.exp(dt / (1000 / 60) * Math.log(1 - amount)));
    const max = () => element.scrollWidth - element.clientWidth;
    const stop = () => {
      active = false; cancelAnimationFrame(frame); frame = 0;
      element.style.scrollSnapType = snap;
      element.style.transform = "";
      element.removeAttribute("data-carousel-dragging");
    };
    const tick = (now: number) => {
      const dt = now - lastTime; lastTime = now;
      velocity *= .72;
      if (!dragging) target += velocity;
      displayed = easeFrame(displayed, target, dragging ? .72 : .12, dt);
      nativeTo({ left: displayed, behavior: "instant" });
      const edge = displayed <= 0 ? (dragging ? -.2 * displayed : 0)
        : displayed > max() - 4 ? (dragging ? -.2 * (displayed - max() + 4) : 0) : 0;
      elastic = easeFrame(elastic, edge, dragging ? .8 : .12, dt);
      element.style.transform = Math.abs(elastic) > .01 ? `translateX(${Math.round(elastic * 1000) / 1000}px)` : "";
      if (!dragging && Math.round(velocity * 1e8) === 0) {
        stop(); element.dispatchEvent(new Event("scrollend", { bubbles: true }));
      } else frame = requestAnimationFrame(tick);
    };
    const down = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0 || max() <= 0) return;
      dragging = true; displayed = element.scrollLeft; lastX = event.clientX; velocity = 0; distance = 0;
      window.addEventListener("pointermove", move, { passive: false });
      window.addEventListener("pointerup", up);
    };
    const move = (event: PointerEvent) => {
      event.preventDefault();
      const delta = lastX - event.clientX; lastX = event.clientX;
      target += delta; velocity += delta; distance += Math.abs(delta);
      if (distance >= 10 && !active) {
        active = true; target = element.scrollLeft; lastTime = performance.now();
        element.style.scrollSnapType = "none";
        element.setAttribute("data-carousel-dragging", "true");
        frame = requestAnimationFrame(tick);
      }
    };
    const up = () => {
      dragging = false;
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up);
      if (distance <= 10) return;
      velocity *= 2;
      const prediction = target + velocity / (1 - .72);
      const root = element.getBoundingClientRect();
      const computed = getComputedStyle(element);
      const paddingStart = parseInt(computed.scrollPaddingInlineStart) || 0;
      const paddingEnd = parseInt(computed.scrollPaddingInlineEnd) || 0;
      const positions = Array.from(element.children).flatMap(child => {
        const style = getComputedStyle(child), rect = child.getBoundingClientRect();
        const x = rect.left - root.left + element.scrollLeft;
        return style.scrollSnapAlign === "start" ? [x - paddingStart]
          : style.scrollSnapAlign === "center" ? [x + child.clientWidth / 2 - element.clientWidth / 2]
          : style.scrollSnapAlign === "end" ? [x + child.clientWidth - element.clientWidth + paddingEnd] : [];
      });
      const selected = positions.length ? positions.reduce((best, next) => Math.abs(next - prediction) < Math.abs(best - prediction) ? next : best) : prediction;
      const destination = Math.max(0, Math.min(max(), selected));
      velocity = (destination - target) * (1 - .72) / .72;
      if (reduced) { stop(); nativeTo({ left: destination, behavior: "instant" }); }
      const cancelClick = (event: MouseEvent) => { event.preventDefault(); event.stopPropagation(); window.removeEventListener("click", cancelClick, true); };
      window.addEventListener("click", cancelClick, true);
    };
    const wheel = (event: WheelEvent) => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) stop(); };
    const keyboard = (event: KeyboardEvent) => { if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) stop(); };
    // Programmatic carousel arrows cancel any in-flight drag, as in Blossom.
    element.scrollTo = ((...args: Parameters<HTMLDivElement["scrollTo"]>) => { stop(); Reflect.apply(nativeTo, element, args); }) as HTMLDivElement["scrollTo"];
    element.scrollBy = ((...args: Parameters<HTMLDivElement["scrollBy"]>) => { stop(); Reflect.apply(nativeBy, element, args); }) as HTMLDivElement["scrollBy"];
    if (fine) element.style.scrollSnapType = "none";
    element.addEventListener("pointerdown", down);
    element.addEventListener("wheel", wheel, { passive: true }); window.addEventListener("keydown", keyboard);
    return () => {
      stop(); element.removeAttribute("data-carousel-motion"); element.scrollTo = nativeTo; element.scrollBy = nativeBy;
      element.removeEventListener("pointerdown", down); element.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", keyboard); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up);
    };
  }, [ref]);
}


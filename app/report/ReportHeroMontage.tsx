"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./ReportHeroMontage.module.css";
import photos from "./montage-photos.json";

// The index page's road montage with report media and acknowledgement copy.
export default function ReportHeroMontage({ children }: { children: ReactNode }) {
  const road = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = road.current;
      if (!node) return;
      const progress = Math.max(0, Math.min(1, (innerHeight - node.getBoundingClientRect().top) / (innerHeight + node.offsetHeight)));
      node.style.setProperty("--road-outer-y", `${600 - 1200 * progress}px`);
      const textProgress = Math.max(0, Math.min(1, (innerHeight - node.getBoundingClientRect().top - node.offsetHeight * .5) / (node.offsetHeight * .5)));
      node.style.setProperty("--road-copy-y", `${innerWidth >= 768 ? -200 + 400 * textProgress : 0}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    update();
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <section ref={road} className={`home-road ${styles.montage}`} aria-label="Team Acknowledgement">
    <div className="home-road-sticky">
      <div className="home-collage">
        {photos.slice(0, 12).map((photo, i) => <img key={photo.src} src={photo.src} alt={photo.alt} title={`Photo: ${photo.credit}`} loading="lazy" className={`home-tile home-tile-${i}`} />)}
        {photos.slice(12, 16).map((photo, i) => <div key={photo.src} className={`home-tile home-tile-${i + 12}`}><img className="home-film-poster" src={photo.src} alt={photo.alt} title={`Photo: ${photo.credit}`} loading="lazy" /></div>)}
      </div>
      <div className={`home-road-copy ${styles.summaryCopy}`}>{children}</div>
      <img className="home-road-center-tile" src={photos[16].src} alt={photos[16].alt} loading="lazy" />
      <p className={styles.photoCredits}>Photos: <a href="https://www.lamalama.org.au/">Yintjingga Aboriginal Corporation</a> and Annette Ruzicka. Camping: <a href="https://keepactive.com.au/">KeepActive Australia</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> (resized and cropped). <a href="#references">Full image references</a>.</p>
    </div>
  </section>;
}

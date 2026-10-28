import { Block, SectionBadge } from "./ReportCodes";
import { lines, text, title, status } from "./blocks";
import styles from "./ReportPrototype.module.css";

function PrototypeImage({ number, alt, priority = false }: { number: number; alt: string; priority?: boolean }) {
  const dimensions: Record<number, [number, number]> = {
    1: [442, 300], 2: [460, 297], 3: [442, 300], 4: [458, 298],
    5: [578, 468], 6: [580, 322], 7: [580, 428],
  };
  const [width, height] = dimensions[number];
  const src = `/assets/report/prototype/proto-${number}.png`;
  return <figure className={styles.figure}>
    <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`${alt} Open full-size image in a new tab.`}>
      <img src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
    </a>
  </figure>;
}

export function ReportPrototype() {
  const testing = lines("12.3").filter(Boolean);
  return <section id="prototyping" className={styles.prototype}>
    <SectionBadge n={12} />
    <div className={styles.purposeRow}>
      <Block code="12.1" status={status("12.1")} className={styles.copy}>
        <h2>{title("12.1")}</h2>
        <p>{text("12.1")}</p>
      </Block>
      <PrototypeImage number={2} priority alt="Exterior Blender model of Provisions Point showing the roof, raised supports and access ramp." />
    </div>
    <div className={styles.buildRow}>
      <Block code="12.2" status={status("12.2")} className={styles.copy}>
        <h2>{title("12.2")}</h2>
        <p>{text("12.2")}</p>
      </Block>
      <PrototypeImage number={3} alt="Side view of the Blender model showing the building and supporting piles." />
    </div>
    <div className={styles.interiors}>
      <PrototypeImage number={4} alt="Interior Blender model showing shelves, a central table and supplies." />
      <PrototypeImage number={1} alt="Close-up Blender model of recovery gear and supplies on shelving." />
    </div>
    <Block code="12.3" status={status("12.3")} className={`${styles.copy} ${styles.testing}`}>
      <h2>{title("12.3")}</h2>
      <p>{testing[0]}</p>
      <div className={styles.results}><p>{testing[1]}</p></div>
    </Block>
    <div className={styles.bottomGallery}>
      <PrototypeImage number={5} alt="Blender model of stored supplies, including gas cylinders, water containers and cooking equipment." />
      <PrototypeImage number={6} alt="Blender model of recovery equipment, including a battery, jack and spare tyre." />
      <PrototypeImage number={7} alt="Interior Blender model showing storage shelves, a work table, bench and chair." />
    </div>
  </section>;
}

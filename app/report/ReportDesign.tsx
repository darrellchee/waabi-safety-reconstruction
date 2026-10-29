import { ReportHeadingAnchor } from "./ReportHeadingAnchor";
import type { CSSProperties } from "react";
import { ReportDesignStages } from "./ReportDesignStages";
import { Block } from "./ReportCodes";
import { lines, text, title, status } from "./blocks";
import styles from "./ReportDesign.module.css";

const interiorViews = [
  { image: "prov-in.jpg", label: "Interior overview", alt: "Concept interior with shelves on either side and a counter at the back.", scale: 1, origin: "50% 50%" },
  { image: "prov-in.jpg", label: "Supply shelves", alt: "Detail of the concept shelving with canned food, storage tubs and firewood.", scale: 2, origin: "22% 50%" },
  { image: "prov-in2.jpg", label: "Service counter", alt: "Concept service counter with supplies and recovery equipment below.", scale: 1, origin: "50% 50%" },
];

const equipmentViews = [
  { image: "item1.jpg", label: "Traction boards", alt: "A person positioning orange traction boards beside a four-wheel-drive vehicle on a snowy track.", width: 492, height: 272 },
  { image: "item2.jpg", label: "Tyre deflation kit", alt: "A tyre deflation tool and pressure gauge connected to a vehicle tyre valve.", width: 492, height: 272 },
  { image: "item3.jpg", label: "12V air compressor", alt: "A portable air compressor with a pressure gauge, hose and vehicle power plug.", width: 172, height: 170 },
  { image: "item4.jpg", label: "Recovery strap and shackle", alt: "An orange recovery strap connected to a vehicle recovery point with a green soft shackle.", width: 328, height: 189 },
];

const structureViews = [
  { image: "resilient1.png", label: "Reinforced concrete pile construction", alt: "Diagram showing pile construction in four stages: drilling, inserting reinforcement, casting concrete and the finished pile.", width: 293, height: 201 },
  { image: "resilient2.png", label: "Concrete material reference", alt: "Cutaway illustration of a concrete block showing fibres within the material.", width: 258, height: 230 },
  { image: "resilient3.png", label: "Corrugated roof reference", alt: "Photograph of a pitched corrugated roof with a skylight and vent.", width: 472, height: 276 },
];

export function ReportDesign() {
  return <section id="design" className={styles.design} aria-label="Detailed Design">
    <Block code="11.1" status={status("11.1")} className={styles.summary}>
      <p>{text("11.1")}</p>
    </Block>
    <section className={`${styles.row} ${styles.structureRow}`} aria-labelledby="design-structure-heading">
      <Block code="11.3" status={status("11.3")} className={styles.copy}>
        <h2 id="design-structure-heading"><ReportHeadingAnchor text={title("11.3")} />{title("11.3")}</h2>
        <p>{text("11.3")}</p>
      </Block>
      <div className={styles.structureVisuals} aria-label="Structure concept and material reference images">
        <figure className={styles.exterior}>
          <img src="/assets/report/design/prov-out2.jpg" alt="Exterior concept reference showing a raised campground building on concrete piles." width="979" height="775" loading="lazy" />
          <figcaption>Exterior concept reference</figcaption>
        </figure>
        <figure className={styles.structureConcept}>
          <img src="/assets/report/design/structure-concept.jpg" alt="Structure concept showing a raised building with a corrugated pitched roof, verandah and stairs, surrounded by campsites and vehicles in bushland." width="1145" height="779" loading="lazy" />
          <figcaption>Structure concept reference</figcaption>
        </figure>
        {structureViews.map(view => <figure key={view.image} className={styles.structureCard}>
          <div className={styles.structureImage}>
            <img src={`/assets/report/design/${view.image}`} alt={view.alt} width={view.width} height={view.height} loading="lazy" />
          </div>
          <figcaption>{view.label}</figcaption>
        </figure>)}
      </div>
    </section>
    <section className={`${styles.row} ${styles.stockRow}`} aria-labelledby="design-stock-heading">
      <Block code="11.4" status={status("11.4")} className={styles.copy}>
        <h2 id="design-stock-heading"><ReportHeadingAnchor text={title("11.4")} />{title("11.4")}</h2>
        <p>{text("11.4")}</p>
      </Block>
      <div className={styles.stockGrid} aria-label="Interior concept and recovery equipment reference images">
        {interiorViews.map(view => <figure key={view.label} className={styles.stockCard}>
          <div className={styles.crop} style={{ "--image-scale": view.scale, "--image-origin": view.origin } as CSSProperties}>
            <img src={`/assets/report/design/${view.image}`} alt={view.alt} width={view.image === "prov-in.jpg" ? 1025 : 1054} height={view.image === "prov-in.jpg" ? 775 : 775} loading="lazy" />
          </div>
          <figcaption>{view.label}</figcaption>
        </figure>)}
        {equipmentViews.map(view => <figure key={view.image} className={`${styles.stockCard} ${styles.equipmentCard}`}>
          <div className={styles.equipmentImage}>
            <img src={`/assets/report/design/${view.image}`} alt={view.alt} width={view.width} height={view.height} loading="lazy" />
          </div>
          <figcaption>{view.label}</figcaption>
        </figure>)}
      </div>
    </section>
    <section className={styles.how} aria-labelledby="design-how-heading">
      <ReportDesignStages />
    </section>
    <section className={`${styles.row} ${styles.communityRow}`} aria-labelledby="design-community-heading">
      <Block code="11.10" status={status("11.10")} className={styles.copy}>
        <h2 id="design-community-heading"><ReportHeadingAnchor text={title("11.10")} />{title("11.10")}</h2>
        <p>{lines("11.10")[0]}</p>
        <ul>{lines("11.10").slice(1).map(concern => <li key={concern}>{concern}</li>)}</ul>
      </Block>
    </section>
  </section>;
}

import type { ReactNode } from "react";
import HomeHero from "./ReportHomeHero";
import ReportHeroMontage from "./ReportHeroMontage";
import styles from "./report.module.css";

export function ReportHero({ children, acknowledgement }: { children: ReactNode; acknowledgement: ReactNode }) {
  return <div id="top" className={`home-page ${styles.heroPage}`}>
    <HomeHero introClassName={styles.heroCover}>{children}</HomeHero>
    <ReportHeroMontage>{acknowledgement}</ReportHeroMontage>
  </div>;
}

import type { Metadata } from "next";
import CareersPage from "@/components/CareersPage";

export const metadata: Metadata = {
  title: "Careers — Waabi educational prototype",
  description: "Find your place in Physical AI. An independent educational reconstruction of Waabi’s Careers page.",
};

export default function Page() {
  return <CareersPage />;
}

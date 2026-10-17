import type { Metadata } from "next";
import CompanyPage from "@/components/CompanyPage";
export const metadata: Metadata = {
  title: "Company — Waabi educational prototype",
  description:
    "The people, story, investors and locations behind Waabi. An independent educational reconstruction.",
};
export default function Page() {
  return <CompanyPage />;
}

import type { Metadata } from "next";
import CompanyPage from "@/components/CompanyPage";
export const metadata: Metadata = {
  title: "The project and the team | Provisions Point",
  description:
    "Background, problem and design criteria for a proposed flood-resilient supply and recovery shelter at Warokutal, Lama Lama Country.",
};
export default function Page() {
  return <CompanyPage />;
}

import type { Metadata } from "next";
import ReportPage from "../../report/ReportPage";

export const metadata: Metadata = { title: "Provisions Point | Project details" };

export default function Page() {
  return <ReportPage page="project-details" />;
}

import type { Metadata } from "next";
import ReportPage from "./ReportPage";

export const metadata: Metadata = { title: "Provisions Point | Summary" };

export default function SummaryPage() {
  return <ReportPage />;
}

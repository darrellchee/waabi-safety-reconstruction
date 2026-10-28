import type { Metadata } from "next";
import ReportPage from "../../report/ReportPage";

export const metadata: Metadata = { title: "Provisions Point | AI Logs" };

export default function Page() {
  return <ReportPage page="ai-logs" />;
}

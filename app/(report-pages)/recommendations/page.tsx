import type { Metadata } from "next";
import ReportPage from "../../report/ReportPage";

export const metadata: Metadata = { title: "Provisions Point | Recommendations" };

export default function Page() {
  return <ReportPage page="recommendations" />;
}

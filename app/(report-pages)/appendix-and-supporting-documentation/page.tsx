import type { Metadata } from "next";
import ReportPage from "../../report/ReportPage";

export const metadata: Metadata = { title: "Provisions Point | Appendix and Supporting Documentation" };

export default function Page() {
  return <ReportPage page="supporting-documents" />;
}

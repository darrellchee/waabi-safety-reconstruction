import type { Metadata } from "next";
import ReportPage from "../../report/ReportPage";

export const metadata: Metadata = { title: "Provisions Point | Background" };

export default function Page() {
  return <ReportPage page="background" />;
}

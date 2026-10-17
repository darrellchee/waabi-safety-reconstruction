import type { Metadata } from "next";
import SafetyPage from "@/components/SafetyPage";
export const metadata: Metadata = {
  title: "Safety — Waabi | Educational Prototype",
};
export default function Page() {
  return <SafetyPage />;
}

import type { Metadata } from "next";
import SafetyPage from "@/components/SafetyPage";
export const metadata: Metadata = {
  title: "The solution | Provisions Point",
  description:
    "Three design options, the decision matrix, the detailed design and the prototype for a proposed flood-resilient supply and recovery shelter at Warokutal.",
};
export default function Page() {
  return <SafetyPage />;
}

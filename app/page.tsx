import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
export const metadata: Metadata = {
  title: "Provisions Point | Resilient visitor infrastructure for Lama Lama Country",
  description:
    "A proposed flood-resilient supply and recovery shelter at Warokutal (Safari Camp), Lama Lama Country, proposed to the Yintjingga Aboriginal Corporation. EWB Challenge 2026.",
};
export default function Page() {
  return <HomePage />;
}

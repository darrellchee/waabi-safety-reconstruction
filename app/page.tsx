import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
export const metadata: Metadata = {
  title: "Waabi — Physical AI",
  description:
    "A private educational reconstruction of Waabi's home page. Built to think. Born to haul.",
};
export default function Page() {
  return <HomePage />;
}

import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import MotionProvider from "../components/MotionProvider";
import { ViewTransitions } from "next-view-transitions";
import "../components/page-transitions.css";
export const metadata: Metadata = {
  icons: { icon: "/assets/1774553027-favicon-32x32.webp" },
  title: "Provisions Point | Resilient visitor infrastructure for Lama Lama Country",
  description:
    "A proposed flood-resilient supply and recovery shelter at Warokutal (Safari Camp), Lama Lama Country, proposed to the Yintjingga Aboriginal Corporation. EWB Challenge 2026.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions><html lang="en">
      <body><MotionProvider><SmoothScroll />{children}</MotionProvider></body>
    </html></ViewTransitions>
  );
}

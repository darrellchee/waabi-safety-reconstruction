import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import MotionProvider from "../components/MotionProvider";
import { ViewTransitions } from "next-view-transitions";
import "../components/page-transitions.css";
export const metadata: Metadata = {
  icons: { icon: "/assets/1774553027-favicon-32x32.webp" },
  title: "Waabi | Educational Prototype",
  description:
    "An educational reconstruction of Waabi’s Home, Safety, Company, and Careers pages.",
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

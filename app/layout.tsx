import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Safety — Waabi | Educational Prototype",
  description: "A private educational reconstruction of Waabi’s Safety page.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

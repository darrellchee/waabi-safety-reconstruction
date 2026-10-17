import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  icons: { icon: "/assets/1774553027-favicon-32x32.webp" },
  title: "Waabi | Educational Prototype",
  description:
    "An educational reconstruction of Waabi’s Home, Safety, and Company pages.",
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

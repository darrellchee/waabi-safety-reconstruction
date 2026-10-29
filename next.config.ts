import type { NextConfig } from "next";
const config: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [{ source: "/supporting-documents", destination: "/appendix-and-supporting-documentation", permanent: true }];
  },
  allowedDevOrigins: ["127.0.0.1"],
  distDir: process.env.NEXT_DIST_DIR || ".next",
};
export default config;

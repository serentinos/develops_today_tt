import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  env: {
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8088",
  },
  images: {
    remotePatterns: [
      {
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;

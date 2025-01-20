import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;

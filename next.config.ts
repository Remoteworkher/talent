import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'console.remoteworkher.com',
      },
    ],
  },
};

export default nextConfig;

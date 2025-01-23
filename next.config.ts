import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sfp2025',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/sfp2025/form',
        destination: '/form',
      },
    ];
  },
};

export default nextConfig;

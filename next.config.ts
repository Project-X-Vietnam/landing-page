import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/sfp2025/form',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;

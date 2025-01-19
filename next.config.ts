import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/sfp2025',
        destination: '/sfp2025/form',
        permanent: true,
      },
      {
        source: '/',
        destination: '/sfp2025/form',
        permanent: true,
      },
    ];
  },
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

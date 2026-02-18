import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "img-prod-cms-rt-microsoft-com.akamaized.net" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "salt.tikicdn.com" },
      { protocol: "https", hostname: "www.vinai.io" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/sfp",
        destination: "/sfp2026",
        permanent: false,
      },
      {
        source: "/recruitment2026",
        destination:
          "https://docs.google.com/forms/d/e/1FAIpQLSfEZne7lrU9caOJPYmDngy5ydY0oX1fJsdXmDquH98AqAmhnw/viewform?fbclid=IwY2xjawOo8CdleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAEwAAEedklcMoCBlzkiH2QZ2MHddsIurriPTCQk5_qEw_7HAD3idj4-5BO3YnBurug_aem_WIyfIJaczM27ku32egRoqQ",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

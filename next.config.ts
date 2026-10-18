import type { NextConfig } from "next";

const imageBaseUrl = new URL(
  process.env.NEXT_PUBLIC_COURSE_IMAGE_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "https://212.47.64.208",
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: imageBaseUrl.protocol.slice(0, -1) as "http" | "https",
        hostname: imageBaseUrl.hostname,
        port: imageBaseUrl.port,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "212.47.64.208",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "212.47.64.208",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;


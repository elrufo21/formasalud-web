import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/**/*": ["./public/**/*"],
  },
};

export default nextConfig;

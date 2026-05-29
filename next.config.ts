import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Vagish.dev",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

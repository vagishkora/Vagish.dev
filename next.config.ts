import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Vagish.dev",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,  
  },
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;

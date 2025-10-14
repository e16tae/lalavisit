import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Security: Only allow images from specific trusted domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.lalavisit.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "lalavisit.com",
        pathname: "/images/**",
      },
    ],
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Allow cross-origin requests in development
  allowedDevOrigins: ['127.0.0.1'],
};

export default nextConfig;

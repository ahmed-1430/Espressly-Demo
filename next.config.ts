import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Espressly uses a small, deliberate quality ladder so art direction can be
     * tuned per image without opening the door to arbitrary re-encoding.
     * Listed explicitly because Next 16 only serves configured qualities.
     */
    qualities: [70, 72, 75, 76, 78, 80, 82, 90],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 430, 640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [64, 96, 128, 180, 240, 320, 420, 560, 720],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
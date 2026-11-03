import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    /* 3840 is dropped deliberately: for the hero photograph it costs
       roughly another 300 KB over the 2048 variant, on an image that
       sits behind a dark scrim. It is the LCP element, so the bytes
       matter more than the extra pixel density. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    /* Next 16 only serves qualities declared here. */
    qualities: [55, 62, 75],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  /* The combined Concretes & Absolutes page is gone — the two are
     separate categories now. The URL was in the sitemap at priority
     0.9, so it redirects rather than 404s for anything that already
     holds the link. Absolutes is the target because it is where the
     page's best-known materials (rose, vanilla, mimosa) now live. */
  async redirects() {
    return [
      {
        source: "/products/concretes-absolutes",
        destination: "/products/absolutes",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;

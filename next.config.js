/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  // experimental: {
  //   images: {
  //     allowFutureImage: true,
  //   },
  // },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "query", key: "r", value: "(?<regionName>.*)" }],
          destination: "/region/:regionName",
        },
        {
          source: "/",
          has: [{ type: "query", key: "s", value: "(?<sparam>.*)" }],
          destination: "/search?s=:sparam",
        },
      ],
      fallback: [
        {
          source: "/sitemap.xml",
          destination: "/api/sitemap.xml",
        },
      ],
    };
  },
};

module.exports = nextConfig;

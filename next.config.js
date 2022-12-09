const redirects = require("./data/redirects.json");
const marketoRedirects = require("./data/marketoRedirects.json");
const marketoLpRedirects = require("./data/marketoLpRedirects.json");
const marketoEmailRedirects = require("./data/marketoEmailRedirects.json");
const agilityRedirects = require("./data/agilityRedirects.json");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:path*",
          has: [
            {
              type: "host",
              value: "blog.ujet.co",
            },
          ],
          destination: "/blog/:path*",
        },
        { source: "/brand", destination: "/brand/home" },
      ],
    };
  },
  async redirects() {
    agilityRedirects.forEach((redirect) => {
      redirects.push(redirect);
    });
    marketoRedirects.forEach((redirect) => {
      redirects.push(redirect);
    });
    marketoLpRedirects.forEach((redirect) => {
      redirects.push(redirect);
    });
    marketoEmailRedirects.forEach((redirect) => {
      redirects.push(redirect);
    });
    return redirects;
  },
  images: {
    domains: ["assets.ujet.cx"],
    deviceSizes: [360, 375, 480, 640, 768, 890],
    imageSizes: [16, 32, 48, 64, 96, 128],
  },
  reactStrictMode: true,
  staticPageGenerationTimeout: 1800,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;

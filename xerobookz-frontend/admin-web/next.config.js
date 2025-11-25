/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@xerobookz/ui-shared", "@xerobookz/api-clients"],
  // Allow local packages
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;


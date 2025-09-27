import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["m.media-amazon.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPWA({
  ...nextConfig,
});

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com'], // ここに許可するホスト名を追加
  },
};

export default nextConfig;

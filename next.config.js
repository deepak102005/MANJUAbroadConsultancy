/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["d8j0ntlcm91z4.cloudfront.net"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[name].[hash][ext]',
      },
    });
    return config;
  },
};

module.exports = nextConfig;

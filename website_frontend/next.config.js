/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['m.media-amazon.com'],
  },
  typescript:{
    ignoreBuildErrors: true,
  },
  output: 'standalone'
}
module.exports = nextConfig

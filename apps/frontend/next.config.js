/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Configure for Cloudflare Pages deployment
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Environment variables for the Worker API
  env: {
    WORKER_API_URL: process.env.WORKER_API_URL || 'https://permit-dashboard.your-subdomain.workers.dev',
  },
}

module.exports = nextConfig
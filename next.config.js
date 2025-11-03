/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable if you need to proxy WordPress API requests
  async rewrites() {
    return [
      {
        source: '/api/wp/:path*',
        destination: 'https://ish-vara.com/wp-json/wp/v2/:path*',
      },
    ];
  },
}

module.exports = nextConfig


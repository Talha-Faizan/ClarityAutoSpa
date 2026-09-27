/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://clarityautospa-server.onrender.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      'redefinecommerce.blob.core.windows.net',
      'redefinecommerce.blob.core.windows.netstring',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'redefinecommerce.blob.core.windows.net',
        pathname: '**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'redefinecommerce.blob.core.windows.net/netstring',
      //   pathname: '**',
      // },
    ],
  },
  experimental: {
    swcMinify: true,
    // set large page allocation size to 1GB
    workerThreads: true,
    largePageDataBytes: 1024 * 1024 * 1024,
  },
};

module.exports = nextConfig;

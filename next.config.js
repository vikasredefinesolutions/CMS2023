/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    domains: ['headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net'],
    // domains: ['redefinecommerce.blob.core.windows.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net',
        // protocol: 'https',
        // hostname: 'redefinecommerce.blob.core.windows.net',
        pathname: '**',
      },
    ],
  },
  // experimental: {
  //   swcMinify: true,
  //   // set large page allocation size to 1GB
  //   workerThreads: true,
  //   largePageDataBytes: 1024 * 1024 * 1024,
  // },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: '/sitemap.html',
        destination: '/sitemap',
      },
      {
        source: '/sitemap.html',
        destination: '/sitemap',
      },
    ];
  },
  images: {
    domains: ['storagemedia.corporategear.com'],
    // domains: ['headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net'],
    remotePatterns: [
      {
        protocol: 'https',
        //hostname: 'headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net',
        hostname: 'storagemedia.corporategear.com',
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

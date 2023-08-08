/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    domains: [
      'corporategear.com',
      'storagemedia.corporategear.com',
      'redefinecommerce.blob.core.windows.net',
      // 'headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'corporategear.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'storagemedia.corporategear.com',
        pathname: '**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'redefinecommerce.blob.core.windows.net',
      //   pathname: '**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net',
      //   pathname: '**',
      // },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.net = false;
    }

    return config;
  },
  // experimental: {
  //   swcMinify: true,
  //   // set large page allocation size to 1GB
  //   workerThreads: true,
  //   largePageDataBytes: 1024 * 1024 * 1024,
  // },
};

module.exports = nextConfig;

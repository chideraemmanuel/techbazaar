import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   ppr: 'incremental',
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/*/**',
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ehcsksmvqeaordhtpluf.supabase.co',
      },
    ],
  },
};

export default nextConfig;

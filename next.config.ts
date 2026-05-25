import path from 'path';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'sanity',
    '@sanity/client',
    '@sanity/ui',
    'styled-components',
  ],
  images: {
    qualities: [100, 90, 80, 75, 70],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default withNextIntl(nextConfig);

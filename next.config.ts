import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Proxy all paths that don't start with a locale (en|fr) or special Next.js/static prefixes
        source: '/:path((?!en|fr|_next|api|images|.*\\..*).*)',
        destination: '/fr/:path',
      },
    ];
  },
};

export default withNextIntl(nextConfig);

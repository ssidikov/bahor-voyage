import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Toutes les pages sauf :
    // - /api, /trpc (routes API)
    // - /_next (assets Next.js)
    // - /_vercel (assets Vercel)
    // - fichiers avec extension (.ico, .png, .svg...)
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
};

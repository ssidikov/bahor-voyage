import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-6xl mx-auto px-container-pad py-12 md:py-16">
        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <p className="text-white font-serif text-xl font-semibold">
              Bahor-Voyage
            </p>
            <p className="text-sm leading-relaxed">{t('tagline')}</p>
            <p className="text-xs text-neutral-500">
              Founded by Navbakhor Budot
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div className="space-y-4">
            <h3 className="text-white text-xs font-semibold uppercase tracking-widest">
              {t('nav_title')}
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm hover:text-white transition-colors"
              >
                {tNav('home')}
              </Link>
              <Link
                href="/circuits"
                className="text-sm hover:text-white transition-colors"
              >
                {tNav('circuits')}
              </Link>
              <Link
                href="/contact"
                className="text-sm hover:text-white transition-colors"
              >
                {tNav('contact')}
              </Link>
              <Link
                href="/about"
                className="text-sm hover:text-white transition-colors"
              >
                {tNav('about')}
              </Link>
            </nav>
          </div>

          {/* Column 3 — Contact */}
          <div className="space-y-4">
            <h3 className="text-white text-xs font-semibold uppercase tracking-widest">
              {t('contact_title')}
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:contact@bahor-voyage.com"
                className="block hover:text-white transition-colors"
              >
                contact@bahor-voyage.com
              </a>
              <a
                href="https://wa.me/33600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                WhatsApp
              </a>
              <p>Lyon, France</p>
              <p className="text-xs text-neutral-500 leading-relaxed pt-1">
                {t('address_note')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-neutral-700 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>© 2025 Bahor-Voyage</p>
          <Link
            href="/mentions-legales"
            className="hover:text-neutral-300 transition-colors"
          >
            {t('legal')}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

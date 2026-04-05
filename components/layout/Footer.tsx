import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-charcoal-900 text-charcoal-100">
      <div className="max-w-content mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-2xl text-white">Bahor-Voyage</p>
            <p className="font-sans text-body-md text-charcoal-100 italic mt-3 max-w-xs">
              {t('tagline')}
            </p>
            <div className="w-12 h-px bg-gold mt-6 mb-6" />
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/bahorcouture.bahorcouture"
                className="text-charcoal-200 hover:text-gold transition-colors duration-300"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3 className="text-label uppercase tracking-[0.12em] text-charcoal-200 mb-6">
              {t('nav_title')}
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-charcoal-200 hover:text-white transition-colors duration-300 leading-loose"
              >
                {tNav('home')}
              </Link>
              <Link
                href="/circuits"
                className="text-sm text-charcoal-200 hover:text-white transition-colors duration-300 leading-loose"
              >
                {tNav('circuits')}
              </Link>
              <Link
                href="/contact"
                className="text-sm text-charcoal-200 hover:text-white transition-colors duration-300 leading-loose"
              >
                {tNav('contact')}
              </Link>
              <Link
                href="/about"
                className="text-sm text-charcoal-200 hover:text-white transition-colors duration-300 leading-loose"
              >
                {tNav('about')}
              </Link>
            </nav>
          </div>

          {/* Column 3 — Voyages */}
          <div>
            <h3 className="text-label uppercase tracking-[0.12em] text-charcoal-200 mb-6">
              Voyages
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/circuits/samarcande-boukhara"
                className="text-sm text-charcoal-200 hover:text-white transition-colors duration-300 leading-loose"
              >
                Samarcande & Boukhara
              </Link>
              <Link
                href="/circuits/voyage-solidaire-11j"
                className="text-sm text-charcoal-200 hover:text-white transition-colors duration-300 leading-loose"
              >
                Voyage Solidaire
              </Link>
              <Link
                href="/circuits/immersion-totale-14j"
                className="text-sm text-charcoal-200 hover:text-white transition-colors duration-300 leading-loose"
              >
                Immersion Totale
              </Link>
            </nav>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="text-label uppercase tracking-[0.12em] text-charcoal-200 mb-6">
              {t('contact_title')}
            </h3>
            <div className="border-l-2 border-primary-400 pl-4 space-y-3 text-sm">
              <p className="text-charcoal-200">
                12 Place Ambroise Courtois
                <br />
                69008 Lyon, France
              </p>
              <a
                href="mailto:contact@bahor-voyage.com"
                className="block text-charcoal-200 hover:text-white transition-colors duration-300"
              >
                contact@bahor-voyage.com
              </a>
              <a
                href="tel:+33611555763"
                className="block text-charcoal-200 hover:text-white transition-colors duration-300"
              >
                +33 6 11 55 57 63
              </a>
              <p className="text-charcoal-200 text-xs leading-relaxed pt-1">
                {t('address_note')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-charcoal-400">
          <p>&copy; 2026 Bahor-Voyage</p>
          <Link
            href="/mentions-legales"
            className="hover:text-white transition-colors duration-300"
          >
            {t('legal')}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

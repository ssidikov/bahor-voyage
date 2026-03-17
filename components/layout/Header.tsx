'use client';

import { Fragment, useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import type { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

const NAV_LINKS = [
  { key: 'circuits', href: '/circuits' },
  { key: 'contact', href: '/contact' },
  { key: 'about', href: '/about' },
] as const;

const LOCALES: Locale[] = ['fr', 'en'];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (locale: Locale) => {
    router.replace(pathname, { locale });
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-container-pad flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-primary font-semibold text-xl tracking-tight"
        >
          Bahor-Voyage
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="text-sm font-medium text-neutral-600 hover:text-primary transition-colors"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Language switcher */}
          <div className="flex items-center gap-1 text-sm select-none">
            {LOCALES.map((locale, idx) => (
              <Fragment key={locale}>
                {idx > 0 && (
                  <span className="text-neutral-300" aria-hidden>
                    |
                  </span>
                )}
                <button
                  onClick={() => switchLocale(locale)}
                  className={
                    locale === currentLocale
                      ? 'text-primary font-semibold underline decoration-2 underline-offset-2'
                      : 'text-neutral-400 hover:text-primary transition-colors'
                  }
                  aria-label={`Switch to ${locale.toUpperCase()}`}
                >
                  {locale.toUpperCase()}
                </button>
              </Fragment>
            ))}
          </div>

          {/* CTA — desktop only */}
          <Link
            href="/booking"
            className="hidden md:inline-flex items-center bg-primary text-white px-4 py-2 rounded-pill text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            {t('book_cta')}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-6 h-6"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-full bg-neutral-700 transition-transform origin-center duration-200 ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-neutral-700 transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-neutral-700 transition-transform origin-center duration-200 ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white">
          <nav className="flex flex-col px-container-pad py-4 gap-1">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="py-2.5 text-sm font-medium text-neutral-700 hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t(key)}
              </Link>
            ))}
            <Link
              href="/booking"
              className="mt-3 bg-primary text-white px-4 py-2.5 rounded-pill text-sm font-medium text-center hover:bg-primary-dark transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t('book_cta')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;

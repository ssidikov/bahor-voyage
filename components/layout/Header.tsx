'use client';

import { Fragment, useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import type { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

const NAV_LINKS = [
  { key: 'circuits', href: '/circuits' },
  { key: 'projects', href: '/projects' },
  { key: 'contact', href: '/contact' },
  { key: 'about', href: '/about' },
] as const;

const LOCALES: Locale[] = ['fr', 'en'];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (locale: Locale) => {
    const cleanPath = LOCALES.reduce<string>((p, loc) => {
      if (p === `/${loc}`) return '/';
      if (p.startsWith(`/${loc}/`)) return p.slice(loc.length + 1);
      return p;
    }, pathname);
    router.replace(cleanPath, { locale });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-sand-50/95 backdrop-blur-md border-b border-sand-200'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div
        className={`max-w-[75rem] mx-auto px-6 md:px-10 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-16 md:h-[72px]' : 'h-20 md:h-24'
        }`}
      >
        {/* Logo */}
        <Link href="/" aria-label="Bahor-Voyage — Accueil">
          <Image
            src="/logo/bahor-voyage-logo-header.svg"
            alt="Bahor-Voyage"
            width={375}
            height={375}
            priority
            className={`w-auto transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              scrolled ? 'h-8 md:h-9' : 'h-16 md:h-20'
            } ${
              scrolled
                ? '[filter:brightness(0)_saturate(100%)_invert(60%)_sepia(16%)_saturate(2234%)_hue-rotate(136deg)_brightness(95%)_contrast(88%)]'
                : 'drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]'
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={`link-premium text-label-lg uppercase tracking-[0.1em] font-medium transition-colors duration-300 ${
                scrolled
                  ? 'text-charcoal-500 hover:text-primary-400'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-5">
          {/* Language switcher */}
          <div className="flex items-center gap-1.5 text-label-lg select-none tracking-[0.05em]">
            {LOCALES.map((locale, idx) => (
              <Fragment key={locale}>
                {idx > 0 && (
                  <span
                    className={`transition-colors duration-300 ${
                      scrolled ? 'text-charcoal-200' : 'text-white/30'
                    }`}
                    aria-hidden
                  >
                    |
                  </span>
                )}
                <button
                  onClick={() => switchLocale(locale)}
                  className={`transition-colors duration-300 ${
                    locale === currentLocale
                      ? scrolled
                        ? 'text-primary-400 font-semibold'
                        : 'text-white font-semibold'
                      : scrolled
                        ? 'text-charcoal-300 hover:text-primary-400'
                        : 'text-white/50 hover:text-white'
                  }`}
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
            className={`hidden md:inline-flex items-center rounded-pill text-label-lg uppercase tracking-[0.08em] font-medium transition-all duration-300 px-6 py-2.5 ${
              scrolled
                ? 'bg-primary-400 text-white hover:bg-primary-500'
                : 'border border-white/60 text-white hover:bg-white hover:text-primary-600'
            }`}
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
              className={`block h-[1.5px] w-full transition-all origin-center duration-300 ${
                scrolled ? 'bg-charcoal-700' : 'bg-white'
              } ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}
            />
            <span
              className={`block h-[1.5px] w-full transition-all duration-300 ${
                scrolled ? 'bg-charcoal-700' : 'bg-white'
              } ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-[1.5px] w-full transition-all origin-center duration-300 ${
                scrolled ? 'bg-charcoal-700' : 'bg-white'
              } ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu — full screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 top-0 z-40 bg-sand-50 md:hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-6 w-8 h-8 flex items-center justify-center text-charcoal-600"
              aria-label="Close menu"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-6 h-6"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <nav className="flex flex-col justify-center h-full px-10 gap-6">
              <Link
                href="/"
                className="font-serif text-display-md text-charcoal-700 hover:text-primary-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('home')}
              </Link>
              {NAV_LINKS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="font-serif text-display-md text-charcoal-700 hover:text-primary-400 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
              <div className="divider-gold mt-4 mb-2" />
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-primary-400 text-white px-8 py-3.5 rounded-pill text-label-lg uppercase tracking-[0.08em] font-medium hover:bg-primary-500 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('book_cta')}
              </Link>

              {/* Language switcher in mobile */}
              <div className="flex items-center gap-3 mt-4">
                {LOCALES.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => switchLocale(locale)}
                    className={`text-label-lg uppercase tracking-[0.1em] transition-colors ${
                      locale === currentLocale
                        ? 'text-primary-400 font-semibold'
                        : 'text-charcoal-300 hover:text-primary-400'
                    }`}
                  >
                    {locale.toUpperCase()}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;

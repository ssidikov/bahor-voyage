'use client';

import { Fragment, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import Button from '@/components/ui/Button';
import { Link, usePathname } from '@/i18n/navigation';
import { useRouter } from 'next/navigation';
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
  const t = useTranslations('nav');
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (locale: Locale) => {
    const cleanPath = LOCALES.reduce<string>((p, loc) => {
      if (p === `/${loc}`) return '/';
      if (p.startsWith(`/${loc}/`)) return p.slice(loc.length + 1);
      return p;
    }, pathname);

    const newPath =
      locale === 'fr'
        ? cleanPath
        : `/${locale}${cleanPath === '/' ? '' : cleanPath}`;

    router.push(newPath);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#fafafa] print:hidden"
      >
        <div className="max-w-content mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-18">
          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="Bahor-Voyage — Accueil"
            className="shrink-0"
          >
            <Image
              src="/logo/bahor-voyage.svg"
              alt="Bahor-Voyage"
              width={375}
              height={375}
              priority
              quality={100}
              className="h-9 md:h-10 w-auto"
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="px-4 py-2 rounded-full text-[0.8rem] font-medium tracking-[0.06em] text-charcoal-500 hover:text-primary hover:bg-primary/5 transition-colors duration-200"
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language switcher */}
            <div className="flex items-center gap-1 rounded-full border border-charcoal-100 px-3 py-1.5 text-[0.7rem] font-medium tracking-[0.08em] select-none">
              {LOCALES.map((locale, idx) => (
                <Fragment key={locale}>
                  {idx > 0 && (
                    <span className="text-charcoal-200 px-0.5" aria-hidden>
                      /
                    </span>
                  )}
                  <button
                    onClick={() => switchLocale(locale)}
                    className={`cursor-pointer transition-colors duration-200 ${
                      locale === currentLocale
                        ? 'text-primary font-semibold'
                        : 'text-charcoal-400 hover:text-charcoal-600'
                    }`}
                    aria-label={`Switch to ${locale.toUpperCase()}`}
                  >
                    {locale.toUpperCase()}
                  </button>
                </Fragment>
              ))}
            </div>

            {/* CTAs — desktop */}
            <Button
              href="/circuits"
              variant="outline"
              className="hidden md:inline-flex text-[0.75rem] font-medium tracking-[0.05em] px-4 py-2"
            >
              {t('circuits')}
            </Button>

            <Button
              href="/booking"
              variant="primary"
              className="hidden md:inline-flex text-[0.75rem] font-medium tracking-[0.05em] px-5 py-2.5"
            >
              {t('book_cta')}
            </Button>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer rounded-full hover:bg-charcoal-50 transition-colors p-1.5"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] w-full bg-charcoal-700 origin-center"
              />
              <motion.span
                animate={
                  menuOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.15 }}
                className="block h-[1.5px] w-full bg-charcoal-700"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] w-full bg-charcoal-700 origin-center"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[linear-gradient(160deg,#fdfcfa_0%,#f7f2ea_100%)] md:hidden"
          >
            {/* Close */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-100 bg-white text-charcoal-600 cursor-pointer"
              aria-label="Close menu"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-5 h-5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>

            <nav className="flex h-full flex-col justify-center gap-5 px-8">
              {[{ key: 'home', href: '/' }, ...NAV_LINKS].map(
                ({ key, href }, idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.15 + idx * 0.07,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={href}
                      className="font-serif text-display-md text-charcoal-700 hover:text-primary transition-colors block"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t(key)}
                    </Link>
                  </motion.div>
                ),
              )}

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="h-px bg-gold/30 my-2 origin-left"
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Button
                  href="/booking"
                  variant="primary"
                  className="text-sm px-8 py-3"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('book_cta')}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-4 mt-2"
              >
                {LOCALES.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => switchLocale(locale)}
                    className={`text-sm uppercase tracking-widest transition-colors cursor-pointer ${
                      locale === currentLocale
                        ? 'text-primary font-semibold'
                        : 'text-charcoal-400 hover:text-primary'
                    }`}
                  >
                    {locale.toUpperCase()}
                  </button>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;

'use client';

import { Fragment, useEffect, useState } from 'react';

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

function MagneticLink({
  children,
  href,
  className,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    </motion.div>
  );
}

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

    const newPath =
      locale === 'fr'
        ? cleanPath
        : `/${locale}${cleanPath === '/' ? '' : cleanPath}`;

    router.push(newPath);
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-700 print:hidden ${
        scrolled
          ? 'bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] rounded-2xl'
          : 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-2xl'
      }`}
    >
      <div
        className={`max-w-content mx-auto px-5 md:px-8 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-16 md:h-18' : 'h-18 md:h-22'
        }`}
      >
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link href="/" aria-label="Bahor-Voyage — Accueil">
            <Image
              src="/logo/bahor-voyage.svg"
              alt="Bahor-Voyage"
              width={375}
              height={375}
              priority
              quality={100}
              className={`w-auto transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                scrolled ? 'h-8 md:h-9' : 'h-14 md:h-18'
              }`}
            />
          </Link>
        </motion.div>

        {/* Desktop nav — pill style */}
        <nav className="hidden md:flex items-center gap-1 px-2 py-1.5">
          {NAV_LINKS.map(({ key, href }) => (
            <MagneticLink
              key={key}
              href={href}
              className="relative rounded-full px-4 py-2 text-[0.8rem] uppercase tracking-[0.14em] font-medium text-charcoal-600 hover:text-primary transition-colors duration-300"
            >
              {t(key)}
            </MagneticLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language switcher */}
          <div className="flex items-center gap-1.5 rounded-full border border-charcoal-100/70 px-3 py-2 text-[0.75rem] select-none tracking-[0.06em]">
            {LOCALES.map((locale, idx) => (
              <Fragment key={locale}>
                {idx > 0 && (
                  <span className="text-charcoal-200" aria-hidden>
                    |
                  </span>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => switchLocale(locale)}
                  className={`transition-colors duration-300 cursor-pointer ${
                    locale === currentLocale
                      ? 'text-primary font-semibold'
                      : 'text-charcoal-400 hover:text-primary'
                  }`}
                  aria-label={`Switch to ${locale.toUpperCase()}`}
                >
                  {locale.toUpperCase()}
                </motion.button>
              </Fragment>
            ))}
          </div>

          {/* CTA — desktop only */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:block"
          >
            <Button
              href="/booking"
              variant="primary"
              className="text-[0.75rem] uppercase tracking-widest px-5 py-2.5 shadow-[0_8px_24px_rgba(47,110,115,0.2)]"
            >
              {t('book_cta')}
            </Button>
          </motion.div>

          {/* Hamburger — mobile only */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden flex flex-col justify-center gap-1.5 w-7 h-7 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block h-[1.5px] w-full bg-charcoal-700 origin-center"
            />
            <motion.span
              animate={
                menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              className="block h-[1.5px] w-full bg-charcoal-700"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block h-[1.5px] w-full bg-charcoal-700 origin-center"
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile menu — full screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 z-40 bg-[radial-gradient(circle_at_20%_10%,rgba(47,110,115,0.08),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(200,169,110,0.12),transparent_28%),linear-gradient(180deg,#fffdfa_0%,#fdfbf7_55%,#f7f2ea_100%)] md:hidden"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-100 bg-white/90 text-charcoal-600 shadow-sm cursor-pointer"
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

            <nav className="flex h-full flex-col justify-center gap-6 px-8">
              {[{ key: 'home', href: '/' }, ...NAV_LINKS].map(
                ({ key, href }, idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.2 + idx * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={href}
                      className="font-serif text-display-md text-charcoal-700 transition-colors hover:text-primary block"
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
                transition={{ delay: 0.6, duration: 0.5 }}
                className="divider-gold mt-4 mb-2 origin-left"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Button
                  href="/booking"
                  variant="primary"
                  className="inline-flex justify-center text-label-lg uppercase tracking-[0.08em] px-8 py-3.5 shadow-[0_14px_32px_rgba(47,110,115,0.22)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('book_cta')}
                </Button>
              </motion.div>

              {/* Language switcher in mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4 mt-4"
              >
                {LOCALES.map((locale) => (
                  <motion.button
                    key={locale}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => switchLocale(locale)}
                    className={`text-label-lg uppercase tracking-widest transition-colors cursor-pointer ${
                      locale === currentLocale
                        ? 'text-primary font-semibold'
                        : 'text-charcoal-400 hover:text-primary'
                    }`}
                  >
                    {locale.toUpperCase()}
                  </motion.button>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;

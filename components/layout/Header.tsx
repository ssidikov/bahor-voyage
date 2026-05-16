'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import Button from '@/components/ui/Button';
import { Link, usePathname } from '@/i18n/navigation';
import { useRouter } from 'next/navigation';
import type { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'circuits', href: '/circuits' },
  { key: 'projects', href: '/projects' },
  { key: 'contact', href: '/contact' },
  { key: 'about', href: '/about' },
] as const;

const LOCALES: Locale[] = ['fr', 'en'];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('nav');
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const menuLabels =
    currentLocale === 'fr'
      ? {
          open: 'Ouvrir le menu de navigation',
          close: 'Fermer le menu de navigation',
          dialog: 'Menu de navigation',
        }
      : {
          open: 'Open navigation menu',
          close: 'Close navigation menu',
          dialog: 'Navigation menu',
        };

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false);
    if (restoreFocus) {
      window.setTimeout(() => menuButtonRef.current?.focus(), 0);
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, menuOpen]);

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !menuPanelRef.current) return;

    const focusable = Array.from(
      menuPanelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      ),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

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
    closeMenu(false);
  };

  const isActiveHref = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 bg-[#fafafa]/95 backdrop-blur-sm border-b border-charcoal-100/40 print:hidden"
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
            {NAV_LINKS.map(({ key, href }) => {
              const isActive = isActiveHref(href);
              return (
                <Link
                  key={key}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-4 py-2 rounded-full text-[0.8rem] font-medium tracking-[0.06em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-charcoal-500 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
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
            <div className="hidden md:contents">
              <Button
                href="/circuits"
                variant="outline"
                className="text-[0.75rem] font-medium tracking-[0.05em] px-4 py-2"
              >
                {t('circuits')}
              </Button>

              <Button
                href="/booking"
                variant="primary"
                className="text-[0.75rem] font-medium tracking-[0.05em] px-5 py-2.5"
              >
                {t('book_cta')}
              </Button>
            </div>

            {/* Hamburger — mobile */}
            <button
              ref={menuButtonRef}
              className="md:hidden flex flex-col justify-center gap-1.5 w-11 h-11 cursor-pointer rounded-full hover:bg-charcoal-50 transition-colors p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? menuLabels.close : menuLabels.open}
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
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label={menuLabels.dialog}
            onKeyDown={handleMenuKeyDown}
          >
            {/* Close */}
            <motion.button
              ref={closeButtonRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              onClick={() => closeMenu()}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-charcoal-100 bg-white text-charcoal-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              aria-label={menuLabels.close}
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
              {NAV_LINKS.map(({ key, href }, idx) => {
                const isActive = isActiveHref(href);
                return (
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
                      aria-current={isActive ? 'page' : undefined}
                      className={`font-serif text-display-md hover:text-primary transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-lg ${
                        isActive ? 'text-primary' : 'text-charcoal-700'
                      }`}
                      onClick={() => closeMenu()}
                    >
                      {t(key)}
                    </Link>
                  </motion.div>
                );
              })}

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
                  onClick={() => closeMenu()}
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
                    className={`min-h-11 min-w-11 rounded-full text-sm uppercase tracking-widest transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ${
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

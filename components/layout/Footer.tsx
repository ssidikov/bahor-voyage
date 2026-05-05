'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

const footerLinks = {
  nav: [
    { key: 'home', href: '/' },
    { key: 'circuits', href: '/circuits' },
    { key: 'contact', href: '/contact' },
    { key: 'about', href: '/about' },
  ],
  voyages: [
    { label: 'Samarcande & Boukhara', href: '/circuits/samarcande-boukhara' },
    { label: 'Voyage Solidaire', href: '/circuits/voyage-solidaire-11j' },
    { label: 'Immersion Totale', href: '/circuits/immersion-totale-14j' },
  ],
};

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="relative bg-charcoal-900 text-white/80 print:hidden overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(47,110,115,0.12),transparent_40%),radial-gradient(circle_at_85%_85%,rgba(200,169,110,0.08),transparent_35%)] pointer-events-none" />

      <div className="relative max-w-content mx-auto px-6 md:px-10 pt-20 pb-10">
        {/* Top section — brand + newsletter feel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 pb-12 border-b border-white/8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="font-serif text-4xl text-white">Bahor-Voyage</p>
              <p className="font-sans text-body-md text-white/50 italic mt-3 max-w-md">
                {t('tagline')}
              </p>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.facebook.com/bahorcouture.bahorcouture"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/25 hover:bg-white/10 transition-colors duration-300"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4.5 h-4.5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1 — Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-[0.7rem] uppercase tracking-[0.14em] text-white/40 font-medium mb-5">
              {t('nav_title')}
            </h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.nav.map(({ key, href }) => (
                <motion.div
                  key={key}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {tNav(key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Column 2 — Voyages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-[0.7rem] uppercase tracking-[0.14em] text-white/40 font-medium mb-5">
              Voyages
            </h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.voyages.map(({ label, href }) => (
                <motion.div
                  key={href}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Column 3 — Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <h3 className="text-[0.7rem] uppercase tracking-[0.14em] text-white/40 font-medium mb-5">
              {t('contact_title')}
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-white/60">
                12 Place Ambroise Courtois
                <br />
                69008 Lyon, France
              </p>
              <motion.a
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                href="mailto:contact@bahor-voyage.com"
                className="block text-white/60 hover:text-white transition-colors duration-300"
              >
                contact@bahor-voyage.com
              </motion.a>
              <motion.a
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                href="tel:+33611555763"
                className="block text-white/60 hover:text-white transition-colors duration-300"
              >
                +33 6 11 55 57 63
              </motion.a>
              <p className="text-white/40 text-xs leading-relaxed pt-2">
                {t('address_note')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40"
        >
          <p>&copy; 2026 Bahor-Voyage</p>
          <Link
            href="/mentions-legales"
            className="hover:text-white/70 transition-colors duration-300"
          >
            {t('legal')}
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;

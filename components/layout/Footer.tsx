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
    <footer className="relative bg-white border-t border-charcoal-100/50 print:hidden">
      <div className="relative max-w-content mx-auto px-6 md:px-10 pt-20 pb-10">
        {/* Top section — brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 pb-12 border-b border-charcoal-100/50"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="font-serif text-4xl text-charcoal-700">
                Bahor-Voyage
              </p>
              <p className="font-sans text-body-md text-charcoal-400 italic mt-3 max-w-md">
                {t('tagline')}
              </p>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.facebook.com/bahorcouture.bahorcouture"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-charcoal-100/70 bg-[#fafafa] text-charcoal-400 hover:text-charcoal-700 hover:border-charcoal-200 transition-colors duration-300"
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
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/esprit_ouzbekistan"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-charcoal-100/70 bg-[#fafafa] text-charcoal-400 hover:text-charcoal-700 hover:border-charcoal-200 transition-colors duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/company/association-france-ouzb%C3%A9kistan-racines/"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-charcoal-100/70 bg-[#fafafa] text-charcoal-400 hover:text-charcoal-700 hover:border-charcoal-200 transition-colors duration-300"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
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
            <h3 className="text-[0.7rem] uppercase tracking-[0.14em] text-charcoal-400 font-medium mb-5">
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
                    className="text-sm text-charcoal-500 hover:text-charcoal-700 transition-colors duration-300"
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
            <h3 className="text-[0.7rem] uppercase tracking-[0.14em] text-charcoal-400 font-medium mb-5">
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
                    className="text-sm text-charcoal-500 hover:text-charcoal-700 transition-colors duration-300"
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
            <h3 className="text-[0.7rem] uppercase tracking-[0.14em] text-charcoal-400 font-medium mb-5">
              {t('contact_title')}
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-charcoal-500">
                12 Place Ambroise Courtois
                <br />
                69008 Lyon, France
              </p>
              <motion.a
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                href="mailto:contact@bahorvoyage.com"
                className="block text-charcoal-500 hover:text-charcoal-700 transition-colors duration-300"
              >
                contact@bahorvoyage.com
              </motion.a>
              <motion.a
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                href="tel:+33611555763"
                className="block text-charcoal-500 hover:text-charcoal-700 transition-colors duration-300"
              >
                +33 6 11 55 57 63
              </motion.a>
              <p className="text-charcoal-400 text-xs leading-relaxed pt-2">
                {t('address_note')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-[#fafafa] border-t border-charcoal-100/50 px-6 md:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-charcoal-400"
      >
        <p>&copy; 2026 Bahor-Voyage</p>
        <p>
          {t('developed_by')}{' '}
          <a
            href="https://www.sidikoff.com"
            target="_blank"
            rel="noopener noreferrer"
            title="SIDIKOFF DIGITAL — Web Design & Development Agency"
            className="font-medium text-charcoal-500 hover:text-charcoal-700 transition-colors duration-300 tracking-wide"
          >
            SIDIKOFF DIGITAL
          </a>
        </p>
        <Link
          href="/mentions-legales"
          className="hover:text-charcoal-600 transition-colors duration-300"
        >
          {t('legal')}
        </Link>
      </motion.div>
    </footer>
  );
}

export default Footer;

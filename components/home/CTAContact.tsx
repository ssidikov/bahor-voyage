'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui';
import { fadeUp, staggerContainer } from '@/lib/animations';

export function CTAContact() {
  const t = useTranslations('home');
  const [email, setEmail] = useState('');

  return (
    <section className="relative bg-[#fafafa] py-20 md:py-28 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* ── LEFT: big heading + subtitle ── */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary/40" />
              <p className="text-label uppercase tracking-[0.15em] text-primary-400">
                Bahor-Voyage
              </p>
            </div>

            <h2 className="font-serif text-display-lg text-charcoal-700 font-light leading-tight">
              {t('cta_title')}
            </h2>

            <div className="w-14 h-px bg-gold my-8" />

            {/* Contact buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                href="mailto:contact@bahor-voyage.com"
                variant="primary"
                size="md"
                className="font-medium"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {t('cta_email')}
              </Button>

              <Button
                href="tel:+33611555763"
                variant="outline"
                size="md"
                className="font-medium"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.91 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {t('cta_phone')}
              </Button>

              <Button
                href="https://wa.me/33611555763"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="md"
                className="font-medium"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                {t('cta_whatsapp')}
              </Button>
            </div>
          </motion.div>

          {/* ── RIGHT: newsletter form + contact info ── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-center gap-8"
          >
            {/* Newsletter */}
            <div className="rounded-3xl border border-charcoal-100/70 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <h3 className="font-serif text-2xl text-charcoal-700 font-light mb-2">
                Restez informé
              </h3>
              <p className="font-sans text-body-md text-charcoal-400 mb-6">
                Recevez nos actualités et nouvelles destinations en Ouzbékistan.
              </p>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-3 rounded-full border border-charcoal-100 bg-[#efefef] pl-5 pr-2 py-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-4 h-4 text-charcoal-400 shrink-0"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresse e-mail"
                    className="flex-1 bg-transparent text-sm text-charcoal-700 placeholder:text-charcoal-400 outline-none min-w-0"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setEmail('')}
                  className="bg-primary hover:bg-primary-hover text-white rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 shrink-0"
                >
                  S&rsquo;inscrire
                </button>
              </div>
            </div>

            {/* Address + social */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <p className="text-[0.7rem] uppercase tracking-[0.14em] text-charcoal-400 font-medium mb-3">
                  Adresse
                </p>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  12 Place Ambroise Courtois
                  <br />
                  69008 Lyon, France
                </p>
              </div>
              <div className="flex-1">
                <p className="text-[0.7rem] uppercase tracking-[0.14em] text-charcoal-400 font-medium mb-3">
                  Réseaux
                </p>
                <div className="flex gap-2">
                  {[
                    {
                      href: 'https://www.facebook.com/bahorcouture.bahorcouture',
                      label: 'Facebook',
                      path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
                    },
                  ].map(({ href, label, path }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center justify-center w-10 h-10 rounded-full border border-charcoal-100 text-charcoal-400 hover:text-primary hover:border-primary/30 transition-colors duration-200"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d={path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTAContact;

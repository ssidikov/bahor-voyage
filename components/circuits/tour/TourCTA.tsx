'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { fadeUp, staggerContainer } from '@/lib/animations';

interface TourCTAProps {
  prefix: string;
}

export default function TourCTA({ prefix }: TourCTAProps) {
  const t = useTranslations('circuits');
  const locale = useLocale();

  return (
    <section className="bg-charcoal-800 py-20 md:py-28">
      <div className="max-w-[75rem] mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <div className="divider-gold-center mb-8" />
            <h2 className="font-serif text-display-lg text-white font-light mb-6">
              {t(`${prefix}_cta_title` as Parameters<typeof t>[0])}
            </h2>
            <p className="font-sans text-body-md text-white/60 mb-10 leading-relaxed">
              {t(`${prefix}_cta_body` as Parameters<typeof t>[0])}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3.5 text-[0.78rem] uppercase tracking-[0.12em] font-semibold text-charcoal-800 transition-all duration-300 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-800"
            >
              {t(`${prefix}_cta_contact` as Parameters<typeof t>[0])}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

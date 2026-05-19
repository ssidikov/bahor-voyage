'use client';

import type { ReactNode } from 'react';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui';
import { fadeUp, staggerContainer } from '@/lib/animations';

interface TourCTAProps {
  prefix: string;
  slug: string;
  availableDatesCount: number;
}

export default function TourCTA({
  prefix,
  slug,
  availableDatesCount,
}: TourCTAProps) {
  const t = useTranslations('circuits');

  const sharedWrapper = (children: ReactNode) => (
    <section className="bg-[#fafafa] py-6">
      <div className="mx-2 rounded-3xl overflow-hidden bg-charcoal-800">
        <div className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <div className="divider-gold-center mb-8" />
              {children}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  if (availableDatesCount > 0) {
    return sharedWrapper(
      <>
        <h2 className="font-serif text-display-lg text-white font-light mb-6">
          {t(`${prefix}_cta_title` as Parameters<typeof t>[0])}
        </h2>
        <p className="font-sans text-body-md text-white/60 mb-10 leading-relaxed">
          {t(`${prefix}_cta_body` as Parameters<typeof t>[0])}
        </p>
        <Button
          href={`/booking?tour=${slug}`}
          variant="inverted"
          size="lg"
          className="group text-label-lg uppercase tracking-widest"
        >
          {t('page_cta_button_book')}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Button>
      </>,
    );
  }

  return sharedWrapper(
    <>
      <h2 className="font-serif text-display-lg text-white font-light mb-6">
        {t('page_cta_title_soon')}
      </h2>
      <p className="font-sans text-body-md text-white/60 mb-10 leading-relaxed">
        {t('page_cta_body_soon')}
      </p>
      <Button
        href="/contact"
        variant="inverted"
        size="lg"
        className="group text-label-lg uppercase tracking-widest"
      >
        {t('page_cta_button_soon')}
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </Button>
    </>,
  );
}

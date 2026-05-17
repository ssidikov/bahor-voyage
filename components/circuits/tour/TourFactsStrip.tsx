'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeUp, staggerContainer } from '@/lib/animations';
import type { TourFact } from './types';

interface TourFactsStripProps {
  facts: TourFact[];
}

export default function TourFactsStrip({ facts }: TourFactsStripProps) {
  const t = useTranslations('circuits');

  return (
    <section className="bg-white border-b border-sand-200">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-312 mx-auto px-6 md:px-10"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-sand-200">
          {facts.map(({ key, icon }) => (
            <motion.div key={key} variants={fadeUp}>
              <div className="flex items-center gap-3 px-6 py-5 lg:px-10">
                <span className="flex-none" aria-hidden="true">
                  {icon}
                </span>
                <span className="font-sans text-label text-charcoal-500 uppercase tracking-widest">
                  {t(key as Parameters<typeof t>[0])}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

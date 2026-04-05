'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeUp, staggerContainer } from '@/lib/animations';
import type { TourPractical } from './types';

interface TourPracticalsProps {
  prefix: string;
  practicals: TourPractical[];
}

export default function TourPracticals({
  prefix,
  practicals,
}: TourPracticalsProps) {
  const t = useTranslations('circuits');

  return (
    <section className="bg-white py-16 md:py-20 lg:py-section">
      <div className="max-w-[75rem] mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <div className="divider-gold mb-6" />
            <h2 className="font-serif text-display-lg text-charcoal-700 font-light">
              {t(`${prefix}_practical_title` as Parameters<typeof t>[0])}
            </h2>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {practicals.map(({ key, icon }) => (
              <motion.li
                key={key}
                variants={fadeUp}
                className="flex items-center gap-5 rounded-xl p-6"
                style={{
                  background: 'rgba(200,160,80,0.04)',
                  border: '1px solid rgba(200,160,80,0.15)',
                }}
              >
                <span
                  className="flex-none mt-0.5 flex items-center justify-center w-11 h-11 rounded-full"
                  style={{
                    background: 'rgba(200,160,80,0.10)',
                    border: '1px solid rgba(200,160,80,0.25)',
                  }}
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <p className="font-sans text-body-sm text-charcoal-500 leading-relaxed">
                  {t(key as Parameters<typeof t>[0])}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}

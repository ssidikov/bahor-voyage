'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { slideLeft, slideRight, staggerContainer } from '@/lib/animations';

function CheckIcon({ included }: { included: boolean }) {
  return included ? (
    <span
      aria-hidden="true"
      className="flex-none w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
      style={{
        background: 'rgba(200,160,80,0.12)',
        border: '1px solid rgba(200,160,80,0.35)',
      }}
    >
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path
          d="M1.5 4.5l2 2 4-4"
          stroke="#C8A050"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  ) : (
    <span
      aria-hidden="true"
      className="flex-none w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
      style={{
        background: 'rgba(100,100,100,0.06)',
        border: '1px solid rgba(100,100,100,0.15)',
      }}
    >
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <line
          x1="2.5"
          y1="4.5"
          x2="6.5"
          y2="4.5"
          stroke="#888"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

interface TourIncludesProps {
  prefix: string;
  includes: readonly string[];
  excludes: readonly string[];
}

export default function TourIncludes({
  prefix,
  includes,
  excludes,
}: TourIncludesProps) {
  const t = useTranslations('circuits');

  return (
    <section className="bg-sand-100 py-16 md:py-20 lg:py-section">
      <div className="max-w-[75rem] mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Includes */}
          <motion.div variants={slideRight}>
            <div className="divider-gold mb-6" />
            <h2 className="font-serif text-display-md text-charcoal-700 font-light mb-8">
              {t(`${prefix}_includes_title` as Parameters<typeof t>[0])}
            </h2>
            <ul className="space-y-4">
              {includes.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-3 font-sans text-body-md text-charcoal-500"
                >
                  <CheckIcon included={true} />
                  <span>
                    {t(`${prefix}_${key}` as Parameters<typeof t>[0])}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Excludes */}
          <motion.div variants={slideLeft}>
            <div className="divider-gold mb-6" />
            <h2 className="font-serif text-display-md text-charcoal-700 font-light mb-8">
              {t(`${prefix}_excludes_title` as Parameters<typeof t>[0])}
            </h2>
            <ul className="space-y-4">
              {excludes.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-3 font-sans text-body-md text-charcoal-400"
                >
                  <CheckIcon included={false} />
                  <span>
                    {t(`${prefix}_${key}` as Parameters<typeof t>[0])}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

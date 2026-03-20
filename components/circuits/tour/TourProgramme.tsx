'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
} from '@/lib/animations';
import type { TourDay } from './types';

interface TourProgrammeProps {
  prefix: string;
  days: TourDay[];
}

export default function TourProgramme({ prefix, days }: TourProgrammeProps) {
  const t = useTranslations('circuits');

  return (
    <section className="bg-white py-16 md:py-20 lg:py-section overflow-hidden">
      <div className="max-w-[75rem] mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mb-16 md:mb-20 text-center"
        >
          <motion.div variants={fadeUp}>
            <div className="divider-gold-center mb-8" />
            <h2 className="font-serif text-display-lg text-charcoal-700 font-light">
              {t(`${prefix}_programme_title` as Parameters<typeof t>[0])}
            </h2>
          </motion.div>
        </motion.div>

        {/* Days */}
        <div className="space-y-24 lg:space-y-32">
          {days.map((day, idx) => {
            const isReversed = idx % 2 === 1;
            const dayNum = idx + 1;

            return (
              <motion.div
                key={day.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerContainer}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Image */}
                <motion.div
                  variants={isReversed ? slideLeft : slideRight}
                  className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}
                >
                  {/* Polaroid-style photo card */}
                  <div
                    className="bg-white"
                    style={{
                      padding: '10px 10px 0 10px',
                      boxShadow:
                        '0 4px 24px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.08)',
                    }}
                  >
                    {/* Photo */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={day.image}
                        alt={day.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        placeholder="empty"
                      />
                    </div>
                    {/* Caption strip */}
                    <div className="py-5 px-2 text-center">
                      <p
                        className="font-serif text-charcoal-500 italic leading-snug"
                        style={{
                          fontSize: '0.92rem',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {day.imageAlt}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Text */}
                <motion.div
                  variants={isReversed ? slideRight : slideLeft}
                  className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : ''}`}
                >
                  {/* Day number */}
                  <span
                    className="font-serif text-8xl text-gold/15 font-light leading-none block select-none -mb-4"
                    aria-hidden="true"
                  >
                    {dayNum}
                  </span>

                  {/* City badge */}
                  <p className="text-label uppercase tracking-[0.15em] text-primary-400 mb-2">
                    {t(`${prefix}_${day.key}_city` as Parameters<typeof t>[0])}
                  </p>

                  <h3 className="font-serif text-display-md text-charcoal-700 font-light leading-snug">
                    {t(`${prefix}_${day.key}_title` as Parameters<typeof t>[0])}
                  </h3>

                  <div className="w-10 h-px bg-gold my-5" />

                  <p className="font-sans text-body-md text-charcoal-400 leading-relaxed">
                    {t(`${prefix}_${day.key}_body` as Parameters<typeof t>[0])}
                  </p>

                  {/* Highlight chip */}
                  <div className="mt-6 inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-2 rounded-pill">
                    <span className="text-gold text-xs" aria-hidden="true">
                      ★
                    </span>
                    <span className="font-sans text-label text-xs text-charcoal-500 uppercase tracking-[0.1em]">
                      {t(
                        `${prefix}_${day.key}_highlight` as Parameters<
                          typeof t
                        >[0],
                      )}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

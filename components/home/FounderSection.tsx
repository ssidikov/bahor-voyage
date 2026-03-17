'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
} from '@/lib/animations';

export function FounderSection() {
  const t = useTranslations('home');

  return (
    <section className="relative bg-charcoal-800 py-16 md:py-20 lg:py-section overflow-hidden">
      {/* Decorative geometric element — low opacity arabesque star */}
      <div className="absolute top-8 right-8 md:top-12 md:right-16 opacity-5 pointer-events-none">
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          className="w-48 h-48 md:w-72 md:h-72"
        >
          <polygon points="140,10 170,100 260,100 185,150 210,240 140,190 70,240 95,150 20,100 110,100" />
          <polygon
            points="140,40 160,110 230,110 175,145 195,220 140,180 85,220 105,145 50,110 120,110"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      <div className="max-w-[75rem] mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Image — left 5/12 */}
          <motion.div variants={slideRight} className="lg:col-span-5">
            <div
              className="relative aspect-[4/5] overflow-hidden"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.3)',
              }}
            >
              <Image
                src="/images/Navbakhor-BUDOT.jpg"
                alt="Navbakhor Boudot — Fondatrice Bahor-Voyage"
                fill
                className="object-cover"
                placeholder="empty"
              />
            </div>
          </motion.div>

          {/* Text — right 7/12 */}
          <motion.div variants={slideLeft} className="lg:col-span-7 lg:pl-4">
            <p className="text-label uppercase tracking-[0.15em] text-gold mb-4">
              {t('founder_label')}
            </p>
            <h2 className="font-serif text-display-lg text-white font-light leading-snug">
              {t('founder_title')}
            </h2>
            <div className="w-12 h-px bg-gold my-8" />
            <p className="font-sans text-body-md text-charcoal-200 leading-relaxed mb-5">
              {t('founder_body1')}
            </p>
            <p className="font-sans text-body-md text-charcoal-200 leading-relaxed">
              {t('founder_body2')}
            </p>
            <motion.div variants={fadeUp} className="mt-8">
              <p className="font-serif italic text-2xl text-gold">
                {t('founder_name')}
              </p>
              <p className="text-label text-charcoal-400 mt-1 tracking-[0.1em] uppercase">
                Fondatrice, Bahor-Voyage
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FounderSection;

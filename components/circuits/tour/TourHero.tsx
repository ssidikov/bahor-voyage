'use client';

import type { MotionValue } from 'framer-motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { fadeIn, staggerContainer } from '@/lib/animations';
import type { TourFact } from './types';

interface TourHeroProps {
  prefix: string;
  heroImage: string;
  heroParallax: MotionValue<string>;
  facts: TourFact[];
}

export default function TourHero({
  prefix,
  heroImage,
  heroParallax,
  facts,
}: TourHeroProps) {
  const t = useTranslations('circuits');

  return (
    <section className="relative h-[100vh] min-h-[620px] overflow-hidden w-full">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: heroParallax }}
      >
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          quality={100}
          className="object-cover"
          placeholder="empty"
        />
      </motion.div>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-charcoal-900/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 pb-20 md:pb-8 pt-20 md:pt-28 flex flex-col justify-end min-h-full">
        <div className="w-full max-w-[75rem] mx-auto px-4 sm:px-6 md:px-10 min-w-0 overflow-hidden">
          {/* Tag + duration pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="inline-flex items-center mb-6 rounded-pill overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 100%)',
              backdropFilter: 'blur(16px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(16px) saturate(1.6)',
              border: '1px solid rgba(255,255,255,0.20)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(0,0,0,0.28)',
            }}
          >
            <span className="inline-flex items-center gap-2 text-gold text-xs font-sans font-medium uppercase tracking-[0.15em] px-4 py-2">
              {t(`${prefix}_tag` as Parameters<typeof t>[0])}
            </span>
            <span
              aria-hidden="true"
              className="w-px self-stretch bg-white/20"
            />
            <span className="text-white/85 font-sans text-xs uppercase tracking-[0.12em] px-4 py-2">
              {t(`${prefix}_duration` as Parameters<typeof t>[0])}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.25,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-serif text-display-xl text-white font-light max-w-4xl leading-tight"
          >
            {t(`${prefix}_title` as Parameters<typeof t>[0])}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
            className="font-sans text-body-lg text-white/75 mt-5 max-w-2xl leading-relaxed"
          >
            {t(`${prefix}_subtitle` as Parameters<typeof t>[0])}
          </motion.p>

          {/* Price badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
            className="mt-8 inline-flex flex-col"
          >
            <span className="font-serif text-display-lg text-gold font-light leading-none">
              {t(`${prefix}_price` as Parameters<typeof t>[0])}
            </span>
            <span className="font-sans text-xs text-white/55 uppercase tracking-[0.12em] mt-1">
              {t(`${prefix}_price_note` as Parameters<typeof t>[0])}
            </span>
          </motion.div>

          {/* Quick-facts bar */}
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 mt-8 w-full rounded-2xl overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 100%)',
              backdropFilter: 'blur(20px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
              border: '1px solid rgba(255,255,255,0.20)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 32px rgba(0,0,0,0.35)',
            }}
          >
            {facts.map(({ key, icon }, i) => (
              <motion.li
                key={key}
                variants={fadeIn}
                className={[
                  'flex items-center gap-2.5 py-3.5 px-4 sm:py-4 sm:px-5',
                  i % 2 === 1 ? 'border-l border-white/15' : '',
                  i >= 2 && i % 2 === 0 ? 'sm:border-l border-white/15' : '',
                  i >= 2 ? 'border-t border-white/15 sm:border-t-0' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className="flex-none" aria-hidden="true">
                  {icon}
                </span>
                <span className="font-sans text-[10px] sm:text-label sm:text-[12px] text-white/90 uppercase tracking-[0.09em] leading-tight">
                  {t(key as Parameters<typeof t>[0])}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

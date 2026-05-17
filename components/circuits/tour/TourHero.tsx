'use client';

import type { MotionValue } from 'framer-motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface TourHeroProps {
  prefix: string;
  heroImage: string;
  heroParallax: MotionValue<string>;
}

export default function TourHero({
  prefix,
  heroImage,
  heroParallax,
}: TourHeroProps) {
  const t = useTranslations('circuits');

  return (
    <section className="relative bg-[#fafafa] pt-20 md:pt-22 pb-6">
      <div className="mx-2 rounded-3xl overflow-hidden relative h-[72vh] min-h-125">
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

        {/* Overlays */}
        <div className="absolute inset-0 bg-charcoal-900/25" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/75 via-charcoal-900/15 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 md:pb-14 px-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-primary/40" />
            <p className="font-sans text-label uppercase tracking-[0.15em] text-white/70">
              {t(`${prefix}_tag` as Parameters<typeof t>[0])}
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-serif text-display-2xl text-white font-light max-w-3xl"
          >
            {t(`${prefix}_title` as Parameters<typeof t>[0])}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            className="mt-4 max-w-xl text-body-lg text-white/75 font-light"
          >
            {t(`${prefix}_subtitle` as Parameters<typeof t>[0])}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            {/* Duration */}
            <div
              className="inline-flex items-center gap-3 rounded-2xl px-5 py-3.5"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)',
                backdropFilter: 'blur(16px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(16px) saturate(1.6)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 16px rgba(0,0,0,0.22)',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="9" r="7" />
                <polyline points="9 5 9 9 12 11" />
              </svg>
              <span className="font-sans text-sm text-white/85 tracking-wide">
                {t(`${prefix}_duration` as Parameters<typeof t>[0])}
              </span>
            </div>

            {/* Price */}
            <div
              className="inline-flex items-center gap-3 rounded-2xl px-5 py-3.5"
              style={{
                background:
                  'linear-gradient(135deg, rgba(200,160,80,0.20) 0%, rgba(200,160,80,0.08) 100%)',
                backdropFilter: 'blur(16px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(16px) saturate(1.6)',
                border: '1px solid rgba(200,160,80,0.38)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 16px rgba(200,160,80,0.18)',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 1l1.8 3.6L14 5.6l-3 2.9.7 4.1L8 10.5l-3.7 2.1.7-4.1-3-2.9 4.2-.9L8 1z"
                  stroke="#C8A050"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  fill="rgba(200,160,80,0.18)"
                />
              </svg>
              <span className="font-serif text-[1.05rem] leading-none text-gold">
                {t(`${prefix}_price` as Parameters<typeof t>[0])}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.85, ease: 'easeOut' }}
            className="w-14 h-px bg-gold mt-8 origin-left"
          />
        </div>
      </div>
    </section>
  );
}

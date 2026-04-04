'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import Button from '@/components/ui/Button';

export function HeroSection() {
  const t = useTranslations('home');
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], ['0%', '25%']);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-svh min-h-150 overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 scale-110"
          style={{ y: backgroundY }}
        >
          <Image
            src="/images/afor-voyage.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            placeholder="empty"
          />
        </motion.div>
      </div>

      {/* Dual overlay — cinematic depth */}
      <div className="absolute inset-0 bg-charcoal-900/25" />
      <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent" />

      {/* Content — editorial bottom-left positioning */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 pb-20 md:pb-28 lg:pb-32"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-content mx-auto px-6 md:px-10">
          {/* Eyebrow label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="font-sans text-label uppercase tracking-[0.15em] text-white/70 mb-4"
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-serif text-display-2xl text-white font-light max-w-6xl"
          >
            {t('hero_title')}
          </motion.h1>

          {/* Gold ornament line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
            className="w-16 h-px bg-gold mt-8 mb-6 origin-left"
          />

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
          >
            <Button
              href="/#circuits"
              variant="inverted"
              size="lg"
              className="group text-label-lg uppercase tracking-widest"
            >
              {t('hero_cta')}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — static mouse icon */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        aria-hidden="true"
      >
        <svg
          width="22"
          height="34"
          viewBox="0 0 22 34"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="1" y="1" width="20" height="32" rx="10" />
          <line x1="11" y1="8" x2="11" y2="13" stroke="rgba(255,255,255,0.7)" />
        </svg>
        <span className="text-label text-white/40 uppercase tracking-[0.15em]">
          {t.raw('hero_cta') === 'Découvrir' ? 'Défiler' : 'Scroll'}
        </span>
      </div>
    </section>
  );
}

export default HeroSection;

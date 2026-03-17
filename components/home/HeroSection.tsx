'use client';

import { useState } from 'react';

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function HeroSection() {
  const t = useTranslations('home');
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], ['0%', '25%']);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 100);
  });

  return (
    <section className="relative h-svh min-h-[600px] overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent" />

      {/* Content — editorial bottom-left positioning */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 pb-20 md:pb-28 lg:pb-32"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-[75rem] mx-auto px-6 md:px-10">
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
            <a
              href="#circuits"
              className="group inline-flex items-center gap-3 border border-white/60 text-white rounded-pill px-8 py-3.5 text-label-lg uppercase tracking-[0.1em] font-medium hover:bg-white hover:text-primary-600 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {t('hero_cta')}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      >
        <span className="text-label text-white/50 uppercase tracking-[0.15em]">
          {t.raw('hero_cta') === 'Découvrir' ? 'Défiler' : 'Scroll'}
        </span>
        <motion.div className="w-px bg-white/40 overflow-hidden">
          <motion.div
            className="w-full bg-white/80"
            animate={{ height: ['0px', '60px', '0px'] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;

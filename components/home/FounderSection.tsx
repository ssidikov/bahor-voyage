'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/components/ui';
import { fadeUp, staggerContainer } from '@/lib/animations';

export function FounderSection() {
  const t = useTranslations('home');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#fafafa] py-6 overflow-hidden"
    >
      {/* ── Full-bleed rounded card with image background (Figma "Popular Tourist" style) ── */}
      <div className="mx-2 rounded-3xl overflow-hidden relative min-h-[70vh]">
        {/* Background image parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: backgroundScale }}
        >
          <Image
            src="/images/afor-voyage.jpg"
            alt=""
            fill
            quality={90}
            className="object-cover object-center"
          />
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-charcoal-900/70" />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal-900/80 via-charcoal-900/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 min-h-[70vh]">
          {/* Left: text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-7 flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 md:py-20"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-gold" />
              <p className="text-label uppercase tracking-[0.15em] text-gold">
                {t('founder_label')}
              </p>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-display-lg text-white font-light leading-snug max-w-xl"
            >
              {t('founder_title')}
            </motion.h2>

            <motion.div variants={fadeUp} className="w-12 h-px bg-gold my-8" />

            <motion.p
              variants={fadeUp}
              className="font-sans text-body-md text-white/75 leading-relaxed mb-4 max-w-lg"
            >
              {t('founder_body1')}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-sans text-body-md text-white/75 leading-relaxed max-w-lg"
            >
              {t('founder_body2')}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center gap-6"
            >
              <div>
                <p className="font-serif italic text-xl text-gold">
                  {t('founder_name')}
                </p>
                <p className="text-[0.7rem] text-white/50 mt-1 tracking-widest uppercase">
                  Fondatrice, Bahor-Voyage
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <Button href="/about" variant="glass" size="md">
                {t('learn_more')} &rarr;
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: founder portrait */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 flex items-end justify-end px-8 md:px-12 lg:px-10 pb-10 pt-10 lg:pt-0"
          >
            <div
              className="relative w-full max-w-xs lg:max-w-sm aspect-3/4 rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  '0 30px 60px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(200,169,110,0.25)',
              }}
            >
              <Image
                src="/images/Navbakhor-BUDOT.jpg"
                alt="Navbakhor Boudot — Fondatrice Bahor-Voyage"
                fill
                quality={100}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FounderSection;

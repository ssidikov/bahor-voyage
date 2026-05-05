'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { fadeUp, staggerContainer } from '@/lib/animations';

export function FounderSection() {
  const t = useTranslations('home');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal-800 py-20 md:py-28 lg:py-section overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(47,110,115,0.15), transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(47,110,115,0.15), transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(47,110,115,0.15), transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Decorative geometric element */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-8 right-8 md:top-12 md:right-16 opacity-[0.04] pointer-events-none"
      >
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
      </motion.div>

      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Image — left 5/12 with clip reveal */}
          <motion.div className="lg:col-span-5" style={{ y: imageY }}>
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-4/5 overflow-hidden rounded-2xl"
              style={{
                boxShadow:
                  '0 30px 60px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(200,169,110,0.2)',
              }}
            >
              <Image
                src="/images/Navbakhor-BUDOT.jpg"
                alt="Navbakhor Boudot — Fondatrice Bahor-Voyage"
                fill
                quality={100}
                className="object-cover"
                placeholder="empty"
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-charcoal-900/20 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Text — right 7/12 */}
          <motion.div className="lg:col-span-7 lg:pl-4" style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-gold" />
              <p className="text-label uppercase tracking-[0.15em] text-gold">
                {t('founder_label')}
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-serif text-display-lg text-white font-light leading-snug"
            >
              {t('founder_title')}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-12 h-px bg-gold my-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-sans text-body-md text-charcoal-200 leading-relaxed mb-5"
            >
              {t('founder_body1')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="font-sans text-body-md text-charcoal-200 leading-relaxed"
            >
              {t('founder_body2')}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10"
            >
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
                className="font-serif italic text-2xl text-gold"
              >
                {t('founder_name')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="text-label text-charcoal-400 mt-1 tracking-widest uppercase"
              >
                Fondatrice, Bahor-Voyage
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FounderSection;

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeUp, staggerContainer } from '@/lib/animations';

export function UzbekistanIntro() {
  const t = useTranslations('home');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-sand-50 py-20 md:py-28 lg:py-section overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
        className="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Left column — editorial text */}
          <motion.div
            variants={fadeUp}
            style={{ rotateX }}
            className="perspective-[1000px]"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-6 origin-left"
            >
              <div className="h-px w-8 bg-primary/40" />
              <p className="text-label uppercase tracking-[0.15em] text-primary-400">
                {t.raw('hero_cta') === 'Découvrir' ? 'Découverte' : 'Discovery'}
              </p>
            </motion.div>

            <h2 className="font-serif text-display-lg text-charcoal-700 font-light leading-snug">
              {t('intro_title')}
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-16 h-px bg-gold my-8 origin-left"
            />

            <p className="font-sans text-body-lg text-charcoal-400 leading-relaxed">
              {t('intro_body')}
            </p>
          </motion.div>

          {/* Right column — stats + keywords */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-center"
          >
            <motion.blockquote
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-serif italic text-display-md text-primary-400/50 leading-snug mb-10 border-l-2 border-gold/30 pl-6"
            >
              &ldquo;{t('intro_body').split(',')[0]}&hellip;&rdquo;
            </motion.blockquote>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              {[
                'Samarcande',
                'Boukhara',
                'Route de la Soie',
                'Petits groupes',
              ].map((keyword, idx) => (
                <motion.div
                  key={keyword}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + idx * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group border-t border-gold/30 pt-4 cursor-default"
                >
                  <motion.span
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="inline-block text-label uppercase tracking-[0.12em] text-charcoal-500 group-hover:text-primary transition-colors duration-300"
                  >
                    {keyword}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default UzbekistanIntro;

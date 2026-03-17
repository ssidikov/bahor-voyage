'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeUp, staggerContainer } from '@/lib/animations';

export function UzbekistanIntro() {
  const t = useTranslations('home');

  return (
    <section className="bg-sand-50 py-16 md:py-20 lg:py-section">
      <div className="max-w-[75rem] mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left column — editorial text */}
          <motion.div variants={fadeUp}>
            <p className="text-label uppercase tracking-[0.15em] text-primary-400 mb-4">
              {t.raw('hero_cta') === 'Découvrir' ? 'Découverte' : 'Discovery'}
            </p>
            <h2 className="font-serif text-display-lg text-charcoal-700 font-light leading-snug">
              {t('intro_title')}
            </h2>
            <div className="divider-gold my-8" />
            <p className="font-sans text-body-lg text-charcoal-400 leading-relaxed">
              {t('intro_body')}
            </p>
          </motion.div>

          {/* Right column — pull quote + keywords */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-center"
          >
            <blockquote className="font-serif italic text-display-md text-primary-400/60 leading-snug mb-10">
              &ldquo;{t('intro_body').split(',')[0]}&hellip;&rdquo;
            </blockquote>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                'Samarcande',
                'Boukhara',
                'Route de la Soie',
                'Petits groupes',
              ].map((keyword) => (
                <div key={keyword} className="border-t border-gold/30 pt-3">
                  <span className="text-label uppercase tracking-[0.12em] text-charcoal-500">
                    {keyword}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default UzbekistanIntro;

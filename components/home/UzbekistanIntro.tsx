'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { fadeUp, staggerContainer } from '@/lib/animations';

const TAGS = [
  'Samarcande',
  'Boukhara',
  'Route de la Soie',
  'Petits groupes',
] as const;

export function UzbekistanIntro() {
  const t = useTranslations('home');

  return (
    <section className="relative bg-[#fafafa] py-20 md:py-28 lg:py-section overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* ── LEFT: two staggered images (Figma "Natural Marvels" style) ── */}
          <motion.div variants={fadeUp} className="relative h-120 md:h-140">
            {/* Primary image */}
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0% round 24px)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-0 left-0 w-[65%] h-[72%] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            >
              <Image
                src="/images/uzbekistan.jpeg"
                alt="Uzbekistan"
                fill
                quality={90}
                className="object-cover"
              />
            </motion.div>

            {/* Secondary image — offset bottom-right */}
            <motion.div
              initial={{ clipPath: 'inset(0% 0% 100% 0% round 24px)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
              viewport={{ once: true }}
              transition={{
                duration: 1.1,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute bottom-0 right-0 w-[62%] h-[60%] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.14)] border-4 border-[#fafafa]"
            >
              <Image
                src="/images/afor-voyage-2.jpeg"
                alt="Voyage solidaire Ouzbékistan"
                fill
                quality={90}
                className="object-cover"
              />
              {/* Stat badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg">
                <p className="font-serif text-2xl text-primary font-light leading-none">
                  4
                </p>
                <p className="text-[0.7rem] text-charcoal-500 uppercase tracking-widest mt-0.5">
                  Circuits
                </p>
              </div>
            </motion.div>

            {/* Floating accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute top-[68%] left-[58%] w-12 h-12 rounded-full bg-gold/20 blur-xl pointer-events-none"
            />
          </motion.div>

          {/* ── RIGHT: editorial text ── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-center"
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

            {/* Destination tags */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {TAGS.map((tag, idx) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.08, duration: 0.45 }}
                  className="group flex items-center gap-3 border-t border-charcoal-100 pt-4 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span className="text-label uppercase tracking-[0.12em] text-charcoal-500 group-hover:text-primary transition-colors duration-300 text-sm">
                    {tag}
                  </span>
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

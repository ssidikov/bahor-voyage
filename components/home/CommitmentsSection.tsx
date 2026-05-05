'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { fadeUp, staggerContainer } from '@/lib/animations';

const COMMITMENTS = [
  { roman: 'I', titleKey: 'c1_title', descKey: 'c1_desc' },
  { roman: 'II', titleKey: 'c2_title', descKey: 'c2_desc' },
  { roman: 'III', titleKey: 'c3_title', descKey: 'c3_desc' },
  { roman: 'IV', titleKey: 'c4_title', descKey: 'c4_desc' },
  { roman: 'V', titleKey: 'c5_title', descKey: 'c5_desc' },
  { roman: 'VI', titleKey: 'c6_title', descKey: 'c6_desc' },
] as const;

export function CommitmentsSection() {
  const tHome = useTranslations('home');
  const t = useTranslations('commitments');

  return (
    <section className="relative bg-sand-100 py-20 md:py-28 lg:py-section overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-14 md:mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="font-serif text-display-lg text-charcoal-700 font-light"
          >
            {tHome('commitments_title')}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="max-w-3xl mx-auto mt-5 font-sans text-body-md text-charcoal-400 leading-relaxed"
          >
            {t('section_subtitle')}
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 mt-6 font-sans text-sm tracking-widest uppercase text-gold hover:text-gold/80 transition-colors group"
            >
              <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all group-hover:after:w-full">
                {tHome('learn_more')}
              </span>
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {COMMITMENTS.map(({ roman, titleKey, descKey }, idx) => (
            <motion.div
              key={roman}
              variants={fadeUp}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className="group relative rounded-2xl border border-white/70 bg-white/60 backdrop-blur-sm p-7 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:bg-white/90 transition-all duration-500 cursor-default"
            >
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
              />

              <span
                className="font-serif text-5xl text-gold/30 font-light leading-none block select-none group-hover:text-gold/50 transition-colors duration-500"
                aria-hidden="true"
              >
                {roman}
              </span>
              <h3 className="font-serif text-xl text-charcoal-700 font-medium mt-4 group-hover:text-primary transition-colors duration-300">
                {t(titleKey)}
              </h3>
              <p className="font-sans text-body-md text-charcoal-400 mt-3 leading-relaxed">
                {t(descKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CommitmentsSection;

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
    <section className="relative bg-white py-20 md:py-28 lg:py-section overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10">
        {/* ── Header row: left title + right CTA ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 md:mb-18"
        >
          <div className="max-w-2xl">
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-8 bg-primary/40" />
              <p className="text-label uppercase tracking-[0.15em] text-primary-400">
                Nos engagements
              </p>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-display-lg text-charcoal-700 font-light"
            >
              {tHome('commitments_title')}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 font-sans text-body-md text-charcoal-400 leading-relaxed"
            >
              {t('section_subtitle')}
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="shrink-0">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-primary hover:text-primary-hover transition-colors group border border-primary/30 rounded-full px-5 py-2.5"
            >
              <span>{tHome('learn_more')}</span>
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

        {/* ── Commitment cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {COMMITMENTS.map(({ roman, titleKey, descKey }, idx) => (
            <motion.div
              key={roman}
              variants={fadeUp}
              whileHover={{
                y: -5,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className="group relative rounded-2xl border border-charcoal-100/70 bg-[#fafafa] p-7 md:p-8 hover:shadow-[0_16px_48px_rgba(0,0,0,0.07)] hover:border-primary/15 transition-all duration-500 cursor-default"
            >
              <motion.div
                className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 + idx * 0.08 }}
              />
              <span
                className="font-serif text-5xl text-gold/25 font-light leading-none block select-none group-hover:text-gold/45 transition-colors duration-500"
                aria-hidden="true"
              >
                {roman}
              </span>
              <h3 className="font-serif text-xl text-charcoal-700 font-medium mt-5 group-hover:text-primary transition-colors duration-300">
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

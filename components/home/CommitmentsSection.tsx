'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { fadeUp, staggerContainer } from '@/lib/animations';

const COMMITMENTS = [
  { roman: 'I', titleKey: 'c1_title', descKey: 'c1_desc' },
  { roman: 'II', titleKey: 'c2_title', descKey: 'c2_desc' },
  { roman: 'III', titleKey: 'c3_title', descKey: 'c3_desc' },
] as const;

export function CommitmentsSection() {
  const tHome = useTranslations('home');
  const t = useTranslations('commitments');
  const locale = useLocale();

  return (
    <section className="bg-sand-100 py-16 md:py-20 lg:py-section">
      <div className="max-w-[75rem] mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-14 md:mb-20"
        >
          <h2 className="font-serif text-display-lg text-charcoal-700 font-light">
            {tHome('commitments_title')}
          </h2>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 mt-6 font-sans text-sm tracking-widest uppercase text-gold hover:text-gold/80 transition-colors group"
          >
            <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all group-hover:after:w-full">
              {tHome('learn_more')}
            </span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
        >
          {COMMITMENTS.map(({ roman, titleKey, descKey }) => (
            <motion.div key={roman} variants={fadeUp}>
              <div className="w-full h-px bg-gold mb-8" />
              <span
                className="font-serif text-6xl text-gold/40 font-light leading-none block select-none"
                aria-hidden="true"
              >
                {roman}
              </span>
              <h3 className="font-serif text-xl text-charcoal-700 font-medium mt-3">
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

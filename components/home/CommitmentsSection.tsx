'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui';

const COMMITMENTS = [
  { roman: 'I', titleKey: 'c1_title', descKey: 'c1_desc' },
  { roman: 'II', titleKey: 'c2_title', descKey: 'c2_desc' },
  { roman: 'III', titleKey: 'c3_title', descKey: 'c3_desc' },
] as const;

export function CommitmentsSection() {
  const tHome = useTranslations('home');
  const t = useTranslations('commitments');

  return (
    <section className="bg-sand-100 py-16 md:py-20 lg:py-section">
      <div className="max-w-[78rem] mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-10 md:mb-14"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-gold/30 bg-white/60 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-charcoal-500"
          >
            {t('section_kicker')}
          </motion.div>

          <div className="mt-5 flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[44rem]">
              <motion.h2
                variants={fadeUp}
                className="font-serif text-display-lg text-charcoal-700 font-light text-left"
              >
                {tHome('commitments_title')}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-4 text-body-md text-charcoal-400 text-left"
              >
                {t('section_subtitle')}
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="shrink-0 lg:pb-1">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="w-full lg:w-auto lg:min-w-[16rem]"
              >
                {t('section_cta')}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {COMMITMENTS.map(({ roman, titleKey, descKey }) => (
            <motion.article
              key={roman}
              variants={fadeUp}
              className="h-full rounded-[1.4rem] border border-gold/20 bg-white p-6 md:p-7 shadow-[0_8px_24px_rgba(26,26,26,0.08)] flex flex-col"
            >
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-serif text-2xl text-gold/80"
                  aria-hidden="true"
                >
                  {roman}
                </span>
                <h3 className="font-serif text-xl text-charcoal-700 font-medium leading-tight">
                  {t(titleKey)}
                </h3>
              </div>

              <p className="flex-1 font-sans text-body-md text-charcoal-400 leading-relaxed">
                {t(descKey)}
              </p>

              <div className="mt-6 pt-5 border-t border-gold/20">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-label uppercase tracking-[0.12em] text-charcoal-600 hover:text-primary-500 transition-colors"
                >
                  {t('card_link')}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-10 rounded-3xl border border-charcoal-900/10 bg-white/70 px-6 py-5 md:px-8 md:py-6"
        >
          <p className="text-body-md text-charcoal-500">
            {t('section_footer_note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default CommitmentsSection;

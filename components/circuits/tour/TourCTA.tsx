'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui';
import { fadeUp, staggerContainer } from '@/lib/animations';

interface TourCTAProps {
  prefix: string;
}

export default function TourCTA({ prefix }: TourCTAProps) {
  const t = useTranslations('circuits');

  return (
    <section className="bg-charcoal-800 py-20 md:py-28">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <div className="divider-gold-center mb-8" />
            <h2 className="font-serif text-display-lg text-white font-light mb-6">
              {t(`${prefix}_cta_title` as Parameters<typeof t>[0])}
            </h2>
            <p className="font-sans text-body-md text-white/60 mb-10 leading-relaxed">
              {t(`${prefix}_cta_body` as Parameters<typeof t>[0])}
            </p>
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="group text-label-lg uppercase tracking-[0.08em]"
            >
              {t(`${prefix}_cta_contact` as Parameters<typeof t>[0])}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

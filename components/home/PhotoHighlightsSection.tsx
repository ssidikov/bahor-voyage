'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/components/ui';
import { fadeUp, staggerContainer } from '@/lib/animations';

type Highlight = {
  image: string;
  altKey: 'gallery_alt_1' | 'gallery_alt_2' | 'gallery_alt_3' | 'gallery_alt_4';
};

const HIGHLIGHTS = [
  { image: '/images/Boukhara.jpg', altKey: 'gallery_alt_1' },
  { image: '/images/afor-voyage-2.jpeg', altKey: 'gallery_alt_2' },
  { image: '/images/uzbekistan.jpeg', altKey: 'gallery_alt_3' },
  { image: '/images/voyage-solidaire.avif', altKey: 'gallery_alt_4' },
] as const satisfies readonly [Highlight, ...Highlight[]];

export function PhotoHighlightsSection() {
  const t = useTranslations('home');

  return (
    <section className="bg-sand-100 py-16 md:py-20 lg:py-section">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-10 md:mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-label uppercase tracking-[0.15em] text-primary-400 mb-4"
          >
            {t('gallery_kicker')}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-display-lg text-charcoal-700 font-light max-w-3xl"
          >
            {t('gallery_title')}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-sans text-body-lg text-charcoal-400 mt-4 max-w-3xl leading-relaxed"
          >
            {t('gallery_body')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5"
        >
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-border-soft aspect-4/3 md:aspect-16/10 lg:col-span-7"
          >
            <Image
              src={HIGHLIGHTS[0].image}
              alt={t(HIGHLIGHTS[0].altKey)}
              fill
              quality={100}
              className="object-cover"
              placeholder="empty"
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-5 lg:col-span-5">
            {HIGHLIGHTS.slice(1).map((item) => (
              <motion.div
                key={item.image}
                variants={fadeUp}
                className="relative overflow-hidden rounded-3xl border border-border-soft aspect-square"
              >
                <Image
                  src={item.image}
                  alt={t(item.altKey)}
                  fill
                  quality={100}
                  className="object-cover"
                  placeholder="empty"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-10"
        >
          <Button
            href="/circuits"
            variant="outline"
            className="w-full md:w-auto"
          >
            {t('gallery_cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default PhotoHighlightsSection;

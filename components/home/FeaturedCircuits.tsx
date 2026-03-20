'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui';

type CircuitId = 'c1' | 'c2' | 'c3' | 'c4';

type Circuit = {
  id: CircuitId;
  image: string;
  href: string;
};

const CIRCUITS: readonly Circuit[] = [
  {
    id: 'c1',
    image: '/images/Boukhara.jpg',
    href: '/circuits/samarcande-boukhara',
  },
  {
    id: 'c2',
    image: '/images/voyage-solidaire.avif',
    href: '/circuits/voyage-solidaire-11j',
  },
  {
    id: 'c3',
    image: '/images/afor-voyage-2.jpeg',
    href: '/circuits/immersion-totale',
  },
  {
    id: 'c4',
    image: '/images/immersion-totale.jpeg',
    href: '/circuits/grand-circuit-18j',
  },
] as const;

function CircuitCard({
  id,
  image,
  href,
  large,
}: Circuit & { large?: boolean }) {
  const t = useTranslations('circuits');
  const durationKey = `${id}_duration` as const;
  const tagKey = `${id}_tag` as const;
  const descKey = `${id}_desc` as const;

  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-[1.75rem] border border-charcoal-900/10 shadow-[0_10px_30px_rgba(20,20,20,0.12)] transition-transform duration-500 hover:-translate-y-1 ${
        large
          ? 'aspect-[4/5] md:aspect-[3/2] lg:aspect-auto lg:h-[24rem]'
          : 'aspect-[4/5] md:aspect-square lg:aspect-auto lg:h-[24rem]'
      }`}
    >
      <div className="absolute inset-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
        <Image
          src={image}
          alt={t(tagKey)}
          fill
          className="object-cover"
          placeholder="empty"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/95 via-charcoal-900/55 to-charcoal-900/10 transition-colors duration-500 group-hover:from-charcoal-900/90" />

      <div className="absolute left-5 top-5 z-10 rounded-full border border-white/30 bg-charcoal-900/40 px-3 py-1.5 backdrop-blur">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/85">
          {t(durationKey)}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-7 lg:p-8">
        <h3 className="font-serif text-2xl leading-tight text-white md:text-[1.9rem] lg:text-[2.2rem] font-light">
          {t(tagKey)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80 md:text-body-md line-clamp-3 md:line-clamp-2">
          {t(descKey)}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-label uppercase tracking-[0.12em] text-white/90">
          {t('learn_more')}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-2"
          >
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}

export function FeaturedCircuits() {
  const t = useTranslations('circuits');
  const tHome = useTranslations('home');

  return (
    <section
      id="circuits"
      className="bg-[linear-gradient(180deg,#fff_0%,#f8f4ed_50%,#fff_100%)] py-16 md:py-20 lg:py-section"
    >
      <div className="max-w-[78rem] mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-10 md:mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-label uppercase tracking-[0.15em] text-primary-400 mb-4"
          >
            {t('section_kicker')}
          </motion.p>

          <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[42rem]">
              <motion.h2
                variants={fadeUp}
                className="font-serif text-display-xl text-charcoal-700 font-light text-left"
              >
                {t('section_title')}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="font-sans text-body-lg text-charcoal-400 mt-4 text-left"
              >
                {t('section_subtitle')}
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="shrink-0 lg:pb-1">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="w-full lg:w-auto lg:min-w-[12rem]"
              >
                {tHome('cta_reserve')}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12 lg:gap-6"
        >
          {CIRCUITS.map((circuit, idx) => (
            <motion.div
              key={circuit.id}
              variants={fadeUp}
              className={
                idx === 0 || idx === 3
                  ? 'md:col-span-2 lg:col-span-8'
                  : 'md:col-span-1 lg:col-span-4'
              }
            >
              <CircuitCard
                id={circuit.id}
                image={circuit.image}
                href={circuit.href}
                large={idx === 0 || idx === 3}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-10 rounded-3xl border border-primary-200 bg-white/90 px-6 py-5 md:px-8 md:py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <p className="max-w-[50rem] text-body-md text-charcoal-500">
            {t('section_conversion_note')}
          </p>
          <Button
            href="/contact"
            variant="outline"
            size="md"
            className="w-full lg:w-auto lg:min-w-[14rem]"
          >
            {t('section_cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedCircuits;

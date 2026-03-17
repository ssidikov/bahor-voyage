'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { fadeUp, staggerContainer } from '@/lib/animations';

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
    href: '/circuits/voyage-solidaire-18j',
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
      className={`group relative block overflow-hidden ${
        large ? 'aspect-[3/4]' : 'aspect-square'
      }`}
    >
      {/* Image with hover zoom */}
      <div className="absolute inset-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
        <Image
          src={image}
          alt={t(tagKey)}
          fill
          className="object-cover"
          placeholder="empty"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent transition-colors duration-500 group-hover:from-charcoal-900/90" />

      {/* Text content overlaid at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 flex flex-col">
        <span className="text-label uppercase tracking-[0.12em] text-white/60 mb-2">
          {t(durationKey)}
        </span>
        <h3 className="font-serif text-display-md text-white font-light mb-2">
          {t(tagKey)}
        </h3>
        <p className="text-body-md text-white/70 line-clamp-2 mb-4 hidden md:block">
          {t(descKey)}
        </p>
        <span className="text-label uppercase tracking-[0.12em] text-white/80 inline-flex items-center gap-2">
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

  return (
    <section id="circuits" className="bg-white py-16 md:py-20 lg:py-section">
      <div className="max-w-[75rem] mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14 md:mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="text-label uppercase tracking-[0.15em] text-primary-400 mb-4"
          >
            {t.raw('section_title') === 'Nos Circuits' ? 'Voyages' : 'Journeys'}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-display-xl text-charcoal-700 font-light"
          >
            {t('section_title')}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-sans text-body-lg text-charcoal-400 mt-4 max-w-[48rem] mx-auto"
          >
            {t('section_subtitle')}
          </motion.p>
        </motion.div>

        {/* Asymmetric magazine grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {CIRCUITS.map((circuit, idx) => (
            <motion.div
              key={circuit.id}
              variants={fadeUp}
              className={
                idx === 0 || idx === 3 ? 'lg:col-span-2' : 'lg:col-span-1'
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
      </div>
    </section>
  );
}

export default FeaturedCircuits;

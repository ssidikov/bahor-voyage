'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui';

/* ------------------------------------------------------------------ */
/*  Circuit card data (same as FeaturedCircuits)                        */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Reusable circuit card                                               */
/* ------------------------------------------------------------------ */
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
          ? 'aspect-[4/5] md:aspect-[3/2] lg:aspect-auto lg:h-[28rem]'
          : 'aspect-[4/5] md:aspect-square lg:aspect-auto lg:h-[28rem]'
      }`}
    >
      {/* Image layer */}
      <div className="absolute inset-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
        <Image
          src={image}
          alt={t(tagKey)}
          fill
          className="object-cover"
          placeholder="empty"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 66vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/95 via-charcoal-900/50 to-charcoal-900/5 transition-colors duration-500 group-hover:from-charcoal-900/90" />

      {/* Duration badge */}
      <div className="absolute left-5 top-5 z-10 rounded-full border border-white/30 bg-charcoal-900/40 px-3 py-1.5 backdrop-blur">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/85">
          {t(durationKey)}
        </span>
      </div>

      {/* Card body */}
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

/* ------------------------------------------------------------------ */
/*  Stats strip item                                                    */
/* ------------------------------------------------------------------ */
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-4 lg:px-10">
      <span className="font-serif text-display-xl text-primary-500 font-light leading-none">
        {value}
      </span>
      <span className="mt-1.5 text-label text-charcoal-400 uppercase tracking-[0.14em]">
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page root                                                           */
/* ------------------------------------------------------------------ */
export default function CircuitsPage() {
  const t = useTranslations('circuits');
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], ['0%', '20%']);

  return (
    <>
      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section className="relative h-[72vh] min-h-[500px] overflow-hidden">
        {/* Parallax image */}
        <motion.div
          className="absolute inset-0 scale-110"
          style={{ y: heroParallax }}
        >
          <Image
            src="/images/Boukhara.jpg"
            alt="Circuits en Ouzbékistan"
            fill
            priority
            className="object-cover"
            placeholder="empty"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-charcoal-900/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/75 via-charcoal-900/15 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-16 md:pb-24">
          <div className="max-w-[78rem] mx-auto px-6 md:px-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="font-sans text-label uppercase tracking-[0.15em] text-white/70 mb-4"
            >
              {t('page_hero_kicker')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="font-serif text-display-2xl text-white font-light max-w-3xl"
            >
              {t('page_hero_title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
              className="mt-4 max-w-xl text-body-lg text-white/75 font-light"
            >
              {t('page_hero_subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.75, ease: 'easeOut' }}
              className="w-16 h-px bg-gold mt-8 origin-left"
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* STATS STRIP                                                   */}
      {/* ============================================================ */}
      <section className="bg-white border-b border-sand-200">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-[78rem] mx-auto px-6 md:px-10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-sand-200">
            <motion.div variants={fadeUp}>
              <StatItem
                value={t('page_stat_1_value')}
                label={t('page_stat_1_label')}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StatItem
                value={t('page_stat_2_value')}
                label={t('page_stat_2_label')}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StatItem
                value={t('page_stat_3_value')}
                label={t('page_stat_3_label')}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* INTRO                                                         */}
      {/* ============================================================ */}
      <section className="bg-sand-50 py-16 md:py-20 lg:py-section">
        <div className="max-w-[52rem] mx-auto px-6 md:px-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp}>
              <div className="divider-gold-center mb-10" />
              <p className="font-serif text-display-md text-charcoal-700 font-light leading-snug">
                {t('page_intro')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CIRCUITS GRID                                                 */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-20 lg:py-section">
        <div className="max-w-[78rem] mx-auto px-6 md:px-10">
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
        </div>
      </section>

      {/* ============================================================ */}
      {/* SUR MESURE CALLOUT                                            */}
      {/* ============================================================ */}
      <section className="bg-sand-100 py-14 md:py-16">
        <div className="max-w-[78rem] mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-3xl border border-primary-200 bg-white/90 px-6 py-8 md:px-10 md:py-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-[44rem]">
              <motion.p
                variants={fadeUp}
                className="font-sans text-label uppercase tracking-[0.14em] text-primary-400 mb-3"
              >
                {t('section_kicker')}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-serif text-display-md text-charcoal-700 font-light leading-snug"
              >
                {t('page_tailor_title')}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-4 font-sans text-body-md text-charcoal-400 leading-relaxed"
              >
                {t('page_tailor_body')}
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="shrink-0">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="w-full lg:w-auto lg:min-w-[14rem]"
              >
                {t('page_tailor_cta')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DARK CTA                                                      */}
      {/* ============================================================ */}
      <section className="bg-charcoal-800 py-16 md:py-20 lg:py-section relative overflow-hidden">
        {/* Decorative SVG */}
        <div className="absolute top-8 right-8 md:top-12 md:right-16 opacity-5 pointer-events-none">
          <svg
            width="280"
            height="280"
            viewBox="0 0 280 280"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            className="w-48 h-48 md:w-72 md:h-72"
          >
            <polygon points="140,10 170,100 260,100 185,150 210,240 140,190 70,240 95,150 20,100 110,100" />
            <polygon
              points="140,40 160,110 230,110 175,145 195,220 140,180 85,220 105,145 50,110 120,110"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* Gold glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-48 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[48rem] mx-auto px-6 md:px-10 text-center relative z-10"
        >
          <motion.div variants={fadeUp}>
            <div className="divider-gold-center mb-8" />
            <h2 className="font-serif text-display-lg text-white font-light">
              {t('page_cta_title')}
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-sans text-body-lg text-charcoal-200 mt-6 leading-relaxed"
          >
            {t('page_cta_body')}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-white/60 text-white rounded-pill px-8 py-3.5 text-label-lg uppercase tracking-[0.1em] font-medium hover:bg-white hover:text-primary-600 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {t('page_cta_button')}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

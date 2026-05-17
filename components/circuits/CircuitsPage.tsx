'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Link } from '@/i18n/navigation';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Button, PageHero } from '@/components/ui';
import { CIRCUIT_META, matchesDuration } from '@/lib/circuit-meta';
import type { CircuitTheme, DurationBucket, Season } from '@/lib/circuit-meta';

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
    href: '/circuits/immersion-totale-14j',
  },
  {
    id: 'c4',
    image: '/images/immersion-totale.jpeg',
    href: '/circuits/grand-circuit-18j',
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Reusable circuit card                                               */
/* ------------------------------------------------------------------ */
function CircuitCard({ id, image, href }: Circuit) {
  const t = useTranslations('circuits');
  const durationKey = `${id}_duration` as const;
  const tagKey = `${id}_tag` as const;
  const descKey = `${id}_desc` as const;

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-[1.75rem] shadow-[0_10px_30px_rgba(20,20,20,0.12)] transition-transform duration-500 hover:-translate-y-1 aspect-4/5 md:aspect-square lg:aspect-auto lg:h-120"
    >
      {/* Image layer */}
      <div className="absolute inset-0 transition-transform duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
        <Image
          src={image}
          alt={t(tagKey)}
          fill
          quality={100}
          className="object-cover"
          placeholder="empty"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 66vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent transition-colors duration-500" />

      {/* Top badge */}
      <div className="absolute left-5 top-5 z-10">
        <span className="rounded-full border border-white bg-white/15 px-3.5 py-2 text-[0.8rem] font-medium text-white backdrop-blur-sm">
          {t(durationKey)}
        </span>
      </div>

      {/* Card body */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6 lg:p-7">
        <h3 className="font-serif text-[1.8rem] leading-tight text-white md:text-[2rem] lg:text-[2.3rem] font-light">
          {t(tagKey)}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-white/80 md:text-[0.9rem] line-clamp-2">
          {t(descKey)}
        </p>

        <div className="mt-5 flex w-full items-center gap-2.5 rounded-full bg-white px-3 py-4 transition-opacity duration-300 group-hover:opacity-90">
          <span className="flex-1 text-center text-[1rem] font-bold text-[#181717]">
            {t('learn_more')}
          </span>
          <svg
            aria-hidden="true"
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="#181717"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
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

  /* ---------- search filter from hero search bar ---------- */
  const searchParams = useSearchParams();
  const filterTheme = (searchParams.get('theme') ?? '') as CircuitTheme | '';
  const filterDuration = (searchParams.get('duration') ?? '') as
    | DurationBucket
    | '';
  const filterSeason = (searchParams.get('season') ?? '') as Season | '';
  const hasFilters = !!(filterTheme || filterDuration || filterSeason);

  const matchedIds = hasFilters
    ? new Set(
        CIRCUIT_META.filter((c) => {
          if (filterTheme && c.theme !== filterTheme) return false;
          if (filterDuration && !matchesDuration(c.days, filterDuration))
            return false;
          if (filterSeason && !c.seasons.includes(filterSeason)) return false;
          return true;
        }).map((c) => c.id),
      )
    : null;
  const matchedCount =
    matchedIds === null
      ? CIRCUITS.length
      : CIRCUITS.filter((circuit) => matchedIds.has(circuit.id)).length;
  const activeFilters = [
    filterTheme
      ? {
          label: t('filter_theme_label'),
          value: t(`filter_theme_${filterTheme}`),
        }
      : null,
    filterDuration
      ? {
          label: t('filter_duration_label'),
          value: t(`filter_duration_${filterDuration}`),
        }
      : null,
    filterSeason
      ? {
          label: t('filter_season_label'),
          value: t(`filter_season_${filterSeason}`),
        }
      : null,
  ].filter((filter): filter is { label: string; value: string } =>
    Boolean(filter),
  );

  return (
    <>
      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <PageHero
        image={{ src: '/images/Boukhara.jpg', alt: 'Circuits en Ouzbékistan' }}
        kicker={t('page_hero_kicker')}
        title={t('page_hero_title')}
        subtitle={t('page_hero_subtitle')}
        containerClassName="h-[72vh] min-h-125"
      />

      {/* ============================================================ */}
      {/* STATS STRIP                                                   */}
      {/* ============================================================ */}
      <section className="bg-white border-b border-sand-200">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-312 mx-auto px-6 md:px-10"
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
      <section className="bg-[#fafafa] py-16 md:py-20 lg:py-section">
        <div className="max-w-208 mx-auto px-6 md:px-10 text-center">
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
        <div className="max-w-312 mx-auto px-6 md:px-10">
          {hasFilters ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="mb-8 rounded-3xl border border-border-soft bg-sand-50 p-5 md:p-6"
              role="status"
              aria-live="polite"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-label-sm uppercase tracking-[0.14em] text-primary-500">
                    {t('filter_active_title')}
                  </p>
                  <p className="mt-2 text-sm text-charcoal-500">
                    {t('filter_result_count', { count: matchedCount })}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {activeFilters.map((filter) => (
                    <span
                      key={`${filter.label}-${filter.value}`}
                      className="rounded-full border border-primary-100 bg-white px-3 py-2 text-sm text-charcoal-600"
                    >
                      <span className="text-charcoal-400">
                        {filter.label}:{' '}
                      </span>
                      {filter.value}
                    </span>
                  ))}
                  <Button href="/circuits" variant="outline" size="sm">
                    {t('filter_reset')}
                  </Button>
                </div>
              </div>
              {matchedCount === 0 ? (
                <div className="mt-5 rounded-2xl border border-gold/30 bg-white p-5">
                  <h2 className="font-serif text-2xl text-charcoal-700">
                    {t('filter_no_match_title')}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
                    {t('filter_no_match_body')}
                  </p>
                  <div className="mt-4">
                    <Button href="/contact" variant="primary" size="sm">
                      {t('filter_no_match_cta')}
                    </Button>
                  </div>
                </div>
              ) : null}
            </motion.div>
          ) : null}

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-2 lg:gap-6"
          >
            {CIRCUITS.map((circuit) => {
              const isMatch = matchedIds === null || matchedIds.has(circuit.id);
              const dimmed = matchedIds !== null && !isMatch;
              return (
                <motion.div
                  key={circuit.id}
                  variants={fadeUp}
                  className={
                    (isMatch && matchedIds !== null
                      ? ' ring-2 ring-gold rounded-[1.75rem] shadow-[0_0_24px_rgba(200,169,110,0.25)]'
                      : '') + (dimmed ? ' opacity-40' : '')
                  }
                  style={{
                    transition: 'opacity 0.5s ease, box-shadow 0.5s ease',
                  }}
                >
                  <CircuitCard
                    id={circuit.id}
                    image={circuit.image}
                    href={circuit.href}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SUR MESURE CALLOUT                                            */}
      {/* ============================================================ */}
      <section className="bg-[#fafafa] py-14 md:py-16">
        <div className="max-w-312 mx-auto px-6 md:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl border border-charcoal-100/70 bg-white px-6 py-8 md:px-10 md:py-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-176">
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
                className="w-full lg:w-auto lg:min-w-56"
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
      <section className="bg-[#fafafa] py-6">
        <div className="mx-2 rounded-3xl overflow-hidden bg-charcoal-800 relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-[48rem] mx-auto px-6 md:px-10 py-20 md:py-28 text-center relative z-10"
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
              <Button
                href="/booking"
                variant="inverted"
                size="lg"
                className="group text-label-lg uppercase tracking-widest"
              >
                {t('page_cta_button')}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

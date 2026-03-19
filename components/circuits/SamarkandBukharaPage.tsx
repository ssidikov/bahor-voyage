'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import {
  fadeIn,
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
} from '@/lib/animations';

/* ──────────────────────────────────────────────
   Day-by-day data — keeps images co-located.
   The order must match day1…day7.
────────────────────────────────────────────── */
const DAYS = [
  {
    key: 'day1',
    image: '/images/samarkand.jpeg',
    imageAlt: 'Registan, Samarkand',
  },
  {
    key: 'day2',
    image: '/images/Boukhara.jpg',
    imageAlt: 'Boukhara old town',
  },
  {
    key: 'day3',
    image: '/images/uzbekistan.jpeg',
    imageAlt: 'Uzbekistan landscape',
  },
  {
    key: 'day4',
    image: '/images/Boukhara.jpg',
    imageAlt: 'Ark citadel, Boukhara',
  },
  {
    key: 'day5',
    image: '/images/uzbekistan.jpeg',
    imageAlt: 'Desert surroundings Boukhara',
  },
  {
    key: 'day6',
    image: '/images/samarkand.jpeg',
    imageAlt: 'Market in Samarkand',
  },
  {
    key: 'day7',
    image: '/images/afor-voyage-2.jpeg',
    imageAlt: 'Departure from Uzbekistan',
  },
] as const;

const INCLUDES = [
  'include1',
  'include2',
  'include3',
  'include4',
  'include5',
  'include6',
] as const;

const EXCLUDES = ['exclude1', 'exclude2', 'exclude3', 'exclude4'] as const;

const _PRACTICALS = [
  'practical_visa',
  'practical_flight',
  'practical_season',
  'practical_currency',
] as const;

const FACTS: {
  key:
    | 'samarkand_boukhara_fact_group'
    | 'samarkand_boukhara_fact_guide'
    | 'samarkand_boukhara_fact_transfers'
    | 'samarkand_boukhara_fact_custom';
  icon: React.ReactElement;
}[] = [
  {
    key: 'samarkand_boukhara_fact_group',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="#C8A96E"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="6" r="2.5" />
        <path d="M2 17c0-3.314 2.686-5 6-5s6 1.686 6 5" />
        <circle cx="14.5" cy="6.5" r="2" />
        <path d="M18 17c0-2.485-1.567-4-4-4" />
      </svg>
    ),
  },
  {
    key: 'samarkand_boukhara_fact_guide',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="#C8A96E"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10" cy="10" r="8" />
        <polygon
          points="13,7 9,13 7,9"
          fill="#C8A96E"
          opacity="0.7"
          stroke="none"
        />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="10" y1="16" x2="10" y2="18" />
        <line x1="2" y1="10" x2="4" y2="10" />
        <line x1="16" y1="10" x2="18" y2="10" />
      </svg>
    ),
  },
  {
    key: 'samarkand_boukhara_fact_transfers',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="#C8A96E"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="16" height="9" rx="1.5" />
        <path d="M5 15v2M15 15v2" />
        <line x1="2" y1="10" x2="18" y2="10" />
        <line x1="7" y1="6" x2="7" y2="10" />
        <line x1="13" y1="6" x2="13" y2="10" />
        <path d="M5 4h10" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    key: 'samarkand_boukhara_fact_custom',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="#C8A96E"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" y1="6" x2="11" y2="6" />
        <line x1="13" y1="6" x2="16" y2="6" />
        <circle cx="12" cy="6" r="1.5" />
        <line x1="4" y1="10" x2="7" y2="10" />
        <line x1="9" y1="10" x2="16" y2="10" />
        <circle cx="8" cy="10" r="1.5" />
        <line x1="4" y1="14" x2="13" y2="14" />
        <line x1="15" y1="14" x2="16" y2="14" />
        <circle cx="14" cy="14" r="1.5" />
      </svg>
    ),
  },
];

/* ──────────────────────────────────────────────
   Sub-component: CheckIcon
────────────────────────────────────────────── */
function CheckIcon({ included }: { included: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex-none w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
        included ? 'bg-gold/20 text-gold' : 'bg-charcoal-100 text-charcoal-300'
      }`}
    >
      {included ? '✓' : '✗'}
    </span>
  );
}

/* ──────────────────────────────────────────────
   Main Page Component
────────────────────────────────────────────── */
export default function SamarkandBukharaPage() {
  const t = useTranslations('circuits');
  const locale = useLocale();

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 700], ['0%', '22%']);

  return (
    <div className="w-full overflow-x-hidden">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative h-[100vh] min-h-[620px] overflow-hidden w-full">
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 scale-110"
          style={{ y: heroParallax }}
        >
          <Image
            src="/images/tours/shohizinda-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            placeholder="empty"
          />
        </motion.div>

        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-charcoal-900/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 pb-20 md:pb-8 pt-20 md:pt-28 flex flex-col justify-end min-h-full">
          <div className="w-full max-w-[75rem] mx-auto px-4 sm:px-6 md:px-10 min-w-0 overflow-hidden">
            {/* Tag + duration pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="inline-flex items-center mb-6 rounded-pill overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 100%)',
                backdropFilter: 'blur(16px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(16px) saturate(1.6)',
                border: '1px solid rgba(255,255,255,0.20)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(0,0,0,0.28)',
              }}
            >
              {/* Tag */}
              <span className="inline-flex items-center gap-2 text-gold text-xs font-sans font-medium uppercase tracking-[0.15em] px-4 py-2">
                {t('samarkand_boukhara_tag')}
              </span>
              {/* Divider */}
              <span
                aria-hidden="true"
                className="w-px self-stretch bg-white/20"
              />
              {/* Duration */}
              <span className="text-white/85 font-sans text-xs uppercase tracking-[0.12em] px-4 py-2">
                {t('samarkand_boukhara_duration')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.25,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="font-serif text-display-xl text-white font-light max-w-4xl leading-tight"
            >
              {t('samarkand_boukhara_title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
              className="font-sans text-body-lg text-white/75 mt-5 max-w-2xl leading-relaxed"
            >
              {t('samarkand_boukhara_subtitle')}
            </motion.p>

            {/* Price badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
              className="mt-8 inline-flex flex-col"
            >
              <span className="font-serif text-display-lg text-gold font-light leading-none">
                {t('samarkand_boukhara_price')}
              </span>
              <span className="font-sans text-xs text-white/55 uppercase tracking-[0.12em] mt-1">
                {t('samarkand_boukhara_price_note')}
              </span>
            </motion.div>

            {/* Quick-facts — single liquid glass bar */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-4 mt-8 w-full rounded-2xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 100%)',
                backdropFilter: 'blur(20px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
                border: '1px solid rgba(255,255,255,0.20)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 32px rgba(0,0,0,0.35)',
              }}
            >
              {FACTS.map(({ key, icon }, i) => (
                <motion.li
                  key={key}
                  variants={fadeIn}
                  className={[
                    'flex items-center gap-2.5 py-3.5 px-4 sm:py-4 sm:px-5',
                    // vertical column divider (right column: i=1,3 always; i=2 only on sm+)
                    i % 2 === 1 ? 'border-l border-white/15' : '',
                    i >= 2 && i % 2 === 0 ? 'sm:border-l border-white/15' : '',
                    // horizontal row divider (second row on mobile)
                    i >= 2 ? 'border-t border-white/15 sm:border-t-0' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className="flex-none" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="font-sans text-[10px] sm:text-label text-white/90 uppercase tracking-[0.09em] leading-tight">
                    {t(key)}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ INTRO ═══════════════ */}
      <section className="bg-sand-50 py-16 md:py-20 lg:py-section">
        <div className="max-w-[75rem] mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
          >
            {/* Left: sticky image */}
            <motion.div
              variants={slideRight}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-sm"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.25)',
                }}
              >
                <Image
                  src="/images/afor-voyage.jpg"
                  alt="Navbakhor presenting the circuit"
                  fill
                  className="object-cover"
                  placeholder="empty"
                />
                {/* Gold corners */}
                <div className="absolute top-0 left-0 w-14 h-14">
                  <div className="absolute top-0 left-0 w-full h-px bg-gold/50" />
                  <div className="absolute top-0 left-0 w-px h-full bg-gold/50" />
                </div>
                <div className="absolute bottom-0 right-0 w-14 h-14">
                  <div className="absolute bottom-0 right-0 w-full h-px bg-gold/50" />
                  <div className="absolute bottom-0 right-0 w-px h-full bg-gold/50" />
                </div>
              </div>
            </motion.div>

            {/* Right: text */}
            <motion.div variants={slideLeft} className="lg:col-span-7">
              <div className="divider-gold mb-8" />
              <p className="font-serif text-display-md text-charcoal-700 font-light leading-snug">
                {t('samarkand_boukhara_intro')}
              </p>
              <p className="font-sans text-body-md text-charcoal-400 mt-6 leading-relaxed">
                {t('samarkand_boukhara_intro2')}
              </p>
              <p className="font-sans text-body-md text-charcoal-500 mt-4 font-medium">
                {t('samarkand_boukhara_intro3')}
              </p>
              <ul className="mt-3 space-y-2">
                {(
                  [
                    'samarkand_boukhara_intro_bullet1',
                    'samarkand_boukhara_intro_bullet2',
                  ] as const
                ).map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 font-sans text-body-md text-charcoal-400"
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gold flex-none" />
                    {t(key)}
                  </li>
                ))}
              </ul>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="group inline-flex items-center justify-center gap-3 bg-primary-600 text-white rounded-pill px-8 py-3.5 text-label-lg uppercase tracking-[0.08em] font-medium hover:bg-primary-700 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
                >
                  {t('samarkand_boukhara_cta_contact')}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PROGRAMME (TIMELINE) ═══════════════ */}
      <section className="bg-white py-16 md:py-20 lg:py-section overflow-hidden">
        <div className="max-w-[75rem] mx-auto px-6 md:px-10">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="mb-16 md:mb-20 text-center"
          >
            <motion.div variants={fadeUp}>
              <div className="divider-gold-center mb-8" />
              <h2 className="font-serif text-display-lg text-charcoal-700 font-light">
                {t('samarkand_boukhara_programme_title')}
              </h2>
            </motion.div>
          </motion.div>

          {/* Days */}
          <div className="space-y-24 lg:space-y-32">
            {DAYS.map((day, idx) => {
              const isReversed = idx % 2 === 1;
              const dayNum = idx + 1;

              return (
                <motion.div
                  key={day.key}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={staggerContainer}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                >
                  {/* Image */}
                  <motion.div
                    variants={isReversed ? slideLeft : slideRight}
                    className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}
                  >
                    <div
                      className="relative aspect-[4/3] overflow-hidden rounded-sm"
                      style={{
                        boxShadow: 'inset 0 0 0 1px rgba(200,169,110,0.20)',
                      }}
                    >
                      <Image
                        src={day.image}
                        alt={day.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        placeholder="empty"
                      />
                      {/* Gold corner accents */}
                      <div className="absolute top-0 left-0 w-10 h-10">
                        <div className="absolute top-0 left-0 w-full h-px bg-gold/40" />
                        <div className="absolute top-0 left-0 w-px h-full bg-gold/40" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-10 h-10">
                        <div className="absolute bottom-0 right-0 w-full h-px bg-gold/40" />
                        <div className="absolute bottom-0 right-0 w-px h-full bg-gold/40" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Text */}
                  <motion.div
                    variants={isReversed ? slideRight : slideLeft}
                    className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : ''}`}
                  >
                    {/* Day number */}
                    <span
                      className="font-serif text-8xl text-gold/15 font-light leading-none block select-none -mb-4"
                      aria-hidden="true"
                    >
                      {dayNum}
                    </span>

                    {/* City badge */}
                    <p className="text-label uppercase tracking-[0.15em] text-primary-400 mb-2">
                      {t(
                        `samarkand_boukhara_${day.key}_city` as 'samarkand_boukhara_day1_city',
                      )}
                    </p>

                    <h3 className="font-serif text-display-md text-charcoal-700 font-light leading-snug">
                      {t(
                        `samarkand_boukhara_${day.key}_title` as 'samarkand_boukhara_day1_title',
                      )}
                    </h3>

                    <div className="w-10 h-px bg-gold my-5" />

                    <p className="font-sans text-body-md text-charcoal-400 leading-relaxed">
                      {t(
                        `samarkand_boukhara_${day.key}_body` as 'samarkand_boukhara_day1_body',
                      )}
                    </p>

                    {/* Highlight chip */}
                    <div className="mt-6 inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-2 rounded-pill">
                      <span className="text-gold text-xs" aria-hidden="true">
                        ★
                      </span>
                      <span className="font-sans text-label text-charcoal-500 uppercase tracking-[0.1em]">
                        {t(
                          `samarkand_boukhara_${day.key}_highlight` as 'samarkand_boukhara_day1_highlight',
                        )}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ INCLUDES / EXCLUDES ═══════════════ */}
      <section className="bg-sand-100 py-16 md:py-20 lg:py-section">
        <div className="max-w-[75rem] mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
          >
            {/* Includes */}
            <motion.div variants={slideRight}>
              <div className="divider-gold mb-6" />
              <h2 className="font-serif text-display-md text-charcoal-700 font-light mb-8">
                {t('samarkand_boukhara_includes_title')}
              </h2>
              <ul className="space-y-4">
                {INCLUDES.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 font-sans text-body-md text-charcoal-500"
                  >
                    <CheckIcon included={true} />
                    <span>
                      {t(
                        `samarkand_boukhara_${key}` as 'samarkand_boukhara_include1',
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Excludes */}
            <motion.div variants={slideLeft}>
              <div className="divider-gold mb-6" />
              <h2 className="font-serif text-display-md text-charcoal-700 font-light mb-8">
                {t('samarkand_boukhara_excludes_title')}
              </h2>
              <ul className="space-y-4">
                {EXCLUDES.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 font-sans text-body-md text-charcoal-400"
                  >
                    <CheckIcon included={false} />
                    <span>
                      {t(
                        `samarkand_boukhara_${key}` as 'samarkand_boukhara_exclude1',
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PRACTICAL INFO ═══════════════ */}
      <section className="bg-white py-16 md:py-20 lg:py-section">
        <div className="max-w-[75rem] mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-12">
              <div className="divider-gold mb-6" />
              <h2 className="font-serif text-display-lg text-charcoal-700 font-light">
                {t('samarkand_boukhara_practical_title')}
              </h2>
            </motion.div>

            <motion.ul
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {(
                [
                  ['samarkand_boukhara_practical_visa', '🛂'],
                  ['samarkand_boukhara_practical_flight', '✈️'],
                  ['samarkand_boukhara_practical_season', '🌸'],
                  ['samarkand_boukhara_practical_currency', '💱'],
                ] as const
              ).map(([key, icon]) => (
                <motion.li
                  key={key}
                  variants={fadeUp}
                  className="flex items-start gap-4 p-5 border border-charcoal-100 rounded-sm bg-sand-50 hover:border-gold/40 transition-colors duration-300"
                >
                  <span
                    className="text-2xl flex-none mt-0.5"
                    role="img"
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                  <span className="font-sans text-body-md text-charcoal-500 leading-relaxed">
                    {t(key)}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="bg-charcoal-800 py-16 md:py-20 lg:py-section relative overflow-hidden">
        {/* Decorative geometric */}
        <div className="absolute top-8 right-8 md:top-12 md:right-16 opacity-5 pointer-events-none select-none">
          <svg
            width="260"
            height="260"
            viewBox="0 0 260 260"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            className="w-44 h-44 md:w-64 md:h-64"
          >
            <polygon points="130,10 158,90 242,90 175,138 198,220 130,175 62,220 85,138 18,90 102,90" />
            <polygon
              points="130,38 150,108 218,108 162,140 182,212 130,170 78,212 98,140 42,108 110,108"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="max-w-[48rem] mx-auto px-6 md:px-10 text-center relative z-10"
        >
          <motion.div variants={fadeUp}>
            <div className="divider-gold-center mb-8" />
            <h2 className="font-serif text-display-lg text-white font-light">
              {t('samarkand_boukhara_cta_title')}
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-sans text-body-lg text-charcoal-200 mt-6 leading-relaxed"
          >
            {t('samarkand_boukhara_cta_body')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 bg-gold text-charcoal-800 rounded-pill px-8 py-3.5 text-label-lg uppercase tracking-[0.08em] font-semibold hover:bg-gold/90 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-800"
            >
              {t('samarkand_boukhara_cta_contact')}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <Link
              href={`/${locale}/circuits`}
              className="group inline-flex items-center gap-3 border border-white/40 text-white/80 rounded-pill px-8 py-3.5 text-label-lg uppercase tracking-[0.08em] font-medium hover:border-white hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-800"
            >
              {t('samarkand_boukhara_cta_back')}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

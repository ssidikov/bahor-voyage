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
    image: '/images/tours/registan-2.jpg',
    imageAlt: 'Registan, Samarkand',
  },
  {
    key: 'day2',
    image: '/images/tours/Mosquee-Bibi-Khanum.jpg',
    imageAlt: 'Mosquee Bibi Khanum',
  },
  {
    key: 'day3',
    image: '/images/tours/shohizinda.jpg',
    imageAlt: 'Shohizinda',
  },
  {
    key: 'day4',
    image: '/images/tours/bukhara.jpg',
    imageAlt: 'Boukhara',
  },
  {
    key: 'day5',
    image: '/images/tours/Bukhara-Ark.jpg',
    imageAlt: 'Bukhara, Ark',
  },
  {
    key: 'day6',
    image: '/images/tours/Samarkand-2.jpg',
    imageAlt: 'Samarkand',
  },
  {
    key: 'day7',
    image: '/images/tours/Bibi-Khanu-Samarkand.jpg',
    imageAlt: 'Bibi-Khanu-Samarkand',
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
                  <span className="font-sans text-[10px] sm:text-label sm:text-[12px] text-white/90 uppercase tracking-[0.09em] leading-tight">
                    {t(key)}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ INTRO ═══════════════ */}
      <section className="relative overflow-hidden bg-[#faf8f4] py-20 md:py-28 lg:py-36">
        {/* Atmospheric background — subtle warm amber tints */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(200,160,80,0.10) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 10% 80%, rgba(210,180,120,0.12) 0%, transparent 60%)',
          }}
        />
        {/* Fine grain texture overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: '256px 256px',
          }}
        />

        <div className="relative max-w-[88rem] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-stretch"
          >
            {/* ── LEFT COLUMN: image stack ── */}
            <motion.div
              variants={slideRight}
              className="relative flex flex-col lg:pr-14"
            >
              {/* Main portrait image */}
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{ clipPath: 'inset(0 0 0 0)' }}
              >
                <Image
                  src="/images/tours/Registan.jpg"
                  alt="Registan — Samarkand"
                  fill
                  className="object-cover scale-[1.03] hover:scale-[1.06] transition-transform duration-[1400ms] ease-out"
                  placeholder="empty"
                />
                {/* Gradient vignette at bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(15,13,10,0.75) 0%, transparent 50%)',
                  }}
                />
                {/* Corner decoration — top-left */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                    className="absolute top-0 left-0 h-px bg-gold/60 origin-left"
                    style={{ width: '100%' }}
                  />
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                    className="absolute top-0 left-0 w-px bg-gold/60 origin-top"
                    style={{ height: '100%' }}
                  />
                </div>
                {/* Corner decoration — bottom-right */}
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
                    className="absolute bottom-0 right-0 h-px bg-gold/60 origin-right"
                    style={{ width: '100%' }}
                  />
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
                    className="absolute bottom-0 right-0 w-px bg-gold/60 origin-bottom"
                    style={{ height: '100%' }}
                  />
                </div>

                {/* Stats overlay — bottom */}
                <motion.div
                  variants={fadeIn}
                  className="absolute bottom-5 left-5 right-5"
                >
                  {/* Route label — liquid glass pill */}
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 mb-3"
                    style={{
                      background:
                        'linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(10,8,6,0.52) 100%)',
                      backdropFilter: 'blur(24px) saturate(1.8)',
                      WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
                      border: '1px solid rgba(200,160,80,0.38)',
                      boxShadow:
                        'inset 0 1.5px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.15), 0 4px 24px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(200,160,80,0.12)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-none"
                      style={{
                        background: '#c8a050',
                        boxShadow:
                          '0 0 6px 1px rgba(200,160,80,1), 0 0 12px rgba(200,160,80,0.6)',
                      }}
                    />
                    <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-white/85 font-medium">
                      Samarkand · Boukhara · Shahrisabz
                    </span>
                  </div>

                  {/* Micro stats row — liquid glass card */}
                  <div
                    className="grid grid-cols-3 rounded-2xl overflow-hidden"
                    style={{
                      background:
                        'linear-gradient(170deg, rgba(255,255,255,0.16) 0%, rgba(8,6,4,0.55) 100%)',
                      backdropFilter: 'blur(28px) saturate(2)',
                      WebkitBackdropFilter: 'blur(28px) saturate(2)',
                      border: '1px solid rgba(200,160,80,0.32)',
                      boxShadow:
                        'inset 0 1.5px 0 rgba(255,255,255,0.20), inset 0 -1px 0 rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.40), 0 0 0 0.5px rgba(200,160,80,0.10)',
                    }}
                  >
                    {[
                      { v: '3', l: 'Villes' },
                      { v: '7', l: 'Jours' },
                      { v: '5', l: 'UNESCO' },
                    ].map((s, i) => (
                      <div
                        key={s.l}
                        className="flex flex-col items-center py-3"
                        style={{
                          borderRight:
                            i < 2 ? '1px solid rgba(255,255,255,0.10)' : 'none',
                        }}
                      >
                        <span
                          className="font-serif text-[1.1rem] leading-none"
                          style={{
                            color: '#e8c070',
                            textShadow: '0 0 12px rgba(200,160,80,0.6)',
                          }}
                        >
                          {s.v}
                        </span>
                        <span className="font-sans text-[8px] tracking-[0.14em] uppercase text-white/50 mt-1">
                          {s.l}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Small accent rectangle below on desktop */}
              <motion.div
                variants={fadeIn}
                className="hidden lg:block mt-4"
                style={{
                  height: '3px',
                  background: 'linear-gradient(to right, #c8a050, transparent)',
                }}
              />
            </motion.div>

            {/* ── CENTRE DIVIDER ── */}
            <div className="hidden lg:flex flex-col items-center px-8">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1.0, ease: 'easeOut' }}
                className="flex-1 w-px origin-top"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, rgba(200,160,80,0.35) 20%, rgba(200,160,80,0.35) 80%, transparent)',
                }}
              />
              {/* Ornamental diamond cluster */}
              <div className="my-4 flex flex-col items-center gap-1.5">
                <span className="w-1 h-1 bg-gold/35 rotate-45 block" />
                <span className="w-3 h-3 border border-gold/50 rotate-45 block" />
                <span className="w-1 h-1 bg-gold/35 rotate-45 block" />
              </div>
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.0, ease: 'easeOut' }}
                className="flex-1 w-px origin-bottom"
                style={{
                  background:
                    'linear-gradient(to top, transparent, rgba(200,160,80,0.35) 20%, rgba(200,160,80,0.35) 80%, transparent)',
                }}
              />
            </div>

            {/* ── RIGHT COLUMN: content ── */}
            <motion.div
              variants={slideLeft}
              className="flex flex-col justify-center lg:pl-14 pt-10 lg:pt-0"
            >
              {/* Eyebrow — premium badge */}
              <motion.div variants={fadeUp} className="mb-7">
                <div
                  className="inline-flex items-center gap-2.5 rounded-full px-4 py-2"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(200,160,80,0.18) 0%, rgba(200,160,80,0.08) 100%)',
                    border: '1px solid rgba(200,160,80,0.30)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Route icon */}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="2.5"
                      cy="7"
                      r="2"
                      stroke="#C8A050"
                      strokeWidth="1.3"
                    />
                    <circle
                      cx="11.5"
                      cy="7"
                      r="2"
                      stroke="#C8A050"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M4.5 7h5"
                      stroke="#C8A050"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeDasharray="1.5 1.5"
                    />
                  </svg>
                  <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-gold/90 font-medium">
                    {t('samarkand_boukhara_intro_eyebrow') ||
                      'Circuit Signature'}
                  </span>
                </div>
              </motion.div>

              {/* Oversized serif pull quote */}
              <motion.p
                variants={fadeUp}
                className="font-serif leading-[1.12] text-charcoal-700"
                style={{
                  fontSize: 'clamp(1.7rem, 3.2vw, 3rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                }}
              >
                {t('samarkand_boukhara_intro')}
              </motion.p>

              {/* Gold rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
                className="mt-8 mb-8 h-px w-16 origin-left"
                style={{
                  background:
                    'linear-gradient(to right, #c8a050, rgba(200,160,80,0.2))',
                }}
              />

              {/* Body text */}
              <motion.p
                variants={fadeUp}
                className="font-sans text-[0.95rem] text-charcoal-500 leading-relaxed"
              >
                {t('samarkand_boukhara_intro2')}
              </motion.p>

              {/* Highlight glass card */}
              <motion.div
                variants={fadeUp}
                className="mt-8 rounded-xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.80)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(200,160,80,0.25)',
                  boxShadow:
                    '0 2px 16px rgba(200,160,80,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
              >
                <p className="font-sans text-[0.85rem] text-charcoal-500 font-medium uppercase tracking-[0.1em] mb-3">
                  {t('samarkand_boukhara_intro3')}
                </p>
                <ul className="space-y-2.5">
                  {(
                    [
                      'samarkand_boukhara_intro_bullet1',
                      'samarkand_boukhara_intro_bullet2',
                    ] as const
                  ).map((key) => (
                    <li
                      key={key}
                      className="flex items-start gap-3 font-sans text-[0.88rem] text-charcoal-500 leading-snug"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[3px] flex-none w-5 h-5 rounded-full flex items-center justify-center"
                        style={{
                          background: 'rgba(200,160,80,0.14)',
                          border: '1px solid rgba(200,160,80,0.28)',
                        }}
                      >
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path
                            d="M1.5 4.5l2 2 4-4"
                            stroke="#C8A050"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10">
                <Link
                  href={`/${locale}/contact`}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-3.5 text-[0.78rem] uppercase tracking-[0.12em] font-semibold text-white transition-all duration-300 bg-primary-400 hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f4]"
                >
                  {t('samarkand_boukhara_cta_contact')}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </motion.div>
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
                    {/* Polaroid-style photo card */}
                    <div
                      className="bg-white"
                      style={{
                        padding: '10px 10px 0 10px',
                        boxShadow:
                          '0 4px 24px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.08)',
                      }}
                    >
                      {/* Photo */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={day.image}
                          alt={day.imageAlt}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          placeholder="empty"
                        />
                      </div>
                      {/* Caption strip */}
                      <div className="py-5 px-2 text-center">
                        <p
                          className="font-serif text-charcoal-500 italic leading-snug"
                          style={{
                            fontSize: '0.92rem',
                            letterSpacing: '0.01em',
                          }}
                        >
                          {day.imageAlt}
                        </p>
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

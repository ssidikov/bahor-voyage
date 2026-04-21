'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui';
import {
  fadeIn,
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
} from '@/lib/animations';
import type { TourStat } from './types';

interface TourIntroProps {
  prefix: string;
  slug: string;
  availableDatesCount: number;
  introImage: string;
  introImageAlt: string;
  routeLabel: string;
  stats: [TourStat, TourStat, TourStat];
  /** Keys that supply extra bullet points inside the highlight glass card */
  introBulletKeys?: readonly string[];
}

export default function TourIntro({
  prefix,
  slug,
  availableDatesCount,
  introImage,
  introImageAlt,
  routeLabel,
  stats,
  introBulletKeys,
}: TourIntroProps) {
  const t = useTranslations('circuits');

  return (
    <section className="relative overflow-hidden bg-[#faf8f4] py-20 md:py-28 lg:py-36">
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(200,160,80,0.10) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 10% 80%, rgba(210,180,120,0.12) 0%, transparent 60%)',
        }}
      />
      {/* Fine grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: '256px 256px',
        }}
      />

      <div className="relative max-w-352 mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-stretch"
        >
          {/* ── LEFT: image stack ── */}
          <motion.div
            variants={slideRight}
            className="relative flex flex-col lg:pr-14"
          >
            <div
              className="relative aspect-3/4 overflow-hidden"
              style={{ clipPath: 'inset(0 0 0 0)' }}
            >
              <Image
                src={introImage}
                alt={introImageAlt}
                fill
                className="object-cover scale-[1.03] hover:scale-[1.06] transition-transform duration-1400 ease-out"
                placeholder="empty"
              />
              {/* Gradient vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(15,13,10,0.75) 0%, transparent 50%)',
                }}
              />

              {/* Corner — top-left */}
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
              {/* Corner — bottom-right */}
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

              {/* Overlays */}
              <motion.div
                variants={fadeIn}
                className="absolute bottom-5 left-5 right-5"
              >
                {/* Route label pill */}
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
                    {routeLabel}
                  </span>
                </div>

                {/* Micro-stats row */}
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
                  {stats.map((s, i) => (
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

            {/* Gold accent rule */}
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

          {/* ── RIGHT: text content ── */}
          <motion.div
            variants={slideLeft}
            className="flex flex-col justify-center lg:pl-14 pt-10 lg:pt-0"
          >
            {/* Eyebrow badge */}
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
                  {t(`${prefix}_intro_eyebrow` as Parameters<typeof t>[0])}
                </span>
              </div>
            </motion.div>

            {/* Oversized pull-quote */}
            <motion.p
              variants={fadeUp}
              className="font-serif leading-[1.12] text-charcoal-700"
              style={{
                fontSize: 'clamp(1.4rem, 1.2vw, 1.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
              }}
            >
              {t(`${prefix}_intro` as Parameters<typeof t>[0])}
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

            {/* Body */}
            <motion.p
              variants={fadeUp}
              className="font-sans text-[0.95rem] text-charcoal-500 leading-relaxed"
            >
              {t(`${prefix}_intro2` as Parameters<typeof t>[0])}
            </motion.p>

            {/* Highlight glass card */}
            {introBulletKeys && introBulletKeys.length > 0 && (
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
                <p className="font-sans text-[0.85rem] text-charcoal-500 font-medium uppercase tracking-widest mb-3">
                  {t(`${prefix}_intro3` as Parameters<typeof t>[0])}
                </p>
                <ul className="space-y-2.5">
                  {introBulletKeys.map((key) => (
                    <li
                      key={key}
                      className="flex items-center gap-3 font-sans text-[0.88rem] text-charcoal-500 leading-snug"
                    >
                      <span
                        aria-hidden="true"
                        className="flex-none w-5 h-5 rounded-full flex items-center justify-center"
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
                      {t(key as Parameters<typeof t>[0])}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            <motion.div variants={fadeUp} className="mt-10">
              <Button
                href={
                  availableDatesCount > 0 ? `/booking?tour=${slug}` : '/contact'
                }
                variant="primary"
                size="lg"
                className="group relative overflow-hidden text-[0.78rem] uppercase tracking-[0.12em] font-semibold"
              >
                {availableDatesCount > 0
                  ? t('page_cta_button_book')
                  : t(`${prefix}_cta_contact` as Parameters<typeof t>[0])}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

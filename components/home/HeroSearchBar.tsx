'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';
import { fadeUp } from '@/lib/animations';

import type { CircuitTheme, DurationBucket, Season } from '@/lib/circuit-meta';

/* ------------------------------------------------------------------ */
/*  Chevron icon for select inputs                                      */
/* ------------------------------------------------------------------ */
import { ChevronDown } from '@/components/ui/Icons';

/* ------------------------------------------------------------------ */
/*  Search icon for CTA button                                          */
/* ------------------------------------------------------------------ */
function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7.5" cy="7.5" r="5.5" />
      <path d="M11.5 11.5L16 16" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export default function HeroSearchBar() {
  const t = useTranslations('home');
  const router = useRouter();

  const [theme, setTheme] = useState<CircuitTheme | ''>('');
  const [duration, setDuration] = useState<DurationBucket | ''>('');
  const [season, setSeason] = useState<Season | ''>('');

  function handleSubmit() {
    const params = new URLSearchParams();
    if (theme) params.set('theme', theme);
    if (duration) params.set('duration', duration);
    if (season) params.set('season', season);

    const qs = params.toString();
    router.push(`/circuits${qs ? `?${qs}` : ''}`);
  }

  const selectBase =
    'appearance-none bg-white/10 border border-white/20 text-white rounded-xl ' +
    'pl-4 pr-10 py-3 text-sm font-medium tracking-wide ' +
    'backdrop-blur-sm transition-all duration-300 cursor-pointer ' +
    'hover:bg-white/15 hover:border-white/35 ' +
    'focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 ' +
    'w-full lg:w-auto lg:min-w-44';

  const wrapperBase = 'relative flex items-center';

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
      className="mt-8"
    >
      <div
        className={
          'rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md ' +
          'shadow-[0_8px_32px_rgba(0,0,0,0.25)] ' +
          'p-4 md:p-5 ' +
          'flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4'
        }
      >
        {/* Theme select */}
        <div className={wrapperBase}>
          <select
            id="hero-search-theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value as CircuitTheme | '')}
            className={selectBase}
          >
            <option value="">{t('hero_search_placeholder_theme')}</option>
            <option value="culturel">{t('hero_search_theme_cultural')}</option>
            <option value="solidaire">
              {t('hero_search_theme_solidarity')}
            </option>
            <option value="immersion">
              {t('hero_search_theme_immersion')}
            </option>
            <option value="grand">{t('hero_search_theme_grand')}</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 text-white/60" />
        </div>

        {/* Duration select */}
        <div className={wrapperBase}>
          <select
            id="hero-search-duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value as DurationBucket | '')}
            className={selectBase}
          >
            <option value="">{t('hero_search_placeholder_duration')}</option>
            <option value="week">{t('hero_search_duration_week')}</option>
            <option value="medium">{t('hero_search_duration_medium')}</option>
            <option value="long">{t('hero_search_duration_long')}</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 text-white/60" />
        </div>

        {/* Season select */}
        <div className={wrapperBase}>
          <select
            id="hero-search-season"
            value={season}
            onChange={(e) => setSeason(e.target.value as Season | '')}
            className={selectBase}
          >
            <option value="">{t('hero_search_placeholder_season')}</option>
            <option value="printemps">{t('hero_search_season_spring')}</option>
            <option value="ete">{t('hero_search_season_summer')}</option>
            <option value="automne">{t('hero_search_season_autumn')}</option>
            <option value="hiver">{t('hero_search_season_winter')}</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 text-white/60" />
        </div>

        {/* Divider (desktop only) */}
        <div className="hidden lg:block w-px h-8 bg-white/15" />

        {/* Submit CTA */}
        <button
          id="hero-search-submit"
          type="button"
          onClick={handleSubmit}
          className={
            'inline-flex items-center justify-center gap-2.5 ' +
            'bg-primary hover:bg-primary-hover text-on-action ' +
            'rounded-xl px-6 py-3 text-sm font-semibold tracking-wide ' +
            'transition-all duration-300 ' +
            'hover:shadow-[0_4px_20px_rgba(47,110,115,0.4)] ' +
            'focus:outline-none focus:ring-2 focus:ring-white/40 ' +
            'w-full lg:w-auto lg:min-w-48 cursor-pointer'
          }
        >
          <SearchIcon />
          {t('hero_search_cta')}
        </button>
      </div>
    </motion.div>
  );
}

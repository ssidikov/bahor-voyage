'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';

import type { CircuitTheme, DurationBucket, Season } from '@/lib/circuit-meta';

import { ChevronDown } from '@/components/ui/Icons';

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8.5" cy="8.5" r="6" />
      <path d="M13 13L17.5 17.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="14" height="14" rx="2" />
      <path d="M7 2v4M13 2v4M3 9h14" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6v4l2.5 2.5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7" cy="7" r="3" />
      <path d="M2 17c0-3 2.5-5 5-5s5 2 5 5" />
      <circle cx="14" cy="7" r="2.5" />
      <path d="M14 12c2 0 4 1.5 4 4" />
    </svg>
  );
}

export default function HeroSearchBar() {
  const t = useTranslations('home');
  const router = useRouter();

  const [theme, setTheme] = useState<CircuitTheme | ''>('');
  const [duration, setDuration] = useState<DurationBucket | ''>('');
  const [season, setSeason] = useState<Season | ''>('');
  const [travelers, setTravelers] = useState(1);

  function handleSubmit() {
    const params = new URLSearchParams();
    if (theme) params.set('theme', theme);
    if (duration) params.set('duration', duration);
    if (season) params.set('season', season);
    if (travelers > 1) params.set('travelers', String(travelers));

    const qs = params.toString();
    router.push(`/circuits${qs ? `?${qs}` : ''}`);
  }

  const selectBase =
    'appearance-none w-full bg-white/75 backdrop-blur-sm rounded-xl px-4 py-4 pl-11 pr-10 text-sm font-medium text-charcoal-800 ' +
    'transition-all duration-200 cursor-pointer border border-white/60 ' +
    'focus:outline-none focus:ring-2 focus:ring-charcoal-300/40 focus:bg-white/90';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full lg:max-w-[405px] bg-white/60 backdrop-blur-2xl rounded-3xl p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/60"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full border border-white/50 bg-white/50 flex items-center justify-center text-charcoal-700">
          <SearchIcon />
        </div>
        <h3 className="font-sans text-xl font-semibold text-charcoal-900 tracking-tight">
          {t('hero_search_title')}
        </h3>
      </div>

      {/* Theme field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-charcoal-600 capitalize mb-2">
          {t('hero_search_placeholder_theme')}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-600 z-10 pointer-events-none">
            <SearchIcon />
          </span>
          <select
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
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-600" />
        </div>
      </div>

      {/* Season & Duration row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-charcoal-600 capitalize mb-2">
            {t('hero_search_placeholder_season')}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-600 z-10 pointer-events-none">
              <CalendarIcon />
            </span>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value as Season | '')}
              className={selectBase}
            >
              <option value="">{t('hero_search_placeholder_season')}</option>
              <option value="printemps">
                {t('hero_search_season_spring')}
              </option>
              <option value="ete">{t('hero_search_season_summer')}</option>
              <option value="automne">{t('hero_search_season_autumn')}</option>
              <option value="hiver">{t('hero_search_season_winter')}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-600" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal-600 capitalize mb-2">
            {t('hero_search_placeholder_duration')}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-600 z-10 pointer-events-none">
              <ClockIcon />
            </span>
            <select
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value as DurationBucket | '')
              }
              className={selectBase}
            >
              <option value="">{t('hero_search_placeholder_duration')}</option>
              <option value="week">{t('hero_search_duration_week')}</option>
              <option value="medium">{t('hero_search_duration_medium')}</option>
              <option value="long">{t('hero_search_duration_long')}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-600" />
          </div>
        </div>
      </div>

      {/* Travelers field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-charcoal-600 capitalize mb-2">
          {t('hero_search_travelers_label')}
        </label>
        <div className="relative flex items-center bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/80">
          <span className="text-charcoal-600 mr-3">
            <UsersIcon />
          </span>
          <span className="flex-1 text-sm font-medium text-charcoal-800">
            {travelers}{' '}
            {travelers > 1
              ? t('hero_search_travelers_plural')
              : t('hero_search_travelers_singular')}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTravelers((v) => Math.max(1, v - 1))}
              disabled={travelers <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition-colors hover:bg-charcoal-100 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={t('hero_search_travelers_minus')}
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setTravelers((v) => Math.min(20, v + 1))}
              disabled={travelers >= 20}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition-colors hover:bg-charcoal-100 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={t('hero_search_travelers_plus')}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <motion.button
        type="button"
        onClick={handleSubmit}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={
          'w-full bg-charcoal-800 text-white font-semibold text-base py-[18px] rounded-full ' +
          'shadow-[0_8px_24px_rgba(21,20,18,0.2)] transition-all duration-300 ' +
          'hover:bg-charcoal-900 hover:shadow-[0_12px_32px_rgba(21,20,18,0.3)] ' +
          'focus:outline-none focus:ring-2 focus:ring-charcoal-400/30 cursor-pointer'
        }
      >
        {t('hero_search_cta')}
      </motion.button>
    </motion.div>
  );
}

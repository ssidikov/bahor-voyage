'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';
import { fadeUp } from '@/lib/animations';

import type { CircuitTheme, DurationBucket, Season } from '@/lib/circuit-meta';

import { ChevronDown } from '@/components/ui/Icons';

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
    'appearance-none rounded-xl border border-white/60 bg-white/90 pl-4 pr-10 py-3.5 text-sm font-medium tracking-wide text-charcoal-700 ' +
    'shadow-[0_4px_12px_rgba(21,20,18,0.04)] backdrop-blur-sm transition-all duration-300 cursor-pointer ' +
    'hover:border-primary/30 hover:bg-white hover:shadow-[0_8px_24px_rgba(21,20,18,0.08)] ' +
    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 ' +
    'w-full';

  const wrapperBase = 'relative flex items-center';

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.7, delay: 1.6, ease: 'easeOut' }}
      className="mt-8"
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-white/50 bg-white/75 p-4 shadow-[0_16px_48px_rgba(21,20,18,0.12),0_4px_12px_rgba(21,20,18,0.06)] backdrop-blur-2xl md:p-5"
      >
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          <div className={wrapperBase}>
            <select
              id="hero-search-theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value as CircuitTheme | '')}
              className={selectBase}
            >
              <option value="">{t('hero_search_placeholder_theme')}</option>
              <option value="culturel">
                {t('hero_search_theme_cultural')}
              </option>
              <option value="solidaire">
                {t('hero_search_theme_solidarity')}
              </option>
              <option value="immersion">
                {t('hero_search_theme_immersion')}
              </option>
              <option value="grand">{t('hero_search_theme_grand')}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 text-charcoal-400" />
          </div>

          <div className={wrapperBase}>
            <select
              id="hero-search-duration"
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
            <ChevronDown className="pointer-events-none absolute right-4 text-charcoal-400" />
          </div>

          <div className={wrapperBase}>
            <select
              id="hero-search-season"
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
            <ChevronDown className="pointer-events-none absolute right-4 text-charcoal-400" />
          </div>

          <motion.button
            id="hero-search-submit"
            type="button"
            onClick={handleSubmit}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={
              'inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold tracking-wide text-white ' +
              'shadow-[0_8px_24px_rgba(47,110,115,0.25)] transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_12px_32px_rgba(47,110,115,0.35)] ' +
              'focus:outline-none focus:ring-2 focus:ring-primary/25 cursor-pointer'
            }
          >
            <SearchIcon />
            {t('hero_search_cta')}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

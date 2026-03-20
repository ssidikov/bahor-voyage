import type { ReactElement } from 'react';

/** A single day entry in the tour itinerary */
export interface TourDay {
  /** Short key like "day1" – used to build translation keys */
  key: string;
  /** Absolute image path */
  image: string;
  /** Alt text for the image */
  imageAlt: string;
}

/** A quick-fact item shown on the hero bar */
export interface TourFact {
  /** Full translation key, e.g. "samarkand_boukhara_fact_group" */
  key: string;
  icon: ReactElement;
}

/** A practical-info item (visa, flight, season, currency …) */
export interface TourPractical {
  /** Full translation key */
  key: string;
  icon: ReactElement;
}

/** Micro-stat shown on the intro image overlay */
export interface TourStat {
  v: string;
  l: string;
}

/**
 * All tour-specific data fed into the shared template.
 * Translation keys are namespaced under `circuits`.
 */
export interface TourData {
  /** Prefix used to build every translation key, e.g. "samarkand_boukhara" */
  prefix: string;

  /** Hero background image path */
  heroImage: string;

  /** Main intro portrait image */
  introImage: string;
  introImageAlt: string;

  /** Route label text shown on the intro image pill (hardcoded – not translated) */
  routeLabel: string;

  /** Micro-stats shown on the intro image overlay */
  stats: [TourStat, TourStat, TourStat];

  /** Day-by-day itinerary entries */
  days: TourDay[];

  /** Short keys for included items, e.g. ["include1" … "include6"] */
  includes: readonly string[];

  /** Short keys for excluded items, e.g. ["exclude1" … "exclude4"] */
  excludes: readonly string[];

  /** Quick-fact bar items for the hero */
  facts: TourFact[];

  /** Practical info items */
  practicals: TourPractical[];
}

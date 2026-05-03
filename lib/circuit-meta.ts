export type CircuitTheme = 'culturel' | 'solidaire' | 'immersion' | 'grand';
export type Season = 'printemps' | 'ete' | 'automne' | 'hiver';

export interface CircuitMeta {
  id: 'c1' | 'c2' | 'c3' | 'c4';
  slug: string;
  theme: CircuitTheme;
  days: number;
  seasons: readonly Season[];
  image: string;
  href: string;
}

export const CIRCUIT_META: readonly CircuitMeta[] = [
  {
    id: 'c1',
    slug: 'samarcande-boukhara',
    theme: 'culturel',
    days: 7,
    seasons: ['printemps', 'automne'],
    image: '/images/Boukhara.jpg',
    href: '/circuits/samarcande-boukhara',
  },
  {
    id: 'c2',
    slug: 'voyage-solidaire-11j',
    theme: 'solidaire',
    days: 11,
    seasons: ['printemps', 'automne'],
    image: '/images/voyage-solidaire.avif',
    href: '/circuits/voyage-solidaire-11j',
  },
  {
    id: 'c3',
    slug: 'immersion-totale-14j',
    theme: 'immersion',
    days: 14,
    seasons: ['printemps', 'automne', 'ete'],
    image: '/images/afor-voyage-2.jpeg',
    href: '/circuits/immersion-totale-14j',
  },
  {
    id: 'c4',
    slug: 'grand-circuit-18j',
    theme: 'grand',
    days: 18,
    seasons: ['printemps', 'automne', 'ete'],
    image: '/images/immersion-totale.jpeg',
    href: '/circuits/grand-circuit-18j',
  },
] as const;

/** Duration bucket IDs used for filtering */
export type DurationBucket = 'week' | 'medium' | 'long';

export function matchesDuration(days: number, bucket: DurationBucket): boolean {
  switch (bucket) {
    case 'week':
      return days <= 7;
    case 'medium':
      return days >= 10 && days <= 14;
    case 'long':
      return days >= 15;
  }
}

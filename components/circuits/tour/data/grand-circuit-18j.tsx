import type { TourData } from '../types';

export const grandCircuit18j: TourData = {
  prefix: 'grand_circuit_18j',

  heroImage: '/images/tours/khiva-hero.jpg',

  introImage: '/images/tours/Registan.jpg',
  introImageAlt: 'Place du Régistan — Samarcande',

  routeLabel:
    'Tachkent · Nukus · Khiva · Boukhara · Samarcande · Ferghana · Andijan · Tachkent',

  stats: [
    { v: '8', l: 'Villes' },
    { v: '18', l: 'Jours' },
    { v: '6', l: 'Régions' },
  ],

  days: [
    {
      key: 'day1',
      image: '/images/tours/Samarkand.jpg',
      imageAlt: 'Tachkent, Ouzbékistan',
    },
    {
      key: 'day2',
      image: '/images/tours/Samarkand-2.jpg',
      imageAlt: 'Vieille ville de Tachkent',
    },
    {
      key: 'day3',
      image: '/images/tours/Bukhara-minaret.jpg',
      imageAlt: 'Musée Savitsky, Nukus',
    },
    {
      key: 'day4',
      image: '/images/tours/Chor-Bakr.jpg',
      imageAlt: 'Forteresses du désert, Karakalpakstan',
    },
    {
      key: 'day5',
      image: '/images/tours/Samarkand-2.jpg',
      imageAlt: 'Khiva, Ichan Kala depuis les remparts',
    },
    {
      key: 'day6',
      image: '/images/tours/Bukhara-Old-Sity.jpg',
      imageAlt: 'Projet AFOR, Gurlan',
    },
    {
      key: 'day7',
      image: '/images/tours/Chor-Bakr.jpg',
      imageAlt: 'Soierie ikat, campagne ouzbèke',
    },
    {
      key: 'day8',
      image: '/images/tours/Bukhara-Ark.jpg',
      imageAlt: 'Boukhara — Citadelle Ark',
    },
    {
      key: 'day9',
      image: '/images/tours/Bukhara-minaret.jpg',
      imageAlt: 'Médersas de Boukhara',
    },
    {
      key: 'day10',
      image: '/images/tours/Chor-Bakr.jpg',
      imageAlt: 'Chor-Bakr, Sitorai Mohi-Hosa',
    },
    {
      key: 'day11',
      image: '/images/tours/Registan.jpg',
      imageAlt: 'Samarcande — Régistan au crépuscule',
    },
    {
      key: 'day12',
      image: '/images/tours/Mausole-Gur-Emir.jpg',
      imageAlt: 'Gur-e-Amir, mausolée de Tamerlan',
    },
    {
      key: 'day13',
      image: '/images/tours/shohizinda.jpg',
      imageAlt: 'Shah-i-Zinda, nécropole sacrée',
    },
    {
      key: 'day14',
      image: '/images/tours/Bibi-Khanu-Samarkand.jpg',
      imageAlt: 'Mosquée Bibi-Khanym',
    },
    {
      key: 'day15',
      image: '/images/tours/Samarkand.jpg',
      imageAlt: 'Vallée de Ferghana, Margilan',
    },
    {
      key: 'day16',
      image: '/images/tours/Samarkand-2.jpg',
      imageAlt: 'Ferghana — ateliers de soie Atlas',
    },
    {
      key: 'day17',
      image: '/images/tours/Bukhara-Old-Sity.jpg',
      imageAlt: 'Andijan et retour à Tachkent',
    },
    {
      key: 'day18',
      image: '/images/tours/Bukhara-minaret.jpg',
      imageAlt: 'Départ depuis Tachkent',
    },
  ],

  includes: [
    'include1',
    'include2',
    'include3',
    'include4',
    'include5',
    'include6',
    'include7',
    'include8',
    'include9',
  ],

  excludes: ['exclude1', 'exclude2', 'exclude3', 'exclude4'],

  facts: [
    {
      key: 'grand_circuit_18j_fact_group',
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
      key: 'grand_circuit_18j_fact_guide',
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
      key: 'grand_circuit_18j_fact_comfort',
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
          <path d="M3 9.5L10 3l7 6.5" />
          <path d="M5 9v7h10V9" />
          <rect x="8" y="13" width="4" height="4" />
        </svg>
      ),
    },
    {
      key: 'grand_circuit_18j_fact_custom',
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
  ],

  practicals: [
    {
      key: 'grand_circuit_18j_practical_visa',
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          stroke="#C8A050"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="5" y="3" width="18" height="22" rx="2" />
          <line x1="5" y1="9" x2="23" y2="9" />
          <circle cx="14" cy="16" r="3.5" />
          <line x1="10.5" y1="21.5" x2="17.5" y2="21.5" />
          <path d="M8 5.5h4" strokeWidth="1.2" opacity="0.5" />
        </svg>
      ),
    },
    {
      key: 'grand_circuit_18j_practical_flight',
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          stroke="#C8A050"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path
            d="M14 3 C13 3 12 4 12 5.5 L11 13 L5 16 L5 18 L12 16.5 L12.5 21 L10.5 22 L10.5 23.5 L14 22.5 L17.5 23.5 L17.5 22 L15.5 21 L16 16.5 L23 18 L23 16 L17 13 L16 5.5 C16 4 15 3 14 3Z"
            fill="rgba(200,160,80,0.15)"
          />
        </svg>
      ),
    },
    {
      key: 'grand_circuit_18j_practical_season',
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          stroke="#C8A050"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="14" cy="14" r="4" fill="rgba(200,160,80,0.15)" />
          <line x1="14" y1="4" x2="14" y2="7" />
          <line x1="14" y1="21" x2="14" y2="24" />
          <line x1="4" y1="14" x2="7" y2="14" />
          <line x1="21" y1="14" x2="24" y2="14" />
          <line x1="7.05" y1="7.05" x2="9.17" y2="9.17" />
          <line x1="18.83" y1="18.83" x2="20.95" y2="20.95" />
          <line x1="20.95" y1="7.05" x2="18.83" y2="9.17" />
          <line x1="9.17" y1="18.83" x2="7.05" y2="20.95" />
          <circle cx="14" cy="14" r="4" />
        </svg>
      ),
    },
    {
      key: 'grand_circuit_18j_practical_currency',
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          stroke="#C8A050"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 8.5a8 8 0 1 0 0 11" />
          <line x1="7" y1="13" x2="16" y2="13" />
          <line x1="7" y1="16" x2="15" y2="16" />
        </svg>
      ),
    },
  ],
};

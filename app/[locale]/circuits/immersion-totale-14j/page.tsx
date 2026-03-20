import type { Metadata } from 'next';

import { setRequestLocale } from 'next-intl/server';

import ImmersionTotale14JPage from '@/components/circuits/ImmersionTotale14JPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Immersion Totale 14 Jours en Ouzbékistan — Voyage Solidaire | Bahor Voyage'
    : '14-Day Total Immersion in Uzbekistan — Solidarity Journey | Bahor Voyage';

  const description = isFr
    ? "Circuit 14 jours à travers Nukus, Khiva, Boukhara, Samarcande et Tachkent. Deux semaines d'immersion entre villes millénaires et campagne ouzbèke, nuits chez l'habitant et tourisme équitable. Guide francophone depuis Lyon."
    : '14-day tour through Nukus, Khiva, Bukhara, Samarkand and Tashkent. Two weeks of immersion between ancient cities and Uzbek countryside, homestays and fair tourism. French-speaking guide.';

  const canonicalPath = isFr
    ? '/circuits/immersion-totale-14j'
    : '/en/circuits/immersion-totale-14j';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        fr: '/circuits/immersion-totale-14j',
        en: '/en/circuits/immersion-totale-14j',
        'x-default': '/circuits/immersion-totale-14j',
      },
    },
    openGraph: {
      title,
      description,
      url: isFr
        ? 'https://www.bahor-voyage.com/circuits/immersion-totale-14j'
        : 'https://www.bahor-voyage.com/en/circuits/immersion-totale-14j',
      siteName: 'Bahor-Voyage',
      locale: isFr ? 'fr_FR' : 'en_US',
      alternateLocale: isFr ? 'en_US' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: '/images/tours/Registan.jpg',
          width: 1200,
          height: 630,
          alt: isFr
            ? 'Place du Régistan, Samarcande, Ouzbékistan'
            : 'Registan Square, Samarkand, Uzbekistan',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/tours/Registan.jpg'],
    },
  };
}

export default async function ImmersionTotale14JRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ImmersionTotale14JPage />;
}

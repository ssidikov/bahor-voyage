import type { Metadata } from 'next';

import { setRequestLocale } from 'next-intl/server';

import GrandCircuit18JPage from '@/components/circuits/GrandCircuit18JPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Grand Circuit 18 Jours en Ouzbékistan — Confort & Authenticité | Bahor Voyage'
    : '18-Day Grand Tour of Uzbekistan — Comfort & Authenticity | Bahor Voyage';

  const description = isFr
    ? "Circuit 18 jours à travers Tachkent, Nukus, Khiva, Boukhara, Samarcande, la vallée de Ferghana et Andijan. Une plongée étendue et profonde dans les merveilles de l'Ouzbékistan, alliant confort, richesse culturelle et rencontres humaines singulières. Guide francophone depuis Lyon."
    : '18-day tour through Tashkent, Nukus, Khiva, Bukhara, Samarkand, the Fergana Valley and Andijan. An extended and deep dive into the wonders of Uzbekistan, combining comfort, cultural discovery and unique human encounters. French-speaking guide.';

  const canonicalPath = isFr
    ? '/circuits/grand-circuit-18j'
    : '/en/circuits/grand-circuit-18j';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        fr: '/circuits/grand-circuit-18j',
        en: '/en/circuits/grand-circuit-18j',
        'x-default': '/circuits/grand-circuit-18j',
      },
    },
    openGraph: {
      title,
      description,
      url: isFr
        ? 'https://www.bahor-voyage.com/circuits/grand-circuit-18j'
        : 'https://www.bahor-voyage.com/en/circuits/grand-circuit-18j',
      siteName: 'Bahor-Voyage',
      locale: isFr ? 'fr_FR' : 'en_US',
      alternateLocale: isFr ? 'en_US' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: '/images/tours/Bibi-Khanu-Samarkand.jpg',
          width: 1200,
          height: 630,
          alt: isFr
            ? 'Mosquée Bibi-Khanym, Samarcande, Ouzbékistan'
            : 'Bibi-Khanym Mosque, Samarkand, Uzbekistan',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/tours/Bibi-Khanu-Samarkand.jpg'],
    },
  };
}

import prisma from '@/lib/prisma';

export default async function GrandCircuit18JRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const availableDatesCount = await prisma.tourDate.count({
    where: {
      tour: { slug: 'grand-circuit-18j' },
      isActive: true,
      startDate: { gte: new Date() },
    },
  });

  return <GrandCircuit18JPage availableDatesCount={availableDatesCount} />;
}

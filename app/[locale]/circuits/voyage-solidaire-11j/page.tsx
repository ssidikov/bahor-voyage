import type { Metadata } from 'next';

import { setRequestLocale } from 'next-intl/server';

import VoyageSolidaire11JPage from '@/components/circuits/VoyageSolidaire11JPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Voyage Solidaire 11 Jours en Ouzbékistan — Route de la Soie | Bahor Voyage'
    : '11-Day Solidarity Tour in Uzbekistan — Silk Road | Bahor Voyage';

  const description = isFr
    ? "Circuit 11 jours à travers Nukus, Khiva, Boukhara, Samarcande et Tachkent. Immersion dans la campagne ouzbèke, nuits chez l'habitant et tourisme équitable. Guide francophone depuis Lyon."
    : '11-day tour through Nukus, Khiva, Bukhara, Samarkand and Tashkent. Immersion in Uzbek countryside, homestays and fair tourism. French-speaking guide.';

  const canonicalPath = isFr
    ? '/circuits/voyage-solidaire-11j'
    : '/en/circuits/voyage-solidaire-11j';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        fr: '/circuits/voyage-solidaire-11j',
        en: '/en/circuits/voyage-solidaire-11j',
        'x-default': '/circuits/voyage-solidaire-11j',
      },
    },
    openGraph: {
      title,
      description,
      url: isFr
        ? 'https://www.bahor-voyage.com/circuits/voyage-solidaire-11j'
        : 'https://www.bahor-voyage.com/en/circuits/voyage-solidaire-11j',
      siteName: 'Bahor-Voyage',
      locale: isFr ? 'fr_FR' : 'en_US',
      alternateLocale: isFr ? 'en_US' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: '/images/tours/Bukhara-Old-Sity.jpg',
          width: 1200,
          height: 630,
          alt: isFr
            ? 'Vieille ville de Boukhara, Ouzbékistan'
            : 'Old town of Bukhara, Uzbekistan',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/tours/Bukhara-Old-Sity.jpg'],
    },
  };
}

import prisma from '@/lib/prisma';

export default async function VoyageSolidaire11JRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const availableDatesCount = await prisma.tourDate.count({
    where: {
      tour: { slug: 'voyage-solidaire-11j' },
      isActive: true,
      startDate: { gte: new Date() },
    },
  });

  return <VoyageSolidaire11JPage availableDatesCount={availableDatesCount} />;
}

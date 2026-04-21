import type { Metadata } from 'next';

import { setRequestLocale } from 'next-intl/server';

import SamarkandBukharaPage from '@/components/circuits/SamarkandBukharaPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Circuit Samarcande & Boukhara — 7 Jours sur la Route de la Soie | Bahor Voyage'
    : 'Samarkand & Bukhara Tour — 7 Days on the Silk Road | Bahor Voyage';

  const description = isFr
    ? 'Découvrez Samarcande et Boukhara en 7 jours avec un guide francophone. Régistan, mausolée de Tamerlan, citadelle Ark et rencontres authentiques. Circuit personnalisable depuis Lyon.'
    : "Discover Samarkand and Bukhara in 7 days with a French-speaking guide. Registan, Tamerlane's mausoleum, Ark citadel and authentic encounters. Customisable tour from Lyon.";

  const canonicalPath = isFr
    ? '/circuits/samarcande-boukhara'
    : '/en/circuits/samarcande-boukhara';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        fr: '/circuits/samarcande-boukhara',
        en: '/en/circuits/samarcande-boukhara',
        'x-default': '/circuits/samarcande-boukhara',
      },
    },
    openGraph: {
      title,
      description,
      url: isFr
        ? 'https://www.bahor-voyage.com/circuits/samarcande-boukhara'
        : 'https://www.bahor-voyage.com/en/circuits/samarcande-boukhara',
      siteName: 'Bahor-Voyage',
      locale: isFr ? 'fr_FR' : 'en_US',
      alternateLocale: isFr ? 'en_US' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: '/images/samarkand.jpeg',
          width: 1200,
          height: 630,
          alt: isFr
            ? 'Le Régistan de Samarcande au coucher du soleil'
            : 'Registan of Samarkand at sunset',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/samarkand.jpeg'],
    },
  };
}

import prisma from '@/lib/prisma';

export default async function SamarkandBukharaRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const availableDatesCount = await prisma.tourDate.count({
    where: {
      tour: { slug: 'samarcande-boukhara' },
      isActive: true,
      startDate: { gte: new Date() },
    },
  });

  return <SamarkandBukharaPage availableDatesCount={availableDatesCount} />;
}

import type { Metadata } from 'next';

import { setRequestLocale } from 'next-intl/server';

import CircuitsPage from '@/components/circuits/CircuitsPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Nos Circuits — Voyages authentiques sur la Route de la Soie'
    : 'Our Tours — Authentic Silk Road Journeys';

  const description = isFr
    ? 'Découvrez nos 4 circuits signature en Ouzbékistan : courts séjours, voyages solidaires et immersions totales. Itinéraires 100 % personnalisables, en petits groupes depuis Lyon.'
    : 'Discover our 4 signature tours in Uzbekistan: short stays, solidarity journeys and total immersions. 100% customisable itineraries, in small groups from Lyon.';

  return {
    title,
    description,
    alternates: {
      canonical: isFr ? '/circuits' : '/en/circuits',
      languages: {
        fr: '/circuits',
        en: '/en/circuits',
        'x-default': '/circuits',
      },
    },
    openGraph: {
      title,
      description,
      url: isFr
        ? 'https://www.bahor-voyage.com/circuits'
        : 'https://www.bahor-voyage.com/en/circuits',
      siteName: 'Bahor-Voyage',
      locale: isFr ? 'fr_FR' : 'en_US',
      alternateLocale: isFr ? 'en_US' : 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

import { Suspense } from 'react';

export default async function CircuitsRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense>
      <CircuitsPage />
    </Suspense>
  );
}

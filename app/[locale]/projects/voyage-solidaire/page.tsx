import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import VoyageSolidairePage from '@/components/projects/VoyageSolidairePage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Voyage Solidaire en Ouzbékistan — AFOR & Bahor-Voyage'
    : 'Solidarity Travel in Uzbekistan — AFOR & Bahor-Voyage';

  const description = isFr
    ? 'Découvrez le voyage solidaire en Ouzbékistan avec AFOR : rencontre humaine, économie locale et transmission du savoir. Circuits sur-mesure depuis Lyon.'
    : 'Discover solidarity travel in Uzbekistan with AFOR: human connection, local economy, and knowledge sharing. Tailor-made itineraries from Lyon.';

  const canonicalPath = isFr
    ? '/projects/voyage-solidaire'
    : '/en/projects/voyage-solidaire';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        fr: '/projects/voyage-solidaire',
        en: '/en/projects/voyage-solidaire',
        'x-default': '/projects/voyage-solidaire',
      },
    },
    openGraph: {
      title,
      description,
      url: isFr
        ? 'https://www.bahor-voyage.com/projects/voyage-solidaire'
        : 'https://www.bahor-voyage.com/en/projects/voyage-solidaire',
      siteName: 'Bahor-Voyage',
      locale: isFr ? 'fr_FR' : 'en_US',
      alternateLocale: isFr ? 'en_US' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: '/images/projects/projects-hero.jpg',
          width: 1200,
          height: 630,
          alt: isFr
            ? 'Voyage solidaire en Ouzbékistan — AFOR'
            : 'Solidarity travel in Uzbekistan — AFOR',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/projects/projects-hero.jpg'],
    },
  };
}

export default async function VoyageSolidaireRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <VoyageSolidairePage />;
}

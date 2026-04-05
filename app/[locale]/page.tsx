import type { Metadata } from 'next';

import { setRequestLocale } from 'next-intl/server';

import CTAContact from '@/components/home/CTAContact';
import CommitmentsSection from '@/components/home/CommitmentsSection';
import FeaturedCircuits from '@/components/home/FeaturedCircuits';
import FounderSection from '@/components/home/FounderSection';
import HeroSection from '@/components/home/HeroSection';
import PhotoHighlightsSection from '@/components/home/PhotoHighlightsSection';
import ProjectsPreviewSection from '@/components/home/ProjectsPreviewSection';
import UzbekistanIntro from '@/components/home/UzbekistanIntro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Voyages authentiques en Ouzbékistan depuis Lyon'
    : 'Authentic Uzbekistan tours from Lyon';

  const description = isFr
    ? "Découvrez l'Ouzbékistan authentique avec Bahor-Voyage — circuits solidaires sur la Route de la Soie, en petits groupes, depuis Lyon. Samarcande, Boukhara, rencontres humaines."
    : 'Discover authentic Uzbekistan with Bahor-Voyage — solidarity tours along the Silk Road, in small groups, from Lyon. Samarkand, Bukhara, meaningful encounters.';

  const url = isFr
    ? 'https://www.bahor-voyage.com'
    : 'https://www.bahor-voyage.com/en';

  return {
    title,
    description,
    alternates: {
      canonical: isFr ? '/' : '/en',
      languages: {
        fr: '/',
        en: '/en',
        'x-default': '/',
      },
    },
    openGraph: {
      title,
      description,
      url,
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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <UzbekistanIntro />
      <FeaturedCircuits />
      <FounderSection />
      <CommitmentsSection />
      <ProjectsPreviewSection />
      <PhotoHighlightsSection />
      <CTAContact />
    </>
  );
}

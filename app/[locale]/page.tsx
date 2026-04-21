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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Bahor-Voyage',
    image: 'https://www.bahor-voyage.com/logo.png',
    '@id': 'https://www.bahor-voyage.com',
    url: 'https://www.bahor-voyage.com',
    telephone: '+33611555763',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12 Place Ambroise Courtois',
      addressLocality: 'Lyon',
      postalCode: '69008',
      addressCountry: 'FR',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

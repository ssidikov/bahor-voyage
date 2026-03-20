import type { Metadata } from 'next';

import { setRequestLocale } from 'next-intl/server';

import AboutPage from '@/components/about/AboutPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'À propos — AFOR & Bahor-Voyage'
    : 'About — AFOR & Bahor-Voyage';

  const description = isFr
    ? "Découvrez l'histoire de l'AFOR, association franco-ouzbèke fondée à Lyon en 2012, et l'équipe passionnée derrière Bahor-Voyage. Un tourisme solidaire au service de l'humain."
    : 'Discover the story of AFOR, the Franco-Uzbek association founded in Lyon in 2012, and the passionate team behind Bahor-Voyage. Solidarity tourism in service of people.';

  return {
    title,
    description,
    alternates: {
      canonical: isFr ? '/about' : '/en/about',
      languages: {
        fr: '/about',
        en: '/en/about',
        'x-default': '/about',
      },
    },
    openGraph: {
      title,
      description,
      url: isFr
        ? 'https://www.bahor-voyage.com/about'
        : 'https://www.bahor-voyage.com/en/about',
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

export default async function AboutRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPage />;
}

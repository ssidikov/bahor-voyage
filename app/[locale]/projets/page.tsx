import type { Metadata } from 'next';

import { setRequestLocale } from 'next-intl/server';

import ProjectsPage from '@/components/projects/ProjectsPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Nos projects — Actions solidaires en Ouzbékistan'
    : 'Our Projects — Solidarity Actions in Uzbekistan';

  const description = isFr
    ? "Découvrez les projects de l'Association France Ouzbékistan Racines : plantation d'arbres, soutien à l'éducation et entrepreneuriat féminin en Ouzbékistan."
    : 'Discover the projects of the France–Uzbekistan Roots Association: tree planting, education support and female entrepreneurship in Uzbekistan.';

  return {
    title,
    description,
    alternates: {
      canonical: isFr ? '/projects' : '/en/projects',
      languages: {
        fr: '/projects',
        en: '/en/projects',
        'x-default': '/projects',
      },
    },
    openGraph: {
      title,
      description,
      url: isFr
        ? 'https://www.bahor-voyage.com/projects'
        : 'https://www.bahor-voyage.com/en/projects',
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

export default async function ProjectsRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsPage />;
}

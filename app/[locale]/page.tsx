import { setRequestLocale } from 'next-intl/server';

import CTAContact from '@/components/home/CTAContact';
import CommitmentsSection from '@/components/home/CommitmentsSection';
import FeaturedCircuits from '@/components/home/FeaturedCircuits';
import FounderSection from '@/components/home/FounderSection';
import HeroSection from '@/components/home/HeroSection';
import UzbekistanIntro from '@/components/home/UzbekistanIntro';

type Props = {
  params: Promise<{ locale: string }>;
};

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
      <CTAContact />
    </>
  );
}

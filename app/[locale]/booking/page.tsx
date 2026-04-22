import type { Metadata } from 'next';

import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import BookingWizard from '@/components/booking/BookingWizard';
import BookingHero from '@/components/booking/BookingHero';
import BookingCancelBanner from '@/components/booking/BookingCancelBanner';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'booking_page' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: locale === 'fr' ? '/booking' : '/en/booking',
      languages: {
        fr: '/booking',
        en: '/en/booking',
        'x-default': '/booking',
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url:
        locale === 'fr'
          ? 'https://www.bahor-voyage.com/booking'
          : 'https://www.bahor-voyage.com/en/booking',
      siteName: 'Bahor-Voyage',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      type: 'website',
    },
  };
}

export default async function BookingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('booking_page');

  return (
    <>
      <BookingHero
        kicker={t('hero_kicker')}
        title={t('title')}
        intro={t('intro')}
      />

      <section className="bg-sand-50 py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <Suspense fallback={null}>
            <BookingCancelBanner />
          </Suspense>
          <Suspense fallback={null}>
            <BookingWizard />
          </Suspense>
        </div>
      </section>
    </>
  );
}

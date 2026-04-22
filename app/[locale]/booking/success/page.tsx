import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import BookingSuccess from '@/components/booking/BookingSuccess';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'booking_success' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    robots: { index: false }, // Don't index confirmation pages
  };
}

export default async function BookingSuccessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-sand-50 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BookingSuccess />
    </Suspense>
  );
}

import type { Metadata } from 'next';

import { Button } from '@/components/ui';
import { setRequestLocale, getTranslations } from 'next-intl/server';

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
      <section className="bg-sand-100 pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-content mx-auto px-6 md:px-10 text-center">
          <p className="text-label uppercase tracking-[0.15em] text-primary-400 mb-4">
            {t('hero_kicker')}
          </p>
          <h1 className="font-serif text-display-xl text-charcoal-700 font-light">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-body-lg text-charcoal-400 leading-relaxed">
            {t('intro')}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <p className="text-label uppercase tracking-[0.12em] text-primary-400">
              01
            </p>
            <h2 className="font-serif text-2xl text-charcoal-700 font-light mt-3">
              {t('step1_title')}
            </h2>
            <p className="mt-3 text-body-md text-charcoal-400 leading-relaxed">
              {t('step1_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <p className="text-label uppercase tracking-[0.12em] text-primary-400">
              02
            </p>
            <h2 className="font-serif text-2xl text-charcoal-700 font-light mt-3">
              {t('step2_title')}
            </h2>
            <p className="mt-3 text-body-md text-charcoal-400 leading-relaxed">
              {t('step2_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <p className="text-label uppercase tracking-[0.12em] text-primary-400">
              03
            </p>
            <h2 className="font-serif text-2xl text-charcoal-700 font-light mt-3">
              {t('step3_title')}
            </h2>
            <p className="mt-3 text-body-md text-charcoal-400 leading-relaxed">
              {t('step3_body')}
            </p>
          </article>
        </div>
      </section>

      <section className="bg-sand-50 py-12 md:py-16">
        <div className="max-w-content mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <Button
            href="mailto:contact@bahor-voyage.com?subject=Demande%20de%20reservation"
            variant="primary"
            className="w-full md:w-auto"
          >
            {t('cta_primary')}
          </Button>
          <Button
            href="/circuits"
            variant="outline"
            className="w-full md:w-auto"
          >
            {t('cta_secondary')}
          </Button>
        </div>
      </section>
    </>
  );
}

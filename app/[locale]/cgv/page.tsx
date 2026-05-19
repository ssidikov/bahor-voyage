import type { Metadata } from 'next';

import { setRequestLocale, getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cgv_page' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: locale === 'fr' ? '/cgv' : '/en/cgv',
      languages: {
        fr: '/cgv',
        en: '/en/cgv',
        'x-default': '/cgv',
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url:
        locale === 'fr'
          ? 'https://www.bahorvoyage.com/cgv'
          : 'https://www.bahorvoyage.com/en/cgv',
      siteName: 'Bahor-Voyage',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      type: 'website',
    },
  };
}

export default async function CGVPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('cgv_page');

  return (
    <>
      <section className="bg-sand-100 pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <h1 className="font-serif text-display-xl text-charcoal-700 font-light">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-3xl text-body-lg text-charcoal-400 leading-relaxed">
            {t('intro')}
          </p>
          <p className="mt-3 text-body-sm text-charcoal-300">
            {t('last_updated')}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-10 space-y-10">
          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('object_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('object_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('parties_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('parties_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('bookings_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('bookings_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('pricing_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('pricing_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('cancellation_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('cancellation_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('modification_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('modification_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('documents_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('documents_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('insurance_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('insurance_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('liability_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('liability_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('force_majeure_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('force_majeure_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('data_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('data_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('law_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('law_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('contact_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('contact_body')}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

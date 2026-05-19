import type { Metadata } from 'next';

import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy_page' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical:
        locale === 'fr'
          ? '/politique-de-confidentialite'
          : '/en/politique-de-confidentialite',
      languages: {
        fr: '/politique-de-confidentialite',
        en: '/en/politique-de-confidentialite',
        'x-default': '/politique-de-confidentialite',
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url:
        locale === 'fr'
          ? 'https://www.bahorvoyage.com/politique-de-confidentialite'
          : 'https://www.bahorvoyage.com/en/politique-de-confidentialite',
      siteName: 'Bahor-Voyage',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      type: 'website',
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('privacy_page');

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
              {t('controller_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('controller_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('data_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('data_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('purposes_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('purposes_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('retention_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('retention_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('processors_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('processors_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('transfers_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('transfers_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('rights_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('rights_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('rights_exercise_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('rights_exercise_body')}
            </p>
            <Link
              href="/suppression-donnees"
              className="mt-5 inline-block bg-primary-400 hover:bg-primary-500 text-white text-body-sm font-medium px-5 py-3 rounded-full transition-colors duration-200"
            >
              {t('rights_exercise_cta')} →
            </Link>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('cnil_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed whitespace-pre-line">
              {t('cnil_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('cookies_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('cookies_body')}
            </p>
            <h3 className="mt-6 font-serif text-xl text-charcoal-600 font-light">
              {t('cookies_technical_title')}
            </h3>
            <p className="mt-3 text-body-md text-charcoal-400 leading-relaxed">
              {t('cookies_technical_body')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('contact_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('contact_body')}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

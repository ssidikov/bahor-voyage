import type { Metadata } from 'next';

import { setRequestLocale, getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal_page' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: locale === 'fr' ? '/mentions-legales' : '/en/mentions-legales',
      languages: {
        fr: '/mentions-legales',
        en: '/en/mentions-legales',
        'x-default': '/mentions-legales',
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url:
        locale === 'fr'
          ? 'https://www.bahor-voyage.com/mentions-legales'
          : 'https://www.bahor-voyage.com/en/mentions-legales',
      siteName: 'Bahor-Voyage',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      type: 'website',
    },
  };
}

export default async function LegalNoticePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('legal_page');

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
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-10 space-y-10">
          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('publisher_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('publisher_name')}
              <br />
              {t('publisher_address')}
              <br />
              {t('publisher_contact')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('host_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('host_name')}
            </p>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('intellectual_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('intellectual_body')}
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
              {t('cookies_title')}
            </h2>
            <p className="mt-4 text-body-md text-charcoal-400 leading-relaxed">
              {t('cookies_body')}
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

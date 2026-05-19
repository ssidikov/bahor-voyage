import type { Metadata } from 'next';

import { setRequestLocale, getTranslations } from 'next-intl/server';
import DataDeletionForm from '@/components/gdpr/DataDeletionForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'data_deletion_page' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    robots: { index: false, follow: false },
  };
}

export default async function DataDeletionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('data_deletion_page');

  return (
    <>
      <section className="bg-sand-100 pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <h1 className="font-serif text-display-xl text-charcoal-700 font-light">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-2xl text-body-lg text-charcoal-400 leading-relaxed">
            {t('intro')}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="rounded-3xl border border-border-soft p-7 md:p-8">
              <p className="mb-6 text-body-sm text-charcoal-400 leading-relaxed whitespace-pre-line">
                {t('notice')}
              </p>
              <DataDeletionForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

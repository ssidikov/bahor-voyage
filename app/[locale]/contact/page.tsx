import type { Metadata } from 'next';

import { Button } from '@/components/ui';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import ContactForm from '@/components/contact/ContactForm';

import ContactHero from '@/components/contact/ContactHero';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact_page' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: locale === 'fr' ? '/contact' : '/en/contact',
      languages: {
        fr: '/contact',
        en: '/en/contact',
        'x-default': '/contact',
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url:
        locale === 'fr'
          ? 'https://www.bahor-voyage.com/contact'
          : 'https://www.bahor-voyage.com/en/contact',
      siteName: 'Bahor-Voyage',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      type: 'website',
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact_page');

  return (
    <>
      <ContactHero
        kicker={t('hero_kicker')}
        title={t('title')}
        intro={t('intro')}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('email_label')}
            </h2>
            <p className="mt-3 text-body-md text-charcoal-400">
              contact@bahor-voyage.com
            </p>
            <Button
              href="mailto:contact@bahor-voyage.com"
              variant="outline"
              className="mt-6"
            >
              {t('email_label')}
            </Button>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('phone_label')}
            </h2>
            <p className="mt-3 text-body-md text-charcoal-400">
              +33 6 11 55 57 63
            </p>
            <Button href="tel:+33611555763" variant="outline" className="mt-6">
              {t('phone_label')}
            </Button>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('whatsapp_label')}
            </h2>
            <p className="mt-3 text-body-md text-charcoal-400">
              +33 6 11 55 57 63
            </p>
            <Button
              href="https://wa.me/33611555763"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="mt-6"
            >
              {t('whatsapp_label')}
            </Button>
          </article>

          <article className="rounded-3xl border border-border-soft p-7 md:p-8">
            <h2 className="font-serif text-2xl text-charcoal-700 font-light">
              {t('address_label')}
            </h2>
            <p className="mt-3 text-body-md text-charcoal-400 leading-relaxed">
              12 Place Ambroise Courtois
              <br />
              69008 Lyon, France
            </p>
            <p className="mt-3 text-body-sm text-charcoal-400">
              {t('office_note')}
            </p>
          </article>
        </div>
      </section>

      <section className="bg-sand-50 py-16">
        <div className="max-w-narrow mx-auto px-6 md:px-10">
          <ContactForm />
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <p className="text-body-md text-charcoal-500">{t('availability')}</p>
        </div>
      </section>
    </>
  );
}

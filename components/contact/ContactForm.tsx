'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

const formT = {
  fr: {
    form_title: 'Envoyez-nous un message',
    name: 'Nom complet',
    email: 'Adresse email',
    phone: 'Téléphone (optionnel)',
    interest: 'Circuit qui vous intéresse',
    interest_placeholder: 'Ex: Immersion Totale, Voyage Solidaire...',
    message: 'Votre message',
    message_placeholder: 'Parlez-nous de votre projet de voyage...',
    submit: 'Envoyer la demande',
    sending: 'Envoi en cours...',
    success:
      'Merci ! Votre demande a été envoyée avec succès. Nous vous répondrons sous 24 à 48h.',
    error:
      "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter par email.",
  },
  en: {
    form_title: 'Send us a message',
    name: 'Full Name',
    email: 'Email address',
    phone: 'Phone (optional)',
    interest: 'Tour you are interested in',
    interest_placeholder: 'E.g. Total Immersion, Solidarity Tour...',
    message: 'Your message',
    message_placeholder: 'Tell us about your travel plans...',
    submit: 'Send request',
    sending: 'Sending...',
    success:
      'Thank you! Your request has been sent successfully. We will reply within 24-48 business hours.',
    error:
      'An error occurred while sending. Please try again or contact us by email.',
  },
};

export default function ContactForm() {
  const locale = useLocale() as 'fr' | 'en';
  const t = formT[locale] || formT['fr'];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-border-soft p-8 md:p-10 shadow-sm">
      <h2 className="font-serif text-3xl text-charcoal-700 mb-6">
        {t.form_title}
      </h2>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-primary-50 text-primary-700 rounded-xl border border-primary-100">
          {t.success}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
          {t.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-body-sm font-medium text-charcoal-600"
            >
              {t.name}
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 rounded-xl border border-border-soft focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 bg-sand-50"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-body-sm font-medium text-charcoal-600"
            >
              {t.email}
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 rounded-xl border border-border-soft focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 bg-sand-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-body-sm font-medium text-charcoal-600"
            >
              {t.phone}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 rounded-xl border border-border-soft focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 bg-sand-50"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="tourInterest"
              className="text-body-sm font-medium text-charcoal-600"
            >
              {t.interest}
            </label>
            <input
              type="text"
              id="tourInterest"
              name="tourInterest"
              placeholder={t.interest_placeholder}
              className="w-full px-4 py-3 rounded-xl border border-border-soft focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 bg-sand-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-body-sm font-medium text-charcoal-600"
          >
            {t.message}
          </label>
          <textarea
            required
            id="message"
            name="message"
            rows={4}
            placeholder={t.message_placeholder}
            className="w-full px-4 py-3 rounded-xl border border-border-soft focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 bg-sand-50 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-400 hover:bg-primary-500 text-white font-medium px-6 py-4 rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t.sending : t.submit}
        </button>
      </form>
    </div>
  );
}

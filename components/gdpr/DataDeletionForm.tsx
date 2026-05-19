'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

const formT = {
  fr: {
    name: 'Nom complet',
    email: 'Adresse email',
    message: 'Précisions (facultatif)',
    message_placeholder:
      'Ex : supprimer toutes mes données, uniquement les données de réservation…',
    submit: 'Envoyer la demande',
    sending: 'Envoi en cours…',
    success:
      "Votre demande a bien été reçue. Nous y donnerons suite dans un délai d'un mois conformément au RGPD.",
    error:
      'Une erreur est survenue. Veuillez réessayer ou nous écrire directement à contact@bahorvoyage.com.',
  },
  en: {
    name: 'Full name',
    email: 'Email address',
    message: 'Additional details (optional)',
    message_placeholder: 'E.g. delete all my data, only booking data…',
    submit: 'Submit request',
    sending: 'Sending…',
    success:
      'Your request has been received. We will respond within one month in accordance with the GDPR.',
    error:
      'An error occurred. Please try again or email us directly at contact@bahorvoyage.com.',
  },
};

export default function DataDeletionForm() {
  const locale = useLocale() as 'fr' | 'en';
  const t = formT[locale] ?? formT['fr'];

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
      const res = await fetch('/api/data-deletion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed');

      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitStatus === 'success') {
    return (
      <div
        className="p-6 bg-primary-50 text-primary-700 rounded-2xl border border-primary-100 text-body-md leading-relaxed"
        role="status"
        aria-live="polite"
      >
        {t.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitStatus === 'error' && (
        <div
          className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-body-sm"
          role="alert"
        >
          {t.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-body-sm font-medium text-charcoal-600"
          >
            {t.name}{' '}
            <span aria-hidden="true" className="text-red-400">
              *
            </span>
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            className="w-full px-4 py-3 rounded-xl border border-charcoal-100/60 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 bg-[#fafafa]"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-body-sm font-medium text-charcoal-600"
          >
            {t.email}{' '}
            <span aria-hidden="true" className="text-red-400">
              *
            </span>
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-charcoal-100/60 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 bg-[#fafafa]"
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
          id="message"
          name="message"
          rows={3}
          placeholder={t.message_placeholder}
          className="w-full px-4 py-3 rounded-xl border border-charcoal-100/60 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 bg-[#fafafa] resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-400 hover:bg-primary-500 text-white font-medium px-6 py-4 rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t.sending : t.submit}
      </button>
    </form>
  );
}

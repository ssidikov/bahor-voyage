'use client';

import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { signIn } from 'next-auth/react';

type Props = {
  callbackUrl: string;
  locale: string;
};

export default function AdminLoginForm({ callbackUrl, locale }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copy = useMemo(() => {
    if (locale === 'en') {
      return {
        title: 'Admin Sign In',
        subtitle: 'Use your administrator credentials to access the dashboard.',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        submitLabel: 'Sign in',
        invalidCredentials: 'Invalid email or password.',
        genericError: 'Unable to sign in right now. Please try again.',
      };
    }

    return {
      title: 'Connexion administrateur',
      subtitle:
        'Utilisez vos identifiants administrateur pour accéder au tableau de bord.',
      emailLabel: 'Email',
      passwordLabel: 'Mot de passe',
      submitLabel: 'Se connecter',
      invalidCredentials: 'Email ou mot de passe invalide.',
      genericError: 'Connexion impossible pour le moment. Réessayez.',
    };
  }, [locale]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
        callbackUrl,
      });

      if (!result || result.error) {
        setError(copy.invalidCredentials);
        return;
      }

      window.location.assign(result.url ?? callbackUrl);
    } catch {
      setError(copy.genericError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <h1 className="font-serif text-3xl text-charcoal-700">{copy.title}</h1>
        <p className="mt-3 text-charcoal-500">{copy.subtitle}</p>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-charcoal-600">
          {copy.emailLabel}
        </span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-border-soft bg-white px-4 py-3 text-charcoal-700 outline-none transition focus:border-primary-400"
          autoComplete="email"
          required
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-charcoal-600">
          {copy.passwordLabel}
        </span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-border-soft bg-white px-4 py-3 text-charcoal-700 outline-none transition focus:border-primary-400"
          autoComplete="current-password"
          minLength={12}
          required
        />
      </label>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-xl bg-charcoal-700 px-4 py-3 font-medium text-white transition hover:bg-charcoal-600 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? '...' : copy.submitLabel}
      </button>
    </form>
  );
}

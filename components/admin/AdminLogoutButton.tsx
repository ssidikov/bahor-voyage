'use client';

import { useMemo, useState } from 'react';
import { signOut } from 'next-auth/react';

type Props = {
  locale: string;
  callbackUrl: string;
};

export default function AdminLogoutButton({ locale, callbackUrl }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const label = useMemo(
    () => (locale === 'en' ? 'Log out' : 'Se déconnecter'),
    [locale],
  );

  async function handleLogout() {
    setIsSubmitting(true);
    await signOut({ callbackUrl });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="glass-button frozen-border cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-charcoal-700 transition duration-200 hover:text-charcoal-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isSubmitting ? '...' : label}
    </button>
  );
}

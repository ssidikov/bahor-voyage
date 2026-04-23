'use client';

import { useMemo, useState } from 'react';

import { Link } from '@/i18n/navigation';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';

type Props = {
  locale: string;
  loginPath: string;
  userEmail?: string | null;
};

export default function AdminMobileMenu({
  locale,
  loginPath,
  userEmail,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const labels = useMemo(
    () =>
      locale === 'en'
        ? {
            title: 'Dashboard',
            menuOpen: 'Open navigation menu',
            menuClose: 'Close navigation menu',
            overview: 'Overview',
            contacts: 'Requests (CRM)',
            bookings: 'Bookings',
            circuits: 'Circuits & Dates',
            connectedAs: 'Signed in as',
          }
        : {
            title: 'Tableau de bord',
            menuOpen: 'Ouvrir le menu de navigation',
            menuClose: 'Fermer le menu de navigation',
            overview: "Vue d'ensemble",
            contacts: 'Demandes (CRM)',
            bookings: 'Réservations',
            circuits: 'Circuits & Dates',
            connectedAs: 'Connecté en tant que',
          },
    [locale],
  );

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <aside className="mb-6 md:hidden print:hidden">
      <div className="flex items-center justify-between rounded-2xl px-4 py-3 glass-panel frozen-border">
        <h1 className="text-lg font-serif text-charcoal-700">{labels.title}</h1>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? labels.menuClose : labels.menuOpen}
          aria-expanded={isOpen}
          className="cursor-pointer rounded-lg p-2 text-charcoal-700 transition duration-200 hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isOpen ? (
              <>
                <path d="M18 6L6 18" />
                <path d="M6 6L18 18" />
              </>
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {isOpen ? (
        <div className="mt-3 rounded-2xl p-4 glass-panel frozen-border">
          <nav className="space-y-2">
            <Link
              href="/admin"
              onClick={handleClose}
              className="block cursor-pointer rounded-lg px-3 py-2 text-sm text-charcoal-600 transition duration-200 hover:bg-white/85 hover:text-charcoal-700"
            >
              {labels.overview}
            </Link>
            <Link
              href="/admin/contacts"
              onClick={handleClose}
              className="block cursor-pointer rounded-lg px-3 py-2 text-sm text-charcoal-600 transition duration-200 hover:bg-white/85 hover:text-charcoal-700"
            >
              {labels.contacts}
            </Link>
            <Link
              href="/admin/bookings"
              onClick={handleClose}
              className="block cursor-pointer rounded-lg px-3 py-2 text-sm text-charcoal-600 transition duration-200 hover:bg-white/85 hover:text-charcoal-700"
            >
              {labels.bookings}
            </Link>
            <Link
              href="/admin/circuits"
              onClick={handleClose}
              className="block cursor-pointer rounded-lg px-3 py-2 text-sm text-charcoal-600 transition duration-200 hover:bg-white/85 hover:text-charcoal-700"
            >
              {labels.circuits}
            </Link>
          </nav>

          <div className="mt-4 border-t border-border-soft pt-4">
            {userEmail ? (
              <p className="mb-3 break-all text-xs text-charcoal-500">
                {labels.connectedAs} {userEmail}
              </p>
            ) : null}
            <AdminLogoutButton locale={locale} callbackUrl={loginPath} />
          </div>
        </div>
      ) : null}
    </aside>
  );
}

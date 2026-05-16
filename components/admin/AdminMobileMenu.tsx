'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  const labels = useMemo(
    () =>
      locale === 'en'
        ? {
            title: 'Dashboard',
            menuOpen: 'Open navigation menu',
            menuClose: 'Close navigation menu',
            dialog: 'Dashboard navigation',
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
            dialog: 'Navigation du tableau de bord',
            overview: "Vue d'ensemble",
            contacts: 'Demandes (CRM)',
            bookings: 'Réservations',
            circuits: 'Circuits & Dates',
            connectedAs: 'Connecté en tant que',
          },
    [locale],
  );

  const handleClose = useCallback((restoreFocus = true) => {
    setIsOpen(false);
    if (restoreFocus) {
      window.setTimeout(() => menuButtonRef.current?.focus(), 0);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, isOpen]);

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !menuPanelRef.current) return;

    const focusable = Array.from(
      menuPanelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      ),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <aside className="mb-6 md:hidden print:hidden">
      <div className="flex items-center justify-between rounded-2xl px-4 py-3 glass-panel frozen-border">
        <h1 className="text-lg font-serif text-charcoal-700">{labels.title}</h1>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? labels.menuClose : labels.menuOpen}
          aria-expanded={isOpen}
          className="min-h-11 min-w-11 cursor-pointer rounded-lg p-2 text-charcoal-700 transition duration-200 hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
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
        <div
          ref={menuPanelRef}
          className="mt-3 rounded-2xl p-4 glass-panel frozen-border"
          role="dialog"
          aria-modal="true"
          aria-label={labels.dialog}
          onKeyDown={handleMenuKeyDown}
        >
          <nav className="space-y-2">
            <Link
              href="/admin"
              onClick={() => handleClose(false)}
              className="block min-h-11 cursor-pointer rounded-lg px-3 py-3 text-sm text-charcoal-600 transition duration-200 hover:bg-white/85 hover:text-charcoal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
            >
              {labels.overview}
            </Link>
            <Link
              href="/admin/contacts"
              onClick={() => handleClose(false)}
              className="block min-h-11 cursor-pointer rounded-lg px-3 py-3 text-sm text-charcoal-600 transition duration-200 hover:bg-white/85 hover:text-charcoal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
            >
              {labels.contacts}
            </Link>
            <Link
              href="/admin/bookings"
              onClick={() => handleClose(false)}
              className="block min-h-11 cursor-pointer rounded-lg px-3 py-3 text-sm text-charcoal-600 transition duration-200 hover:bg-white/85 hover:text-charcoal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
            >
              {labels.bookings}
            </Link>
            <Link
              href="/admin/circuits"
              onClick={() => handleClose(false)}
              className="block min-h-11 cursor-pointer rounded-lg px-3 py-3 text-sm text-charcoal-600 transition duration-200 hover:bg-white/85 hover:text-charcoal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
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

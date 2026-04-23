import type { ReactNode } from 'react';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Link } from '@/i18n/navigation';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

function loginPathForLocale(locale: string) {
  return locale === 'en' ? '/en/login' : '/login';
}

function adminPathForLocale(locale: string) {
  return locale === 'en' ? '/en/admin' : '/admin';
}

export default async function AdminLayout({ children, params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || session.user.role !== 'ADMIN') {
    const loginPath = loginPathForLocale(locale);
    const adminPath = adminPathForLocale(locale);
    redirect(`${loginPath}?next=${encodeURIComponent(adminPath)}`);
  }

  const adminUser = await prisma.adminUser.findUnique({
    where: { email: session.user.email.trim().toLowerCase() },
    select: { role: true },
  });

  if (!adminUser || adminUser.role !== 'ADMIN') {
    const loginPath = loginPathForLocale(locale);
    const adminPath = adminPathForLocale(locale);
    redirect(`${loginPath}?next=${encodeURIComponent(adminPath)}`);
  }

  return (
    <div className="flex h-screen bg-sand-50 print:bg-white print:h-auto">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal-900 text-white p-6 hidden md:block print:hidden">
        <div className="font-serif text-2xl text-primary-400 mb-10">
          Bahor-Voyage
        </div>
        <nav className="space-y-4">
          <Link
            href="/admin"
            className="block text-white/80 hover:text-white pb-2 border-b border-white/10"
          >
            Vue d&apos;ensemble
          </Link>
          <Link
            href="/admin/contacts"
            className="block text-white/80 hover:text-white pb-2 border-b border-white/10"
          >
            Demandes (CRM)
          </Link>
          <Link
            href="/admin/bookings"
            className="block text-white/80 hover:text-white pb-2 border-b border-white/10"
          >
            Réservations
          </Link>
          <Link
            href="/admin/circuits"
            className="block text-white/80 hover:text-white pb-2 border-b border-white/10"
          >
            Circuits &amp; Dates
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto print:p-0 print:overflow-visible">
        <aside className="mb-6 rounded-2xl border border-border-soft bg-white p-4 md:hidden print:hidden">
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="block rounded-lg px-3 py-2 text-sm text-charcoal-600 transition hover:bg-sand-50 hover:text-charcoal-700"
            >
              Vue d&apos;ensemble
            </Link>
            <Link
              href="/admin/contacts"
              className="block rounded-lg px-3 py-2 text-sm text-charcoal-600 transition hover:bg-sand-50 hover:text-charcoal-700"
            >
              Demandes (CRM)
            </Link>
            <Link
              href="/admin/bookings"
              className="block rounded-lg px-3 py-2 text-sm text-charcoal-600 transition hover:bg-sand-50 hover:text-charcoal-700"
            >
              Réservations
            </Link>
            <Link
              href="/admin/circuits"
              className="block rounded-lg px-3 py-2 text-sm text-charcoal-600 transition hover:bg-sand-50 hover:text-charcoal-700"
            >
              Circuits &amp; Dates
            </Link>
          </nav>
          <div className="mt-4 pt-4 border-t border-border-soft">
            <AdminLogoutButton
              locale={locale}
              callbackUrl={loginPathForLocale(locale)}
            />
          </div>
        </aside>

        <header className="flex justify-between items-center mb-8 pb-4 border-b border-border-soft print:hidden">
          <h1 className="text-2xl font-serif text-charcoal-700">
            Dashboard de Gestion
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-charcoal-500">
              Connecté en tant que {session?.user?.email}
            </div>
            <AdminLogoutButton
              locale={locale}
              callbackUrl={loginPathForLocale(locale)}
            />
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

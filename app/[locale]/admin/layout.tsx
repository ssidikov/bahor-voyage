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
    <div className="admin-aurora-bg flex h-screen print:bg-white print:h-auto">
      {/* Sidebar */}
      <aside className="m-4 hidden w-72 rounded-3xl p-6 text-charcoal-700 md:block print:hidden glass-panel frozen-border">
        <div className="mb-10 font-serif text-2xl text-primary-700">
          Bahor-Voyage
        </div>
        <nav className="space-y-2">
          <Link
            href="/admin"
            className="block cursor-pointer rounded-xl px-3 py-2 text-charcoal-600 transition duration-200 hover:bg-white/75 hover:text-charcoal-800"
          >
            Vue d&apos;ensemble
          </Link>
          <Link
            href="/admin/contacts"
            className="block cursor-pointer rounded-xl px-3 py-2 text-charcoal-600 transition duration-200 hover:bg-white/75 hover:text-charcoal-800"
          >
            Demandes (CRM)
          </Link>
          <Link
            href="/admin/bookings"
            className="block cursor-pointer rounded-xl px-3 py-2 text-charcoal-600 transition duration-200 hover:bg-white/75 hover:text-charcoal-800"
          >
            Réservations
          </Link>
          <Link
            href="/admin/circuits"
            className="block cursor-pointer rounded-xl px-3 py-2 text-charcoal-600 transition duration-200 hover:bg-white/75 hover:text-charcoal-800"
          >
            Circuits &amp; Dates
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 print:overflow-visible print:p-0">
        <aside className="mb-6 rounded-2xl p-4 md:hidden print:hidden glass-panel frozen-border">
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="block cursor-pointer rounded-lg px-3 py-2 text-sm text-charcoal-600 transition duration-200 hover:bg-white/85 hover:text-charcoal-700"
            >
              Vue d&apos;ensemble
            </Link>
            <Link
              href="/admin/contacts"
              className="block cursor-pointer rounded-lg px-3 py-2 text-sm text-charcoal-600 transition duration-200 hover:bg-white/85 hover:text-charcoal-700"
            >
              Demandes (CRM)
            </Link>
            <Link
              href="/admin/bookings"
              className="block cursor-pointer rounded-lg px-3 py-2 text-sm text-charcoal-600 transition duration-200 hover:bg-white/85 hover:text-charcoal-700"
            >
              Réservations
            </Link>
            <Link
              href="/admin/circuits"
              className="block cursor-pointer rounded-lg px-3 py-2 text-sm text-charcoal-600 transition duration-200 hover:bg-white/85 hover:text-charcoal-700"
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

        <header className="mb-8 flex items-center justify-between rounded-2xl px-4 py-4 md:px-6 print:hidden glass-panel frozen-border">
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

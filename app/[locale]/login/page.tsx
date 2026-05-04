import type { Metadata } from 'next';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import AdminLoginForm from '@/components/admin/AdminLoginForm';
import { authOptions } from '@/lib/auth';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    next?: string | string[];
    callbackUrl?: string | string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === 'en';

  return {
    title: isEnglish ? 'Admin Login' : 'Connexion Admin',
    description: isEnglish
      ? 'Secure admin login for Bahor Voyage dashboard.'
      : 'Connexion sécurisée au dashboard administrateur Bahor Voyage.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

function defaultAdminPath(locale: string) {
  return locale === 'en' ? '/en/admin' : '/admin';
}

function resolveSafeCallback(nextParam: string | undefined, locale: string) {
  const fallback = defaultAdminPath(locale);

  if (!nextParam) {
    return fallback;
  }

  if (!nextParam.startsWith('/') || nextParam.startsWith('//')) {
    return fallback;
  }

  const isEnglish = locale === 'en';

  if (isEnglish && !nextParam.startsWith('/en/')) {
    return fallback;
  }

  if (!isEnglish && nextParam.startsWith('/en/')) {
    return fallback;
  }

  return nextParam;
}

export default async function LoginPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const query = await searchParams;
  const nextParam = Array.isArray(query.next) ? query.next[0] : query.next;
  const callbackUrlParam = Array.isArray(query.callbackUrl)
    ? query.callbackUrl[0]
    : query.callbackUrl;
  const redirectTarget = nextParam ?? callbackUrlParam;
  const callbackUrl = resolveSafeCallback(redirectTarget, locale);

  const session = await getServerSession(authOptions);

  if (session?.user?.email && session.user.role === 'ADMIN') {
    redirect(callbackUrl);
  }

  return (
    <section className="admin-aurora-bg flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 md:px-10">
      <div className="mb-4 w-full max-w-xl text-center sm:mb-6">
        <div className="inline-flex rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal-600 sm:px-4 sm:text-xs glass-panel frozen-border">
          Bahor Voyage Admin
        </div>
      </div>
      <div className="w-full max-w-xl rounded-2xl p-5 sm:rounded-3xl sm:p-8 md:p-10 glass-panel frozen-border">
        <AdminLoginForm callbackUrl={callbackUrl} locale={locale} />
      </div>
    </section>
  );
}

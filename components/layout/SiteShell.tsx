'use client';

import type { ReactNode } from 'react';

import { useSelectedLayoutSegments } from 'next/navigation';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

type Props = {
  children: ReactNode;
};

export default function SiteShell({ children }: Props) {
  const segments = useSelectedLayoutSegments();
  const isAdminRoute = segments[0] === 'admin';

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

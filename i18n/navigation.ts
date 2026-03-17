import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

// Utilisation dans les composants :
// import { Link } from '@/i18n/navigation';  ← à la place de next/link
// import { useRouter } from '@/i18n/navigation';  ← à la place de next/navigation

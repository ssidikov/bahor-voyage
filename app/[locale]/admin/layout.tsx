import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

// Basic admin layout that checks auth
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    // Redirect to login if not authenticated
    // Note: In production the actual login page path should match your NextAuth config
    redirect('/api/auth/signin');
  }

  return (
    <div className="flex h-screen bg-sand-50">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal-900 text-white p-6 hidden md:block">
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
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-border-soft">
          <h1 className="text-2xl font-serif text-charcoal-700">
            Dashboard de Gestion
          </h1>
          <div className="text-sm text-charcoal-500">
            Connecté en tant que {session?.user?.email}
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

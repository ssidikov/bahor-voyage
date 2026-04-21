import prisma from '@/lib/prisma';

export default async function AdminDashboard() {
  let pendingRequests = 0;
  let confirmedBookings = 0;

  try {
    pendingRequests = await prisma.contactRequest.count({
      where: { status: 'NOUVEAU' },
    });
    confirmedBookings = await prisma.booking.count({
      where: { paymentStatus: 'PAID' },
    });
  } catch (e) {
    console.error('Dashboard count error (likely missing tables):', e);
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm">
          <div className="text-charcoal-400 text-sm font-medium mb-2">
            Nouvelles demandes
          </div>
          <div className="text-3xl font-serif text-charcoal-700">
            {pendingRequests}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm">
          <div className="text-charcoal-400 text-sm font-medium mb-2">
            Réservations Payées
          </div>
          <div className="text-3xl font-serif text-charcoal-700">
            {confirmedBookings}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm">
        <h2 className="text-xl font-serif text-charcoal-700 mb-4">
          Bienvenue sur votre Dashboard
        </h2>
        <p className="text-charcoal-500 leading-relaxed max-w-3xl">
          Depuis cet espace privé, vous pouvez consulter les dernières demandes
          de contact via le formulaire de votre site, suivre l&apos;état des
          paiements Stripe, et configurer les dates de départ disponibles pour
          vos circuits.
        </p>
      </div>
    </div>
  );
}

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <div className="rounded-2xl p-5 sm:p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg glass-panel frozen-border">
          <div className="mb-2 text-sm font-medium text-charcoal-500">
            Nouvelles demandes
          </div>
          <div className="text-3xl font-serif text-charcoal-700">
            {pendingRequests}
          </div>
          <div className="mt-4 h-1.5 w-16 rounded-full bg-primary-200" />
        </div>

        <div className="rounded-2xl p-5 sm:p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg glass-panel frozen-border">
          <div className="mb-2 text-sm font-medium text-charcoal-500">
            Réservations Payées
          </div>
          <div className="text-3xl font-serif text-charcoal-700">
            {confirmedBookings}
          </div>
          <div className="mt-4 h-1.5 w-16 rounded-full bg-primary-300" />
        </div>
      </div>

      <div className="rounded-2xl p-5 sm:p-6 md:p-8 glass-panel frozen-border">
        <h2 className="mb-4 text-xl font-serif text-charcoal-700 md:text-2xl">
          Bienvenue sur votre Dashboard
        </h2>
        <p className="max-w-3xl leading-relaxed text-charcoal-500">
          Depuis cet espace privé, vous pouvez consulter les dernières demandes
          de contact via le formulaire de votre site, suivre l&apos;état des
          paiements Stripe, et configurer les dates de départ disponibles pour
          vos circuits.
        </p>
      </div>
    </div>
  );
}

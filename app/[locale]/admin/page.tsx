import prisma from '@/lib/prisma';
import StatsCard from '@/components/admin/StatsCard';

export default async function AdminDashboard() {
  let pendingRequests = 0;
  let confirmedBookings = 0;
  let totalRevenue = 0;
  let activeTours = 0;
  let totalPassengers = 0;

  try {
    const [
      pendingRequestsCount,
      confirmedBookingsCount,
      revenueResult,
      activeToursCount,
      passengersResult,
    ] = await Promise.all([
      prisma.contactRequest.count({ where: { status: 'NOUVEAU' } }),
      prisma.booking.count({ where: { paymentStatus: 'PAID' } }),
      prisma.booking.aggregate({
        _sum: { totalAmount: true },
        where: { paymentStatus: 'PAID' },
      }),
      prisma.tour.count({ where: { isActive: true } }),
      prisma.booking.aggregate({
        _sum: { passengers: true },
        where: { paymentStatus: 'PAID' },
      }),
    ]);

    pendingRequests = pendingRequestsCount;
    confirmedBookings = confirmedBookingsCount;
    totalRevenue = revenueResult._sum.totalAmount || 0;
    activeTours = activeToursCount;
    totalPassengers = passengersResult._sum.passengers || 0;
  } catch (e) {
    console.error('Dashboard count error:', e);
  }

  const icons = {
    revenue: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    bookings: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    passengers: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    tours: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
    contacts: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    ),
  };

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-serif text-charcoal-800">
          Vue d&apos;ensemble
        </h1>
        <p className="mt-2 text-charcoal-500">
          Suivez les performances et l&apos;activité de votre agence en temps
          réel.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatsCard
          label="Revenu Total"
          value={`${totalRevenue.toLocaleString('fr-FR')} €`}
          icon={icons.revenue}
          description="Total des paiements validés"
        />
        <StatsCard
          label="Réservations"
          value={confirmedBookings}
          icon={icons.bookings}
          description="Paiements Stripe réussis"
        />
        <StatsCard
          label="Total Voyageurs"
          value={totalPassengers}
          icon={icons.passengers}
          description="Personnes ayant réservé"
        />
        <StatsCard
          label="Circuits Actifs"
          value={activeTours}
          icon={icons.tours}
          description="Publiés sur le site"
        />
        <StatsCard
          label="Nouvelles Demandes"
          value={pendingRequests}
          icon={icons.contacts}
          description="CRM - En attente de traitement"
        />
      </div>

      <div className="rounded-3xl p-6 md:p-10 glass-panel frozen-border">
        <div className="max-w-3xl">
          <h2 className="mb-4 text-2xl font-serif text-charcoal-800">
            Bienvenue sur votre Dashboard
          </h2>
          <div className="space-y-4 leading-relaxed text-charcoal-600">
            <p>
              Depuis cet espace sécurisé, vous avez une vision globale sur votre
              activité. Vous pouvez gérer les demandes de contact, suivre les
              paiements et configurer vos circuits de voyage.
            </p>
            <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/40 p-4 border border-white/40">
                <h4 className="font-medium text-charcoal-800 mb-1">CRM</h4>
                <p className="text-sm text-charcoal-500">
                  Gérez vos prospects et convertissez-les en clients.
                </p>
              </div>
              <div className="rounded-2xl bg-white/40 p-4 border border-white/40">
                <h4 className="font-medium text-charcoal-800 mb-1">
                  Paiements
                </h4>
                <p className="text-sm text-charcoal-500">
                  Suivi automatique des transactions via Stripe.
                </p>
              </div>
              <div className="rounded-2xl bg-white/40 p-4 border border-white/40">
                <h4 className="font-medium text-charcoal-800 mb-1">
                  Catalogue
                </h4>
                <p className="text-sm text-charcoal-500">
                  Mise à jour des dates et tarifs en temps réel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

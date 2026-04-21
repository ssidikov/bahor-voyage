import prisma from '@/lib/prisma';
import StatusUpdater from '@/components/admin/StatusUpdater';

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      tourDate: {
        include: { tour: true },
      },
      options: {
        include: { tourOption: true },
      },
      travelers: true,
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-serif text-charcoal-700">Réservations</h2>

      <div className="bg-white rounded-2xl border border-border-soft overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-sand-50 text-charcoal-500 border-b border-border-soft">
            <tr>
              <th className="px-6 py-4 font-medium">Réf / Date</th>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Circuit</th>
              <th className="px-6 py-4 font-medium">Paiement</th>
              <th className="px-6 py-4 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-sand-50/50 transition-colors"
              >
                <td className="px-6 py-4 text-charcoal-500">
                  <div className="font-mono text-xs mb-1">
                    {booking.id.slice(-8).toUpperCase()}
                  </div>
                  <div className="text-xs">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-charcoal-800">
                    {booking.firstName} {booking.lastName}
                  </div>
                  <div className="text-xs text-charcoal-500">
                    {booking.email}
                  </div>
                  <div className="text-xs text-charcoal-500">
                    {booking.phone}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-charcoal-800 mb-1">
                    {booking.tourDate.tour.titleFr}
                  </div>
                  <div className="text-xs text-charcoal-500 mb-1">
                    Départ:{' '}
                    {new Date(booking.tourDate.startDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs font-medium text-primary-600">
                    {booking.passengers} passager(s)
                  </div>
                  {booking.travelers.length > 0 && (
                    <div className="mt-2 text-xs text-charcoal-500 border-t border-border-soft pt-1 italic">
                      Voyageurs:{' '}
                      {booking.travelers
                        .map((t) => `${t.firstName} ${t.lastName}`)
                        .join(', ')}
                    </div>
                  )}
                  {booking.message && (
                    <div className="mt-2 text-xs text-charcoal-500 bg-sand-50 p-2 rounded border border-border-soft">
                      <strong>Message:</strong> {booking.message}
                    </div>
                  )}
                  {booking.options.length > 0 && (
                    <div className="mt-2 text-xs text-charcoal-500 border-t border-border-soft pt-1">
                      Options:{' '}
                      {booking.options
                        .map((o) => o.tourOption.nameFr)
                        .join(', ')}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{booking.totalAmount} €</div>
                  <div className="text-xs mt-1">
                    {booking.paymentStatus === 'PAID' ? (
                      <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        Payé
                      </span>
                    ) : booking.paymentStatus === 'PENDING' ? (
                      <span className="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                        En attente
                      </span>
                    ) : (
                      <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                        {booking.paymentStatus}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusUpdater
                    id={booking.id}
                    currentStatus={booking.status}
                    type="booking"
                    options={['CONFIRMED', 'CANCELLED', 'COMPLETED']}
                  />
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-charcoal-400"
                >
                  Aucune réservation pour le moment
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

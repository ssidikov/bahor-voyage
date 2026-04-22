import prisma from '@/lib/prisma';
import BookingsTable from '@/components/admin/BookingsTable';

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
      <BookingsTable bookings={bookings} />
    </div>
  );
}

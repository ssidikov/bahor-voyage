import prisma from '@/lib/prisma';
import Link from 'next/link';
import SyncToursButton from '@/components/admin/SyncToursButton';
import AddTourButton from '@/components/admin/AddTourButton';

export default async function AdminCircuitsPage() {
  const tours = await prisma.tour.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { dates: true, options: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif text-charcoal-700">Circuits</h2>
        <div className="flex gap-3">
          <SyncToursButton />
          <AddTourButton />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border-soft overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-sand-50 text-charcoal-500 border-b border-border-soft">
            <tr>
              <th className="px-6 py-4 font-medium">Titre (FR)</th>
              <th className="px-6 py-4 font-medium">Slug</th>
              <th className="px-6 py-4 font-medium">Durée</th>
              <th className="px-6 py-4 font-medium">Dates créées</th>
              <th className="px-6 py-4 font-medium">Options</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {tours.map((tour) => (
              <tr
                key={tour.id}
                className="hover:bg-sand-50/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-charcoal-800">
                  {tour.titleFr}
                </td>
                <td className="px-6 py-4 text-charcoal-500">{tour.slug}</td>
                <td className="px-6 py-4 text-charcoal-500">
                  {tour.durationDays} jours
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                    {tour._count.dates} dates
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sand-100 text-charcoal-600">
                    {tour._count.options} options
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/circuits/${tour.id}`}
                    className="text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Gérer &rarr;
                  </Link>
                </td>
              </tr>
            ))}
            {tours.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-charcoal-400"
                >
                  Aucun circuit trouvé. Veuillez exécuter le script de seed.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

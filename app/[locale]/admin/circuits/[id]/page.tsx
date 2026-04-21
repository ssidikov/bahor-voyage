import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DatesManager from '@/components/admin/DatesManager';
import OptionsManager from '@/components/admin/OptionsManager';
import EditTourButton from '@/components/admin/EditTourButton';

export default async function AdminCircuitDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tour = await prisma.tour.findUnique({
    where: { id },
    include: {
      dates: { orderBy: { startDate: 'asc' } },
      options: { orderBy: { createdAt: 'asc' } },
    },
  });

  if (!tour) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/circuits"
          className="text-charcoal-400 hover:text-charcoal-700"
        >
          &larr; Retour aux circuits
        </Link>
        <h2 className="text-2xl font-serif text-charcoal-800 border-l-2 border-primary-500 pl-4">
          Gestion du circuit : {tour.titleFr}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Box */}
        <div className="col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm space-y-4">
            <h3 className="text-lg font-serif text-charcoal-700 mb-4 border-b border-border-soft pb-2">
              Détails du circuit
            </h3>
            <div>
              <div className="text-xs text-charcoal-400 uppercase tracking-wider">
                Titre (Français)
              </div>
              <div className="font-medium text-charcoal-800">
                {tour.titleFr}
              </div>
            </div>
            <div>
              <div className="text-xs text-charcoal-400 uppercase tracking-wider">
                Titre (Anglais)
              </div>
              <div className="font-medium text-charcoal-800">
                {tour.titleEn}
              </div>
            </div>
            <div>
              <div className="text-xs text-charcoal-400 uppercase tracking-wider">
                Slug URL
              </div>
              <div className="text-sm text-charcoal-600 bg-sand-50 p-2 rounded mt-1">
                {tour.slug}
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div>
                <div className="text-xs text-charcoal-400 uppercase tracking-wider">
                  Durée
                </div>
                <div className="font-medium">{tour.durationDays} jours</div>
              </div>
              <div>
                <div className="text-xs text-charcoal-400 uppercase tracking-wider">
                  Statut
                </div>
                <div>
                  {tour.isActive ? (
                    <span className="text-green-600 font-medium">Actif</span>
                  ) : (
                    <span className="text-red-500 font-medium">Inactif</span>
                  )}
                </div>
              </div>
            </div>
            <EditTourButton tour={tour} />
          </div>
        </div>

        {/* Management Area */}
        <div className="col-span-1 lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm">
            <DatesManager tourId={tour.id} dates={tour.dates} />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm">
            <OptionsManager tourId={tour.id} options={tour.options} />
          </div>
        </div>
      </div>
    </div>
  );
}

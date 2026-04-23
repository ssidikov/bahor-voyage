import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PrintButton from './PrintButton';

export default async function BookingPdfPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      tourDate: {
        include: { tour: true },
      },
      travelers: true,
      options: {
        include: { tourOption: true },
      },
    },
  });

  if (!booking) {
    notFound();
  }

  const refDate = new Date(booking.createdAt).toLocaleDateString('fr-FR');
  const departureDate = new Date(booking.tourDate.startDate).toLocaleDateString(
    'fr-FR',
  );
  const shortId = booking.id.slice(-8).toUpperCase();

  return (
    <div className="max-w-3xl mx-auto bg-white min-h-[297mm] p-8 sm:p-12 print:p-0 print:shadow-none shadow-lg rounded-xl font-sans relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-primary-600 print:bg-primary-600 [-webkit-print-color-adjust:exact] print:color-adjust-exact"></div>

      <div className="flex justify-end mb-8 print:hidden pt-4">
        <PrintButton />
      </div>

      <div className="print:block pt-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border-soft pb-8 mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center print:bg-primary-50 [-webkit-print-color-adjust:exact] print:color-adjust-exact">
              <span className="font-serif text-3xl text-primary-600 font-bold">
                B
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-serif text-primary-700 uppercase tracking-widest leading-none">
                Bahor Voyage
              </h1>
              <p className="text-gold uppercase tracking-[0.15em] text-xs mt-2 font-medium">
                Voyager à travers le passé, protéger l&apos;avenir.
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right bg-sand-50 p-4 rounded-xl border border-sand-200 print:bg-sand-50 print:border-sand-200 [-webkit-print-color-adjust:exact] print:color-adjust-exact">
            <div className="text-xl font-serif text-charcoal-800 mb-1">
              Confirmation de Réservation
            </div>
            <div className="text-sm font-medium text-primary-600 mt-2">
              Réf:{' '}
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-border-soft ml-1">
                {shortId}
              </span>
            </div>
            <div className="text-xs text-charcoal-500 mt-1">
              Date d&apos;émission: {refDate}
            </div>
          </div>
        </div>

        {/* Tour Details */}
        <div className="mb-8 p-0 rounded-xl overflow-hidden border border-primary-100 bg-white print:border-primary-100">
          <div className="bg-primary-50 px-6 py-4 border-b border-primary-100 flex items-center gap-3 print:bg-primary-50 [-webkit-print-color-adjust:exact] print:color-adjust-exact">
            <svg
              className="w-5 h-5 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-sm font-bold text-primary-800 uppercase tracking-wider">
              Détails du Circuit
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <span className="block text-xs uppercase tracking-wider text-charcoal-400 mb-1">
                  Destination & Circuit
                </span>
                <span className="block text-base font-serif font-medium text-charcoal-900">
                  {booking.tourDate.tour.titleFr}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-charcoal-400 mb-1">
                  Date de départ
                </span>
                <span className="block text-base font-medium text-charcoal-800">
                  {departureDate}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-charcoal-400 mb-1">
                  Nombre de passagers
                </span>
                <span className="inline-flex items-center justify-center bg-sand-100 text-charcoal-800 px-3 py-1 rounded-full font-medium print:bg-sand-100 [-webkit-print-color-adjust:exact] print:color-adjust-exact">
                  {booking.passengers}
                </span>
              </div>
              {booking.options.length > 0 && (
                <div>
                  <span className="block text-xs uppercase tracking-wider text-charcoal-400 mb-1">
                    Options incluses
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {booking.options.map((o, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 bg-gold/10 text-gold-dark rounded text-xs font-medium print:bg-gold/10 [-webkit-print-color-adjust:exact] print:color-adjust-exact"
                      >
                        {o.tourOption.nameFr}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div className="mb-8 p-0 rounded-xl overflow-hidden border border-border-soft bg-white">
          <div className="bg-sand-50 px-6 py-4 border-b border-border-soft flex items-center gap-3 print:bg-sand-50 [-webkit-print-color-adjust:exact] print:color-adjust-exact">
            <svg
              className="w-5 h-5 text-gold-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h2 className="text-sm font-bold text-charcoal-700 uppercase tracking-wider">
              Informations Voyageurs
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6">
              <div>
                <span className="block text-xs uppercase tracking-wider text-charcoal-400 mb-1">
                  Réservé par
                </span>
                <span className="block text-base font-medium text-charcoal-800">
                  {booking.firstName} {booking.lastName}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-charcoal-400 mb-1">
                  Email
                </span>
                <span className="block text-charcoal-800">{booking.email}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-charcoal-400 mb-1">
                  Téléphone
                </span>
                <span className="block text-charcoal-800">{booking.phone}</span>
              </div>
            </div>

            {booking.travelers.length > 0 && (
              <div className="pt-5 mt-2 border-t border-dashed border-border-soft">
                <span className="block text-xs uppercase tracking-wider text-charcoal-400 mb-3">
                  Autres passagers
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {booking.travelers.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-charcoal-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                      {t.firstName} {t.lastName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-8 p-0 rounded-xl overflow-hidden border border-border-soft bg-white">
          <div className="bg-sand-50 px-6 py-4 border-b border-border-soft flex items-center gap-3 print:bg-sand-50 [-webkit-print-color-adjust:exact] print:color-adjust-exact">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-sm font-bold text-charcoal-700 uppercase tracking-wider">
              Récapitulatif de paiement
            </h2>
          </div>
          <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <div>
              <span className="block text-xs uppercase tracking-wider text-charcoal-400 mb-1">
                Statut
              </span>
              {booking.paymentStatus === 'PAID' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full font-medium print:bg-green-50 print:border-green-200 print:text-green-700 [-webkit-print-color-adjust:exact] print:color-adjust-exact">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Paiement validé
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full font-medium print:bg-yellow-50 print:border-yellow-200 [-webkit-print-color-adjust:exact] print:color-adjust-exact">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  En attente
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="block text-xs uppercase tracking-wider text-charcoal-400 mb-1">
                Montant Réglé
              </span>
              <span className="block text-3xl font-serif font-bold text-charcoal-900">
                {booking.totalAmount} €
              </span>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-16 pt-8 border-t border-border-soft text-center">
          <div className="w-12 h-px bg-gold mx-auto mb-6 print:bg-gold [-webkit-print-color-adjust:exact] print:color-adjust-exact"></div>
          <p className="text-sm text-charcoal-600 font-serif mb-2">
            Nous vous remercions d&apos;avoir choisi Bahor Voyage pour votre
            prochaine aventure.
          </p>
          <p className="text-xs text-charcoal-400 uppercase tracking-widest">
            Ce document fait office de confirmation officielle.
          </p>
          <div className="mt-8 text-[10px] text-charcoal-300">
            Bahor-Voyage • 12 Place Ambroise Courtois, 69008 Lyon •
            contact@bahor-voyage.com
          </div>
        </div>
      </div>
    </div>
  );
}

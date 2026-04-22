'use client';

import { useState, useMemo } from 'react';
import StatusUpdater from './StatusUpdater';
import CsvExportButton from './CsvExportButton';

type Traveler = {
  firstName: string;
  lastName: string;
};

type TourOption = {
  nameFr: string;
};

type BookingOptionItem = {
  tourOption: TourOption;
};

type Tour = {
  titleFr: string;
};

type TourDate = {
  startDate: string | Date;
  tour: Tour;
};

type Booking = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passengers: number;
  totalAmount: number;
  paymentStatus: string;
  status: string;
  message: string | null;
  createdAt: string | Date;
  tourDate: TourDate;
  travelers: Traveler[];
  options: BookingOptionItem[];
};

const PAYMENT_STATUS_OPTIONS = ['', 'PENDING', 'PAID', 'FAILED', 'REFUNDED'];
const BOOKING_STATUS_OPTIONS = [
  '',
  'CONFIRMED',
  'PENDING',
  'CANCELLED',
  'COMPLETED',
];
const PAGE_SIZE = 20;

const paymentBadge = (status: string) => {
  switch (status) {
    case 'PAID':
      return (
        <span className="text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full text-xs font-medium">
          Payé
        </span>
      );
    case 'PENDING':
      return (
        <span className="text-yellow-700 bg-yellow-50 border border-yellow-100 px-2 py-0.5 rounded-full text-xs font-medium">
          En attente
        </span>
      );
    case 'FAILED':
      return (
        <span className="text-red-700 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full text-xs font-medium">
          Échoué
        </span>
      );
    case 'REFUNDED':
      return (
        <span className="text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full text-xs font-medium">
          Remboursé
        </span>
      );
    default:
      return (
        <span className="text-charcoal-500 bg-sand-50 px-2 py-0.5 rounded-full text-xs">
          {status}
        </span>
      );
  }
};

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return bookings.filter((b) => {
      const matchSearch =
        !q ||
        b.firstName.toLowerCase().includes(q) ||
        b.lastName.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.tourDate.tour.titleFr.toLowerCase().includes(q);
      const matchPayment = !paymentFilter || b.paymentStatus === paymentFilter;
      const matchStatus = !statusFilter || b.status === statusFilter;
      return matchSearch && matchPayment && matchStatus;
    });
  }, [bookings, search, paymentFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filters change
  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };
  const handlePayment = (v: string) => {
    setPaymentFilter(v);
    setPage(1);
  };
  const handleStatus = (v: string) => {
    setStatusFilter(v);
    setPage(1);
  };

  // CSV data
  const csvData = filtered.map((b) => ({
    Référence: b.id.slice(-10).toUpperCase(),
    'Date réservation': new Date(b.createdAt).toLocaleDateString('fr-FR'),
    Prénom: b.firstName,
    Nom: b.lastName,
    Email: b.email,
    Téléphone: b.phone,
    Circuit: b.tourDate.tour.titleFr,
    'Date départ': new Date(b.tourDate.startDate).toLocaleDateString('fr-FR'),
    Voyageurs: b.passengers,
    'Autres voyageurs': b.travelers
      .map((t) => `${t.firstName} ${t.lastName}`)
      .join(' | '),
    'Montant (€)': b.totalAmount,
    'Statut paiement': b.paymentStatus,
    'Statut réservation': b.status,
    Options: b.options.map((o) => o.tourOption.nameFr).join(' | '),
  }));

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle
                cx="7"
                cy="7"
                r="4.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M10.5 10.5l2.5 2.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Nom, email, référence…"
              className="w-full pl-9 pr-4 py-2 text-sm border border-border-soft rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-primary-300"
            />
          </div>

          {/* Payment filter */}
          <select
            value={paymentFilter}
            onChange={(e) => handlePayment(e.target.value)}
            className="px-3 py-2 text-sm border border-border-soft rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-primary-300 text-charcoal-600"
          >
            <option value="">Tous les paiements</option>
            {PAYMENT_STATUS_OPTIONS.filter(Boolean).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => handleStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-border-soft rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-primary-300 text-charcoal-600"
          >
            <option value="">Tous les statuts</option>
            {BOOKING_STATUS_OPTIONS.filter(Boolean).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Export */}
        <CsvExportButton
          data={csvData}
          filename={`reservations-${new Date().toISOString().slice(0, 10)}.csv`}
          label="Exporter CSV"
        />
      </div>

      {/* Count */}
      <p className="text-sm text-charcoal-400">
        {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
        {search || paymentFilter || statusFilter ? ' (filtré)' : ''}
      </p>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border-soft overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand-50 text-charcoal-500 border-b border-border-soft">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Réf / Date
                </th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Circuit</th>
                <th className="px-6 py-4 font-medium">Paiement</th>
                <th className="px-6 py-4 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {paginated.map((booking) => (
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
                      {new Date(
                        booking.tourDate.startDate,
                      ).toLocaleDateString()}
                    </div>
                    <div className="text-xs font-medium text-primary-600">
                      {booking.passengers} passager(s)
                    </div>
                    {booking.travelers.length > 0 && (
                      <div className="mt-2 text-xs text-charcoal-500 border-t border-border-soft pt-1 italic">
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
                    <div className="font-medium mb-1">
                      {booking.totalAmount} €
                    </div>
                    {paymentBadge(booking.paymentStatus)}
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
              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-charcoal-400"
                  >
                    {search || paymentFilter || statusFilter
                      ? 'Aucun résultat pour ces filtres.'
                      : 'Aucune réservation pour le moment.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-charcoal-500">
            Page {page} sur {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm border border-border-soft rounded-xl bg-white text-charcoal-600 hover:bg-sand-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Précédent
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm border border-border-soft rounded-xl bg-white text-charcoal-600 hover:bg-sand-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Suivant →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

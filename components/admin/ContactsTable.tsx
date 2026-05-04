'use client';

import { useState, useMemo } from 'react';
import StatusUpdater from './StatusUpdater';
import CsvExportButton from './CsvExportButton';
import { ChevronDown } from '@/components/ui/Icons';

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  tourInterest: string | null;
  message: string;
  status: string;
  notes: string | null;
  createdAt: string | Date;
};

const STATUS_OPTIONS = ['NOUVEAU', 'CONTACTE', 'QUALIFIE', 'CONVERTI'];
const PAGE_SIZE = 20;

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    NOUVEAU: 'bg-blue-50 text-blue-700 border-blue-100',
    CONTACTE: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    QUALIFIE: 'bg-purple-50 text-purple-700 border-purple-100',
    CONVERTI: 'bg-green-50 text-green-700 border-green-100',
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${map[status] ?? 'bg-sand-50 text-charcoal-500 border-border-soft'}`}
    >
      {status}
    </span>
  );
};

export default function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return contacts.filter((c) => {
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone ?? '').toLowerCase().includes(q) ||
        (c.tourInterest ?? '').toLowerCase().includes(q);
      const matchStatus = !statusFilter || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [contacts, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };
  const handleStatus = (v: string) => {
    setStatusFilter(v);
    setPage(1);
  };

  const csvData = filtered.map((c) => ({
    Date: new Date(c.createdAt).toLocaleDateString('fr-FR'),
    Nom: c.name,
    Email: c.email,
    Téléphone: c.phone ?? '',
    'Circuit souhaité': c.tourInterest ?? '',
    Message: c.message,
    Statut: c.status,
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
              placeholder="Nom, email, téléphone…"
              className="w-full pl-9 pr-4 py-2 text-sm border border-border-soft rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-primary-300"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => handleStatus(e.target.value)}
              className="pl-3 pr-10 py-2 text-sm border border-border-soft rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-primary-300 text-charcoal-600 appearance-none w-full sm:w-auto"
            >
              <option value="">Tous les statuts</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal-400" />
          </div>
        </div>

        {/* Export */}
        <CsvExportButton
          data={csvData}
          filename={`contacts-crm-${new Date().toISOString().slice(0, 10)}.csv`}
          label="Exporter CSV"
        />
      </div>

      {/* Count */}
      <p className="text-sm text-charcoal-400">
        {filtered.length} contact{filtered.length !== 1 ? 's' : ''}
        {search || statusFilter ? ' (filtré)' : ''}
      </p>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border-soft overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand-50 text-charcoal-500 border-b border-border-soft">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  Date
                </th>
                <th className="px-6 py-4 font-medium">Nom</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Intérêt</th>
                <th className="px-6 py-4 font-medium">Message</th>
                <th className="px-6 py-4 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {paginated.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-sand-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-charcoal-500 whitespace-nowrap">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-charcoal-800">
                      {contact.name}
                    </div>
                    {statusBadge(contact.status)}
                  </td>
                  <td className="px-6 py-4 text-charcoal-500">
                    <div>{contact.email}</div>
                    {contact.phone && (
                      <div className="text-xs">{contact.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-charcoal-500">
                    {contact.tourInterest || (
                      <span className="text-charcoal-300">—</span>
                    )}
                  </td>
                  <td
                    className="px-6 py-4 text-charcoal-500 max-w-xs"
                    title={contact.message}
                  >
                    <p className="line-clamp-2 text-xs leading-relaxed">
                      {contact.message}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusUpdater
                      id={contact.id}
                      currentStatus={contact.status}
                      type="contact"
                      options={STATUS_OPTIONS}
                    />
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-charcoal-400"
                  >
                    {search || statusFilter
                      ? 'Aucun résultat pour ces filtres.'
                      : 'Aucune demande de contact.'}
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

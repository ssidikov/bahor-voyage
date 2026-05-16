'use client';

import { useState, useTransition } from 'react';
import { updateContactStatus, updateBookingStatus } from '@/lib/actions/admin';
import { ChevronDown } from '@/components/ui/Icons';

type Props = {
  id: string;
  currentStatus: string;
  type: 'contact' | 'booking';
  options: string[];
};

const STATUS_LABELS: Record<string, string> = {
  // Booking statuses
  PENDING: 'En attente',
  CONFIRMED: 'Confirmé',
  CANCELLED: 'Annulé',
  COMPLETED: 'Terminé',
  // Contact statuses
  NOUVEAU: 'Nouveau',
  CONTACTE: 'Contacté',
  QUALIFIE: 'Qualifié',
  CONVERTI: 'Converti',
};

export default function StatusUpdater({
  id,
  currentStatus,
  type,
  options,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    setError(null);
    startTransition(async () => {
      try {
        if (type === 'contact') {
          await updateContactStatus(id, newStatus);
        } else {
          await updateBookingStatus(id, newStatus);
        }
      } catch {
        setError('Erreur lors de la mise à jour');
      }
    });
  }

  return (
    <div>
      <div className="relative inline-block">
        <select
          value={currentStatus}
          onChange={handleChange}
          disabled={isPending}
          className={`min-h-11 text-xs font-medium rounded-full pl-3 pr-8 py-2 appearance-none bg-white border border-border-soft focus:outline-none focus:ring-1 focus:ring-primary-300 ${isPending ? 'opacity-50' : ''}`}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {STATUS_LABELS[opt] || opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal-400 w-3 h-3" />
      </div>
      {error ? (
        <p className="mt-2 max-w-40 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

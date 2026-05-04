'use client';

import { useTransition } from 'react';
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

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    startTransition(async () => {
      try {
        if (type === 'contact') {
          await updateContactStatus(id, newStatus);
        } else {
          await updateBookingStatus(id, newStatus);
        }
      } catch {
        alert('Erreur lors de la mise à jour');
      }
    });
  }

  return (
    <div className="relative inline-block">
      <select
        value={currentStatus}
        onChange={handleChange}
        disabled={isPending}
        className={`text-xs font-medium rounded-full pl-2.5 pr-7 py-1 appearance-none bg-white border border-border-soft focus:outline-none focus:ring-1 focus:ring-primary-300 ${isPending ? 'opacity-50' : ''}`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {STATUS_LABELS[opt] || opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal-400 w-3 h-3" />
    </div>
  );
}

'use client';

import { useTransition } from 'react';
import { updateContactStatus, updateBookingStatus } from '@/lib/actions/admin';

type Props = {
  id: string;
  currentStatus: string;
  type: 'contact' | 'booking';
  options: string[];
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
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`text-xs font-medium rounded-full px-2.5 py-1 ${isPending ? 'opacity-50' : ''}`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

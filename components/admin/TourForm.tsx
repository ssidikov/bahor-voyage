'use client';

import { useState, useTransition } from 'react';
import { createTour, updateTour, type TourInput } from '@/lib/actions/admin';
import { useRouter } from 'next/navigation';

type Props = {
  tour?: {
    id: string;
    slug: string;
    titleFr: string;
    titleEn: string;
    durationDays: number;
    isActive: boolean;
  };
  onClose?: () => void;
};

export default function TourForm({ tour, onClose }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        const data: TourInput = {
          slug: formData.get('slug') as string,
          titleFr: formData.get('titleFr') as string,
          titleEn: formData.get('titleEn') as string,
          durationDays: formData.get('durationDays') as string,
          isActive: formData.get('isActive') === 'on',
        };

        if (tour) {
          await updateTour(tour.id, data);
        } else {
          await createTour(data);
        }

        if (onClose) onClose();
        router.refresh();
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : 'Une erreur est survenue',
        );
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal-500 mb-1 uppercase tracking-wider">
            Titre (FR)
          </label>
          <input
            required
            name="titleFr"
            defaultValue={tour?.titleFr}
            className="w-full px-4 py-2 rounded-lg border border-border-soft bg-sand-50/50"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal-500 mb-1 uppercase tracking-wider">
            Titre (EN)
          </label>
          <input
            required
            name="titleEn"
            defaultValue={tour?.titleEn}
            className="w-full px-4 py-2 rounded-lg border border-border-soft bg-sand-50/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal-500 mb-1 uppercase tracking-wider">
            Slug (URL)
          </label>
          <input
            required
            name="slug"
            defaultValue={tour?.slug}
            placeholder="ex: grand-tour-ouzbekistan"
            className="w-full px-4 py-2 rounded-lg border border-border-soft bg-sand-50/50"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal-500 mb-1 uppercase tracking-wider">
            Durée (jours)
          </label>
          <input
            required
            name="durationDays"
            type="number"
            defaultValue={tour?.durationDays || 1}
            className="w-full px-4 py-2 rounded-lg border border-border-soft bg-sand-50/50"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isActive"
          id="tour-active"
          defaultChecked={tour ? tour.isActive : true}
          className="rounded border-border-soft text-primary-500"
        />
        <label
          htmlFor="tour-active"
          className="ml-2 text-sm text-charcoal-600 font-medium"
        >
          Circuit Actif
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-charcoal-500 hover:text-charcoal-700"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-charcoal-800 text-white rounded-lg text-sm font-medium hover:bg-charcoal-900 transition-colors disabled:opacity-50"
        >
          {isPending
            ? 'Enregistrement...'
            : tour
              ? 'Modifier le circuit'
              : 'Créer le circuit'}
        </button>
      </div>
    </form>
  );
}

'use client';

import { useState } from 'react';
import {
  createTourDate,
  deleteTourDate,
  updateTourDate,
  type TourDateInput,
} from '@/lib/actions/admin';

interface TourDate {
  id: string;
  startDate: Date | string;
  endDate: Date | string;
  price: number;
  maxSeats: number;
  bookedSeats: number;
  isGuaranteed: boolean;
  isActive: boolean;
}

export default function DatesManager({
  tourId,
  dates,
}: {
  tourId: string;
  dates: TourDate[];
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingDate, setEditingDate] = useState<TourDate | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as TourDateInput;

    try {
      if (editingDate) {
        await updateTourDate(editingDate.id, data);
        setEditingDate(null);
      } else {
        await createTourDate(tourId, data);
        setIsAdding(false);
      }
    } catch {
      alert('Error saving date');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteTourDate(id, tourId);
    } catch {
      alert('Error deleting');
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-serif text-charcoal-700">
          Départs Programmés
        </h3>
        <button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingDate(null);
          }}
          className="px-3 py-1.5 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700"
        >
          {isAdding || editingDate ? 'Annuler' : '+ Ajouter une date'}
        </button>
      </div>

      {(isAdding || editingDate) && (
        <form
          onSubmit={handleSubmit}
          className="bg-sand-50 p-4 rounded-lg border border-border-soft grid grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-xs text-charcoal-500 mb-1">
              Date de début
            </label>
            <input
              type="date"
              name="startDate"
              defaultValue={
                editingDate
                  ? new Date(editingDate.startDate).toISOString().split('T')[0]
                  : ''
              }
              required
              className="w-full border border-border-soft rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal-500 mb-1">
              Date de fin
            </label>
            <input
              type="date"
              name="endDate"
              defaultValue={
                editingDate
                  ? new Date(editingDate.endDate).toISOString().split('T')[0]
                  : ''
              }
              required
              className="w-full border border-border-soft rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal-500 mb-1">
              Prix de base (€)
            </label>
            <input
              type="number"
              name="price"
              defaultValue={editingDate?.price}
              required
              className="w-full border border-border-soft rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal-500 mb-1">
              Places max
            </label>
            <input
              type="number"
              name="maxSeats"
              defaultValue={editingDate?.maxSeats || 12}
              required
              className="w-full border border-border-soft rounded p-2 text-sm"
            />
          </div>
          <div className="col-span-2 flex items-center space-x-6">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="isGuaranteed"
                defaultChecked={editingDate?.isGuaranteed}
              />
              <span>Départ Garanti</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={editingDate ? editingDate.isActive : true}
              />
              <span>Actif</span>
            </label>
            <div className="flex-1 text-right">
              <button
                disabled={loading}
                className="px-4 py-2 bg-charcoal-800 text-white rounded text-sm disabled:opacity-50"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="bg-white border border-border-soft rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-sand-50 text-charcoal-500 border-b border-border-soft">
            <tr>
              <th className="px-4 py-3">Période</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Places</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {dates.map((date) => (
              <tr key={date.id}>
                <td className="px-4 py-3">
                  {new Date(date.startDate).toLocaleDateString()} -{' '}
                  {new Date(date.endDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{date.price} €</td>
                <td className="px-4 py-3">
                  {date.bookedSeats} / {date.maxSeats}
                </td>
                <td className="px-4 py-3">
                  {date.isGuaranteed && (
                    <span className="text-green-600 text-xs font-medium mr-2">
                      Garanti
                    </span>
                  )}
                  {!date.isActive && (
                    <span className="text-red-500 text-xs">Inactif</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button
                    onClick={() => setEditingDate(date)}
                    className="text-primary-600 hover:underline text-xs"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(date.id)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {dates.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-charcoal-400"
                >
                  Aucune date programmée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

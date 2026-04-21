'use client';

import { useState } from 'react';
import {
  createTourOption,
  deleteTourOption,
  updateTourOption,
  type TourOptionInput,
} from '@/lib/actions/admin';

interface TourOption {
  id: string;
  nameFr: string;
  nameEn: string;
  price: number;
  type: string;
  isActive: boolean;
}

export default function OptionsManager({
  tourId,
  options,
}: {
  tourId: string;
  options: TourOption[];
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingOption, setEditingOption] = useState<TourOption | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as TourOptionInput;

    try {
      if (editingOption) {
        await updateTourOption(editingOption.id, data);
        setEditingOption(null);
      } else {
        await createTourOption(tourId, data);
        setIsAdding(false);
      }
    } catch {
      alert('Error saving option');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteTourOption(id, tourId);
    } catch {
      alert('Error deleting');
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-serif text-charcoal-700">
          Options du Circuit
        </h3>
        <button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingOption(null);
          }}
          className="px-3 py-1.5 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700"
        >
          {isAdding || editingOption ? 'Annuler' : '+ Ajouter une option'}
        </button>
      </div>

      {(isAdding || editingOption) && (
        <form
          onSubmit={handleSubmit}
          className="bg-sand-50 p-4 rounded-lg border border-border-soft grid grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-xs text-charcoal-500 mb-1">
              Nom (Français)
            </label>
            <input
              type="text"
              name="nameFr"
              defaultValue={editingOption?.nameFr}
              required
              className="w-full border border-border-soft rounded p-2 text-sm"
              placeholder="ex: Supplément single"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal-500 mb-1">
              Nom (Anglais)
            </label>
            <input
              type="text"
              name="nameEn"
              defaultValue={editingOption?.nameEn}
              required
              className="w-full border border-border-soft rounded p-2 text-sm"
              placeholder="ex: Single supplement"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal-500 mb-1">
              Prix (€)
            </label>
            <input
              type="number"
              name="price"
              defaultValue={editingOption?.price}
              required
              className="w-full border border-border-soft rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-charcoal-500 mb-1">
              Type d&apos;option
            </label>
            <select
              name="type"
              defaultValue={editingOption?.type || 'SUPPLEMENT'}
              className="w-full border border-border-soft rounded p-2 text-sm bg-white"
            >
              <option value="SUPPLEMENT">Supplément (ex: Single)</option>
              <option value="EXCURSION">Excursion optionnelle</option>
              <option value="UPGRADE">Surclassement (ex: Hôtel 4*)</option>
            </select>
          </div>
          <div className="col-span-2 flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={editingOption ? editingOption.isActive : true}
              />
              <span>Actif</span>
            </label>
            <button
              disabled={loading}
              className="px-4 py-2 bg-charcoal-800 text-white rounded text-sm disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-border-soft rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-sand-50 text-charcoal-500 border-b border-border-soft">
            <tr>
              <th className="px-4 py-3">Nom (FR)</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {options.map((opt) => (
              <tr key={opt.id}>
                <td className="px-4 py-3 font-medium text-charcoal-800">
                  {opt.nameFr}
                </td>
                <td className="px-4 py-3 text-charcoal-500">{opt.type}</td>
                <td className="px-4 py-3 font-medium">+{opt.price} €</td>
                <td className="px-4 py-3">
                  {!opt.isActive ? (
                    <span className="text-red-500 text-xs">Inactif</span>
                  ) : (
                    <span className="text-green-600 text-xs">Actif</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button
                    onClick={() => setEditingOption(opt)}
                    className="text-primary-600 hover:underline text-xs"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(opt.id)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {options.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-charcoal-400"
                >
                  Aucune option configurée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

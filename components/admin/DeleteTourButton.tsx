'use client';

import { useState } from 'react';
import { deleteTour } from '@/lib/actions/admin';
import { useRouter } from 'next/navigation';

interface DeleteTourButtonProps {
  tourId: string;
  tourTitle: string;
}

export default function DeleteTourButton({
  tourId,
  tourTitle,
}: DeleteTourButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTour(tourId);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete tour:', error);
      alert(
        'Impossible de supprimer ce circuit. Il est probablement lié à des réservations existantes.',
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-red-600 hover:text-red-800 font-medium ml-4"
      >
        Supprimer
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in-up">
            <h3 className="text-xl font-serif text-charcoal-700 mb-4 font-light">
              Supprimer le circuit
            </h3>
            <p className="text-charcoal-500 mb-8">
              Êtes-vous sûr de vouloir supprimer le circuit{' '}
              <span className="font-semibold text-charcoal-800">
                {tourTitle}
              </span>{' '}
              ? Cette action est irréversible et supprimera toutes les dates et
              options associées.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-charcoal-500 hover:text-charcoal-700 font-medium"
                disabled={isDeleting}
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

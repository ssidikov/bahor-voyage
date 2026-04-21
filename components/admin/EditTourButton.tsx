'use client';

import { useState } from 'react';
import TourForm from './TourForm';

type Props = {
  tour: {
    id: string;
    slug: string;
    titleFr: string;
    titleEn: string;
    durationDays: number;
    isActive: boolean;
  };
};

export default function EditTourButton({ tour }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 px-4 py-2 border border-charcoal-200 text-charcoal-700 rounded-lg text-sm hover:bg-sand-50 transition-colors font-medium"
      >
        Modifier les informations
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-left">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
            <h3 className="text-xl font-serif text-charcoal-700 mb-6 font-light">
              Modifier le Circuit
            </h3>
            <TourForm tour={tour} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

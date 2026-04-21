'use client';

import { useState } from 'react';
import TourForm from './TourForm';

export default function AddTourButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-charcoal-800 text-white rounded-lg text-sm hover:bg-charcoal-900 transition-colors"
      >
        + Ajouter un circuit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 animate-fade-in-up">
            <h3 className="text-xl font-serif text-charcoal-700 mb-6 font-light">
              Nouveau Circuit
            </h3>
            <TourForm onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

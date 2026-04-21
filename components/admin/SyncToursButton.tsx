'use client';

import { useState } from 'react';
import { syncTourPackages } from '@/lib/actions/admin';
import { Button } from '@/components/ui/Button';

export default function SyncToursButton() {
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    if (
      !confirm(
        'Cela va importer ou mettre à jour les 4 circuits principaux (Samarcande, Solidaire, Immersion, Grand Tour). Continuer ?',
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await syncTourPackages();
      alert('Circuits synchronisés avec succès !');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la synchronisation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSync}
      disabled={loading}
      variant="outline"
      size="sm"
      className="text-xs border-sand-300 hover:bg-sand-50"
    >
      {loading ? 'Synchronisation...' : 'Sync Packages'}
    </Button>
  );
}

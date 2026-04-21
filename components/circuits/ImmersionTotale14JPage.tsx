import TourPage from '@/components/circuits/tour/TourPage';
import { immersionTotale14j } from '@/components/circuits/tour/data/immersion-totale-14j';

const INTRO_BULLETS = [
  'immersion_totale_14j_intro_bullet1',
  'immersion_totale_14j_intro_bullet2',
  'immersion_totale_14j_intro_bullet3',
] as const;

export default function ImmersionTotale14JPage({
  availableDatesCount,
}: {
  availableDatesCount: number;
}) {
  return (
    <TourPage
      data={immersionTotale14j}
      introBulletKeys={INTRO_BULLETS}
      slug="immersion-totale-14j"
      availableDatesCount={availableDatesCount}
    />
  );
}

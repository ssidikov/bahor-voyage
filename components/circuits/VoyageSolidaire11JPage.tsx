import TourPage from '@/components/circuits/tour/TourPage';
import { voyageSolidaire11j } from '@/components/circuits/tour/data/voyage-solidaire-11j';

const INTRO_BULLETS = [
  'voyage_solidaire_11j_intro_bullet1',
  'voyage_solidaire_11j_intro_bullet2',
  'voyage_solidaire_11j_intro_bullet3',
] as const;

export default function VoyageSolidaire11JPage({
  availableDatesCount,
}: {
  availableDatesCount: number;
}) {
  return (
    <TourPage
      data={voyageSolidaire11j}
      introBulletKeys={INTRO_BULLETS}
      slug="voyage-solidaire-11j"
      availableDatesCount={availableDatesCount}
    />
  );
}

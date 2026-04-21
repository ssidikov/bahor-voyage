import TourPage from '@/components/circuits/tour/TourPage';
import { samarkandBoukhara } from '@/components/circuits/tour/data/samarkand-boukhara';

const INTRO_BULLETS = [
  'samarkand_boukhara_intro_bullet1',
  'samarkand_boukhara_intro_bullet2',
] as const;

export default function SamarkandBukharaPage({
  availableDatesCount,
}: {
  availableDatesCount: number;
}) {
  return (
    <TourPage
      data={samarkandBoukhara}
      introBulletKeys={INTRO_BULLETS}
      slug="samarcande-boukhara"
      availableDatesCount={availableDatesCount}
    />
  );
}

import TourPage from '@/components/circuits/tour/TourPage';
import { grandCircuit18j } from '@/components/circuits/tour/data/grand-circuit-18j';

const INTRO_BULLETS = [
  'grand_circuit_18j_intro_bullet1',
  'grand_circuit_18j_intro_bullet2',
  'grand_circuit_18j_intro_bullet3',
] as const;

export default function GrandCircuit18JPage() {
  return <TourPage data={grandCircuit18j} introBulletKeys={INTRO_BULLETS} />;
}

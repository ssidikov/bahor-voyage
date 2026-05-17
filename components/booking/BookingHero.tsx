import PageHero from '@/components/ui/PageHero';

interface BookingHeroProps {
  kicker: string;
  title: string;
  intro: string;
}

export default function BookingHero({
  kicker,
  title,
  intro,
}: BookingHeroProps) {
  return (
    <PageHero
      image={{ src: '/images/tours/Khiva-2.jpg', alt: 'Samarkand, Uzbekistan' }}
      kicker={kicker}
      title={title}
      subtitle={intro}
      containerClassName="h-[60vh] min-h-100"
    />
  );
}

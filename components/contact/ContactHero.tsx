import PageHero from '@/components/ui/PageHero';

interface ContactHeroProps {
  kicker: string;
  title: string;
  intro: string;
}

export default function ContactHero({
  kicker,
  title,
  intro,
}: ContactHeroProps) {
  return (
    <PageHero
      image={{
        src: 'https://cdn.bahorvoyage.com/images/khiva-old-city.jpg',
        alt: 'Uzbek craftsmanship - Bahor Voyage',
      }}
      kicker={kicker}
      title={title}
      subtitle={intro}
    />
  );
}

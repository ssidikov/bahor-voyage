'use client';

type MarqueeSectionProps = {
  text?: string;
  dark?: boolean;
  speed?: number;
};

export function MarqueeSection({
  text = 'SAMARCANDE · BOUKHARA · KHIVA · TACHKENT · ROUTE DE LA SOIE ·',
  speed = 100,
}: MarqueeSectionProps) {
  const repeated = [text, text, text];

  return (
    <div className="overflow-hidden py-5">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {repeated.map((chunk, i) => (
          <span
            key={i}
            className="text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-serif font-light tracking-widest mx-8 shrink-0 select-none text-charcoal-900/[0.07]"
          >
            {chunk}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MarqueeSection;

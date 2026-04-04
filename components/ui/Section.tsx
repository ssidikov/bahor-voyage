import type { ReactNode } from 'react';

type Background = 'white' | 'light' | 'primary';

export type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: Background;
};

const bgClasses: Record<Background, string> = {
  white: 'bg-white',
  light: 'bg-surface-soft',
  primary: 'bg-action text-text-on-emphasis',
};

export function Section({
  children,
  className = '',
  id,
  background = 'white',
}: SectionProps) {
  return (
    <section
      id={id}
      className={['py-16 md:py-24', bgClasses[background], className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="max-w-6xl mx-auto px-container md:px-container-md">
        {children}
      </div>
    </section>
  );
}

export default Section;

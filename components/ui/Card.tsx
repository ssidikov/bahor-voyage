import type { ReactNode } from 'react';

export type CardProps = {
  children: ReactNode;
  className?: string;
  /** Adds a subtle lift animation on hover */
  hover?: boolean;
};

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={[
        'bg-white rounded-card border border-neutral-100 shadow-card overflow-hidden',
        hover
          ? 'hover:shadow-card hover:-translate-y-0.5 transition-all duration-200'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

export default Card;

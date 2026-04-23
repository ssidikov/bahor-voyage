import type { ReactNode } from 'react';

type Variant = 'default' | 'primary' | 'success' | 'warning';

export type BadgeProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

const variantClasses: Record<Variant, string> = {
  default: 'bg-sand text-charcoal',
  primary: 'bg-primary-soft text-primary-hover',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
};

export function Badge({
  variant = 'default',
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'text-xs px-2.5 py-0.5 rounded-pill font-medium',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}

export default Badge;

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Link } from '@/i18n/navigation';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  /** When provided the button renders as a <Link> */
  href?: string;
  onClick?: ComponentPropsWithoutRef<'button'>['onClick'];
  type?: 'button' | 'submit' | 'reset';
};

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary',
  secondary:
    'bg-primary-light text-primary-dark hover:bg-primary-muted focus-visible:ring-primary',
  outline:
    'border border-primary text-primary hover:bg-primary-light focus-visible:ring-primary',
  ghost: 'text-primary hover:bg-primary-light focus-visible:ring-primary',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-pill transition-colors' +
  ' focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  children,
  href,
  onClick,
  type = 'button',
}: ButtonProps) {
  const classes = [
    base,
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href !== undefined) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}

export default Button;

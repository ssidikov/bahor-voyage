import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Link } from '@/i18n/navigation';

type Variant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'inverted'
  | 'glass';
type Size = 'sm' | 'md' | 'lg';
type ClickHandler =
  | ComponentPropsWithoutRef<'button'>['onClick']
  | ComponentPropsWithoutRef<'a'>['onClick'];

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  /** When provided the button renders as a <Link> */
  href?: string;
  onClick?: ClickHandler;
  type?: 'button' | 'submit' | 'reset';
  target?: ComponentPropsWithoutRef<'a'>['target'];
  rel?: ComponentPropsWithoutRef<'a'>['rel'];
};

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-action text-text-on-emphasis hover:bg-action-hover focus-visible:ring-focus-ring',
  secondary:
    'bg-action-soft text-primary-700 hover:bg-action-soft-hover focus-visible:ring-focus-ring',
  outline:
    'border border-primary-300 text-primary-700 hover:bg-action-soft focus-visible:ring-focus-ring',
  ghost: 'text-primary-700 hover:bg-action-soft focus-visible:ring-focus-ring',
  inverted:
    'border border-white/60 text-white hover:bg-white hover:text-primary-600 focus-visible:ring-white',
  glass:
    'bg-white/15 border border-white/30 text-white backdrop-blur-sm hover:bg-white hover:text-primary-600 focus-visible:ring-white',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-pill transition-colors' +
  ' focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const isNativeAnchorHref = (href: string) =>
  /^(https?:|mailto:|tel:|#)/.test(href);

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  children,
  href,
  onClick,
  type = 'button',
  target,
  rel,
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
    const anchorClick = onClick as ComponentPropsWithoutRef<'a'>['onClick'];

    if (isNativeAnchorHref(href) || target !== undefined || rel !== undefined) {
      return (
        <a
          href={href}
          className={classes}
          onClick={anchorClick}
          target={target}
          rel={rel}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        onClick={anchorClick}
        target={target}
        rel={rel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick as ComponentPropsWithoutRef<'button'>['onClick']}
      className={classes}
    >
      {children}
    </button>
  );
}

export default Button;

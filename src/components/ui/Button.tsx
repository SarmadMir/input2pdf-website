import { forwardRef } from 'react';

const variants = {
  primary:
    'bg-primary text-white shadow-[0_0_24px_rgba(242,99,128,0.2)] hover:shadow-[0_0_32px_rgba(242,99,128,0.3)] hover:brightness-110',
  secondary:
    'border border-border text-foreground/80 hover:border-border-hover hover:text-foreground',
} as const;

const sizes = {
  default: 'px-7 py-3 text-sm gap-2',
  sm: 'px-4 py-2 text-xs gap-1.5',
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex cursor-pointer items-center justify-center rounded-lg font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

type ButtonLinkProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant = 'primary', size = 'default', className = '', children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`inline-flex cursor-pointer items-center justify-center rounded-lg font-semibold transition-all ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F5] dark:focus-visible:ring-offset-[#0C0D10] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-ethix-red hover:bg-ethix-red-hover text-white focus-visible:ring-ethix-red shadow-subtle hover:shadow-glow-red',
    secondary:
      'bg-ethix-charcoal-900 hover:bg-ethix-charcoal-800 text-ethix-ivory-100 dark:bg-white dark:hover:bg-ethix-ivory-200 dark:text-ethix-charcoal-950 focus-visible:ring-ethix-charcoal-900 dark:focus-visible:ring-white shadow-subtle',
    outline:
      'border border-ethix-charcoal-300 dark:border-white/20 hover:border-ethix-charcoal-900 dark:hover:border-white text-ethix-charcoal-900 dark:text-white bg-transparent hover:bg-ethix-ivory-200 dark:hover:bg-white/10 focus-visible:ring-ethix-charcoal-900 dark:focus-visible:ring-white',
    danger:
      'bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-600',
    ghost:
      'text-ethix-charcoal-700 dark:text-ethix-charcoal-200 hover:text-ethix-charcoal-900 dark:hover:text-white hover:bg-ethix-ivory-200 dark:hover:bg-white/10 focus-visible:ring-ethix-charcoal-900 dark:focus-visible:ring-white',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 font-medium',
    md: 'text-sm px-4 py-2.5 gap-2 font-medium',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};

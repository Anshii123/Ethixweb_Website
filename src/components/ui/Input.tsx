import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftElement, rightElement, className = '', id, ...props }, ref) => {
    const reactId = React.useId();
    const inputId = id || props.name || reactId;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-ethix-charcoal-700 dark:text-ethix-charcoal-200 mb-1.5">
            {label}
            {props.required && <span className="text-ethix-red ml-1">*</span>}
          </label>
        )}
        <div className="relative rounded-lg shadow-sm">
          {leftElement && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ethix-charcoal-400 dark:text-ethix-charcoal-400">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-white dark:bg-[#181A22] text-ethix-charcoal-900 dark:text-[#F4F4F6] border rounded-lg py-2.5 text-base sm:text-sm transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#FAF8F5] dark:focus-visible:ring-offset-[#0C0D10] placeholder:text-ethix-charcoal-400 dark:placeholder:text-[#828894] ${leftElement ? 'pl-10' : 'pl-3.5'
              } ${rightElement ? 'pr-10' : 'pr-3.5'} ${error
                ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-200 dark:focus-visible:ring-red-900/40'
                : 'border-ethix-charcoal-300/80 dark:border-white/15 focus-visible:border-ethix-charcoal-900 dark:focus-visible:border-ethix-red focus-visible:ring-ethix-charcoal-900/10 dark:focus-visible:ring-ethix-red/20'
              } ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-ethix-charcoal-400 dark:text-ethix-charcoal-400">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
            <span>•</span> {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

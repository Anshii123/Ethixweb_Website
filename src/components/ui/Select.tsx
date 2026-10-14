import React, { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className = '', id, ...props }, ref) => {
    const reactId = React.useId();
    const selectId = id || props.name || reactId;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-ethix-charcoal-700 dark:text-ethix-charcoal-200 mb-1.5">
            {label}
            {props.required && <span className="text-ethix-red ml-1">*</span>}
          </label>
        )}
        <div className="relative rounded-lg shadow-sm">
          <select
            ref={ref}
            id={selectId}
            className={`w-full bg-white dark:bg-[#181A22] text-ethix-charcoal-900 dark:text-[#F4F4F6] border rounded-lg py-2.5 px-3.5 text-base sm:text-sm appearance-none transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#FAF8F5] dark:focus-visible:ring-offset-[#0C0D10] pr-10 cursor-pointer ${error
                ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-200 dark:focus-visible:ring-red-900/40'
                : 'border-ethix-charcoal-300/80 dark:border-white/15 focus-visible:border-ethix-charcoal-900 dark:focus-visible:border-ethix-red focus-visible:ring-ethix-charcoal-900/10 dark:focus-visible:ring-ethix-red/20'
              } ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="bg-white dark:bg-[#181A22] text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white dark:bg-[#181A22] text-ethix-charcoal-900 dark:text-[#F4F4F6]">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p id={`${selectId}-error`} className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
            <span>•</span> {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${selectId}-helper`} className="mt-1.5 text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

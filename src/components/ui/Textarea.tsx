import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, showCount, maxLength, className = '', value, id, ...props }, ref) => {
    const reactId = React.useId();
    const textareaId = id || props.name || reactId;
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <label htmlFor={textareaId} className="block text-xs font-semibold uppercase tracking-wider text-ethix-charcoal-700 dark:text-ethix-charcoal-200">
              {label}
              {props.required && <span className="text-ethix-red ml-1">*</span>}
            </label>
          )}
          {showCount && maxLength && (
            <span className="text-xs text-ethix-charcoal-400 dark:text-ethix-charcoal-400">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          rows={props.rows || 4}
          className={`w-full bg-white dark:bg-[#181A22] text-ethix-charcoal-900 dark:text-[#F4F4F6] border rounded-lg p-3 text-base sm:text-sm transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#FAF8F5] dark:focus-visible:ring-offset-[#0C0D10] placeholder:text-ethix-charcoal-400 dark:placeholder:text-[#828894] resize-y min-h-[100px] ${error
              ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-200 dark:focus-visible:ring-red-900/40'
              : 'border-ethix-charcoal-300/80 dark:border-white/15 focus-visible:border-ethix-charcoal-900 dark:focus-visible:border-ethix-red focus-visible:ring-ethix-charcoal-900/10 dark:focus-visible:ring-ethix-red/20'
            } ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
            <span>•</span> {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${textareaId}-helper`} className="mt-1.5 text-xs text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

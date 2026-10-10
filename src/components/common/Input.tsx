import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-slate-50 border rounded-xl py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white ${
              icon ? 'pl-10 pr-4' : 'px-4'
            } ${error ? 'border-red-500 focus:border-red-500' : 'border-slate-200'} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">{error}</p>}
        {helperText && !error && <p className="text-xs text-slate-500 mt-1.5">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, rows = 4, ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`w-full bg-slate-50 border rounded-xl p-3.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white resize-y ${
            error ? 'border-red-500 focus:border-red-500' : 'border-slate-200'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
        {helperText && !error && <p className="text-xs text-slate-500 mt-1.5">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

"use client";
import { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-md border border-navy-900/15 bg-paper px-16 text-body text-navy-900 placeholder:text-navy-400 transition-colors duration-micro ease-brand focus:outline-none focus:border-signal-500 focus:ring-2 focus:ring-signal-500/30 disabled:opacity-50";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, required, error, hint, className, id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-8">
        <label htmlFor={fieldId} className="text-body font-medium text-navy-800">
          {label}
          {required && <span className="ml-4 text-danger" aria-hidden="true">*</span>}
        </label>
        <input
          ref={ref}
          id={fieldId}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          className={cn(inputBase, "h-11", error && "border-danger focus:ring-danger/30", className)}
          {...props}
        />
        {error && (
          <p id={`${fieldId}-error`} className="text-sm text-danger" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${fieldId}-hint`} className="text-sm text-navy-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Field.displayName = "Field";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, required, error, className, id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-8">
        <label htmlFor={fieldId} className="text-body font-medium text-navy-800">
          {label}
          {required && <span className="ml-4 text-danger" aria-hidden="true">*</span>}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          aria-required={required}
          aria-invalid={!!error}
          rows={4}
          className={cn(inputBase, "py-12 resize-none", error && "border-danger", className)}
          {...props}
        />
        {error && (
          <p className="text-sm text-danger" role="alert">{error}</p>
        )}
      </div>
    );
  }
);
TextareaField.displayName = "TextareaField";

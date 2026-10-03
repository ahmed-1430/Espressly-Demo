"use client";

import { useId } from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

const fieldShell =
  "peer w-full rounded-card border border-ink-900/15 bg-paper-25 px-4 py-3.5 text-[0.9375rem] text-ink-900 outline-none transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-text-muted/70 hover:border-ink-900/30 focus:border-copper-600 focus:ring-1 focus:ring-copper-600 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-clay-500";

const labelBase =
  "block text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-text-muted";

type FieldShellProps = {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className={labelBase}>
        {label}
        {required ? (
          <span className="ml-1 text-copper-600" aria-hidden>
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[0.8125rem] text-clay-500" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[0.8125rem] text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = {
  label: string;
  hint?: ReactNode;
  error?: string;
  containerClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({
  label,
  hint,
  error,
  containerClassName,
  id,
  required,
  ...rest
}: TextFieldProps) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <FieldShell
      id={fieldId}
      label={label}
      {...(hint ? { hint } : {})}
      {...(error ? { error } : {})}
      {...(required ? { required } : {})}
      className={containerClassName}
    >
      <input
        {...rest}
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        {...(error ? { "aria-describedby": `${fieldId}-error` } : {})}
        {...(hint && !error ? { "aria-describedby": `${fieldId}-hint` } : {})}
        className={cn(fieldShell, "min-h-12")}
      />
    </FieldShell>
  );
}

type TextAreaProps = {
  label: string;
  hint?: ReactNode;
  error?: string;
  containerClassName?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({
  label,
  hint,
  error,
  containerClassName,
  id,
  required,
  rows = 5,
  ...rest
}: TextAreaProps) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <FieldShell
      id={fieldId}
      label={label}
      {...(hint ? { hint } : {})}
      {...(error ? { error } : {})}
      {...(required ? { required } : {})}
      className={containerClassName}
    >
      <textarea
        {...rest}
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        {...(error ? { "aria-describedby": `${fieldId}-error` } : {})}
        {...(hint && !error ? { "aria-describedby": `${fieldId}-hint` } : {})}
        className={cn(fieldShell, "resize-y min-h-32")}
      />
    </FieldShell>
  );
}

type SelectFieldProps = {
  label: string;
  hint?: ReactNode;
  error?: string;
  containerClassName?: string;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({
  label,
  hint,
  error,
  containerClassName,
  options,
  placeholder,
  id,
  required,
  ...rest
}: SelectFieldProps) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <FieldShell
      id={fieldId}
      label={label}
      {...(hint ? { hint } : {})}
      {...(error ? { error } : {})}
      {...(required ? { required } : {})}
      className={containerClassName}
    >
      <div className="relative">
        <select
          {...rest}
          id={fieldId}
          required={required}
          aria-invalid={error ? true : undefined}
          {...(error ? { "aria-describedby": `${fieldId}-error` } : {})}
          className={cn(fieldShell, "appearance-none pr-10")}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </FieldShell>
  );
}
// src/components/farmers/form/FormField.tsx
import type { ReactNode } from "react";

interface Props {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-800">
        {label}
        {required && (
          <span className="ml-0.5 text-red-600" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}

      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

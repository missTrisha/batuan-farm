// src/components/ui/TextField.tsx
import { useId, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  hint?: string; // small helper text under the input
  error?: string | null; // shown in red, replaces the hint
  revealable?: boolean; // adds an eye button to show/hide a password field
};

export default function TextField({
  label,
  hint,
  error,
  revealable = false,
  type,
  className = "",
  ...rest
}: TextFieldProps) {
  const id = useId();
  const describedBy = error || hint ? `${id}-desc` : undefined;
  const [visible, setVisible] = useState(false);

  const inputType = revealable && visible ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={inputType}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...rest}
          className={`h-11 w-full rounded-xl border bg-surface px-3 text-sm text-ink outline-none transition placeholder:text-muted focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
            revealable ? "pr-11" : ""
          } ${
            error
              ? "border-danger focus:ring-danger/30"
              : "border-line focus:border-primary focus:ring-primary/30"
          } ${className}`}
        />

        {revealable && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-xl text-muted transition hover:text-ink"
          >
            {visible ? (
              <FiEyeOff className="text-lg" />
            ) : (
              <FiEye className="text-lg" />
            )}
          </button>
        )}
      </div>

      {(error || hint) && (
        <p
          id={describedBy}
          className={`text-xs ${error ? "text-danger" : "text-muted"}`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

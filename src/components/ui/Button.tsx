// src/components/ui/Button.tsx
import { useState } from "react";
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import Spinner from "./Spinner";

type Variant = "primary" | "ghost" | "danger";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  variant?: Variant;
  loading?: boolean; // use for form submits you control yourself
  loadingText?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<unknown>;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  ghost: "text-ink hover:bg-primary/10",
  danger: "text-danger hover:bg-danger-bg",
};

export default function Button({
  variant = "primary",
  loading = false,
  loadingText,
  onClick,
  disabled,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const [busy, setBusy] = useState(false);
  const isLoading = loading || busy;

  // If onClick returns a promise, the button shows the spinner until it ends
  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const result = onClick?.(e);
    if (result instanceof Promise) {
      setBusy(true);
      try {
        await result;
      } finally {
        setBusy(false);
      }
    }
  }

  return (
    <button
      type="button"
      {...rest}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center gap-2.5 rounded-xl font-bold transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 ${variants[variant]} ${className}`}
    >
      {isLoading && <Spinner />}
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
}

import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  id: string;
  label: string;
  helperText?: string;
  error?: string;
};

export function Input({
  id,
  label,
  helperText,
  error,
  className,
  ...props
}: InputProps) {
  const helperTextId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperTextId, errorId].filter(Boolean).join(" ");

  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-[var(--foreground)]">
        {label}
      </label>

      <input
        id={id}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy || undefined}
        className={cn(
          "mt-2 min-h-12 w-full rounded-2xl border bg-black/35 px-4 text-sm text-[var(--foreground)] outline-none transition",
          "placeholder:text-[var(--muted-strong)]",
          "focus:border-[var(--turquoise)]",
          error
            ? "border-[var(--danger)]"
            : "border-[var(--border)]",
          className,
        )}
        {...props}
      />

      {helperText ? (
        <p id={helperTextId} className="mt-2 text-xs leading-5 text-[var(--muted)]">
          {helperText}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="mt-2 text-xs font-bold leading-5 text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
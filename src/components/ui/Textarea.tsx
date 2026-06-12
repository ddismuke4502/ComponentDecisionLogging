import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  id: string;
  label: string;
  helperText?: string;
  error?: string;
};

export function Textarea({
  id,
  label,
  helperText,
  error,
  className,
  ...props
}: TextareaProps) {
  const helperTextId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperTextId, errorId].filter(Boolean).join(" ");

  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-bold text-[var(--foreground)]"
      >
        {label}
      </label>

      <textarea
        id={id}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy || undefined}
        className={cn(
          "min-h-32 w-full resize-y rounded-2xl border border-[var(--border)] bg-black/35 px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--turquoise)] focus:ring-2 focus:ring-[var(--turquoise)]/30 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />

      {helperText ? (
        <p
          id={helperTextId}
          className="mt-2 text-xs leading-5 text-[var(--muted)]"
        >
          {helperText}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          className="mt-2 text-xs font-bold leading-5 text-[var(--danger)]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

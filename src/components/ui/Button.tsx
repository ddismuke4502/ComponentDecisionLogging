import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--turquoise)] text-slate-950 shadow-lg shadow-teal-500/20 hover:bg-[var(--turquoise-soft)]",
  secondary:
    "border border-[var(--border)] bg-white/[0.04] text-[var(--foreground)] hover:border-[var(--turquoise)] hover:text-[var(--turquoise-soft)]",
  ghost:
    "bg-transparent text-[var(--muted)] hover:bg-white/[0.04] hover:text-[var(--foreground)]",
  danger:
    "bg-[var(--danger)] text-white shadow-lg shadow-rose-500/20 hover:brightness-110",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-xs",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-2xl px-5 text-sm font-black transition disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--turquoise)]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
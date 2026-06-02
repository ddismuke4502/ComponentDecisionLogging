import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeVariant =
  | "default"
  | "approved"
  | "review"
  | "proposed"
  | "deprecated";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "border-[var(--border)] bg-white/[0.04] text-[var(--muted)]",
  approved:
    "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  review:
    "border-purple-300/30 bg-purple-300/10 text-purple-100",
  proposed:
    "border-teal-300/30 bg-teal-300/10 text-[var(--turquoise-soft)]",
  deprecated:
    "border-rose-300/30 bg-rose-300/10 text-rose-200",
};

export function Badge({
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-bold",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
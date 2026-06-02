import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  as?: "article" | "section" | "div";
  variant?: "default" | "elevated" | "interactive";
};

const variantClasses = {
  default: "border border-[var(--border)] bg-black/35",
  elevated:
    "border border-[var(--border)] bg-[var(--background-elevated)]/75 shadow-2xl shadow-purple-950/20",
  interactive:
    "border border-[var(--border)] bg-white/[0.03] transition hover:-translate-y-1 hover:border-[var(--turquoise)]",
};

export function Card({
  as = "article",
  variant = "default",
  className,
  ...props
}: CardProps) {
  const Component = as;

  return (
    <Component
      className={cn(
        "rounded-[2rem] p-6 backdrop-blur-xl",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
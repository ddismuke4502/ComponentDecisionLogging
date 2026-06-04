import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type EmptyStateProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
};

export function EmptyState({
  eyebrow = "Empty State",
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <Card
      as="div"
      className="mt-6 flex flex-col items-center text-center"
      role="status"
      aria-live="polite"
    >
      {icon ? (
        <div
          className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-300/10 text-[var(--turquoise-soft)]"
          aria-hidden="true"
        >
          {icon}
        </div>
      ) : null}

      <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
        {eyebrow}
      </p>

      <h3 className="mt-3 max-w-2xl text-2xl font-black">{title}</h3>

      <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">
        {description}
      </p>

      {actionLabel && onAction ? (
        <Button type="button" onClick={onAction} className="mt-6">
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  );
}
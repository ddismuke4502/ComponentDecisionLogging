import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type ErrorStateProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function ErrorState({
  eyebrow = "Something went wrong",
  title,
  description,
  action,
}: ErrorStateProps) {
  return (
    <Card
      as="section"
      className="border-rose-300/30 bg-rose-300/10 p-6"
      aria-labelledby="error-state-title"
    >
      <p className="text-xs font-black uppercase tracking-[0.35em] text-rose-200">
        {eyebrow}
      </p>

      <h1
        id="error-state-title"
        className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl"
      >
        {title}
      </h1>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
        {description}
      </p>

      {action ? <div className="mt-6 flex flex-wrap gap-3">{action}</div> : null}
    </Card>
  );
}
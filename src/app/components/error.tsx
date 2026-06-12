"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/ErrorState";

type ComponentsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ComponentsError({ error, reset }: ComponentsErrorProps) {
  return (
    <main
      id="main-content"
      className="min-h-screen px-4 py-6 text-[var(--foreground)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-4xl items-center">
        <ErrorState
          eyebrow="Registry Error"
          title="The component registry could not load."
          description={
            error.message ||
            "The registry data source failed unexpectedly. Try refreshing the route or return to the command center."
          }
          action={
            <>
              <Button type="button" onClick={reset}>
                Reload Registry
              </Button>

              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[var(--border)] px-5 text-sm font-black text-[var(--turquoise-soft)] transition hover:border-[var(--turquoise)] hover:text-[var(--turquoise)]"
              >
                Back to Command Center
              </Link>
            </>
          }
        />
      </div>
    </main>
  );
}
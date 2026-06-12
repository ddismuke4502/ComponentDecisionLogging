"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/ErrorState";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main
      id="main-content"
      className="min-h-screen px-4 py-6 text-[var(--foreground)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-4xl items-center">
        <ErrorState
          eyebrow="Application Error"
          title="The command center hit an unexpected issue."
          description={
            error.message ||
            "The application could not complete this request. You can retry the route or return to the component registry."
          }
          action={
            <>
              <Button type="button" onClick={reset}>
                Try Again
              </Button>

              <Link
                href="/components"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[var(--border)] px-5 text-sm font-black text-[var(--turquoise-soft)] transition hover:border-[var(--turquoise)] hover:text-[var(--turquoise)]"
              >
                View Registry
              </Link>
            </>
          }
        />
      </div>
    </main>
  );
}
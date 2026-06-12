import Link from "next/link";
import { ErrorState } from "@/components/ui/ErrorState";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen px-4 py-6 text-[var(--foreground)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-4xl items-center">
        <ErrorState
          eyebrow="404"
          title="This component route does not exist."
          description="The page may have moved, the component slug may be incorrect, or the record has not been added to the registry yet."
          action={
            <>
              <Link
                href="/components"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[var(--turquoise)] px-5 text-sm font-black text-black transition hover:bg-[var(--turquoise-soft)]"
              >
                View Registry
              </Link>

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
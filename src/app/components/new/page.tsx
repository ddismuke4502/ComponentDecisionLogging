import type { Metadata } from "next";
import Link from "next/link";
import { ComponentForm } from "@/components/forms/ComponentForm";
import { AuthGate } from "@/features/auth/AuthGate";

export const metadata: Metadata = {
  title: "Add Component",
  description:
    "Add a reusable UI component record with metadata, ownership, contracts, accessibility notes, and architecture decisions.",
};

export default function NewComponentPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen px-4 py-6 text-[var(--foreground)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="rounded-[2rem] border border-[var(--border)] bg-black/35 p-6 backdrop-blur-xl sm:p-8">
          <Link
            href="/components"
            className="text-sm font-bold text-[var(--turquoise)] transition hover:text-[var(--turquoise-soft)]"
          >
            ← Back to Component Registry
          </Link>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.4em] text-[var(--turquoise)]">
            New Component Record
          </p>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Document a reusable component decision.
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
            Add metadata, ownership, API contract details, accessibility notes,
            and the initial architecture rationale for a reusable UI component.
          </p>
        </header>

        <AuthGate>
          <ComponentForm />
        </AuthGate>
      </div>
    </main>
  );
}

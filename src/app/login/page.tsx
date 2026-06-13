"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/features/auth/auth-context";

export default function LoginPage() {
  const {
    user,
    isAdmin,
    isLoading,
    isConfigured,
    signInWithGoogle,
    signOutUser,
  } = useAuth();

  return (
    <main
      id="main-content"
      className="min-h-screen px-4 py-6 text-[var(--foreground)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-3xl items-center">
        <Card as="section" className="w-full p-6 sm:p-8">
          <Link
            href="/"
            className="text-sm font-bold text-[var(--turquoise)] transition hover:text-[var(--turquoise-soft)]"
          >
            ← Back to Command Center
          </Link>

          <p className="mt-8 text-xs font-black uppercase tracking-[0.4em] text-[var(--turquoise)]">
            Authentication
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Sign in to manage component decisions.
          </h1>

          <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
            Authentication protects add/edit workflows so component records stay
            tied to accountable engineering ownership.
          </p>

          {!isConfigured ? (
            <div className="mt-6 rounded-3xl border border-amber-300/30 bg-amber-300/10 p-5">
              <h2 className="font-black text-amber-100">
                Firebase is not configured yet.
              </h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Add your Firebase environment variables to{" "}
                <code className="rounded-md bg-black/35 px-2 py-1">
                  .env.local
                </code>{" "}
                using{" "}
                <code className="rounded-md bg-black/35 px-2 py-1">
                  .env.example
                </code>{" "}
                as the template.
              </p>
            </div>
          ) : null}

          {user ? (
            <div className="mt-6 rounded-3xl border border-emerald-300/30 bg-emerald-300/10 p-5">
              <h2 className="font-black text-emerald-100">
                You are signed in.
              </h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Signed in as{" "}
                {user.email ?? user.displayName ?? "authenticated user"}.
              </p>
            </div>
          ) : null}

          {user && !isAdmin ? (
            <div className="mt-4 rounded-3xl border border-amber-300/30 bg-amber-300/10 p-5">
              <h2 className="font-black text-amber-100">
                Signed in, but not an admin.
              </h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                This account can view the registry, but it cannot create or edit
                component records.
              </p>
            </div>
          ) : null}

          {user && isAdmin ? (
            <div className="mt-4 rounded-3xl border border-[var(--border-strong)] bg-[var(--turquoise)]/10 p-5">
              <h2 className="font-black text-[var(--turquoise-soft)]">
                Admin access confirmed.
              </h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                This account can manage component records.
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {user ? (
              <Button type="button" variant="secondary" onClick={signOutUser}>
                Sign out
              </Button>
            ) : (
              <Button
                type="button"
                onClick={signInWithGoogle}
                disabled={!isConfigured || isLoading}
              >
                Sign in with Google
              </Button>
            )}

            <Link
              href="/components"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[var(--border)] px-5 text-sm font-black text-[var(--turquoise-soft)] transition hover:border-[var(--turquoise)] hover:text-[var(--turquoise)]"
            >
              View Registry
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}

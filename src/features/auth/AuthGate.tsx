"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/features/auth/auth-context";

type AuthGateProps = {
  children: ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const {
    user,
    isAdmin,
    isLoading,
    isConfigured,
    authError,
    signInWithGoogle,
    signOutUser,
  } = useAuth();

  if (!isConfigured) {
    return (
      <div className="space-y-6">
        <Card
          as="section"
          className="border-amber-300/30 bg-amber-300/10 p-5"
          aria-labelledby="local-preview-title"
        >
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-200">
            Local Preview Mode
          </p>
          <h2 id="local-preview-title" className="mt-3 text-2xl font-black">
            Firebase Auth is not configured yet.
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            This route is designed to be auth-gated. For local development and
            CI, the page remains visible until Firebase environment variables
            are added.
          </p>
        </Card>

        {children}
      </div>
    );
  }

  if (isLoading) {
    return (
      <Card as="section" role="status" aria-live="polite" className="p-6">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
          Auth Check
        </p>
        <h2 className="mt-3 text-2xl font-black">Checking authentication...</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          Please wait while we verify your session.
        </p>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card as="section" className="p-6" aria-labelledby="auth-required-title">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
          Auth Required
        </p>
        <h2 id="auth-required-title" className="mt-3 text-2xl font-black">
          Sign in to manage component records.
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          Component creation and editing are protected workflows because they
          affect shared engineering documentation.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>

          <Link
            href="/components"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[var(--border)] px-5 text-sm font-black text-[var(--turquoise-soft)] transition hover:border-[var(--turquoise)] hover:text-[var(--turquoise)]"
          >
            Back to Registry
          </Link>
        </div>

        {authError ? <AuthErrorAlert message={authError} /> : null}
      </Card>
    );
  }

  if (!isAdmin) {
    return (
      <Card as="section" className="p-6" aria-labelledby="admin-required-title">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
          Admin Access Required
        </p>

        <h2 id="admin-required-title" className="mt-3 text-2xl font-black">
          This workflow is restricted to project maintainers.
        </h2>

        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          You are signed in, but this email is not on the admin allowlist for
          creating or editing component records.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="secondary" onClick={signOutUser}>
            Sign out
          </Button>

          <Link
            href="/components"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[var(--border)] px-5 text-sm font-black text-[var(--turquoise-soft)] transition hover:border-[var(--turquoise)] hover:text-[var(--turquoise)]"
          >
            Back to Registry
          </Link>
        </div>

        {authError ? <AuthErrorAlert message={authError} /> : null}
      </Card>
    );
  }

  return children;
}

function AuthErrorAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mt-4 rounded-2xl border border-rose-300/30 bg-rose-300/10 p-4 text-sm leading-7 text-rose-100"
    >
      <p className="font-black">Authentication failed.</p>
      <p className="mt-1 break-words text-rose-100/90">{message}</p>
    </div>
  );
}
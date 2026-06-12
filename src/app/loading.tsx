import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main
      id="main-content"
      className="min-h-screen px-4 py-6 text-[var(--foreground)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <Card as="section" className="p-6 sm:p-8" aria-label="Loading page">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
            Loading
          </p>

          <div className="mt-6 space-y-4">
            <Skeleton className="h-12 w-full max-w-2xl" />
            <Skeleton className="h-4 w-full max-w-xl" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
        </Card>
      </div>
    </main>
  );
}
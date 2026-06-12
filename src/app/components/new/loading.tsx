import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export default function NewComponentLoading() {
  return (
    <main
      id="main-content"
      className="min-h-screen px-4 py-6 text-[var(--foreground)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <Card as="section" className="p-6 sm:p-8" aria-label="Loading form">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
            New Component Record
          </p>

          <div className="mt-6 space-y-4">
            <Skeleton className="h-10 w-full max-w-2xl" />
            <Skeleton className="h-4 w-full max-w-xl" />
          </div>
        </Card>

        <Card as="section" className="p-6" aria-label="Loading form fields">
          <div className="mb-8 grid gap-3 sm:grid-cols-5">
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-32 md:col-span-2" />
            <Skeleton className="h-20 md:col-span-2" />
          </div>

          <div className="mt-8 flex justify-between gap-3">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-32" />
          </div>
        </Card>
      </div>
    </main>
  );
}
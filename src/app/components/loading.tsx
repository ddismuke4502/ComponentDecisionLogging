import { Card } from "@/components/ui/Card";
import { RegistrySkeletonGrid, Skeleton } from "@/components/ui/Skeleton";

export default function ComponentsLoading() {
  return (
    <main
      id="main-content"
      className="min-h-screen px-4 py-6 text-[var(--foreground)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <Card as="section" className="p-6 sm:p-8" aria-label="Loading registry">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
            Component Registry
          </p>

          <div className="mt-6 space-y-4">
            <Skeleton className="h-12 w-full max-w-3xl" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-full max-w-xl" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </Card>

        <Card as="section" className="p-5" aria-label="Loading filters">
          <div className="grid gap-4 md:grid-cols-4">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
        </Card>

        <RegistrySkeletonGrid />
      </div>
    </main>
  );
}
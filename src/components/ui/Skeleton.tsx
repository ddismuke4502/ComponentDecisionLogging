import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type SkeletonProps = ComponentPropsWithoutRef<"div">;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-white/[0.08]",
        "motion-reduce:animate-none motion-reduce:bg-white/[0.06]",
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

export function ComponentCardSkeleton() {
  return (
    <div
      className="rounded-[2rem] border border-[var(--border)] bg-white/[0.03] p-6"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="w-full max-w-xs">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-4 h-7 w-56" />
        </div>
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>

      <Skeleton className="mt-6 h-4 w-full" />
      <Skeleton className="mt-3 h-4 w-11/12" />
      <Skeleton className="mt-3 h-4 w-3/4" />

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>

      <div className="mt-6 flex gap-2">
        <Skeleton className="h-7 w-20 rounded-full" />
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-7 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function RegistrySkeletonGrid() {
  return (
    <div
      className="mt-6 grid gap-4 lg:grid-cols-2"
      role="status"
      aria-label="Loading component records"
    >
      <span className="sr-only">Loading component records...</span>
      {Array.from({ length: 4 }).map((_, index) => (
        <ComponentCardSkeleton key={index} />
      ))}
    </div>
  );
}
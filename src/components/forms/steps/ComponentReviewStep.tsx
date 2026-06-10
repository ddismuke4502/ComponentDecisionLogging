import { Card } from "@/components/ui/Card";
import type {
  ComponentCategory,
  ComponentPlatform,
  ComponentRecord,
  ComponentStatus,
} from "@/features/components/component-types";
import {
  componentCategoryLabels,
  componentPlatformLabels,
  componentStatusLabels,
} from "@/features/components/component-utils";

type ComponentReviewStepProps = {
  watchedName: string;
  watchedSlug: string;
  watchedOwnerTeam: string;
  watchedStatus: ComponentStatus;
  watchedCategory: ComponentCategory;
  watchedPlatform: ComponentPlatform;
  watchedSummary: string;
  submittedRecord: ComponentRecord | null;
};

export function ComponentReviewStep({
  watchedName,
  watchedSlug,
  watchedOwnerTeam,
  watchedStatus,
  watchedCategory,
  watchedPlatform,
  watchedSummary,
  submittedRecord,
}: ComponentReviewStepProps) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
        Review
      </p>

      <h3 className="mt-3 text-2xl font-black">
        Review the component record before saving.
      </h3>

      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        This submit action now flows through a React Query mutation. In local preview
mode it returns the validated record; when Firebase is configured, it saves to
Firestore and updates the component cache.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ReviewTile label="Name" value={watchedName || "—"} />
        <ReviewTile label="Slug" value={watchedSlug || "—"} />
        <ReviewTile label="Owner" value={watchedOwnerTeam || "—"} />
        <ReviewTile
          label="Status"
          value={watchedStatus ? componentStatusLabels[watchedStatus] : "—"}
        />
        <ReviewTile
          label="Category"
          value={watchedCategory ? componentCategoryLabels[watchedCategory] : "—"}
        />
        <ReviewTile
          label="Platform"
          value={watchedPlatform ? componentPlatformLabels[watchedPlatform] : "—"}
        />
      </div>

      <Card as="div" className="mt-5 p-5">
        <h4 className="font-black">Summary</h4>
        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
          {watchedSummary || "No summary entered yet."}
        </p>
      </Card>

      {submittedRecord ? (
        <Card
          as="div"
          className="mt-5 border-emerald-300/30 bg-emerald-300/10 p-5"
          role="status"
          aria-live="polite"
        >
          <h4 className="font-black text-emerald-100">
            Component record validated.
          </h4>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
            {submittedRecord.name} has passed validation and the save mutation completed.
          </p>
        </Card>
      ) : null}
    </div>
  );
}

function ReviewTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white/[0.03] p-4">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-1 break-words font-black">{value}</p>
    </div>
  );
}
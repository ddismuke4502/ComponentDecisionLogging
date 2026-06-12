import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ComponentStatusBadge } from "@/components/component-log/ComponentStatusBadge";
import type { ComponentRecord } from "@/features/components/component-types";
import {
  formatComponentCategory,
  formatComponentPlatform,
} from "@/features/components/component-utils";

type ComponentCardProps = {
  component: ComponentRecord;
  href?: string;
};

export function ComponentCard({ component, href }: ComponentCardProps) {
  const componentHref = href ?? `/components/${component.slug}`;
  const titleId = `${component.id}-title`;
  const descriptionId = `${component.id}-description`;

  return (
    <Card
      data-gsap-reveal
      as="article"
      variant="interactive"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="relative flex h-full flex-col gap-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--turquoise)]">
            {formatComponentCategory(component.category)}
          </p>

          <h3 id={titleId} className="mt-2 text-xl font-black">
            <Link
              href={componentHref}
              className="rounded-lg focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
            >
              {component.name}
            </Link>
          </h3>
        </div>

        <ComponentStatusBadge status={component.status} />
      </div>

      <p id={descriptionId} className="text-sm leading-7 text-[var(--muted)]">
        {component.summary}
      </p>

      <dl className="grid gap-3 rounded-2xl border border-[var(--border)] bg-black/25 p-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[var(--muted-strong)]">Owner</dt>
          <dd className="mt-1 font-bold text-[var(--foreground)]">
            {component.owner.team}
          </dd>
        </div>

        <div>
          <dt className="text-[var(--muted-strong)]">Platform</dt>
          <dd className="mt-1 font-bold text-[var(--foreground)]">
            {formatComponentPlatform(component.platform)}
          </dd>
        </div>

        <div>
          <dt className="text-[var(--muted-strong)]">Props</dt>
          <dd className="mt-1 font-bold text-[var(--foreground)]">
            {component.props.length}
          </dd>
        </div>

        <div>
          <dt className="text-[var(--muted-strong)]">Decisions</dt>
          <dd className="mt-1 font-bold text-[var(--foreground)]">
            {component.decisions.length}
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2">
        {component.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--border)] bg-white/[0.03] px-3 py-1 text-xs font-bold text-[var(--muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-[var(--border)] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[var(--muted-strong)]">
          Updated{" "}
          <time dateTime={component.updatedAt}>
            {formatReadableDate(component.updatedAt)}
          </time>
        </p>

        <Link
          href={componentHref}
          aria-label={`View details for ${component.name}`}
          className="w-fit rounded-full border border-[var(--border)] px-4 py-2 text-sm font-black text-[var(--turquoise-soft)] transition hover:border-[var(--turquoise)] hover:text-[var(--turquoise)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
        >
          View Details
        </Link>
      </div>
    </Card>
  );
}

function formatReadableDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

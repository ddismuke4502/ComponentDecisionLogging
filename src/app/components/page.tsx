import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ComponentRegistryClient } from "@/components/component-log/ComponentRegistryClient";
import { mockComponents } from "@/data/mock-components";
import { GsapRevealScope } from "@/components/animation/GsapRevealScope";
import {
  formatComponentStatus,
  getUniqueOwnerTeams,
  sortComponentsByUpdatedDate,
} from "@/features/components/component-utils";

export const metadata: Metadata = {
  title: "Component Registry",
  description:
    "Searchable registry of reusable UI component decisions, ownership, contracts, and accessibility notes.",
};

const sortedComponents = sortComponentsByUpdatedDate(mockComponents);

const registryStats = [
  {
    label: "Component Records",
    value: mockComponents.length,
    description: "Reusable component records currently documented.",
  },
  {
    label: "Decision Entries",
    value: mockComponents.reduce(
      (total, component) => total + component.decisions.length,
      0,
    ),
    description: "Architecture decisions captured across components.",
  },
  {
    label: "Owner Teams",
    value: getUniqueOwnerTeams(mockComponents).length,
    description: "Teams responsible for maintaining component contracts.",
  },
  {
    label: "Accessibility Notes",
    value: mockComponents.reduce(
      (total, component) => total + component.accessibilityNotes.length,
      0,
    ),
    description: "Accessibility requirements documented in component records.",
  },
];

type ComponentsPageProps = {
  searchParams?: Promise<{
    search?: string;
  }>;
};

export default async function ComponentsPage({
  searchParams,
}: ComponentsPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialSearch =
    typeof resolvedSearchParams?.search === "string"
      ? resolvedSearchParams.search
      : "";
  return (
    <main
      id="main-content"
      className="min-h-screen px-4 py-6 text-[var(--foreground)] sm:px-6 lg:px-8"
    >
      <GsapRevealScope className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header
          data-gsap-reveal
          className="rounded-[2rem] border border-[var(--border)] bg-black/35 p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Link
                href="/"
                className="text-sm font-bold text-[var(--turquoise)] transition hover:text-[var(--turquoise-soft)]"
              >
                ← Back to Command Center
              </Link>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.4em] text-[var(--turquoise)]">
                Component Registry
              </p>

              <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Search, review, and govern reusable component decisions.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
                This registry centralizes component ownership, lifecycle status,
                props, state, API contracts, accessibility notes, and decision
                rationale for frontend and mobile engineering teams.
              </p>
            </div>

            <div className="rounded-3xl border border-teal-300/20 bg-teal-300/10 p-5 lg:w-80">
              <p className="text-sm font-black text-[var(--turquoise-soft)]">
                Current milestone
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Search, filters, typed data, React Query, Firebase-ready persistence, and protected creation workflow are now wired.
              </p>
              <Link
                href="/components/new"
                className="mt-4 inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-sm font-black text-[var(--turquoise-soft)] transition hover:border-[var(--turquoise)] hover:text-[var(--turquoise)]"
              >
                Add Component
              </Link>
            </div>
          </div>
        </header>

        <section
          aria-labelledby="registry-stats-title"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <h2 id="registry-stats-title" className="sr-only">
            Registry statistics
          </h2>

          {registryStats.map((stat) => (
            <Card
              data-gsap-reveal
              key={stat.label}
              as="article"
              className="p-5"
            >
              <p className="text-3xl font-black text-[var(--turquoise-soft)]">
                {stat.value}
              </p>
              <h3 className="mt-2 font-black">{stat.label}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {stat.description}
              </p>
            </Card>
          ))}
        </section>

        <section
          data-gsap-reveal
          aria-labelledby="status-overview-title"
          className="rounded-[2rem] border border-[var(--border)] bg-black/35 p-5 backdrop-blur-xl sm:p-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
                Lifecycle Overview
              </p>
              <h2
                id="status-overview-title"
                className="mt-2 text-2xl font-black"
              >
                Component records by status
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Status labels are intentionally rendered as text, not just color,
              so lifecycle state remains understandable for all users.
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {getStatusSummary().map((item) => (
              <article
                key={item.status}
                className="rounded-2xl border border-[var(--border)] bg-white/[0.03] p-4"
              >
                <p className="text-2xl font-black text-[var(--turquoise-soft)]">
                  {item.count}
                </p>
                <h3 className="mt-2 text-sm font-black">
                  {formatComponentStatus(item.status)}
                </h3>
              </article>
            ))}
          </div>
        </section>

        <ComponentRegistryClient
          initialComponents={sortedComponents}
          initialFilters={{
            search: initialSearch,
            status: "all",
            category: "all",
            owner: "all",
          }}
        />
      </GsapRevealScope>
    </main>
  );
}

function getStatusSummary() {
  const statuses = ["proposed", "in_review", "approved", "deprecated"] as const;

  return statuses.map((status) => ({
    status,
    count: mockComponents.filter((component) => component.status === status)
      .length,
  }));
}

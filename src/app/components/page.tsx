import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ComponentRegistryClient } from "@/components/component-log/ComponentRegistryClient";
import { mockComponents } from "@/data/mock-components";
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

export default function ComponentsPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen px-4 py-6 text-[var(--foreground)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-[2rem] border border-[var(--border)] bg-black/35 p-6 backdrop-blur-xl sm:p-8">
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
                Static registry route using typed mock data. Search and filters
                come next.
              </p>
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
            <Card key={stat.label} as="article" className="p-5">
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
          aria-labelledby="status-overview-title"
          className="rounded-[2rem] border border-[var(--border)] bg-black/35 p-5 backdrop-blur-xl sm:p-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
                Lifecycle Overview
              </p>
              <h2 id="status-overview-title" className="mt-2 text-2xl font-black">
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

        <ComponentRegistryClient components={sortedComponents} />
      </div>
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
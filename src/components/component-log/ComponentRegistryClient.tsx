"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ComponentCard } from "@/components/component-log/ComponentCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type {
  ComponentCategory,
  ComponentFilters,
  ComponentRecord,
  ComponentStatus,
} from "@/features/components/component-types";
import {
  componentStatusLabels,
  filterComponents,
  formatComponentCategory,
  getUniqueCategories,
  getUniqueOwnerTeams,
} from "@/features/components/component-utils";

type ComponentRegistryClientProps = {
  components: ComponentRecord[];
};

const statusOptions = [
  "proposed",
  "in_review",
  "approved",
  "deprecated",
] as const satisfies ComponentStatus[];

const initialFilters: ComponentFilters = {
  search: "",
  status: "all",
  category: "all",
  owner: "all",
};

export function ComponentRegistryClient({
  components,
}: ComponentRegistryClientProps) {
  const [filters, setFilters] = useState<ComponentFilters>(initialFilters);

  const ownerTeams = useMemo(
    () => getUniqueOwnerTeams(components),
    [components],
  );
  const categories = useMemo(
    () => getUniqueCategories(components),
    [components],
  );

  const filteredComponents = useMemo(
    () => filterComponents(components, filters),
    [components, filters],
  );

  const hasActiveFilters =
    filters.search.trim().length > 0 ||
    filters.status !== "all" ||
    filters.category !== "all" ||
    filters.owner !== "all";

  function updateSearch(search: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      search,
    }));
  }

  function updateStatus(status: ComponentStatus | "all") {
    setFilters((currentFilters) => ({
      ...currentFilters,
      status,
    }));
  }

  function updateCategory(category: ComponentCategory | "all") {
    setFilters((currentFilters) => ({
      ...currentFilters,
      category,
    }));
  }

  function updateOwner(owner: string | "all") {
    setFilters((currentFilters) => ({
      ...currentFilters,
      owner,
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
  }

  return (
    <section
      aria-labelledby="component-list-title"
      className="rounded-[2rem] border border-[var(--border)] bg-black/25 p-4 backdrop-blur-xl sm:p-6"
    >
      <div className="flex flex-col gap-3 border-b border-[var(--border)] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
            Records
          </p>
          <h2 id="component-list-title" className="mt-2 text-3xl font-black">
            All documented components
          </h2>
        </div>

        <p
          className="text-sm text-[var(--muted)]"
          aria-live="polite"
          aria-atomic="true"
        >
          Showing {filteredComponents.length} of {components.length} component
          records
        </p>
      </div>

      <Card as="div" className="mt-6 p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_auto] lg:items-end">
          <div>
            <label
              htmlFor="component-search"
              className="text-sm font-bold text-[var(--foreground)]"
            >
              Search records
            </label>
            <input
              id="component-search"
              name="component-search"
              type="search"
              value={filters.search}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Search by component, owner, tag, prop, decision..."
              className="mt-2 min-h-12 w-full rounded-2xl border border-[var(--border)] bg-black/35 px-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-strong)] focus:border-[var(--turquoise)]"
            />
          </div>

          <div>
            <label
              htmlFor="component-status-filter"
              className="text-sm font-bold text-[var(--foreground)]"
            >
              Status
            </label>
            <select
              id="component-status-filter"
              name="component-status-filter"
              value={filters.status}
              onChange={(event) =>
                updateStatus(event.target.value as ComponentStatus | "all")
              }
              className="mt-2 min-h-12 w-full rounded-2xl border border-[var(--border)] bg-black/35 px-4 text-sm text-[var(--foreground)] outline-none focus:border-[var(--turquoise)]"
            >
              <option value="all">All statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {componentStatusLabels[status]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="component-category-filter"
              className="text-sm font-bold text-[var(--foreground)]"
            >
              Category
            </label>
            <select
              id="component-category-filter"
              name="component-category-filter"
              value={filters.category}
              onChange={(event) =>
                updateCategory(event.target.value as ComponentCategory | "all")
              }
              className="mt-2 min-h-12 w-full rounded-2xl border border-[var(--border)] bg-black/35 px-4 text-sm text-[var(--foreground)] outline-none focus:border-[var(--turquoise)]"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {formatComponentCategory(category)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="component-owner-filter"
              className="text-sm font-bold text-[var(--foreground)]"
            >
              Owner
            </label>
            <select
              id="component-owner-filter"
              name="component-owner-filter"
              value={filters.owner}
              onChange={(event) => updateOwner(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-2xl border border-[var(--border)] bg-black/35 px-4 text-sm text-[var(--foreground)] outline-none focus:border-[var(--turquoise)]"
            >
              <option value="all">All owners</option>
              {ownerTeams.map((ownerTeam) => (
                <option key={ownerTeam} value={ownerTeam}>
                  {ownerTeam}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="w-full lg:w-auto"
          >
            Reset
          </Button>
        </div>
      </Card>

      {filteredComponents.length > 0 ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {filteredComponents.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      ) : (
        <EmptyState
          eyebrow="No Results"
          title="No component records match those filters."
          description="Try adjusting the search text, status, category, or owner filters to find matching component decisions."
          actionLabel="Clear Filters"
          onAction={resetFilters}
        />
      )}
    </section>
  );
}

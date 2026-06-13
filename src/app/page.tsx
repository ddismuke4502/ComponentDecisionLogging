import { GsapRevealScope } from "@/components/animation/GsapRevealScope";

const topMetrics = [
  { label: "Records", value: "24" },
  { label: "Decisions", value: "78" },
  { label: "Owners", value: "09" },
  { label: "A11y Notes", value: "41" },
];

const activityItems = [
  {
    title: "Accessibility note added",
    description:
      "PrimaryActionButton now documents focus-visible behavior and keyboard interaction expectations.",
    time: "12m ago",
  },
  {
    title: "API contract updated",
    description:
      "SearchCommandPanel now defines empty, loading, success, and error response states.",
    time: "34m ago",
  },
  {
    title: "Ownership clarified",
    description:
      "ComponentHealthCard is now assigned to the Frontend Guild for long-term maintenance.",
    time: "1h ago",
  },
];

const relationshipNodes = [
  {
    name: "PrimaryActionButton",
    label: "Primary Button",
    sublabel: "Approved",
    className: "left-4 top-8 sm:left-[8%] sm:top-[16%]",
  },
  {
    name: "SearchCommandPanel",
    label: "Search Panel",
    sublabel: "In Review",
    className: "right-4 top-24 sm:right-[8%] sm:top-[24%]",
  },
  {
    name: "FormValidationMessage",
    label: "Validation Message",
    sublabel: "Approved",
    className: "left-4 bottom-24 sm:left-[10%] sm:bottom-[18%]",
  },
  {
    name: "ComponentHealthCard",
    label: "Health Card",
    sublabel: "Proposed",
    className: "right-4 bottom-8 sm:right-[10%] sm:bottom-[16%]",
  },
];

const registryPreview = [
  {
    name: "PrimaryActionButton",
    meta: "Form · Design Systems",
    status: "Approved",
  },
  {
    name: "SearchCommandPanel",
    meta: "Navigation · Platform UI",
    status: "In Review",
  },
  {
    name: "ComponentHealthCard",
    meta: "Data Display · Frontend Guild",
    status: "Proposed",
  },
];

const contractRows = [
  ["Owner", "Platform UI"],
  ["Platform", "Web + Mobile"],
  ["Status", "In Review"],
  ["Category", "Navigation"],
];

const pipelineRows = [
  {
    label: "Proposed",
    value: "05",
    note: "New patterns waiting for architecture review.",
  },
  {
    label: "In Review",
    value: "03",
    note: "Under validation for UX, API, and accessibility.",
  },
  {
    label: "Approved",
    value: "16",
    note: "Ready for adoption across teams.",
  },
];

export default function Home() {
  return (
    <main
      id="main-content"
      className="min-h-screen overflow-hidden px-4 py-4 text-[var(--foreground)] sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:84px_84px]" />
        <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl gap-4">
        <aside className="hidden w-20 shrink-0 rounded-[2rem] border border-[var(--border)] bg-black/30 p-3 backdrop-blur-xl xl:flex xl:flex-col xl:items-center xl:justify-between">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-teal-300/30 bg-teal-300/10 text-sm font-black text-[var(--turquoise-soft)]">
            CDL
          </div>

          <div className="flex flex-col gap-6 text-center">
            {topMetrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-2xl font-black text-[var(--turquoise-soft)]">
                  {metric.value}
                </p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="h-16 w-px bg-gradient-to-b from-transparent via-[var(--turquoise)] to-transparent" />
        </aside>

        <GsapRevealScope className="grid flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="grid gap-4">
            <header
              data-gsap-reveal
              className="rounded-[2rem] border border-[var(--border)] bg-black/35 px-5 py-4 backdrop-blur-xl sm:px-6"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.42em] text-[var(--turquoise)]">
                    Component Decision Log
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                    Architecture command center for reusable UI component
                    decisions, ownership, contracts, and accessibility notes.
                  </p>
                </div>

                <nav
                  aria-label="Primary navigation"
                  className="w-full lg:w-auto"
                >
                  <ul className="flex max-w-full flex-wrap gap-2 text-sm font-semibold text-[var(--muted)] lg:justify-end">
                    <li>
                      <a
                        href="#overview"
                        className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full border border-[var(--border)] px-4 py-2 transition hover:border-[var(--turquoise)] hover:text-[var(--turquoise)]"
                      >
                        Overview
                      </a>
                    </li>
                    <li>
                      <a
                        href="#graph"
                        className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full border border-[var(--border)] px-4 py-2 transition hover:border-[var(--turquoise)] hover:text-[var(--turquoise)]"
                      >
                        Relationship Map
                      </a>
                    </li>
                    <li>
                      <a
                        href="#system-panels"
                        className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full border border-[var(--border)] px-4 py-2 transition hover:border-[var(--turquoise)] hover:text-[var(--turquoise)]"
                      >
                        System Panels
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </header>

            <section
              id="overview"
              className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <article
                data-gsap-reveal
                className="rounded-[2rem] border border-[var(--border)] bg-[var(--background-elevated)]/75 p-6 backdrop-blur-xl sm:p-8"
              >
                <p className="inline-flex rounded-full border border-purple-300/30 bg-purple-300/10 px-4 py-2 text-sm font-bold text-[var(--turquoise-soft)]">
                  Engineering memory layer
                </p>

                <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl xl:text-7xl">
                  Make every component decision traceable.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">
                  Track what reusable components do, who owns them, how they
                  behave, which contracts they depend on, and why important
                  decisions were made.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {topMetrics.map((metric) => (
                    <article
                      key={metric.label}
                      className="rounded-2xl border border-[var(--border)] bg-black/25 px-4 py-4"
                    >
                      <p className="text-3xl font-black text-[var(--turquoise-soft)]">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        {metric.label}
                      </p>
                    </article>
                  ))}
                </div>

                <form
                  className="mt-8 rounded-3xl border border-[var(--border)] bg-black/30 p-3"
                  role="search"
                >
                  <label htmlFor="component-search-preview" className="sr-only">
                    Search component records
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      id="component-search-preview"
                      name="component-search-preview"
                      placeholder="Search Button, Modal, owner, contract..."
                      className="min-h-12 flex-1 rounded-2xl border border-[var(--border)] bg-black/40 px-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-strong)] focus:border-[var(--turquoise)]"
                    />
                    <button
                      type="button"
                      className="min-h-12 rounded-2xl bg-[var(--turquoise)] px-5 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
                    >
                      Preview Search
                    </button>
                  </div>
                </form>
              </article>

              <article
                data-gsap-reveal
                className="rounded-[2rem] border border-[var(--border)] bg-black/35 p-6 backdrop-blur-xl sm:p-8"
              >
                <PanelHeader
                  eyebrow="What this proves"
                  title="Portfolio-grade frontend engineering"
                  description="This project is designed to directly demonstrate the engineering proof mentors look for."
                />

                <div className="mt-6 space-y-3">
                  <ProofRow
                    title="Accessibility"
                    description="Semantic HTML, keyboard support, focus states, reduced motion, and accessible validation."
                  />
                  <ProofRow
                    title="Quality"
                    description="Strict TypeScript, tests, CI, loading states, and professional documentation."
                  />
                  <ProofRow
                    title="Architecture"
                    description="Typed models, React Query, Firebase, forms, and clean separation of concerns."
                  />
                </div>
              </article>
            </section>

            <section
              data-gsap-reveal
              id="graph"
              className="rounded-[2rem] border border-[var(--border)] bg-black/35 p-6 backdrop-blur-xl sm:p-8"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <PanelHeader
                  eyebrow="Relationship Map"
                  title="Component relationship graph"
                  description="A cleaner preview of how related components, status, and ownership can be visualized inside the system."
                />

                <div className="inline-flex w-fit rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-bold text-emerald-200">
                  Live Mock
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--background-card)]/70 p-4 sm:p-6 lg:min-h-[32rem]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.16),transparent_18rem)]" />
                  <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-300/20" />
                  <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/15" />
                  <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-300/10" />

                  <div className="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[1.75rem] border border-teal-300/35 bg-teal-300/10 text-center shadow-2xl shadow-teal-950/30 sm:h-40 sm:w-40 sm:rounded-[2rem]">
                    <span className="text-5xl font-black text-[var(--turquoise-soft)]">
                      24
                    </span>
                    <span className="mt-1 text-xs font-bold uppercase tracking-[0.3em] text-[var(--muted)]">
                      Records
                    </span>
                  </div>

                  {relationshipNodes.map((node) => (
                    <article
                      key={node.name}
                      aria-label={`${node.name}: ${node.sublabel}`}
                      className={`absolute z-20 w-36 rounded-2xl border border-[var(--border)] bg-black/75 px-3 py-3 shadow-2xl shadow-black/30 backdrop-blur-md sm:w-44 sm:px-4 ${node.className}`}
                    >
                      <h3 className="truncate text-xs font-black sm:text-sm">
                        {node.label}
                      </h3>
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        {node.sublabel}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="rounded-[2rem] border border-[var(--border)] bg-black/20 p-5">
                  <h3 className="text-lg font-black">Map purpose</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    This visualization can evolve into a real component graph
                    showing relationships, dependencies, shared ownership, and
                    lifecycle state across the design system.
                  </p>

                  <div className="mt-6 space-y-3">
                    <FeatureBullet text="Related components and dependency context" />
                    <FeatureBullet text="Status-aware decision intelligence" />
                    <FeatureBullet text="Ownership visibility for maintainability" />
                    <FeatureBullet text="Future candidate for interactive filtering" />
                  </div>
                </div>
              </div>
            </section>

            <section id="system-panels" className="grid gap-4 xl:grid-cols-3">
              <article className="rounded-[2rem] border border-[var(--border)] bg-black/35 p-6 backdrop-blur-xl">
                <PanelHeader
                  eyebrow="Registry Preview"
                  title="Searchable component registry"
                  description="A structured index of reusable components with ownership and lifecycle visibility."
                />

                <div className="mt-6 space-y-3">
                  {registryPreview.map((item) => (
                    <article
                      key={item.name}
                      className="rounded-2xl border border-[var(--border)] bg-white/[0.03] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-black">
                            {item.name}
                          </h3>
                          <p className="mt-1 truncate text-xs text-[var(--muted)]">
                            {item.meta}
                          </p>
                        </div>

                        <span className="shrink-0 rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-center text-[0.68rem] font-bold leading-tight text-[var(--turquoise-soft)]">
                          {item.status}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </article>

              <article className="rounded-[2rem] border border-[var(--border)] bg-black/35 p-6 backdrop-blur-xl">
                <PanelHeader
                  eyebrow="Contract Snapshot"
                  title="SearchCommandPanel"
                  description="Example metadata model showing the type of record the system will store and render."
                />

                <dl className="mt-6 space-y-3">
                  {contractRows.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-white/[0.03] px-4 py-3"
                    >
                      <dt className="text-sm text-[var(--muted)]">{label}</dt>
                      <dd className="text-sm font-bold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </article>

              <article className="rounded-[2rem] border border-[var(--border)] bg-black/35 p-6 backdrop-blur-xl">
                <PanelHeader
                  eyebrow="Review Ledger"
                  title="Decision pipeline"
                  description="A snapshot of how reusable component work moves through the system."
                />

                <div className="mt-6 space-y-3">
                  {pipelineRows.map((row) => (
                    <article
                      key={row.label}
                      className="rounded-2xl border border-[var(--border)] bg-white/[0.03] px-4 py-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-black">{row.label}</h3>
                        <span className="text-2xl font-black text-[var(--turquoise-soft)]">
                          {row.value}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {row.note}
                      </p>
                    </article>
                  ))}
                </div>
              </article>
            </section>
          </div>

          <aside className="rounded-[2rem] border border-[var(--border)] bg-black/35 p-5 backdrop-blur-xl">
            <div className="rounded-3xl border border-purple-300/20 bg-purple-300/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
                Activity Feed
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight">
                Recent architecture signals
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                A preview of how teams will track component-level decisions over
                time.
              </p>
            </div>

            <ol className="mt-5 space-y-3">
              {activityItems.map((item) => (
                <li
                  key={item.title}
                  className="rounded-3xl border border-[var(--border)] bg-white/[0.03] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-black">{item.title}</h3>
                    <time className="shrink-0 text-xs text-[var(--muted-strong)]">
                      {item.time}
                    </time>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-5 rounded-3xl border border-teal-300/20 bg-teal-300/10 p-4">
              <p className="text-sm font-black text-[var(--turquoise-soft)]">
                Quality target
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                This project will prove strict typing, accessibility,
                validation, tested interactions, CI, and production-ready
                documentation.
              </p>
            </div>
          </aside>
        </GsapRevealScope>
      </section>
    </main>
  );
}

function PanelHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 break-words text-2xl font-black leading-tight">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        {description}
      </p>
    </div>
  );
}

function ProofRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-white/[0.03] p-4">
      <h3 className="text-sm font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        {description}
      </p>
    </article>
  );
}

function FeatureBullet({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-white/[0.03] p-3">
      <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[var(--turquoise)]" />
      <p className="text-sm leading-6 text-[var(--muted)]">{text}</p>
    </div>
  );
}

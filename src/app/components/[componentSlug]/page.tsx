import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComponentStatusBadge } from "@/components/component-log/ComponentStatusBadge";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { mockComponents } from "@/data/mock-components";
import { DecisionComparisonTable } from "@/components/component-log/DecisionComparisonTable";
import {
  formatComponentCategory,
  formatComponentPlatform,
  getComponentBySlug,
  getRelatedComponents,
} from "@/features/components/component-utils";

type ComponentDetailPageProps = {
  params: Promise<{
    componentSlug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ComponentDetailPageProps): Promise<Metadata> {
  const { componentSlug } = await params;
  const component = getComponentBySlug(mockComponents, componentSlug);

  if (!component) {
    return {
      title: "Component Not Found",
    };
  }

  return {
    title: component.name,
    description: component.summary,
  };
}

export default async function ComponentDetailPage({
  params,
}: ComponentDetailPageProps) {
  const { componentSlug } = await params;
  const component = getComponentBySlug(mockComponents, componentSlug);

  if (!component) {
    notFound();
  }

  const relatedComponents = getRelatedComponents(mockComponents, component);

  return (
    <main
      id="main-content"
      className="min-h-screen px-4 py-6 text-[var(--foreground)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex flex-col gap-6">
          <header className="rounded-[2rem] border border-[var(--border)] bg-black/35 p-6 backdrop-blur-xl sm:p-8">
            <Link
              href="/components"
              className="text-sm font-bold text-[var(--turquoise)] transition hover:text-[var(--turquoise-soft)]"
            >
              ← Back to Component Registry
            </Link>

            <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-[var(--turquoise)]">
                  Component Record
                </p>

                <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  {component.name}
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
                  {component.summary}
                </p>
              </div>

              <ComponentStatusBadge status={component.status} />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <MetadataTile
                label="Category"
                value={formatComponentCategory(component.category)}
              />
              <MetadataTile
                label="Platform"
                value={formatComponentPlatform(component.platform)}
              />
              <MetadataTile label="Owner" value={component.owner.team} />
              <MetadataTile
                label="Decisions"
                value={component.decisions.length.toString()}
              />
            </div>
          </header>

          <section
            aria-labelledby="props-title"
            className="rounded-[2rem] border border-[var(--border)] bg-black/30 p-5 backdrop-blur-xl sm:p-6"
          >
            <SectionHeader
              eyebrow="Interface"
              title="Props documentation"
              description="Props define how consuming screens configure component behavior, display, and interaction."
              titleId="props-title"
            />

            <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border)]">
              <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                <thead className="bg-white/[0.04] text-[var(--muted)]">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Prop
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Type
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Required
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {component.props.map((prop) => (
                    <tr
                      key={prop.id}
                      className="border-t border-[var(--border)]"
                    >
                      <th
                        scope="row"
                        className="px-4 py-4 font-black text-[var(--foreground)]"
                      >
                        {prop.name}
                      </th>
                      <td className="px-4 py-4">
                        <code className="rounded-lg border border-[var(--border)] bg-black/35 px-2 py-1 text-[var(--turquoise-soft)]">
                          {prop.type}
                        </code>
                      </td>
                      <td className="px-4 py-4 text-[var(--muted)]">
                        {prop.required ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-4 leading-6 text-[var(--muted)]">
                        {prop.description}
                        {prop.defaultValue ? (
                          <span className="mt-2 block text-xs text-[var(--muted-strong)]">
                            Default: {prop.defaultValue}
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section
            aria-labelledby="state-title"
            className="rounded-[2rem] border border-[var(--border)] bg-black/30 p-5 backdrop-blur-xl sm:p-6"
          >
            <SectionHeader
              eyebrow="State"
              title="State documentation"
              description="State records clarify what the component owns internally versus what should be controlled by parent features."
              titleId="state-title"
            />

            {component.state.length > 0 ? (
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {component.state.map((stateItem) => (
                  <Card key={stateItem.id} as="article" className="p-5">
                    <h3 className="font-black">{stateItem.name}</h3>
                    <code className="mt-3 inline-flex rounded-lg border border-[var(--border)] bg-black/35 px-2 py-1 text-sm text-[var(--turquoise-soft)]">
                      {stateItem.type}
                    </code>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {stateItem.description}
                    </p>
                  </Card>
                ))}
              </div>
            ) : (
              <Card as="div" className="mt-6 p-5">
                <p className="font-black">No internal state documented.</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  This component is currently modeled as presentational or
                  externally controlled.
                </p>
              </Card>
            )}
          </section>

          <section
            aria-labelledby="api-contract-title"
            className="rounded-[2rem] border border-[var(--border)] bg-black/30 p-5 backdrop-blur-xl sm:p-6"
          >
            <SectionHeader
              eyebrow="Contract"
              title="API contract"
              description="API documentation keeps component behavior aligned with backend expectations and failure states."
              titleId="api-contract-title"
            />

            {component.apiContract ? (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <ContractTile
                  label="Endpoint"
                  value={component.apiContract.endpoint ?? "Not applicable"}
                />
                <ContractTile
                  label="Method"
                  value={component.apiContract.method ?? "Not applicable"}
                />
                <ContractTile
                  label="Request Shape"
                  value={component.apiContract.requestShape ?? "Not documented"}
                />
                <ContractTile
                  label="Response Shape"
                  value={
                    component.apiContract.responseShape ?? "Not documented"
                  }
                />

                <Card as="div" className="p-5 lg:col-span-2">
                  <h3 className="font-black">Failure states</h3>
                  {component.apiContract.errorStates?.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {component.apiContract.errorStates.map((errorState) => (
                        <li key={errorState}>
                          <Badge variant="default">{errorState}</Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-[var(--muted)]">
                      No explicit failure states documented.
                    </p>
                  )}
                </Card>

                <Card as="div" className="p-5 lg:col-span-2">
                  <h3 className="font-black">Notes</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {component.apiContract.notes ?? "No notes documented."}
                  </p>
                </Card>
              </div>
            ) : (
              <Card as="div" className="mt-6 p-5">
                <p className="font-black">No API contract documented.</p>
              </Card>
            )}
          </section>

          <section
            aria-labelledby="timeline-title"
            className="rounded-[2rem] border border-[var(--border)] bg-black/30 p-5 backdrop-blur-xl sm:p-6"
          >
            <SectionHeader
              eyebrow="Decision Log"
              title="Architecture decision timeline"
              description="This timeline captures why decisions were made, who made them, and what level of impact they carry."
              titleId="timeline-title"
            />

            <ol className="mt-6 space-y-4">
              {component.decisions.map((decision) => (
                <li
                  key={decision.id}
                  className="rounded-3xl border border-[var(--border)] bg-white/[0.03] p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-black">{decision.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                        {decision.summary}
                      </p>
                    </div>

                    <Badge variant="default">Impact: {decision.impact}</Badge>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
  <Badge variant="default">Project: {decision.project}</Badge>
  {decision.tech.map((tech) => (
    <Badge key={tech} variant="default">
      {tech}
    </Badge>
  ))}
  {decision.tags.map((tag) => (
    <Badge key={tag} variant="default">
      #{tag}
    </Badge>
  ))}
</div>

<p className="mt-4 text-sm leading-7 text-[var(--muted)]">
  <span className="font-bold text-[var(--foreground)]">
    Rationale:
  </span>{" "}
  {decision.rationale}
</p>

<DecisionComparisonTable decision={decision} />

<p className="mt-4 text-xs text-[var(--muted-strong)]">
  Logged by {decision.author} on{" "}
  <time dateTime={decision.createdAt}>
    {formatReadableDate(decision.createdAt)}
  </time>
</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="flex flex-col gap-6">
          <Card as="section" aria-labelledby="owner-title" className="p-5">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
              Ownership
            </p>
            <h2 id="owner-title" className="mt-3 text-2xl font-black">
              {component.owner.team}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Maintained by {component.owner.name}.
            </p>
            {component.owner.email ? (
              <a
                href={`mailto:${component.owner.email}`}
                className="mt-4 inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-sm font-bold text-[var(--turquoise-soft)] transition hover:border-[var(--turquoise)] hover:text-[var(--turquoise)]"
              >
                Contact owner
              </a>
            ) : null}
          </Card>

          <Card
            as="section"
            aria-labelledby="accessibility-title"
            className="p-5"
          >
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
              Accessibility
            </p>
            <h2 id="accessibility-title" className="mt-3 text-2xl font-black">
              Accessibility notes
            </h2>

            <ul className="mt-5 space-y-3">
              {component.accessibilityNotes.map((note) => (
                <li
                  key={note}
                  className="rounded-2xl border border-[var(--border)] bg-white/[0.03] p-3 text-sm leading-6 text-[var(--muted)]"
                >
                  {note}
                </li>
              ))}
            </ul>
          </Card>

          <Card as="section" aria-labelledby="tags-title" className="p-5">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
              Tags
            </p>
            <h2 id="tags-title" className="sr-only">
              Component tags
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {component.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="default">{tag}</Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            as="section"
            aria-labelledby="related-components-title"
            className="p-5"
          >
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
              Related
            </p>
            <h2
              id="related-components-title"
              className="mt-3 text-2xl font-black"
            >
              Related components
            </h2>

            {relatedComponents.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {relatedComponents.map((relatedComponent) => (
                  <li key={relatedComponent.id}>
                    <Link
                      href={`/components/${relatedComponent.slug}`}
                      className="block rounded-2xl border border-[var(--border)] bg-white/[0.03] p-4 transition hover:border-[var(--turquoise)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
                    >
                      <span className="font-black">
                        {relatedComponent.name}
                      </span>
                      <span className="mt-1 block text-sm text-[var(--muted)]">
                        {formatComponentCategory(relatedComponent.category)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                No related components documented yet.
              </p>
            )}
          </Card>
        </aside>
      </div>
    </main>
  );
}

function MetadataTile({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-black/25 p-4">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-2 font-black text-[var(--foreground)]">{value}</p>
    </article>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  titleId,
}: {
  eyebrow: string;
  title: string;
  description: string;
  titleId: string;
}) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
        {eyebrow}
      </p>
      <h2 id={titleId} className="mt-3 text-2xl font-black">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
        {description}
      </p>
    </div>
  );
}

function ContractTile({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Card as="div" className="p-5">
      <h3 className="font-black">{label}</h3>
      <p className="mt-3 break-words text-sm leading-7 text-[var(--muted)]">
        {value}
      </p>
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
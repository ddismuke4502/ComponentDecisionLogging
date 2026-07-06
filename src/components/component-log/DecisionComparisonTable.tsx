import { Badge } from "@/components/ui/Badge";
import type {
  ComponentDecision,
  DecisionOption,
} from "@/features/components/component-types";

type DecisionComparisonTableProps = {
  decision: ComponentDecision;
};

const criteria = [
  {
    key: "performance",
    label: "Performance",
    description: "Runtime cost, rendering efficiency, and interaction speed.",
  },
  {
    key: "accessibility",
    label: "Accessibility",
    description: "Semantic support, keyboard behavior, and assistive tech fit.",
  },
  {
    key: "bundleSize",
    label: "Bundle Size",
    description: "Impact on shipped JavaScript and dependency weight.",
  },
  {
    key: "developerExperience",
    label: "Developer Experience",
    description: "Ease of maintenance, testing, reuse, and implementation.",
  },
] as const;

export function DecisionComparisonTable({
  decision,
}: DecisionComparisonTableProps) {
  const chosenOption = decision.optionsConsidered.find(
    (option) => option.id === decision.chosenOptionId,
  );

  return (
    <section
      aria-labelledby={`${decision.id}-comparison-title`}
      className="mt-5 rounded-3xl border border-[var(--border)] bg-black/25 p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--turquoise)]">
            Comparison Table
          </p>
          <h4
            id={`${decision.id}-comparison-title`}
            className="mt-2 text-lg font-black"
          >
            Options considered
          </h4>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
            Compare each option across the MVP criteria used to justify the
            final component decision.
          </p>
        </div>

        {chosenOption ? (
          <Badge variant="approved">Chosen: {chosenOption.name}</Badge>
        ) : (
          <Badge variant="deprecated">Chosen option missing</Badge>
        )}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-[var(--border)]">
        <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparison of options considered for {decision.title}
          </caption>

          <thead className="bg-white/[0.04] text-[var(--muted)]">
            <tr>
              <th scope="col" className="w-64 px-4 py-3 font-bold">
                Option
              </th>
              {criteria.map((criterion) => (
                <th key={criterion.key} scope="col" className="px-4 py-3">
                  <span className="block font-bold text-[var(--foreground)]">
                    {criterion.label}
                  </span>
                  <span className="mt-1 block max-w-44 text-xs leading-5 text-[var(--muted)]">
                    {criterion.description}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {decision.optionsConsidered.map((option) => (
              <tr
                key={option.id}
                className="border-t border-[var(--border)] align-top"
              >
                <th scope="row" className="px-4 py-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-black text-[var(--foreground)]">
                      {option.name}
                    </span>

                    {option.id === decision.chosenOptionId ? (
                      <span className="w-fit rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-xs font-black text-[var(--turquoise-soft)]">
                        Selected
                      </span>
                    ) : null}

                    <span className="text-sm leading-6 text-[var(--muted)]">
                      {option.description}
                    </span>

                    <TradeoffList option={option} />
                  </div>
                </th>

                {criteria.map((criterion) => (
                  <td key={criterion.key} className="px-4 py-4">
                    <ScorePill score={option.scores[criterion.key]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white/[0.03] p-4">
        <p className="text-sm leading-7 text-[var(--muted)]">
          <span className="font-black text-[var(--foreground)]">
            Choice made:
          </span>{" "}
          {decision.choice}
        </p>
      </div>
    </section>
  );
}

function ScorePill({ score }: { score: number }) {
  return (
    <div className="inline-flex min-w-20 items-center justify-center rounded-2xl border border-[var(--border)] bg-black/35 px-3 py-2 text-center">
      <span className="text-lg font-black text-[var(--turquoise-soft)]">
        {score}
      </span>
      <span className="ml-1 text-xs font-bold text-[var(--muted)]">/ 5</span>
    </div>
  );
}

function TradeoffList({ option }: { option: DecisionOption }) {
  if (option.tradeoffs.length === 0) {
    return null;
  }

  return (
    <ul className="mt-2 space-y-1">
      {option.tradeoffs.map((tradeoff) => (
        <li
          key={tradeoff}
          className="flex gap-2 text-xs leading-5 text-[var(--muted-strong)]"
        >
          <span aria-hidden="true" className="text-[var(--turquoise)]">
            •
          </span>
          <span>{tradeoff}</span>
        </li>
      ))}
    </ul>
  );
}

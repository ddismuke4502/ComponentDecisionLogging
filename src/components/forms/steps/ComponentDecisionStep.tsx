import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { DecisionImpact } from "@/features/components/component-types";
import type { ComponentFormValues } from "@/features/components/component-schema";
import {
  joinCommaSeparatedValues,
  parseCommaSeparatedValues,
} from "@/features/components/component-form-utils";

type ComponentDecisionStepProps = {
  register: UseFormRegister<ComponentFormValues>;
  setValue: UseFormSetValue<ComponentFormValues>;
  watch: UseFormWatch<ComponentFormValues>;
  errors: FieldErrors<ComponentFormValues>;
};

const impactOptions = ["low", "medium", "high"] as const satisfies DecisionImpact[];

const scoreOptions = [1, 2, 3, 4, 5] as const;

const criteria = [
  {
    key: "performance",
    label: "Performance",
  },
  {
    key: "accessibility",
    label: "Accessibility",
  },
  {
    key: "bundleSize",
    label: "Bundle Size",
  },
  {
    key: "developerExperience",
    label: "Developer Experience",
  },
] as const;

export function ComponentDecisionStep({
  register,
  setValue,
  watch,
  errors,
}: ComponentDecisionStepProps) {
  const decision = watch("decisions.0");
  const options = decision.optionsConsidered;

  function updateDecisionArrayField(field: "tech" | "tags", value: string) {
    setValue(`decisions.0.${field}`, parseCommaSeparatedValues(value), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  function updateTradeoffs(optionIndex: number, value: string) {
    setValue(
      `decisions.0.optionsConsidered.${optionIndex}.tradeoffs`,
      parseCommaSeparatedValues(value),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          id="decision-title"
          label="Decision title"
          placeholder="Use native button semantics"
          error={errors.decisions?.[0]?.title?.message}
          {...register("decisions.0.title")}
        />

        <Input
          id="decision-project"
          label="Project"
          placeholder="Component Decision Log"
          error={errors.decisions?.[0]?.project?.message}
          {...register("decisions.0.project")}
        />
      </div>

      <Textarea
        id="decision-summary"
        label="Decision summary"
        placeholder="Summarize the decision in one or two sentences."
        error={errors.decisions?.[0]?.summary?.message}
        {...register("decisions.0.summary")}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          id="decision-tech"
          label="Tech"
          helperText="Comma-separated. Example: React, TypeScript, ARIA"
          placeholder="React, TypeScript, ARIA"
          value={joinCommaSeparatedValues(decision.tech)}
          onChange={(event) =>
            updateDecisionArrayField("tech", event.target.value)
          }
          error={errors.decisions?.[0]?.tech?.message}
        />

        <Input
          id="decision-tags"
          label="Decision tags"
          helperText="Comma-separated. Example: accessibility, state, performance"
          placeholder="accessibility, state, performance"
          value={joinCommaSeparatedValues(decision.tags)}
          onChange={(event) =>
            updateDecisionArrayField("tags", event.target.value)
          }
          error={errors.decisions?.[0]?.tags?.message}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          id="decision-author"
          label="Decision author"
          placeholder="Dameion Dismuke"
          error={errors.decisions?.[0]?.author?.message}
          {...register("decisions.0.author")}
        />

        <Select
          id="decision-impact"
          label="Decision impact"
          error={errors.decisions?.[0]?.impact?.message}
          {...register("decisions.0.impact")}
        >
          {impactOptions.map((impact) => (
            <option key={impact} value={impact}>
              {impact}
            </option>
          ))}
        </Select>
      </div>

      <Input
        id="decision-choice"
        label="Choice made"
        placeholder="Use native button element"
        error={errors.decisions?.[0]?.choice?.message}
        {...register("decisions.0.choice")}
      />

      <Textarea
        id="decision-rationale"
        label="Decision rationale"
        placeholder="Explain why this decision was made and what tradeoffs it addresses."
        error={errors.decisions?.[0]?.rationale?.message}
        {...register("decisions.0.rationale")}
      />

      <section
        aria-labelledby="options-considered-title"
        className="rounded-3xl border border-[var(--border)] bg-black/20 p-4 sm:p-5"
      >
        <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
          Comparison Inputs
        </p>
        <h3 id="options-considered-title" className="mt-3 text-xl font-black">
          Options considered
        </h3>
        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
          Capture the options you compared and score each one across the MVP
          comparison criteria.
        </p>

        <div className="mt-5 grid gap-5">
          {options.map((option, optionIndex) => (
            <article
              key={option.id}
              className="rounded-3xl border border-[var(--border)] bg-white/[0.03] p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="font-black">Option {optionIndex + 1}</h4>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {optionIndex === 0
                      ? "Usually the preferred or current implementation."
                      : "Usually the alternative implementation."}
                  </p>
                </div>

                <label className="flex items-center gap-2 text-sm font-bold text-[var(--muted)]">
                  <input
                    type="radio"
                    value={option.id}
                    {...register("decisions.0.chosenOptionId")}
                    className="h-4 w-4 accent-[var(--turquoise)]"
                  />
                  Mark as chosen
                </label>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <Input
                  id={`decision-option-${optionIndex}-name`}
                  label="Option name"
                  placeholder="Native button element"
                  error={
                    errors.decisions?.[0]?.optionsConsidered?.[optionIndex]
                      ?.name?.message
                  }
                  {...register(
                    `decisions.0.optionsConsidered.${optionIndex}.name`,
                  )}
                />

                <Input
                  id={`decision-option-${optionIndex}-tradeoffs`}
                  label="Tradeoffs"
                  helperText="Comma-separated tradeoffs."
                  placeholder="Best semantics, Requires styling reset"
                  value={joinCommaSeparatedValues(option.tradeoffs)}
                  onChange={(event) =>
                    updateTradeoffs(optionIndex, event.target.value)
                  }
                  error={
                    errors.decisions?.[0]?.optionsConsidered?.[optionIndex]
                      ?.tradeoffs?.message
                  }
                />
              </div>

              <Textarea
                id={`decision-option-${optionIndex}-description`}
                label="Option description"
                placeholder="Describe what this option means and where it fits."
                className="mt-5"
                error={
                  errors.decisions?.[0]?.optionsConsidered?.[optionIndex]
                    ?.description?.message
                }
                {...register(
                  `decisions.0.optionsConsidered.${optionIndex}.description`,
                )}
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {criteria.map((criterion) => (
                  <Select
                    key={criterion.key}
                    id={`decision-option-${optionIndex}-${criterion.key}`}
                    label={criterion.label}
                    error={
                      errors.decisions?.[0]?.optionsConsidered?.[optionIndex]
                        ?.scores?.[criterion.key]?.message
                    }
                    {...register(
                      `decisions.0.optionsConsidered.${optionIndex}.scores.${criterion.key}`,
                      { valueAsNumber: true },
                    )}
                  >
                    {scoreOptions.map((score) => (
                      <option key={score} value={score}>
                        {score} / 5
                      </option>
                    ))}
                  </Select>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
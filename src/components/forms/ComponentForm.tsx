"use client";

import { useMemo, useState } from "react";
import type { Path } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { ComponentIdentityStep } from "@/components/forms/steps/ComponentIdentityStep";
import { ComponentOwnershipStep } from "@/components/forms/steps/ComponentOwnershipStep";
import { ComponentContractStep } from "@/components/forms/steps/ComponentContractStep";
import type {
  ComponentRecord,
  DecisionImpact,
} from "@/features/components/component-types";
import {
  componentFormSchema,
  type ComponentFormValues,
} from "@/features/components/component-schema";
import {
  createComponentRecordFromFormValues,
  createDefaultComponentFormValues,
  createSlug,
  parseCommaSeparatedValues,
} from "@/features/components/component-form-utils";
import {
  componentCategoryLabels,
  componentPlatformLabels,
  componentStatusLabels,
} from "@/features/components/component-utils";

type FormStep = {
  id: string;
  label: string;
  description: string;
  fields: Path<ComponentFormValues>[];
};

const formSteps: FormStep[] = [
  {
    id: "identity",
    label: "Identity",
    description: "Name, slug, summary, and tags.",
    fields: ["name", "slug", "summary", "tags"],
  },
  {
    id: "ownership",
    label: "Ownership",
    description: "Lifecycle status, category, platform, and owner.",
    fields: [
      "status",
      "category",
      "platform",
      "owner.name",
      "owner.team",
      "owner.email",
    ],
  },
  {
    id: "contract",
    label: "Contract",
    description: "API contract and accessibility notes.",
    fields: [
      "apiContract.endpoint",
      "apiContract.method",
      "apiContract.requestShape",
      "apiContract.responseShape",
      "apiContract.notes",
      "accessibilityNotes",
    ],
  },
  {
    id: "decision",
    label: "Decision",
    description: "Initial architecture decision entry.",
    fields: [
      "decisions.0.title",
      "decisions.0.summary",
      "decisions.0.rationale",
      "decisions.0.author",
      "decisions.0.impact",
    ],
  },
  {
    id: "review",
    label: "Review",
    description: "Validate and preview the component record.",
    fields: [],
  },
];

const impactOptions = [
  "low",
  "medium",
  "high",
] as const satisfies DecisionImpact[];

export function ComponentForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [submittedRecord, setSubmittedRecord] =
    useState<ComponentRecord | null>(null);

  const defaultValues = useMemo(() => createDefaultComponentFormValues(), []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ComponentFormValues>({
    resolver: zodResolver(componentFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const currentStep = formSteps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === formSteps.length - 1;

  const watchedName = useWatch({
    control,
    name: "name",
  });

  const watchedSlug = useWatch({
    control,
    name: "slug",
  });

  const watchedTags = useWatch({
    control,
    name: "tags",
  });

  const watchedOwnerTeam = useWatch({
    control,
    name: "owner.team",
  });

  const watchedStatus = useWatch({
    control,
    name: "status",
  });

  const watchedCategory = useWatch({
    control,
    name: "category",
  });

  const watchedPlatform = useWatch({
    control,
    name: "platform",
  });

  const watchedSummary = useWatch({
    control,
    name: "summary",
  });

  const previewValues = useWatch({
    control,
  });

  function updateSlugFromName() {
    if (!watchedSlug?.trim()) {
      setValue("slug", createSlug(watchedName), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }

  function updateTags(value: string) {
    setValue("tags", parseCommaSeparatedValues(value), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  async function goToNextStep() {
    const fieldsToValidate = currentStep.fields;

    const isStepValid =
      fieldsToValidate.length === 0 ? true : await trigger(fieldsToValidate);

    if (isStepValid) {
      setCurrentStepIndex((index) => Math.min(index + 1, formSteps.length - 1));
    }
  }

  function goToPreviousStep() {
    setCurrentStepIndex((index) => Math.max(index - 1, 0));
  }

  function handleValidSubmit(values: ComponentFormValues) {
    const record = createComponentRecordFromFormValues(values);
    setSubmittedRecord(record);
  }

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)} className="space-y-6">
      <Card as="section" aria-labelledby="form-progress-title" className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
              Add Component
            </p>
            <h2 id="form-progress-title" className="mt-2 text-2xl font-black">
              Multi-step component record
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Step {currentStepIndex + 1} of {formSteps.length}:{" "}
              {currentStep.description}
            </p>
          </div>

          <p className="rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-sm font-bold text-[var(--turquoise-soft)]">
            {currentStep.label}
          </p>
        </div>

        <ol className="mt-6 grid gap-3 md:grid-cols-5">
          {formSteps.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isComplete = index < currentStepIndex;

            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => setCurrentStepIndex(index)}
                  className={`min-h-20 w-full rounded-2xl border p-3 text-left transition ${
                    isActive
                      ? "border-[var(--turquoise)] bg-teal-300/10"
                      : isComplete
                        ? "border-purple-300/30 bg-purple-300/10"
                        : "border-[var(--border)] bg-white/[0.03]"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--muted)]">
                    Step {index + 1}
                  </span>
                  <span className="mt-1 block text-sm font-black">
                    {step.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </Card>

      <Card as="section" className="p-5 sm:p-6">
        {currentStep.id === "identity" ? (
          <ComponentIdentityStep
            register={register}
            errors={errors}
            watchedTags={watchedTags ?? []}
            updateTags={updateTags}
            updateSlugFromName={updateSlugFromName}
          />
        ) : null}

        {currentStep.id === "ownership" ? (
          <ComponentOwnershipStep register={register} errors={errors} />
        ) : null}

        {currentStep.id === "contract" ? (
          <ComponentContractStep
            control={control}
            register={register}
            setValue={setValue}
            errors={errors}
          />
        ) : null}

        {currentStep.id === "decision" ? (
          <div className="grid gap-5">
            <Input
              id="decision-title"
              label="Decision title"
              placeholder="Use native button semantics"
              error={errors.decisions?.[0]?.title?.message}
              {...register("decisions.0.title")}
            />

            <Textarea
              id="decision-summary"
              label="Decision summary"
              placeholder="Summarize the decision in one or two sentences."
              error={errors.decisions?.[0]?.summary?.message}
              {...register("decisions.0.summary")}
            />

            <Textarea
              id="decision-rationale"
              label="Decision rationale"
              placeholder="Explain why this decision was made and what tradeoffs it addresses."
              error={errors.decisions?.[0]?.rationale?.message}
              {...register("decisions.0.rationale")}
            />

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
          </div>
        ) : null}

        {currentStep.id === "review" ? (
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--turquoise)]">
              Review
            </p>
            <h3 className="mt-3 text-2xl font-black">
              Review the component record before saving.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              This preview is local for now. Later, this submit action will
              create a Firestore document and invalidate the React Query cache.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <ReviewTile label="Name" value={watchedName || "—"} />
              <ReviewTile label="Slug" value={watchedSlug || "—"} />
              <ReviewTile label="Owner" value={watchedOwnerTeam || "—"} />
              <ReviewTile
                label="Status"
                value={
                  watchedStatus ? componentStatusLabels[watchedStatus] : "—"
                }
              />
              <ReviewTile
                label="Category"
                value={
                  watchedCategory
                    ? componentCategoryLabels[watchedCategory]
                    : "—"
                }
              />
              <ReviewTile
                label="Platform"
                value={
                  watchedPlatform
                    ? componentPlatformLabels[watchedPlatform]
                    : "—"
                }
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
                  {submittedRecord.name} is ready to be saved when Firestore is
                  connected.
                </p>
              </Card>
            ) : null}
          </div>
        ) : null}
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={goToPreviousStep}
          disabled={isFirstStep}
        >
          Previous
        </Button>

        <div className="flex flex-col gap-3 sm:flex-row">
          {!isLastStep ? (
            <Button type="button" onClick={goToNextStep}>
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              Validate Record
            </Button>
          )}
        </div>
      </div>
    </form>
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

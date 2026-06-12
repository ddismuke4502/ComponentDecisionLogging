"use client";

import { useMemo, useState } from "react";
import type { Path } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ComponentIdentityStep } from "@/components/forms/steps/ComponentIdentityStep";
import { ComponentOwnershipStep } from "@/components/forms/steps/ComponentOwnershipStep";
import { ComponentContractStep } from "@/components/forms/steps/ComponentContractStep";
import { ComponentDecisionStep } from "@/components/forms/steps/ComponentDecisionStep";
import { ComponentReviewStep } from "@/components/forms/steps/ComponentReviewStep";
import type { ComponentRecord } from "@/features/components/component-types";
import { useSaveComponentMutation } from "@/features/components/component-mutations";
import { GsapRevealScope } from "@/components/animation/GsapRevealScope";
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

export function ComponentForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [submittedRecord, setSubmittedRecord] =
    useState<ComponentRecord | null>(null);

  const saveComponentMutation = useSaveComponentMutation();

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

  async function handleValidSubmit(values: ComponentFormValues) {
    const record = createComponentRecordFromFormValues(values);
    const savedRecord = await saveComponentMutation.mutateAsync(record);

    setSubmittedRecord(savedRecord);
  }

  return (
    <form
      aria-label="Create component record"
      className="space-y-6"
      onSubmit={handleSubmit(handleValidSubmit)}
    >
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

        <ol
          className="grid gap-3 sm:grid-cols-5"
          aria-label="Component form steps"
        >
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
                  aria-current={step.id === currentStep.id ? "step" : undefined}
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

      <GsapRevealScope animationKey={currentStep.id}>
        <Card data-gsap-reveal as="section" className="p-5 sm:p-6">
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
            <ComponentDecisionStep register={register} errors={errors} />
          ) : null}

          {currentStep.id === "review" ? (
            <ComponentReviewStep
              watchedName={watchedName ?? ""}
              watchedSlug={watchedSlug ?? ""}
              watchedOwnerTeam={watchedOwnerTeam ?? ""}
              watchedStatus={watchedStatus}
              watchedCategory={watchedCategory}
              watchedPlatform={watchedPlatform}
              watchedSummary={watchedSummary ?? ""}
              submittedRecord={submittedRecord}
            />
          ) : null}
        </Card>
      </GsapRevealScope>

      {saveComponentMutation.isError ? (
        <Card
          as="div"
          className="border-rose-300/30 bg-rose-300/10 p-5"
          role="alert"
        >
          <h3 className="font-black text-rose-100">Save failed.</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
            The component record could not be saved. Check Firebase
            configuration or try again.
          </p>
        </Card>
      ) : null}

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
            <Button
              type="submit"
              disabled={isSubmitting || saveComponentMutation.isPending}
            >
              {saveComponentMutation.isPending ? "Saving..." : "Save Record"}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

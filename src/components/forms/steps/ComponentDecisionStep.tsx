import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { DecisionImpact } from "@/features/components/component-types";
import type { ComponentFormValues } from "@/features/components/component-schema";

type ComponentDecisionStepProps = {
  register: UseFormRegister<ComponentFormValues>;
  errors: FieldErrors<ComponentFormValues>;
};

const impactOptions = ["low", "medium", "high"] as const satisfies DecisionImpact[];

export function ComponentDecisionStep({
  register,
  errors,
}: ComponentDecisionStepProps) {
  return (
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
  );
}
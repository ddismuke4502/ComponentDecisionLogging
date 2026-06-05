import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type {
  ComponentCategory,
  ComponentPlatform,
  ComponentStatus,
} from "@/features/components/component-types";
import type { ComponentFormValues } from "@/features/components/component-schema";
import {
  componentCategoryLabels,
  componentPlatformLabels,
  componentStatusLabels,
} from "@/features/components/component-utils";

type ComponentOwnershipStepProps = {
  register: UseFormRegister<ComponentFormValues>;
  errors: FieldErrors<ComponentFormValues>;
};

const statusOptions = [
  "proposed",
  "in_review",
  "approved",
  "deprecated",
] as const satisfies ComponentStatus[];

const categoryOptions = [
  "action",
  "navigation",
  "form",
  "feedback",
  "data_display",
  "layout",
  "overlay",
  "motion",
] as const satisfies ComponentCategory[];

const platformOptions = [
  "web",
  "ios",
  "android",
  "cross_platform",
] as const satisfies ComponentPlatform[];

export function ComponentOwnershipStep({
  register,
  errors,
}: ComponentOwnershipStepProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Select
        id="component-status"
        label="Status"
        error={errors.status?.message}
        {...register("status")}
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {componentStatusLabels[status]}
          </option>
        ))}
      </Select>

      <Select
        id="component-category"
        label="Category"
        error={errors.category?.message}
        {...register("category")}
      >
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {componentCategoryLabels[category]}
          </option>
        ))}
      </Select>

      <Select
        id="component-platform"
        label="Platform"
        error={errors.platform?.message}
        {...register("platform")}
      >
        {platformOptions.map((platform) => (
          <option key={platform} value={platform}>
            {componentPlatformLabels[platform]}
          </option>
        ))}
      </Select>

      <Input
        id="owner-team"
        label="Owner team"
        placeholder="Design Systems"
        error={errors.owner?.team?.message}
        {...register("owner.team")}
      />

      <Input
        id="owner-name"
        label="Owner name"
        placeholder="Maya Chen"
        error={errors.owner?.name?.message}
        {...register("owner.name")}
      />

      <Input
        id="owner-email"
        label="Owner email"
        type="email"
        placeholder="maya.chen@example.com"
        helperText="Optional, but helpful for real ownership workflows."
        error={errors.owner?.email?.message}
        {...register("owner.email")}
      />
    </div>
  );
}
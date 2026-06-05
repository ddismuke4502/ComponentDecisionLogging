import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ComponentFormValues } from "@/features/components/component-schema";
import { joinCommaSeparatedValues } from "@/features/components/component-form-utils";

type ComponentIdentityStepProps = {
  register: UseFormRegister<ComponentFormValues>;
  errors: FieldErrors<ComponentFormValues>;
  watchedTags: string[];
  updateTags: (value: string) => void;
  updateSlugFromName: () => void;
};

export function ComponentIdentityStep({
  register,
  errors,
  watchedTags,
  updateTags,
  updateSlugFromName,
}: ComponentIdentityStepProps) {
  return (
    <div className="grid gap-5">
      <Input
        id="component-name"
        label="Component name"
        placeholder="PrimaryActionButton"
        helperText="Use a clear PascalCase component name."
        error={errors.name?.message}
        {...register("name", {
          onBlur: updateSlugFromName,
        })}
      />

      <Input
        id="component-slug"
        label="Slug"
        placeholder="primary-action-button"
        helperText="Used for the component detail URL."
        error={errors.slug?.message}
        {...register("slug")}
      />

      <Textarea
        id="component-summary"
        label="Summary"
        placeholder="Describe what this component does, where it is used, and why it exists."
        error={errors.summary?.message}
        {...register("summary")}
      />

      <Input
        id="component-tags"
        label="Tags"
        placeholder="button, cta, forms, accessibility"
        helperText="Comma-separated tags."
        value={joinCommaSeparatedValues(watchedTags)}
        error={errors.tags?.message}
        onChange={(event) => updateTags(event.target.value)}
      />
    </div>
  );
}
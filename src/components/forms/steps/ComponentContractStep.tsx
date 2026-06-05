"use client";

import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { ApiMethod } from "@/features/components/component-types";
import type { ComponentFormValues } from "@/features/components/component-schema";
import {
  joinCommaSeparatedValues,
  parseCommaSeparatedValues,
} from "@/features/components/component-form-utils";

type ComponentContractStepProps = {
  control: Control<ComponentFormValues>;
  register: UseFormRegister<ComponentFormValues>;
  setValue: UseFormSetValue<ComponentFormValues>;
  errors: FieldErrors<ComponentFormValues>;
};

const apiMethodOptions = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
] as const satisfies ApiMethod[];

export function ComponentContractStep({
  control,
  register,
  setValue,
  errors,
}: ComponentContractStepProps) {
  const watchedApiMethod = useWatch({
    control,
    name: "apiContract.method",
  });

  const watchedAccessibilityNotes = useWatch({
    control,
    name: "accessibilityNotes",
  });

  function updateAccessibilityNotes(value: string) {
    setValue("accessibilityNotes", parseCommaSeparatedValues(value), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          id="api-endpoint"
          label="API endpoint"
          placeholder="/api/components/search"
          helperText="Optional. Use when the component depends on backend data."
          error={errors.apiContract?.endpoint?.message}
          {...register("apiContract.endpoint")}
        />

        <Select
          id="api-method"
          label="API method"
          value={watchedApiMethod ?? ""}
          error={errors.apiContract?.method?.message}
          onChange={(event) =>
            setValue(
              "apiContract.method",
              event.target.value
                ? (event.target.value as ApiMethod)
                : undefined,
              { shouldDirty: true, shouldValidate: true },
            )
          }
        >
          <option value="">No method</option>
          {apiMethodOptions.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </Select>
      </div>

      <Textarea
        id="request-shape"
        label="Request shape"
        placeholder="{ query: string; status?: string }"
        error={errors.apiContract?.requestShape?.message}
        {...register("apiContract.requestShape")}
      />

      <Textarea
        id="response-shape"
        label="Response shape"
        placeholder="{ results: ComponentRecord[]; total: number }"
        error={errors.apiContract?.responseShape?.message}
        {...register("apiContract.responseShape")}
      />

      <Textarea
        id="api-notes"
        label="API notes"
        placeholder="Document loading, empty, success, and error expectations."
        error={errors.apiContract?.notes?.message}
        {...register("apiContract.notes")}
      />

      <Input
        id="accessibility-notes"
        label="Accessibility notes"
        placeholder="Keyboard accessible, visible focus state, status not color-only"
        helperText="Comma-separated notes. Add at least one specific note."
        value={joinCommaSeparatedValues(watchedAccessibilityNotes ?? [])}
        error={errors.accessibilityNotes?.message}
        onChange={(event) => updateAccessibilityNotes(event.target.value)}
      />
    </div>
  );
}
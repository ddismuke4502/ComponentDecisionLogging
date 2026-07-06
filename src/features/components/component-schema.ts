import { z } from "zod";

export const componentStatusSchema = z.enum([
  "proposed",
  "in_review",
  "approved",
  "deprecated",
]);

export const componentCategorySchema = z.enum([
  "action",
  "navigation",
  "form",
  "feedback",
  "data_display",
  "layout",
  "overlay",
  "motion",
]);

export const componentPlatformSchema = z.enum([
  "web",
  "ios",
  "android",
  "cross_platform",
]);

export const apiMethodSchema = z.enum([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
]);

export const decisionImpactSchema = z.enum(["low", "medium", "high"]);

export const decisionCriterionScoreSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

export const decisionOptionScoresSchema = z.object({
  performance: decisionCriterionScoreSchema,
  accessibility: decisionCriterionScoreSchema,
  bundleSize: decisionCriterionScoreSchema,
  developerExperience: decisionCriterionScoreSchema,
});

export const decisionOptionSchema = z.object({
  id: z.string().min(1, "Option id is required."),
  name: z.string().min(2, "Option name is required."),
  description: z
    .string()
    .min(10, "Option description should be at least 10 characters."),
  scores: decisionOptionScoresSchema,
  tradeoffs: z.array(z.string().min(3, "Tradeoff should be specific.")),
});

export const componentPropSchema = z.object({
  id: z.string().min(1, "Prop id is required."),
  name: z.string().min(1, "Prop name is required."),
  type: z.string().min(1, "Prop type is required."),
  required: z.boolean(),
  defaultValue: z.string().optional(),
  description: z.string().min(10, "Prop description should be at least 10 characters."),
});

export const componentStateItemSchema = z.object({
  id: z.string().min(1, "State id is required."),
  name: z.string().min(1, "State name is required."),
  type: z.string().min(1, "State type is required."),
  description: z.string().min(10, "State description should be at least 10 characters."),
});

export const apiContractSchema = z.object({
  endpoint: z.string().optional(),
  method: apiMethodSchema.optional(),
  requestShape: z.string().optional(),
  responseShape: z.string().optional(),
  errorStates: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export const componentDecisionSchema = z
  .object({
    id: z.string().min(1, "Decision id is required."),
    title: z
      .string()
      .min(3, "Decision title should be at least 3 characters."),
    project: z.string().min(2, "Project name is required."),
    tech: z.array(z.string().min(1, "Tech value is required.")),
    tags: z.array(z.string().min(1, "Decision tag is required.")),
    summary: z
      .string()
      .min(10, "Decision summary should be at least 10 characters."),
    optionsConsidered: z
      .array(decisionOptionSchema)
      .min(2, "Add at least two options considered."),
    chosenOptionId: z.string().min(1, "Chosen option is required."),
    choice: z.string().min(3, "Choice made is required."),
    rationale: z
      .string()
      .min(20, "Decision rationale should be at least 20 characters."),
    author: z.string().min(2, "Decision author is required."),
    impact: decisionImpactSchema,
    createdAt: z.string().min(1, "Decision date is required."),
  })
  .refine(
    (decision) =>
      decision.optionsConsidered.some(
        (option) => option.id === decision.chosenOptionId,
      ),
    {
      message: "Chosen option must match one of the options considered.",
      path: ["chosenOptionId"],
    },
  );

export const componentOwnerSchema = z.object({
  name: z.string().min(2, "Owner name is required."),
  team: z.string().min(2, "Owner team is required."),
  email: z
    .string()
    .email("Enter a valid owner email.")
    .optional()
    .or(z.literal("")),
});

export const componentFormSchema = z.object({
  name: z.string().min(2, "Component name is required."),
  slug: z.string().min(2, "Slug is required."),
  summary: z.string().min(20, "Summary should be at least 20 characters."),
  category: componentCategorySchema,
  status: componentStatusSchema,
  platform: componentPlatformSchema,
  owner: componentOwnerSchema,
  tags: z.array(z.string()).min(1, "Add at least one tag."),
  props: z.array(componentPropSchema),
  state: z.array(componentStateItemSchema),
  apiContract: apiContractSchema.optional(),
  decisions: z
    .array(componentDecisionSchema)
    .min(1, "Add at least one architecture decision."),
  relatedComponentIds: z.array(z.string()),
  accessibilityNotes: z
    .array(z.string().min(10, "Accessibility notes should be specific."))
    .min(1, "Add at least one accessibility note."),
});

export type ComponentFormValues = z.infer<typeof componentFormSchema>;
import {
  componentFormSchema,
  type ComponentFormValues,
} from "@/features/components/component-schema";

const validFormValues: ComponentFormValues = {
  name: "PrimaryActionButton",
  slug: "primary-action-button",
  summary:
    "A reusable action button used for primary user flows and confirmation actions.",
  category: "action",
  status: "approved",
  platform: "cross_platform",
  owner: {
    name: "Maya Chen",
    team: "Design Systems",
    email: "maya.chen@example.com",
  },
  tags: ["button", "forms", "accessibility"],
  props: [
    {
      id: "prop-label",
      name: "label",
      type: "string",
      required: true,
      description: "Visible text label used as the button accessible name.",
    },
  ],
  state: [],
  apiContract: {
    endpoint: "",
    method: undefined,
    requestShape: "",
    responseShape: "",
    errorStates: [],
    notes:
      "This component does not call APIs directly. Parent flows own async behavior.",
  },
  decisions: [
    {
      id: "decision-native-button",
      title: "Use native button",
      project: "Component Decision Log",
      tech: ["React", "TypeScript"],
      tags: ["button", "accessibility"],
      summary: "The component should render a native button element.",
      optionsConsidered: [
        {
          id: "option-native-button",
          name: "Native button element",
          description: "Use a semantic button with built-in keyboard behavior.",
          scores: {
            performance: 5,
            accessibility: 5,
            bundleSize: 5,
            developerExperience: 4,
          },
          tradeoffs: ["Best semantic support"],
        },
        {
          id: "option-clickable-div",
          name: "Clickable div",
          description: "Use a div and recreate button behavior manually.",
          scores: {
            performance: 3,
            accessibility: 1,
            bundleSize: 3,
            developerExperience: 2,
          },
          tradeoffs: ["More styling flexibility"],
        },
      ],
      chosenOptionId: "option-native-button",
      choice: "Use native button element",
      rationale:
        "Native buttons provide keyboard support, focus behavior, disabled state, and accessibility semantics by default.",
      author: "Maya Chen",
      impact: "high",
      createdAt: "2026-05-18T14:30:00.000Z",
    },
  ],
  relatedComponentIds: [],
  accessibilityNotes: [
    "Must expose a visible label or accessible name.",
    "Focus-visible state must be clearly visible.",
  ],
};

describe("componentFormSchema", () => {
  it("accepts a valid component form payload", () => {
    const result = componentFormSchema.safeParse(validFormValues);

    expect(result.success).toBe(true);
  });

  it("rejects missing required identity fields", () => {
    const result = componentFormSchema.safeParse({
      ...validFormValues,
      name: "",
      slug: "",
      summary: "Too short",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      expect(fieldErrors.name).toBeDefined();
      expect(fieldErrors.slug).toBeDefined();
      expect(fieldErrors.summary).toBeDefined();
    }
  });

  it("requires at least one tag, decision, and accessibility note", () => {
    const result = componentFormSchema.safeParse({
      ...validFormValues,
      tags: [],
      decisions: [],
      accessibilityNotes: [],
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      expect(fieldErrors.tags).toBeDefined();
      expect(fieldErrors.decisions).toBeDefined();
      expect(fieldErrors.accessibilityNotes).toBeDefined();
    }
  });

  it("rejects invalid owner email values", () => {
    const result = componentFormSchema.safeParse({
      ...validFormValues,
      owner: {
        ...validFormValues.owner,
        email: "not-an-email",
      },
    });

    expect(result.success).toBe(false);
  });
});

it("rejects decisions when the chosen option is not one of the options considered", () => {
  const result = componentFormSchema.safeParse({
    ...validFormValues,
    decisions: [
      {
        ...validFormValues.decisions[0],
        chosenOptionId: "option-does-not-exist",
      },
    ],
  });

  expect(result.success).toBe(false);
});

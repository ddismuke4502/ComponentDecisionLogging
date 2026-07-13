import { mockComponents } from "@/data/mock-components";
import type { ComponentFormValues } from "@/features/components/component-schema";
import {
  createComponentRecordFromFormValues,
  createFormValuesFromComponentRecord,
  createSlug,
  joinCommaSeparatedValues,
  parseCommaSeparatedValues,
} from "@/features/components/component-form-utils";

const formValues: ComponentFormValues = {
  name: "SearchCommandPanel",
  slug: "search-command-panel",
  summary:
    "A command-style search panel for quickly finding component records and decisions.",
  category: "navigation",
  status: "in_review",
  platform: "web",
  owner: {
    name: "Elena Torres",
    team: "Platform UI",
    email: "",
  },
  tags: ["search", "keyboard", "navigation"],
  props: [],
  state: [],
  apiContract: {
    endpoint: "/api/components/search",
    method: "GET",
    requestShape: "{ query: string }",
    responseShape: "{ results: ComponentRecord[] }",
    errorStates: ["network_error", "empty_results"],
    notes: "Documents loading, empty, success, and error states.",
  },
  decisions: [
    {
  id: "decision-keyboard-first",
  title: "Prioritize keyboard navigation",
  project: "Component Decision Log",
  tech: ["React", "TypeScript", "Keyboard Events"],
  tags: ["search", "keyboard", "accessibility"],
  summary:
    "The search panel should be fully usable without a mouse or trackpad.",
  optionsConsidered: [
    {
      id: "option-keyboard-first-panel",
      name: "Keyboard-first command panel",
      description:
        "Build the search panel around keyboard navigation, active state, and escape behavior.",
      scores: {
        performance: 4,
        accessibility: 5,
        bundleSize: 4,
        developerExperience: 4,
      },
      tradeoffs: [
        "Best power-user experience",
        "Requires more interaction testing",
      ],
    },
    {
      id: "option-pointer-first-panel",
      name: "Pointer-first dropdown",
      description:
        "Build a simpler dropdown interaction optimized for pointer selection.",
      scores: {
        performance: 4,
        accessibility: 2,
        bundleSize: 5,
        developerExperience: 4,
      },
      tradeoffs: [
        "Faster initial build",
        "Weaker keyboard support for frequent users",
      ],
    },
  ],
  chosenOptionId: "option-keyboard-first-panel",
  choice: "Prioritize keyboard navigation",
  rationale:
    "Command panels are power-user interfaces, so keyboard support is central to the expected interaction model.",
  author: "Elena Torres",
  impact: "high",
  createdAt: "2026-05-22T16:00:00.000Z",
},
  ],
  relatedComponentIds: [],
  accessibilityNotes: [
    "Search input must have an accessible label.",
    "Escape should close the panel without losing context.",
  ],
};

describe("component-form-utils", () => {
  it("creates URL-safe slugs from component names", () => {
    expect(createSlug("Primary Action Button")).toBe("primary-action-button");
    expect(createSlug(" SearchCommandPanel!! ")).toBe("searchcommandpanel");
    expect(createSlug("API Contract: Error State")).toBe(
      "api-contract-error-state",
    );
  });

  it("parses comma-separated values into clean arrays", () => {
    expect(parseCommaSeparatedValues("button, forms, accessibility")).toEqual([
      "button",
      "forms",
      "accessibility",
    ]);

    expect(parseCommaSeparatedValues("button, , forms,")).toEqual([
      "button",
      "forms",
    ]);
  });

  it("joins string arrays into comma-separated values", () => {
    expect(joinCommaSeparatedValues(["button", "forms", "a11y"])).toBe(
      "button, forms, a11y",
    );
  });

  it("converts form values into a component record", () => {
    const existingComponent = mockComponents[1];

    const record = createComponentRecordFromFormValues(
      formValues,
      existingComponent,
    );

    expect(record.id).toBe(existingComponent.id);
    expect(record.createdAt).toBe(existingComponent.createdAt);
    expect(record.name).toBe("SearchCommandPanel");
    expect(record.owner.email).toBeUndefined();
    expect(record.apiContract?.endpoint).toBe("/api/components/search");
    expect(record.accessibilityNotes).toHaveLength(2);
  });

  it("converts a component record back into form values", () => {
    const component = mockComponents[0];

    const values = createFormValuesFromComponentRecord(component);

    expect(values.name).toBe(component.name);
    expect(values.slug).toBe(component.slug);
    expect(values.owner.team).toBe(component.owner.team);
    expect(values.decisions).toHaveLength(component.decisions.length);
  });
});
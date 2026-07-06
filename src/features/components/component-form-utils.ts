import type { ComponentRecord } from "@/features/components/component-types";
import type { ComponentFormValues } from "@/features/components/component-schema";

export function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function parseCommaSeparatedValues(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function joinCommaSeparatedValues(values: string[]) {
  return values.join(", ");
}

export function createDefaultComponentFormValues(): ComponentFormValues {
  const now = new Date().toISOString();

  return {
    name: "",
    slug: "",
    summary: "",
    category: "action",
    status: "proposed",
    platform: "web",
    owner: {
      name: "",
      team: "",
      email: "",
    },
    tags: [],
    props: [],
    state: [],
    apiContract: {
      endpoint: "",
      method: undefined,
      requestShape: "",
      responseShape: "",
      errorStates: [],
      notes: "",
    },
    decisions: [
      {
        id: createId("decision"),
        title: "",
        project: "Component Decision Log",
        tech: ["React", "TypeScript"],
        tags: ["architecture"],
        summary: "",
        optionsConsidered: [
          {
            id: "option-current-implementation",
            name: "Current implementation",
            description:
              "Use the current component architecture and document the tradeoffs.",
            scores: {
              performance: 3,
              accessibility: 3,
              bundleSize: 3,
              developerExperience: 3,
            },
            tradeoffs: [
              "Fast to implement",
              "May need deeper comparison later",
            ],
          },
          {
            id: "option-alternative-implementation",
            name: "Alternative implementation",
            description:
              "Evaluate a different component approach before finalizing the decision.",
            scores: {
              performance: 3,
              accessibility: 3,
              bundleSize: 3,
              developerExperience: 3,
            },
            tradeoffs: [
              "More complete evaluation",
              "Requires additional review time",
            ],
          },
        ],
        chosenOptionId: "option-current-implementation",
        choice: "Use the current implementation",
        rationale: "",
        author: "",
        impact: "medium",
        createdAt: now,
      },
    ],
    relatedComponentIds: [],
    accessibilityNotes: [],
  };
}

export function createComponentRecordFromFormValues(
  values: ComponentFormValues,
  existingComponent?: ComponentRecord,
): ComponentRecord {
  const now = new Date().toISOString();
  const slug = values.slug || createSlug(values.name);

  return {
    id: existingComponent?.id ?? createId("cmp"),
    name: values.name,
    slug,
    summary: values.summary,
    category: values.category,
    status: values.status,
    owner: {
      name: values.owner.name,
      team: values.owner.team,
      email: values.owner.email || undefined,
    },
    platform: values.platform,
    tags: values.tags,
    props: values.props,
    state: values.state,
    apiContract: normalizeApiContract(values.apiContract),
    decisions: values.decisions,
    relatedComponentIds: values.relatedComponentIds,
    accessibilityNotes: values.accessibilityNotes,
    createdAt: existingComponent?.createdAt ?? now,
    updatedAt: now,
  };
}

export function createFormValuesFromComponentRecord(
  component: ComponentRecord,
): ComponentFormValues {
  return {
    name: component.name,
    slug: component.slug,
    summary: component.summary,
    category: component.category,
    status: component.status,
    platform: component.platform,
    owner: {
      name: component.owner.name,
      team: component.owner.team,
      email: component.owner.email ?? "",
    },
    tags: component.tags,
    props: component.props,
    state: component.state,
    apiContract: component.apiContract ?? {
      endpoint: "",
      method: undefined,
      requestShape: "",
      responseShape: "",
      errorStates: [],
      notes: "",
    },
    decisions: component.decisions,
    relatedComponentIds: component.relatedComponentIds,
    accessibilityNotes: component.accessibilityNotes,
  };
}

function normalizeApiContract(
  apiContract: ComponentFormValues["apiContract"],
): ComponentRecord["apiContract"] {
  if (!apiContract) {
    return undefined;
  }

  const hasApiContractContent = [
    apiContract.endpoint,
    apiContract.method,
    apiContract.requestShape,
    apiContract.responseShape,
    apiContract.notes,
    ...(apiContract.errorStates ?? []),
  ].some((value) => Boolean(value && value.trim?.()));

  if (!hasApiContractContent) {
    return undefined;
  }

  return {
    endpoint: apiContract.endpoint || undefined,
    method: apiContract.method,
    requestShape: apiContract.requestShape || undefined,
    responseShape: apiContract.responseShape || undefined,
    errorStates: apiContract.errorStates?.filter(Boolean),
    notes: apiContract.notes || undefined,
  };
}

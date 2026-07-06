import type { ComponentRecord } from "@/features/components/component-types";

export const mockComponents: ComponentRecord[] = [
  {
    id: "cmp-primary-action-button",
    name: "PrimaryActionButton",
    slug: "primary-action-button",
    summary:
      "A reusable action button for primary user flows such as form submission, checkout progression, and confirmation actions.",
    category: "action",
    status: "approved",
    owner: {
      name: "Maya Chen",
      team: "Design Systems",
      email: "maya.chen@example.com",
    },
    platform: "cross_platform",
    tags: ["button", "cta", "forms", "accessibility"],
    props: [
      {
        id: "prop-button-label",
        name: "label",
        type: "string",
        required: true,
        description: "Visible button text announced to assistive technology.",
      },
      {
        id: "prop-button-variant",
        name: "variant",
        type: "'primary' | 'secondary' | 'danger'",
        required: false,
        defaultValue: "primary",
        description: "Controls visual emphasis and semantic action intent.",
      },
      {
        id: "prop-button-disabled",
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description:
          "Prevents interaction and communicates unavailable state visually.",
      },
    ],
    state: [
      {
        id: "state-button-loading",
        name: "isLoading",
        type: "boolean",
        description:
          "Used when an async action is pending and the user should not submit again.",
      },
    ],
    apiContract: {
      notes:
        "This component does not call APIs directly. Parent flows own async behavior and pass loading/disabled state down.",
    },
    decisions: [
      {
        id: "decision-button-native-element",
        title: "Use native button element",
        project: "Component Decision Log",
        tech: ["React", "TypeScript", "HTML"],
        tags: ["accessibility", "semantics", "button"],
        optionsConsidered: [
          {
            id: "option-native-button",
            name: "Native button element",
            description:
              "Render a semantic button element and inherit browser keyboard behavior.",
            scores: {
              performance: 5,
              accessibility: 5,
              bundleSize: 5,
              developerExperience: 4,
            },
            tradeoffs: [
              "Best semantic baseline",
              "Requires styling reset for visual consistency",
            ],
          },
          {
            id: "option-clickable-div",
            name: "Clickable div",
            description:
              "Render a div and manually recreate button interaction behavior.",
            scores: {
              performance: 3,
              accessibility: 1,
              bundleSize: 2,
              developerExperience: 2,
            },
            tradeoffs: [
              "Flexible styling",
              "Requires custom keyboard and ARIA behavior",
            ],
          },
        ],
        chosenOptionId: "option-native-button",
        choice: "Use native button element",
        summary:
          "PrimaryActionButton must render a native button instead of a clickable div.",
        rationale:
          "Native buttons provide keyboard support, focus behavior, disabled state, and assistive technology semantics by default.",
        author: "Maya Chen",
        impact: "high",
        createdAt: "2026-05-18T14:30:00.000Z",
      },
      {
        id: "decision-button-loading-state",
        title: "Externalize loading state ownership",
        project: "Component Decision Log",
        tech: ["React", "TypeScript"],
        tags: ["state", "async", "composition"],
        optionsConsidered: [
          {
            id: "option-parent-loading-state",
            name: "Parent-owned loading state",
            description:
              "Let the feature or parent component own async state and pass loading flags down.",
            scores: {
              performance: 4,
              accessibility: 4,
              bundleSize: 5,
              developerExperience: 4,
            },
            tradeoffs: [
              "Keeps UI primitive simple",
              "Requires parent flows to wire state intentionally",
            ],
          },
          {
            id: "option-internal-loading-state",
            name: "Internal loading state",
            description:
              "Let the button own loading behavior internally after user interaction.",
            scores: {
              performance: 3,
              accessibility: 3,
              bundleSize: 3,
              developerExperience: 3,
            },
            tradeoffs: [
              "Encapsulates behavior",
              "Can duplicate async business logic across flows",
            ],
          },
        ],
        chosenOptionId: "option-parent-loading-state",
        choice: "Externalize loading state ownership",
        summary:
          "Loading state should be controlled by the parent feature instead of internal component state.",
        rationale:
          "Keeping async ownership outside the UI primitive prevents duplicated business logic and improves testability.",
        author: "Jordan Lee",
        impact: "medium",
        createdAt: "2026-05-20T10:15:00.000Z",
      },
    ],
    relatedComponentIds: ["cmp-form-validation-message"],
    accessibilityNotes: [
      "Must always expose a visible text label or accessible name.",
      "Focus-visible state must meet contrast expectations on dark surfaces.",
      "Disabled state must not be communicated by opacity alone when used in critical flows.",
    ],
    createdAt: "2026-05-10T09:00:00.000Z",
    updatedAt: "2026-05-20T10:15:00.000Z",
  },
  {
    id: "cmp-search-command-panel",
    name: "SearchCommandPanel",
    slug: "search-command-panel",
    summary:
      "A command-style search panel for quickly finding components, owners, statuses, and architecture decisions.",
    category: "navigation",
    status: "in_review",
    owner: {
      name: "Elena Torres",
      team: "Platform UI",
      email: "elena.torres@example.com",
    },
    platform: "web",
    tags: ["search", "command", "keyboard", "navigation"],
    props: [
      {
        id: "prop-search-query",
        name: "query",
        type: "string",
        required: true,
        description: "Current search text used to filter component records.",
      },
      {
        id: "prop-search-results",
        name: "results",
        type: "ComponentRecord[]",
        required: true,
        description: "Filtered component records displayed in the panel.",
      },
      {
        id: "prop-search-on-select",
        name: "onSelect",
        type: "(componentId: string) => void",
        required: true,
        description:
          "Callback fired when a user selects a result using pointer or keyboard interaction.",
      },
    ],
    state: [
      {
        id: "state-search-active-index",
        name: "activeIndex",
        type: "number",
        description:
          "Tracks which search result is currently active for keyboard navigation.",
      },
      {
        id: "state-search-is-open",
        name: "isOpen",
        type: "boolean",
        description: "Controls panel visibility.",
      },
    ],
    apiContract: {
      endpoint: "/api/components/search",
      method: "GET",
      requestShape: "{ query: string; status?: string; category?: string }",
      responseShape: "{ results: ComponentRecord[]; total: number }",
      errorStates: ["network_error", "empty_results", "unauthorized"],
      notes:
        "Initial implementation will use local filtering. Firestore-backed querying will be introduced later.",
    },
    decisions: [
      {
        id: "decision-search-keyboard-first",
        title: "Prioritize keyboard navigation",
        project: "Component Decision Log",
        tech: ["React", "TypeScript", "Keyboard Events"],
        tags: ["search", "keyboard", "accessibility"],
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
        summary:
          "SearchCommandPanel should be fully usable without a mouse or trackpad.",
        rationale:
          "Command panels are power-user interfaces. Keyboard support is central to the expected interaction model.",
        author: "Elena Torres",
        impact: "high",
        createdAt: "2026-05-22T16:00:00.000Z",
      },
      {
        id: "decision-search-empty-state",
        title: "Document empty and loading states",
        project: "Component Decision Log",
        tech: ["React", "TypeScript", "TanStack Query"],
        tags: ["loading-state", "empty-state", "resilience"],
        optionsConsidered: [
          {
            id: "option-explicit-search-states",
            name: "Explicit loading, empty, and error states",
            description:
              "Render separate states for loading, empty results, successful results, and errors.",
            scores: {
              performance: 4,
              accessibility: 4,
              bundleSize: 4,
              developerExperience: 5,
            },
            tradeoffs: [
              "Clearer user feedback",
              "Requires extra UI states and tests",
            ],
          },
          {
            id: "option-generic-search-message",
            name: "Generic fallback message",
            description:
              "Use one generic message for all non-success search outcomes.",
            scores: {
              performance: 5,
              accessibility: 2,
              bundleSize: 5,
              developerExperience: 3,
            },
            tradeoffs: [
              "Simple implementation",
              "Makes debugging and user recovery harder",
            ],
          },
        ],
        chosenOptionId: "option-explicit-search-states",
        choice: "Document empty and loading states",
        summary:
          "Search results must clearly distinguish loading, empty, and error states.",
        rationale:
          "Ambiguous search feedback creates uncertainty and makes debugging data issues harder for engineering teams.",
        author: "Ari Patel",
        impact: "medium",
        createdAt: "2026-05-23T12:45:00.000Z",
      },
    ],
    relatedComponentIds: ["cmp-component-health-card"],
    accessibilityNotes: [
      "Search input must have a visible or screen-reader-accessible label.",
      "Result list should expose active selection state to assistive technology.",
      "Escape should close the panel without losing user context.",
    ],
    createdAt: "2026-05-12T11:00:00.000Z",
    updatedAt: "2026-05-23T12:45:00.000Z",
  },
  {
    id: "cmp-form-validation-message",
    name: "FormValidationMessage",
    slug: "form-validation-message",
    summary:
      "A standardized validation message component for form fields, schema errors, and async validation feedback.",
    category: "feedback",
    status: "approved",
    owner: {
      name: "Noah Williams",
      team: "Experience Quality",
      email: "noah.williams@example.com",
    },
    platform: "cross_platform",
    tags: ["forms", "validation", "errors", "a11y"],
    props: [
      {
        id: "prop-validation-message",
        name: "message",
        type: "string",
        required: true,
        description: "Human-readable validation message.",
      },
      {
        id: "prop-validation-field-id",
        name: "fieldId",
        type: "string",
        required: true,
        description:
          "Identifier used to associate the message with the related form field.",
      },
    ],
    state: [],
    apiContract: {
      notes:
        "This component is presentational. Validation source may come from Zod, server responses, or async field validation.",
    },
    decisions: [
      {
        id: "decision-validation-aria-described-by",
        title: "Associate errors with fields",
        project: "Component Decision Log",
        tech: ["React", "TypeScript", "ARIA"],
        tags: ["forms", "validation", "accessibility"],
        optionsConsidered: [
          {
            id: "option-aria-describedby",
            name: "Use aria-describedby",
            description:
              "Connect validation messages to invalid fields with accessible descriptions.",
            scores: {
              performance: 5,
              accessibility: 5,
              bundleSize: 5,
              developerExperience: 4,
            },
            tradeoffs: [
              "Strong screen-reader support",
              "Requires consistent id wiring",
            ],
          },
          {
            id: "option-visual-only-error",
            name: "Visual-only error text",
            description:
              "Render visible error text below fields without programmatic association.",
            scores: {
              performance: 5,
              accessibility: 1,
              bundleSize: 5,
              developerExperience: 3,
            },
            tradeoffs: [
              "Fast to render",
              "Screen-reader users may miss field-level context",
            ],
          },
        ],
        chosenOptionId: "option-aria-describedby",
        choice: "Associate errors with fields",
        summary:
          "Validation messages must be connected to their fields using accessible descriptions.",
        rationale:
          "Screen-reader users need field-level error context at the point of interaction, not only a visual message below the field.",
        author: "Noah Williams",
        impact: "high",
        createdAt: "2026-05-16T15:10:00.000Z",
      },
    ],
    relatedComponentIds: ["cmp-primary-action-button"],
    accessibilityNotes: [
      "Use aria-describedby to connect error text to the invalid field.",
      "Do not rely only on red color to communicate invalid state.",
      "Validation message text should be concise and actionable.",
    ],
    createdAt: "2026-05-11T08:45:00.000Z",
    updatedAt: "2026-05-16T15:10:00.000Z",
  },
  {
    id: "cmp-component-health-card",
    name: "ComponentHealthCard",
    slug: "component-health-card",
    summary:
      "A dashboard card summarizing component adoption, lifecycle status, accessibility coverage, and decision-log completeness.",
    category: "data_display",
    status: "proposed",
    owner: {
      name: "Dameion Dismuke",
      team: "Frontend Guild",
      email: "dameion.dismuke@example.com",
    },
    platform: "web",
    tags: ["dashboard", "metrics", "health", "reporting"],
    props: [
      {
        id: "prop-health-score",
        name: "score",
        type: "number",
        required: true,
        description:
          "Calculated health score based on metadata completeness, decision coverage, and accessibility notes.",
      },
      {
        id: "prop-health-label",
        name: "label",
        type: "string",
        required: true,
        description: "Display label describing the component health category.",
      },
    ],
    state: [
      {
        id: "state-health-expanded",
        name: "isExpanded",
        type: "boolean",
        description:
          "Controls whether supporting health details are visible to the user.",
      },
    ],
    apiContract: {
      endpoint: "/api/components/:id/health",
      method: "GET",
      responseShape:
        "{ score: number; missingFields: string[]; recommendations: string[] }",
      errorStates: ["not_found", "network_error"],
      notes:
        "Health score may eventually be derived client-side from Firestore data rather than fetched from an API.",
    },
    decisions: [
      {
        id: "decision-health-score-transparent",
        title: "Make scoring criteria visible",
        project: "Component Decision Log",
        tech: ["React", "TypeScript", "Data Visualization"],
        tags: ["metrics", "dashboard", "transparency"],
        optionsConsidered: [
          {
            id: "option-transparent-score",
            name: "Transparent scoring criteria",
            description:
              "Show the criteria, missing fields, and recommendations behind the health score.",
            scores: {
              performance: 4,
              accessibility: 4,
              bundleSize: 4,
              developerExperience: 5,
            },
            tradeoffs: [
              "Builds trust in the metric",
              "Requires more detailed data modeling",
            ],
          },
          {
            id: "option-opaque-score",
            name: "Opaque score only",
            description:
              "Show only the final score without explaining how it was calculated.",
            scores: {
              performance: 5,
              accessibility: 2,
              bundleSize: 5,
              developerExperience: 2,
            },
            tradeoffs: [
              "Simple dashboard display",
              "Harder for teams to act on the result",
            ],
          },
        ],
        chosenOptionId: "option-transparent-score",
        choice: "Make scoring criteria visible",
        summary:
          "Users should understand why a component receives a particular health score.",
        rationale:
          "Opaque scoring can reduce trust. Showing missing fields and recommendations turns the metric into an actionable tool.",
        author: "Dameion Dismuke",
        impact: "medium",
        createdAt: "2026-05-24T09:20:00.000Z",
      },
    ],
    relatedComponentIds: ["cmp-search-command-panel"],
    accessibilityNotes: [
      "Health score must include text labels, not just color-coded states.",
      "Expandable detail content must be keyboard accessible.",
      "Metric changes should not rely on animation alone.",
    ],
    createdAt: "2026-05-14T13:00:00.000Z",
    updatedAt: "2026-05-24T09:20:00.000Z",
  },
];

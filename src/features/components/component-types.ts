export type ComponentStatus =
  | "proposed"
  | "in_review"
  | "approved"
  | "deprecated";

export type ComponentCategory =
  | "action"
  | "navigation"
  | "form"
  | "feedback"
  | "data_display"
  | "layout"
  | "overlay"
  | "motion";

export type ComponentPlatform = "web" | "ios" | "android" | "cross_platform";

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type DecisionImpact = "low" | "medium" | "high";

export type DecisionCriterionScore = 1 | 2 | 3 | 4 | 5;

export type DecisionOptionScores = {
  performance: DecisionCriterionScore;
  accessibility: DecisionCriterionScore;
  bundleSize: DecisionCriterionScore;
  developerExperience: DecisionCriterionScore;
};

export type DecisionOption = {
  id: string;
  name: string;
  description: string;
  scores: DecisionOptionScores;
  tradeoffs: string[];
};

export type ComponentProp = {
  id: string;
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
};

export type ComponentStateItem = {
  id: string;
  name: string;
  type: string;
  description: string;
};

export type ApiContract = {
  endpoint?: string;
  method?: ApiMethod;
  requestShape?: string;
  responseShape?: string;
  errorStates?: string[];
  notes?: string;
};

export type ComponentDecision = {
  id: string;
  title: string;
  project: string;
  tech: string[];
  tags: string[];
  summary: string;
  optionsConsidered: DecisionOption[];
  chosenOptionId: string;
  choice: string;
  rationale: string;
  author: string;
  impact: DecisionImpact;
  createdAt: string;
};

export type ComponentOwner = {
  name: string;
  team: string;
  email?: string;
};

export type ComponentRecord = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  category: ComponentCategory;
  status: ComponentStatus;
  owner: ComponentOwner;
  platform: ComponentPlatform;
  tags: string[];
  props: ComponentProp[];
  state: ComponentStateItem[];
  apiContract?: ApiContract;
  decisions: ComponentDecision[];
  relatedComponentIds: string[];
  accessibilityNotes: string[];
  createdAt: string;
  updatedAt: string;
};

export type ComponentFilters = {
  search: string;
  status: ComponentStatus | "all";
  category: ComponentCategory | "all";
  owner: string | "all";
  project: string | "all";
  tech: string | "all";
  tag: string | "all";
};
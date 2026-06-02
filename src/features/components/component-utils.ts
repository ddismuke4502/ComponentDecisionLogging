import type {
  ComponentCategory,
  ComponentFilters,
  ComponentPlatform,
  ComponentRecord,
  ComponentStatus,
} from "@/features/components/component-types";

export const componentStatusLabels: Record<ComponentStatus, string> = {
  proposed: "Proposed",
  in_review: "In Review",
  approved: "Approved",
  deprecated: "Deprecated",
};

export const componentCategoryLabels: Record<ComponentCategory, string> = {
  action: "Action",
  navigation: "Navigation",
  form: "Form",
  feedback: "Feedback",
  data_display: "Data Display",
  layout: "Layout",
  overlay: "Overlay",
  motion: "Motion",
};

export const componentPlatformLabels: Record<ComponentPlatform, string> = {
  web: "Web",
  ios: "iOS",
  android: "Android",
  cross_platform: "Cross Platform",
};

export function formatComponentStatus(status: ComponentStatus) {
  return componentStatusLabels[status];
}

export function formatComponentCategory(category: ComponentCategory) {
  return componentCategoryLabels[category];
}

export function formatComponentPlatform(platform: ComponentPlatform) {
  return componentPlatformLabels[platform];
}

export function getComponentBySlug(
  components: ComponentRecord[],
  slug: string,
) {
  return components.find((component) => component.slug === slug);
}

export function getRelatedComponents(
  components: ComponentRecord[],
  component: ComponentRecord,
) {
  const relatedIds = new Set(component.relatedComponentIds);

  return components.filter((record) => relatedIds.has(record.id));
}

export function getUniqueOwnerTeams(components: ComponentRecord[]) {
  return Array.from(
    new Set(components.map((component) => component.owner.team)),
  ).sort((a, b) => a.localeCompare(b));
}

export function getUniqueCategories(components: ComponentRecord[]) {
  return Array.from(
    new Set(components.map((component) => component.category)),
  ).sort((a, b) =>
    formatComponentCategory(a).localeCompare(formatComponentCategory(b)),
  );
}

export function searchComponents(
  components: ComponentRecord[],
  searchTerm: string,
) {
  const normalizedSearchTerm = normalizeSearchValue(searchTerm);

  if (!normalizedSearchTerm) {
    return components;
  }

  return components.filter((component) => {
    const searchableContent = [
      component.name,
      component.summary,
      component.category,
      component.status,
      component.platform,
      component.owner.name,
      component.owner.team,
      ...component.tags,
      ...component.accessibilityNotes,
      ...component.props.map((prop) => prop.name),
      ...component.props.map((prop) => prop.description),
      ...component.state.map((stateItem) => stateItem.name),
      ...component.state.map((stateItem) => stateItem.description),
      ...component.decisions.map((decision) => decision.title),
      ...component.decisions.map((decision) => decision.summary),
    ]
      .map(normalizeSearchValue)
      .join(" ");

    return searchableContent.includes(normalizedSearchTerm);
  });
}

export function filterComponents(
  components: ComponentRecord[],
  filters: ComponentFilters,
) {
  const searchedComponents = searchComponents(components, filters.search);

  return searchedComponents.filter((component) => {
    const matchesStatus =
      filters.status === "all" || component.status === filters.status;

    const matchesCategory =
      filters.category === "all" || component.category === filters.category;

    const matchesOwner =
      filters.owner === "all" || component.owner.team === filters.owner;

    return matchesStatus && matchesCategory && matchesOwner;
  });
}

export function sortComponentsByUpdatedDate(components: ComponentRecord[]) {
  return [...components].sort(
    (firstComponent, secondComponent) =>
      new Date(secondComponent.updatedAt).getTime() -
      new Date(firstComponent.updatedAt).getTime(),
  );
}

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}
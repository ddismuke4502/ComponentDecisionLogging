import { mockComponents } from "@/data/mock-components";
import {
  filterComponents,
  formatComponentStatus,
  getComponentBySlug,
  searchComponents,
} from "@/features/components/component-utils";

describe("component-utils", () => {
  it("formats component status labels", () => {
    expect(formatComponentStatus("in_review")).toBe("In Review");
    expect(formatComponentStatus("approved")).toBe("Approved");
  });

  it("finds a component by slug", () => {
    const component = getComponentBySlug(
      mockComponents,
      "primary-action-button",
    );

    expect(component?.name).toBe("PrimaryActionButton");
  });

  it("searches component records across decision and accessibility content", () => {
    const results = searchComponents(mockComponents, "keyboard");

    expect(results.map((component) => component.name)).toContain(
      "SearchCommandPanel",
    );
  });

  it("filters component records by status and owner", () => {
    const results = filterComponents(mockComponents, {
      search: "",
      status: "approved",
      category: "all",
      owner: "Design Systems",
    });

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("PrimaryActionButton");
  });
});
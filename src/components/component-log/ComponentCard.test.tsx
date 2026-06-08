import { render, screen, within } from "@testing-library/react";
import { ComponentCard } from "@/components/component-log/ComponentCard";
import { mockComponents } from "@/data/mock-components";

const primaryActionButton = mockComponents[0];

describe("ComponentCard", () => {
  it("renders the component name, summary, owner, and platform", () => {
    render(<ComponentCard component={primaryActionButton} />);

    expect(
      screen.getByRole("heading", { name: "PrimaryActionButton" }),
    ).toBeInTheDocument();

    expect(screen.getByText(primaryActionButton.summary)).toBeInTheDocument();
    expect(screen.getByText("Design Systems")).toBeInTheDocument();
    expect(screen.getByText("Cross Platform")).toBeInTheDocument();
  });

  it("renders a status badge with readable status text", () => {
    render(<ComponentCard component={primaryActionButton} />);

    expect(screen.getByText("Component status:")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("links to the component detail route", () => {
    render(<ComponentCard component={primaryActionButton} />);

    const titleLink = screen.getByRole("link", {
      name: "PrimaryActionButton",
    });

    const detailsLink = screen.getByRole("link", {
      name: "View details for PrimaryActionButton",
    });

    expect(titleLink).toHaveAttribute(
      "href",
      "/components/primary-action-button",
    );

    expect(detailsLink).toHaveAttribute(
      "href",
      "/components/primary-action-button",
    );
  });

  it("renders component metrics for props and decisions", () => {
    render(<ComponentCard component={primaryActionButton} />);

    const card = screen.getByRole("article", {
      name: "PrimaryActionButton",
    });

    expect(within(card).getByText("Props")).toBeInTheDocument();
    expect(within(card).getByText("Decisions")).toBeInTheDocument();
    expect(within(card).getByText("3")).toBeInTheDocument();
    expect(within(card).getByText("2")).toBeInTheDocument();
  });

  it("renders visible tags", () => {
    render(<ComponentCard component={primaryActionButton} />);

    expect(screen.getByText("button")).toBeInTheDocument();
    expect(screen.getByText("cta")).toBeInTheDocument();
    expect(screen.getByText("forms")).toBeInTheDocument();
    expect(screen.getByText("accessibility")).toBeInTheDocument();
  });
});
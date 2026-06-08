import { render, screen } from "@testing-library/react";
import { ComponentStatusBadge } from "@/components/component-log/ComponentStatusBadge";

describe("ComponentStatusBadge", () => {
  it("renders an approved status label", () => {
    render(<ComponentStatusBadge status="approved" />);

    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("renders screen-reader context for the status", () => {
    render(<ComponentStatusBadge status="in_review" />);

    expect(screen.getByText("Component status:")).toBeInTheDocument();
    expect(screen.getByText("In Review")).toBeInTheDocument();
  });

  it("renders deprecated status text without relying on color alone", () => {
    render(<ComponentStatusBadge status="deprecated" />);

    expect(screen.getByText("Deprecated")).toBeInTheDocument();
  });
});
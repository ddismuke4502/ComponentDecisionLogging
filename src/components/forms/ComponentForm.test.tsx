import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentForm } from "@/components/forms/ComponentForm";
import { renderWithQueryClient } from "@/test/render-with-query-client";

describe("ComponentForm", () => {
  it("prevents moving past the identity step when required fields are missing", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<ComponentForm />);

    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      await screen.findByText("Component name is required."),
    ).toBeInTheDocument();

    expect(screen.getByText("Slug is required.")).toBeInTheDocument();
    expect(
      screen.getByText("Summary should be at least 20 characters."),
    ).toBeInTheDocument();
    expect(screen.getByText("Add at least one tag.")).toBeInTheDocument();

    expect(screen.getByText(/Step 1 of 5/i)).toBeInTheDocument();
    expect(screen.getByText("Identity")).toBeInTheDocument();
  });

  it("submits a valid component record through the save mutation", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<ComponentForm />);

    await fillIdentityStep(user);
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      await screen.findByRole("textbox", { name: /owner team/i }),
    ).toBeInTheDocument();

    await fillOwnershipStep(user);
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      await screen.findByRole("textbox", { name: /accessibility notes/i }),
    ).toBeInTheDocument();

    await fillContractStep(user);
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      await screen.findByRole("textbox", { name: /decision title/i }),
    ).toBeInTheDocument();

    await fillDecisionStep(user);
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      await screen.findByText("Review the component record before saving."),
    ).toBeInTheDocument();

    expect(screen.getByText("AccessibleDataTable")).toBeInTheDocument();
    expect(screen.getByText("accessible-data-table")).toBeInTheDocument();
    expect(screen.getByText("Frontend Guild")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /save record/i }));

    expect(
      await screen.findByText("Component record validated."),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "AccessibleDataTable has passed validation and the save mutation completed.",
      ),
    ).toBeInTheDocument();
  });
});

async function fillIdentityStep(user: ReturnType<typeof userEvent.setup>) {
  await user.type(
    screen.getByRole("textbox", { name: /component name/i }),
    "AccessibleDataTable",
  );

  await user.type(
    screen.getByRole("textbox", { name: /^slug$/i }),
    "accessible-data-table",
  );

  await user.type(
    screen.getByRole("textbox", { name: /^summary$/i }),
    "A reusable data table for accessible enterprise reporting workflows.",
  );

  await user.type(
    screen.getByRole("textbox", { name: /^tags$/i }),
    "table, accessibility, data",
  );
}

async function fillOwnershipStep(user: ReturnType<typeof userEvent.setup>) {
  await user.selectOptions(
    screen.getByRole("combobox", { name: /status/i }),
    "approved",
  );

  await user.selectOptions(
    screen.getByRole("combobox", { name: /category/i }),
    "data_display",
  );

  await user.selectOptions(
    screen.getByRole("combobox", { name: /platform/i }),
    "web",
  );

  await user.type(
    screen.getByRole("textbox", { name: /owner team/i }),
    "Frontend Guild",
  );

  await user.type(
    screen.getByRole("textbox", { name: /owner name/i }),
    "Dameion Dismuke",
  );

  await user.type(
    screen.getByRole("textbox", { name: /owner email/i }),
    "dameion@example.com",
  );
}

async function fillContractStep(user: ReturnType<typeof userEvent.setup>) {
  await user.type(
    screen.getByRole("textbox", { name: /api endpoint/i }),
    "/api/components/reporting",
  );

  await user.selectOptions(
    screen.getByRole("combobox", { name: /api method/i }),
    "GET",
  );

  await user.type(
    screen.getByRole("textbox", { name: /request shape/i }),
    "{ tableId: string; filters?: Record<string, string> }",
  );

  await user.type(
    screen.getByRole("textbox", { name: /response shape/i }),
    "{ rows: TableRow[]; total: number }",
  );

  await user.type(
    screen.getByRole("textbox", { name: /api notes/i }),
    "Document loading, empty, success, and error states.",
  );

  await user.type(
    screen.getByRole("textbox", { name: /accessibility notes/i }),
    "Keyboard navigation support, Screen reader status announced",
  );
}

async function fillDecisionStep(user: ReturnType<typeof userEvent.setup>) {
  await user.type(
    screen.getByRole("textbox", { name: /decision title/i }),
    "Use semantic table structure",
  );

  await user.type(
    screen.getByRole("textbox", { name: /decision summary/i }),
    "The table should preserve semantic relationships between headers and cells.",
  );

  await user.type(
    screen.getByRole("textbox", { name: /decision rationale/i }),
    "Semantic table structure improves screen reader navigation and keeps reporting data understandable without custom keyboard hacks.",
  );

  await user.type(
    screen.getByRole("textbox", { name: /decision author/i }),
    "Dameion Dismuke",
  );

  await user.selectOptions(
    screen.getByRole("combobox", { name: /decision impact/i }),
    "high",
  );
}
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("<EmptyState>", () => {
  it("renders glyph, title, reading, and body", () => {
    render(
      <EmptyState
        glyph="空"
        title="Your diary is empty."
        reading="kara · empty"
        body="Nothing to see yet."
      />,
    );
    expect(screen.getByText("空")).toBeInTheDocument();
    expect(screen.getByText("Your diary is empty.")).toBeInTheDocument();
    expect(screen.getByText("kara · empty")).toBeInTheDocument();
    expect(screen.getByText("Nothing to see yet.")).toBeInTheDocument();
  });

  it("renders an action button and fires onClick", () => {
    const onClick = vi.fn();
    render(<EmptyState glyph="空" title="t" action={{ label: "+ Begin", onClick }} />);
    fireEvent.click(screen.getByRole("button", { name: "+ Begin" }));
    expect(onClick).toHaveBeenCalled();
  });

  it("renders without a button when no action prop", () => {
    render(<EmptyState glyph="空" title="t" />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("marks glyph as decorative for AT", () => {
    render(<EmptyState glyph="空" title="t" />);
    expect(screen.getByText("空")).toHaveAttribute("aria-hidden", "true");
  });
});

import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SubjectLiftDemo } from "./SubjectLiftDemo";

describe("<SubjectLiftDemo>", () => {
  it("renders a context image and a 'lift subject' button", () => {
    render(<SubjectLiftDemo src="/test.png" context="/test-bg.jpg" />);
    expect(screen.getByRole("button", { name: /lift subject/i })).toBeInTheDocument();
  });

  it("on lift, advances to shimmering state", () => {
    const { container } = render(<SubjectLiftDemo src="/test.png" context="/test-bg.jpg" />);
    fireEvent.click(screen.getByRole("button", { name: /lift subject/i }));
    expect(container.querySelector('[data-state="shimmering"]')).toBeInTheDocument();
  });
});

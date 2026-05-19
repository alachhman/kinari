import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThreeCircles } from "./ThreeCircles";

describe("<ThreeCircles>", () => {
  it("renders three buttons with correct aria-labels", () => {
    render(
      <ThreeCircles
        left={{ icon: <span>✕</span>, label: "discard", onTap: () => {} }}
        center={{ icon: <span>✓</span>, label: "confirm", onTap: () => {} }}
        right={{ icon: <span>↻</span>, label: "retry", onTap: () => {} }}
      />,
    );
    expect(screen.getByLabelText("discard")).toBeInTheDocument();
    expect(screen.getByLabelText("confirm")).toBeInTheDocument();
    expect(screen.getByLabelText("retry")).toBeInTheDocument();
  });

  it("fires the center onTap when center is clicked", () => {
    const onTap = vi.fn();
    render(
      <ThreeCircles
        left={{ icon: "L", label: "left", onTap: () => {} }}
        center={{ icon: "C", label: "center", onTap }}
        right={{ icon: "R", label: "right", onTap: () => {} }}
      />,
    );
    fireEvent.click(screen.getByLabelText("center"));
    expect(onTap).toHaveBeenCalled();
  });

  it("marks the center as the primary affirmative", () => {
    const { container } = render(
      <ThreeCircles
        left={{ icon: "L", label: "L", onTap: () => {} }}
        center={{ icon: "C", label: "C", onTap: () => {} }}
        right={{ icon: "R", label: "R", onTap: () => {} }}
      />,
    );
    const center = container.querySelector('[data-role="center"]');
    expect(center).toHaveAttribute("data-role", "center");
  });
});

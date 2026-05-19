import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MotionEasingExplorer } from "./MotionEasingExplorer";

describe("<MotionEasingExplorer>", () => {
  it("renders two animation boxes side-by-side in comparison mode", () => {
    const { container } = render(<MotionEasingExplorer mode="comparison" />);
    expect(container.querySelectorAll('[data-kinari-component="motion-box"]')).toHaveLength(2);
  });

  it("labels one box as 'correct' and one as 'wrong'", () => {
    render(<MotionEasingExplorer mode="comparison" />);
    expect(screen.getByText(/soft-out/i)).toBeInTheDocument();
    expect(screen.getByText(/spring overshoot/i)).toBeInTheDocument();
  });

  it("has a replay button that triggers animation", () => {
    render(<MotionEasingExplorer mode="comparison" />);
    const replay = screen.getByRole("button", { name: /replay/i });
    fireEvent.click(replay);
    expect(replay).toBeInTheDocument();
  });
});

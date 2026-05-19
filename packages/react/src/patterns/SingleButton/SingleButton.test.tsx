import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SingleButton } from "./SingleButton";

describe("<SingleButton>", () => {
  it("renders the provided shape inside the button", () => {
    render(<SingleButton shape={<svg data-testid="shape" />} onTap={() => {}} />);
    expect(screen.getByTestId("shape")).toBeInTheDocument();
  });

  it("fires onTap when tapped", () => {
    const onTap = vi.fn();
    render(<SingleButton shape={<span>S</span>} onTap={onTap} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onTap).toHaveBeenCalled();
  });

  it("renders title and subtitle when provided", () => {
    render(
      <SingleButton
        shape={<span>S</span>}
        onTap={() => {}}
        title="Capture"
        subtitle="add a memory"
      />,
    );
    expect(screen.getByText("Capture")).toBeInTheDocument();
    expect(screen.getByText("add a memory")).toBeInTheDocument();
  });

  it("supports satellites slot", () => {
    render(
      <SingleButton
        shape={<span>S</span>}
        onTap={() => {}}
        satellites={<span data-testid="sat">sat</span>}
      />,
    );
    expect(screen.getByTestId("sat")).toBeInTheDocument();
  });

  it("respects size prop", () => {
    const { container } = render(
      <SingleButton shape={<span>S</span>} onTap={() => {}} size={56} />,
    );
    const btn = container.querySelector('[data-kinari-component="single-button"]') as HTMLElement;
    expect(btn.style.getPropertyValue("--single-button-size")).toBe("56px");
  });
});

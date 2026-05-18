import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QuietTabs, type QuietTabsTab } from "./QuietTabs";

const tabs: QuietTabsTab[] = [
  { id: "bowl", icon: "🥣", label: "Today", href: "/today" },
  { id: "dial", icon: "⏱", label: "Goals", href: "/goals" },
  { id: "camera", icon: "📷", label: "Capture", href: "/capture" },
];

describe("<QuietTabs>", () => {
  it("renders all tabs as links with aria-labels", () => {
    render(<QuietTabs tabs={tabs} active="bowl" />);
    expect(screen.getByLabelText("Today")).toBeInTheDocument();
    expect(screen.getByLabelText("Goals")).toBeInTheDocument();
    expect(screen.getByLabelText("Capture")).toBeInTheDocument();
  });

  it("marks the active tab with aria-current='page'", () => {
    render(<QuietTabs tabs={tabs} active="dial" />);
    expect(screen.getByLabelText("Goals")).toHaveAttribute("aria-current", "page");
    expect(screen.getByLabelText("Today")).not.toHaveAttribute("aria-current");
  });

  it("does NOT render the bar when hidden=true", () => {
    const { container } = render(<QuietTabs tabs={tabs} active="bowl" hidden />);
    expect(container.querySelector('[data-kinari-component="quiet-tabs"]')).toBeNull();
  });

  it("renders icons but no visible text labels", () => {
    render(<QuietTabs tabs={tabs} active="bowl" />);
    expect(screen.getByText("🥣")).toBeInTheDocument();
    expect(screen.queryByText("Today")).toBeNull();
  });
});

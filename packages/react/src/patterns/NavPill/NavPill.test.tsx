import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NavPill, type NavPillStep } from "./NavPill";

const steps: NavPillStep[] = [
  { href: "/patterns/01-sticker-primitive", titleJa: "シール", titleEn: "sticker" },
  { href: "/patterns/02-dot-grid-canvas", titleJa: "方眼", titleEn: "canvas" },
  { href: "/patterns/03-capture-ritual", titleJa: "写し", titleEn: "capture" },
];

describe("<NavPill>", () => {
  it("renders prev/next links and current breadcrumb", () => {
    render(<NavPill steps={steps} current={1} />);
    expect(screen.getByText("方眼")).toBeInTheDocument();
    expect(screen.getByText(/canvas/)).toBeInTheDocument();
  });

  it("renders 'next' as link when not at end", () => {
    render(<NavPill steps={steps} current={0} />);
    const next = screen.getByLabelText(/next/i);
    expect(next).toHaveAttribute("href", "/patterns/02-dot-grid-canvas");
  });

  it("disables prev at start", () => {
    render(<NavPill steps={steps} current={0} />);
    const prev = screen.getByLabelText(/prev/i);
    expect(prev).toHaveAttribute("aria-disabled", "true");
  });

  it("disables next at end", () => {
    render(<NavPill steps={steps} current={2} />);
    const next = screen.getByLabelText(/next/i);
    expect(next).toHaveAttribute("aria-disabled", "true");
  });

  it("renders one dot per step, marks current dot active", () => {
    const { container } = render(<NavPill steps={steps} current={1} />);
    const dots = container.querySelectorAll('[data-kinari-component="nav-pill-dot"]');
    expect(dots).toHaveLength(3);
    expect(dots[1]).toHaveAttribute("data-active", "true");
  });

  it("fires onNavigate when prev/next clicked", () => {
    const onNavigate = vi.fn();
    render(<NavPill steps={steps} current={1} onNavigate={onNavigate} />);
    fireEvent.click(screen.getByLabelText(/next/i));
    expect(onNavigate).toHaveBeenCalledWith(2, "next");
  });

  it("keyboard ← navigates prev, → navigates next", () => {
    const onNavigate = vi.fn();
    render(<NavPill steps={steps} current={1} onNavigate={onNavigate} />);
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(onNavigate).toHaveBeenCalledWith(0, "prev");
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(onNavigate).toHaveBeenCalledWith(2, "next");
  });

  it("marks the current breadcrumb as aria-current='step'", () => {
    const steps = [
      { href: "/a", titleJa: "あ", titleEn: "a" },
      { href: "/b", titleJa: "い", titleEn: "b" },
    ];
    const { container } = render(<NavPill steps={steps} current={1} />);
    expect(container.querySelector('[aria-current="step"]')).toBeInTheDocument();
  });
});

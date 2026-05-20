import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sticker } from "./Sticker";
import { __resetWarnedOnce } from "../../utils/warnOnceForCallSite";

describe("<Sticker>", () => {
  it("renders children", () => {
    render(<Sticker>hello</Sticker>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("renders as a div by default", () => {
    const { container } = render(<Sticker>x</Sticker>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders as an anchor when as='a' and href is provided", () => {
    render(
      <Sticker as="a" href="/foo">
        link
      </Sticker>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/foo");
  });

  it("renders as a button when as='button'", () => {
    render(
      <Sticker as="button" onClick={() => {}}>
        tap
      </Sticker>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies data-kinari-component='sticker'", () => {
    const { container } = render(<Sticker>x</Sticker>);
    expect(container.firstChild).toHaveAttribute("data-kinari-component", "sticker");
  });

  it("applies a custom rotation when passed", () => {
    const { container } = render(<Sticker rotation={2.5}>x</Sticker>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue("--sticker-rotation")).toBe("2.5deg");
  });

  it("uses a stable rotation per mount when none is passed", () => {
    const { container, rerender } = render(<Sticker>x</Sticker>);
    const first = (container.firstChild as HTMLElement).style.getPropertyValue(
      "--sticker-rotation",
    );
    rerender(<Sticker>y</Sticker>);
    const second = (container.firstChild as HTMLElement).style.getPropertyValue(
      "--sticker-rotation",
    );
    expect(first).toBe(second);
  });

  it("accepts shadowAccent (the new prop name)", () => {
    const { container } = render(<Sticker shadowAccent="moegi">x</Sticker>);
    const el = container.firstChild as HTMLElement;
    // moegi rgb is approx (125, 174, 92)
    expect(el.style.boxShadow).toMatch(/rgba\(12[0-9],/);
  });

  it("accepts deprecated accent prop and warns once", () => {
    __resetWarnedOnce();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Sticker accent="moegi">x</Sticker>);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toMatch(/deprecated/i);
    warn.mockRestore();
  });

  it("prefers shadowAccent when both are passed", () => {
    __resetWarnedOnce();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(
      <Sticker shadowAccent="moegi" accent="shikon">
        x
      </Sticker>,
    );
    const el = container.firstChild as HTMLElement;
    // moegi rgb is approx (125, 174, 92); shikon would be (91, 61, 110)
    expect(el.style.boxShadow).toMatch(/rgba\(12[0-9],/);
    // No warning since shadowAccent is explicitly set
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});

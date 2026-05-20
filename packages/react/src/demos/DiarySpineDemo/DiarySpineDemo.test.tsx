import { describe, expect, it } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { DiarySpineDemo } from "./DiarySpineDemo";

const entries = [
  { id: "a", sticker: "A", detail: "A detail" },
  { id: "b", sticker: "B", detail: "B detail" },
  { id: "c", sticker: "C", detail: "C detail" },
  { id: "d", sticker: "D", detail: "D detail" },
];

describe("<DiarySpineDemo>", () => {
  it("renders four entries by default", () => {
    const { container } = render(<DiarySpineDemo entries={entries} />);
    expect(container.querySelectorAll('[data-kinari-element="entry"]')).toHaveLength(4);
  });

  it("focuses an entry when tapped", () => {
    const { container } = render(<DiarySpineDemo entries={entries} />);
    fireEvent.click(container.querySelector('[data-entry-id="b"]')!);
    expect(container.querySelector('[data-entry-id="b"][data-focus="true"]')).toBeInTheDocument();
  });

  it("returns to grid when focused entry is tapped again", () => {
    const { container } = render(<DiarySpineDemo entries={entries} />);
    const b = container.querySelector('[data-entry-id="b"]')!;
    fireEvent.click(b);
    fireEvent.click(b);
    expect(container.querySelector('[data-focus="true"]')).toBeNull();
  });

  it("reflects focus via aria-expanded on each entry", () => {
    const entries = [
      { id: "a", sticker: <span>A</span>, detail: <span>A!</span> },
      { id: "b", sticker: <span>B</span>, detail: <span>B!</span> },
    ];
    const { container } = render(<DiarySpineDemo entries={entries} />);
    const buttons = container.querySelectorAll("[aria-expanded]");
    expect(buttons.length).toBe(2);
    buttons.forEach((b) => expect(b.getAttribute("aria-expanded")).toBe("false"));
  });
});

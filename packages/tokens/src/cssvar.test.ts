import { describe, expect, it } from "vitest";
import { cssvar } from "./cssvar";

describe("cssvar", () => {
  it("returns var(--name) for valid names", () => {
    expect(cssvar("shikon")).toBe("var(--shikon)");
    expect(cssvar("kinari")).toBe("var(--kinari)");
    expect(cssvar("ease-tawami")).toBe("var(--ease-tawami)");
  });
});

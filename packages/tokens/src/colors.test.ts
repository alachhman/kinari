import { describe, expect, it } from "vitest";
import { colors, type AccentName } from "./colors";

describe("colors", () => {
  it("exposes the core palette", () => {
    expect(colors.kinari).toBe("#f7f5f0");
    expect(colors.sumi).toBe("#1a1a1a");
    expect(colors.kakiIro).toBe("#d97a3c");
    expect(colors.shiro).toBe("#ffffff");
    expect(colors.paperTone).toBe("#f4ede0");
  });

  it("exposes sumi variants for prose hierarchy", () => {
    expect(colors.sumiSoft).toBe("#2a2a2a");
    expect(colors.sumiMuted).toBe("#6b6b6b");
    expect(colors.sumiMute).toBe("#8a8a8a");
  });

  it("exposes the six curated 伝統色 accents", () => {
    expect(colors.accents.moegi).toBe("#7DAE5C");
    expect(colors.accents.kakishibu).toBe("#B5683A");
    expect(colors.accents.sakura).toBe("#E08596");
    expect(colors.accents.asagi).toBe("#4FA9AA");
    expect(colors.accents.yamabuki).toBe("#D4A12B");
    expect(colors.accents.shikon).toBe("#5B3D6E");
  });

  it("AccentName enumerates all six accents", () => {
    const names: AccentName[] = ["moegi", "kakishibu", "sakura", "asagi", "yamabuki", "shikon"];
    expect(names).toHaveLength(6);
  });
});

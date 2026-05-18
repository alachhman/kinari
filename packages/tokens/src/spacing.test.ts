import { describe, expect, it } from "vitest";
import { spacing } from "./spacing";

describe("spacing", () => {
  it("exposes page padding rhythm tokens", () => {
    expect(spacing.pageVertical).toBe("60px");
    expect(spacing.sectionGap).toBe("40px");
    expect(spacing.stickerGap).toBe("20px");
  });

  it("exposes content width tokens", () => {
    expect(spacing.contentSticker).toBe("880px");
    expect(spacing.contentReading).toBe("720px");
  });

  it("exposes persistent-chrome offsets", () => {
    expect(spacing.navPillOffset).toBe("18px");
    expect(spacing.navPillReserve).toBe("130px");
  });
});

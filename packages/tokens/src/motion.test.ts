import { describe, expect, it } from "vitest";
import { motion } from "./motion";

describe("motion", () => {
  it("exposes ease-tawami cubic-bezier", () => {
    expect(motion.easeTawami).toBe("cubic-bezier(0.22, 0.61, 0.36, 1)");
  });

  it("exposes duration bands matching framework spec", () => {
    expect(motion.duration.chipSlide).toBe(180);
    expect(motion.duration.stickerTransform).toBe(240);
    expect(motion.duration.crossFade).toBe(200);
    expect(motion.duration.drillIn).toBe(280);
    expect(motion.duration.labelLand).toBe(160);
    expect(motion.duration.glowBloom).toBe(150);
    expect(motion.duration.glowContract).toBe(150);
    expect(motion.duration.aiShimmer).toBe(700);
    expect(motion.duration.fluidQuantity).toBe(500);
  });

  it("exposes cascade delays for subject → chrome → text", () => {
    expect(motion.cascade.subjectDelay).toBe(0);
    expect(motion.cascade.chromeDelay).toBe(80);
    expect(motion.cascade.textDelay).toBe(160);
  });
});

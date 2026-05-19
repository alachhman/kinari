export const motion = {
  /** Soft-out settle, no overshoot. Damping ratio = 1.0 equivalent. */
  easeTawami: "cubic-bezier(0.22, 0.61, 0.36, 1)",

  /** Duration bands per Visual Language §08. Pick the upper end for the
   *  primary action; lower end for incidental micro-interactions. */
  duration: {
    chipSlide: 180,
    stickerTransform: 240,
    crossFade: 200,
    drillIn: 280,
    labelLand: 160,
    glowBloom: 150,
    glowContract: 150,
    aiShimmer: 700,
    fluidQuantity: 500,
  },

  /** Cascade order: subject → chrome → text. Labels are *always* last. */
  cascade: {
    subjectDelay: 0,
    chromeDelay: 80,
    textDelay: 160,
  },
} as const;

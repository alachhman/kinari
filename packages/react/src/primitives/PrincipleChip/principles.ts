export type PrincipleNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const PRINCIPLES: Record<PrincipleNumber, { slug: string; name: string }> = {
  1: { slug: "01-photos-supply-the-color-chrome-stays-quiet", name: "Photos supply the color" },
  2: { slug: "02-the-users-stuff-is-the-atomic-unit", name: "The user's stuff is the atomic unit" },
  3: { slug: "03-capture-is-a-ritual", name: "Capture is a ritual" },
  4: { slug: "04-chunky-over-skinny", name: "Chunky over skinny" },
  5: { slug: "05-forgiving-by-default", name: "Forgiving by default" },
  6: { slug: "06-time-is-the-spine", name: "Time is the spine" },
  7: { slug: "07-bilingual-is-first-class", name: "Bilingual is first-class" },
  8: { slug: "08-ai-feels-like-craft-not-magic", name: "AI feels like craft, not magic" },
  9: {
    slug: "09-the-background-is-a-workspace-not-a-frame",
    name: "The background is a workspace",
  },
  10: { slug: "10-imperfections-are-signatures", name: "Imperfections are signatures" },
};

export function principleHref(number: PrincipleNumber): string {
  return `/principles#${PRINCIPLES[number].slug}`;
}

# Pattern 01 · Sticker Primitive · シール *shīru*

**Core:** The user's stuff is rendered as a die-cut sticker — an object with weight, not a row in a list.

**Serves principles:** [#1 Photos supply the color](../principles.md#01-photos-supply-the-color-chrome-stays-quiet) · [#2 The user's stuff is the atomic unit](../principles.md#02-the-users-stuff-is-the-atomic-unit)

**Source:** Both reference apps' core UI primitive (subject-masked food photos in KiteSprint; cutout objects with labels in Om Patel). Conceptual ancestors: Polaroid Lab, Apple iOS 16+ Subject Lift, the long tradition of die-cut paper stickers.

---

## Spirit

A sticker is an *object with weight*. It is not a row in a table; it is not a card in a feed. It is a thing the user can imagine picking up — a die-cut shape on a soft surface, with a slight rotation, a thin white border, and a hand-placed drop shadow.

The sticker is the framework's primary noun. Every artifact the user creates — a photograph, a clip, a note, an entry — wears this treatment. The label, when present, sits below the cutout in chunky bold sans-serif, like text printed on a physical adhesive sticker.

The rotation matters: each sticker carries a tiny tilt (-1.2° to +1.1° varying), which is what makes it feel hand-placed rather than pinned to a grid. When hovered or focused, the sticker straightens to 0° and lifts along the upper-left light diagonal — a quiet "I see you noticing me."

---

## Across media

### Mobile

Subject-masked photo (iOS 16+ Subject Lift API, or pre-masked PNG) wrapped in a thin white border via `filter: drop-shadow()` or an SVG mask. Label in `system-ui` 700–800 weight below. Slight CSS `transform: rotate(±0.5–1.2deg)`. Tap-to-pick-up uses `UIImpactFeedbackGenerator(.light)`.

### Web

Same visual treatment via SVG `filter` or CSS `clip-path` + `filter: drop-shadow()`. Pre-masked PNGs are fine for cases without programmatic cutout. Collections render as flex/grid sticker walls; hover lightens the shadow and straightens the rotation.

### Marketing

Stickers become hero artwork. Editorial layouts place product / person / object cutouts on kinari pages. Same shape rules; larger scale.

---

## Examples in the wild

- **KiteSprint canvas** — food stickers (apple, salad, toast, drink) on a window-night background; each rotated slightly.
- **Om Patel diary** — "Donut", "Forest", "Iced tea", "Roller skates" as labeled cutouts with chunky bold sans labels.
- **Apple iOS Subject Lift** — system-level subject masking; the OS primitive Kinari builds on.

---

## Anti-patterns

- **Raw rectangular crops with no border.** Forbidden by [Visual Language → Photo treatment](../visual-language.md#04--photo-treatment--写真処理-shashin-shori).
- **Black drop shadows** under stickers. The shadow must inherit a tint from the sticker (warm umber for white stickers; the element's hue for colored stickers). See [Visual Language → Shadows](../visual-language.md#03--shadows--影-kage).
- **Centered shadows** (`offset-x: 0`). Light comes from the upper-left.
- **Rigid grid alignment.** A wall of stickers should have varying slight rotations — never all at the same angle, never all at exactly 0°.

---

## Cross-references

- [Pattern #07 Numeral Display](07-numeral-display.md) — numbers that sit *on* stickers (e.g. "94 kcal" beneath a food sticker)
- [Pattern #04 Diary Spine](04-diary-spine.md) — sticker collections organized chronologically
- [Visual Language → Shadows](../visual-language.md#03--shadows--影-kage) — shadow tinting and light direction
- [Visual Language → Photo treatment](../visual-language.md#04--photo-treatment--写真処理-shashin-shori) — polaroid variant for un-maskable subjects

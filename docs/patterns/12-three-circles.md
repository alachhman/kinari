# Pattern 12 · Three Circles · 三つの丸 *mittsu-no-maru*

**Core:** Decision-moment chrome. Three equal-sized round buttons in a horizontal row for confirm / retry / discard.

**Serves principles:** [#3 Capture is a ritual](../principles.md#03-capture-is-a-ritual) · [#5 Forgiving by default](../principles.md#05-forgiving-by-default) · [#8 AI feels like craft, not magic](../principles.md#08-ai-feels-like-craft-not-magic)

**Source:** The strongest cross-reference geometry in both apps. Appears in: KiteSprint apple capture confirmation · Om Patel donut / sandwich / cup cutout reveals · KiteSprint salad detail action triad (trash / dismiss / edit). See [`docs/context/nav-analysis-from-references.md`](../context/nav-analysis-from-references.md).

---

## Spirit

Three round buttons in a row, bottom-anchored, replacing all other chrome during the decision. **Center is bigger** (60pt), the affirmative, filled with the project accent. **Flanks are paper-white** (48pt) with sumi-ink glyphs — never accent-colored.

This means the accent color reads as "the affirmative path" everywhere in the app. Whatever the verbs are — retry / confirm / discard, trash / close / edit, cancel / save / share — the geometry stays the same. The verbs adapt; the *decision shape* doesn't.

The pattern replaces tab bar / single button entirely during the decision. It **never collapses to a dropdown**, **never appears with a fourth option** (that would be a different pattern). Three is the cap because three is the cognitive limit for a ternary decision at a tap.

---

## Across media

### Mobile

Three buttons in a row, bottom-anchored. Center 60pt, flanks 48pt. Gap 16–24pt between buttons. Glyph stroke 1.5–3px. Haptic `.success` on center tap.

### Web

Centered triplet of 56–72pt circles. CSS:

```css
.three-circle.center {
  width: 60px; height: 60px;
  background: var(--accent);
  color: #ffffff;
  box-shadow: 4px 5px 0 rgba(/* accent */ 0.18), 8px 14px 24px rgba(/* accent */ 0.40);
}
.three-circle.flank {
  width: 48px; height: 48px;
  background: #ffffff;
  color: #1a1a1a;
  box-shadow: 3px 4px 0 rgba(72,55,32,0.06), 6px 10px 18px rgba(72,55,32,0.12);
}
```

### Marketing

Rare on marketing surfaces — the pattern is in-product. Possible exception: an interactive demo on a marketing page that walks through a decision flow.

---

## Examples in the wild

- **KiteSprint apple confirmation** — three circles at bottom: ✕ (left), large green ✓ (center), ↻ (right). Same geometry on every capture-confirm flow.
- **Om Patel donut cutout** — crop / ✓ / ✕ triad with purple ✓ in the center
- **Om Patel cup word reveal** — ↻ retry / ✓ confirm / ✕ discard with the same geometry
- **KiteSprint salad detail** — trash / ✕ close / pencil edit; same three-circle row, different verbs

---

## Anti-patterns

- **Two buttons.** That's not Three Circles. Confirm/cancel binary decisions use a different geometry (chip pair, or single button with implicit cancel-via-tap-elsewhere).
- **Four+ buttons.** That's an action sheet, not Three Circles. The pattern caps at three.
- **Collapsing to a dropdown / menu.** The three circles are the decision; never hide them behind a menu.
- **Accent-coloring the flanks.** Only the center is accented. The flanks are paper-white — this is how the accent reads as "affirmative" everywhere in the app.
- **Equal sizes for all three.** The center is bigger. This is intentional — it's not a row of equal options, it's a *recommended path with two alternatives*.

---

## Cross-references

- [Pattern #03 Capture Ritual](03-capture-ritual.md) — the most common parent; Three Circles is what often follows a capture
- [Pattern #05 Subject Lift](05-subject-lift.md) — the AI cutout almost always ends in a Three Circles decision
- [Pattern #10 Quiet Tabs](10-quiet-tabs.md) — the tab bar that Three Circles temporarily replaces during a decision
- [Pattern #11 Single Button](11-single-button.md) — the single button Three Circles temporarily replaces in one-verb products
- [`docs/context/nav-analysis-from-references.md`](../context/nav-analysis-from-references.md) — source analysis

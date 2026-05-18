# Pattern 02 · Dot-Grid Canvas · 方眼 *hōgan*

**Core:** Backgrounds carry quiet structure — never empty, never decorated.

**Serves principles:** [#1 Photos supply the color; chrome stays quiet](../principles.md#01-photos-supply-the-color-chrome-stays-quiet) · [#9 The background is a workspace, not a frame](../principles.md#09-the-background-is-a-workspace-not-a-frame)

**Source:** The Hobonichi Techo planner page — a 25+ year-old physical artifact. Both reference apps use the dot grid wholesale. Bullet journal lineage descended from Ryder Carroll's 2013 system.

---

## Spirit

The Hobonichi page on a screen. 12pt grid, ~12% sumi-ink opacity dots on kinari paper. Provides invisible structure for placing artifacts without instructing the user where they go.

A blank white page reads as *empty*. A printed grid reads as *prescriptive*. A dot grid threads the needle: it offers structure when the eye seeks it, disappears when the eye doesn't. The page becomes an invitation, not an instruction.

Every primary surface in a Kinari product is a dot-grid canvas. Settings panels are not. Modals are not. Marketing pages are. The rule of thumb: *if this is a place where the user works or where their stuff lives, it's a canvas*.

---

## Across media

### Mobile

SwiftUI `Canvas` with a stride-based dot pattern, or a tiled image. Used for capture / composition / detail / canvas / diary surfaces. Not for system surfaces (settings, modals, alerts).

### Web

CSS one-liner on the root or page-level element:

```css
background: #f7f5f0;
background-image: radial-gradient(circle, rgba(26,26,26,0.13) 1px, transparent 1px);
background-size: 12px 12px;
background-position: 0 0;
```

Long-form reading surfaces (settings, documentation that's mostly text) switch to the **paper tone** variant (`#f4ede0`, no dots) — see [Visual Language → Backgrounds](../visual-language.md#05--backgrounds--地紙-jigami).

### Marketing

Default for every framework-aligned marketing page. Hero areas, feature breakdowns, pricing — all share the dot grid. The grid is the framework's visual signature on the open web.

---

## Examples in the wild

- **KiteSprint** — every capture and composition surface
- **Om Patel** — diary view, cutout reveal screens
- **Hobonichi Techo** — the analog ancestor; their official product photography for the 2026 planner shows the dot grid in dozens of variants

---

## Anti-patterns

- **Pure white backgrounds.** Read as empty / sterile. Always use kinari paper.
- **Heavier grids** (lined, square-grid, or dot grids at >20% opacity). Read as instructional rather than invitational.
- **Decorative backgrounds** (gradients, patterns, illustrations). The background must be quiet; the user's content is the color.
- **Marketing-page background images.** The dot grid is the marketing-page signature.

---

## Cross-references

- [Visual Language → Backgrounds](../visual-language.md#05--backgrounds--地紙-jigami) — paper tone variant for reading-heavy surfaces
- [Pattern #01 Sticker Primitive](01-sticker-primitive.md) — what lives *on* the canvas
- [Pattern #04 Diary Spine](04-diary-spine.md) — the dot-grid canvas as a backdrop for chronological entries

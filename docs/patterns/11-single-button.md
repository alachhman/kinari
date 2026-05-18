# Pattern 11 · Single Button · 一つボタン *hitotsu-botan*

**Core:** Product navigation for *one-verb* products. A single branded shape replaces persistent navigation entirely.

**Serves principles:** [#2 The user's stuff is the atomic unit](../principles.md#02-the-users-stuff-is-the-atomic-unit) · [#3 Capture is a ritual](../principles.md#03-capture-is-a-ritual) · [#10 Imperfections are signatures](../principles.md#10-imperfections-are-signatures)

**Source:** Om Patel's multicolor segmented shutter ring — see [`docs/context/nav-analysis-from-references.md`](../context/nav-analysis-from-references.md). Conceptual ancestor: any product whose entire UI is built around one dominant verb (Instagram's shutter, Snap's camera, AnyList's add button).

---

## Spirit

One branded shape anchors the app's bottom-center. It is the app's **logo-in-place** — a recognizable geometry that appears on every surface (camera, diary, edit). The shape never changes. The *meaning* does.

In capture mode, the button takes a photo. In diary mode, the same button goes back to capture. In edit mode, the same button saves. The shape stays invariant; the surrounding context — title, subtitle, satellite circles — tells the user what verb is currently bound to the shape.

This pattern is for products with **one dominant action**. Camera-first apps. Compose-first apps. Ask-first apps. The product *is* a single verb made repeatable, and the navigation reflects that.

Small satellite circles may flank the primary on certain surfaces (recent stickers next to a shutter on the diary, a cancel circle alongside a save). Satellites stay small and quiet — the primary is always the center of attention.

---

## Across media

### Mobile

Fixed bottom-center button at 56–72pt diameter — about half the frame width's worth of presence. The branded shape is custom-drawn (SwiftUI Shape or SVG); it is **not** a system button styled to look custom. The shape is the brand.

### Web

Fixed bottom-center FAB on mobile breakpoints. On desktop, the same shape often promotes to a hero CTA at eye-line, with the surrounding context (title, subtitle) reading above it.

```css
.single-button {
  position: fixed;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #ffffff;
  /* branded shape rendered inside */
}
```

### Marketing

The branded shape appears in marketing as the product's mark — landing-page hero, app icon, social avatar. Consistency between the in-product button and the marketing mark is part of the pattern.

---

## Examples in the wild

- **Om Patel** — multicolor pastel segmented shutter ring; same shape across camera, diary, edit; satellites of recent-sticker thumbnails on diary mode
- **Instagram's shutter** — adjacent precedent
- **AnyList's "+ add"** — adjacent precedent in a non-camera context

---

## Anti-patterns

- **Changing the button's shape per context.** The shape is invariant. Only the meaning changes.
- **Adding a tab bar.** If your product has a Single Button and also a Quiet Tabs row, you don't have a one-verb product — pick one pattern.
- **Generic system-style FAB** (Material's elevated round button). The button is the *brand* — it should not look like any other app's add button.
- **Animating the shape itself** on context change. The surrounding text changes; the shape stays.

---

## Cross-references

- [Pattern #10 Quiet Tabs](10-quiet-tabs.md) — for constellation products instead
- [Pattern #03 Capture Ritual](03-capture-ritual.md) — the most common companion: a Single-Button app's primary verb is usually a capture
- [Pattern #08 Soft Spring](08-soft-spring.md) — the tap-spent fade applies to the button when it commits an action
- [`docs/context/nav-analysis-from-references.md`](../context/nav-analysis-from-references.md) — source analysis

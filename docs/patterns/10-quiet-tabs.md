# Pattern 10 · Quiet Tabs · 静かなタブ *shizukana tabu*

**Core:** Product navigation for *constellation* products — apps with co-equal top-level sections. Floating icon-only tabs with a sliding accent indicator.

**Serves principles:** [#1 Photos supply the color; chrome stays quiet](../principles.md#01-photos-supply-the-color-chrome-stays-quiet) · [#4 Chunky over skinny](../principles.md#04-chunky-over-skinny) · [#7 Bilingual is first-class](../principles.md#07-bilingual-is-first-class)

**Source:** KiteSprint's 4-tab bottom bar (bowl / dial / trash / camera) with a filled sage-pill active state — see [`docs/context/nav-analysis-from-references.md`](../context/nav-analysis-from-references.md).

---

## Spirit

Floating bottom row of 3–5 icon-only destinations. Active slot is a filled stadium pill in the project accent; the pill **slides between slots** in 120–180ms, soft-out easing (see [Pattern #8 Soft Spring](08-soft-spring.md)). Floats ≥18px above the surface edge; the dot-grid canvas scrolls beneath.

The pill is the only structural "you are here" signal — no header chrome, no breadcrumbs, no underlines. **The accent color is the structure.** This is the framework's strongest stance on chrome staying quiet.

The bar hides wholesale on tool / detail / capture surfaces. No fade-out animation; it's a **page-replace** (see [Pattern #8](08-soft-spring.md)) — the bar is part of the page being replaced.

---

## Across media

### Mobile

Native tab bar implementation customized with the visual language. iOS: a custom view in place of `UITabBar` (or `TabView` with the appropriate styling) — the framework can't quite use the system tab bar because the system tab bar lacks the sliding-pill active state and the floating-pill geometry.

### Web

Floating bottom dock. CSS:

```css
.quiet-tabs {
  position: fixed;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  background: #ffffff;
  padding: 4px;
  border-radius: 999px;
  box-shadow: 3px 3px 0 rgba(72,55,32,0.07), 8px 16px 24px rgba(72,55,32,0.14);
}
.quiet-tabs-pill {
  /* the sliding accent pill — see kinari-nav-demo.html for the full impl */
}
```

Above 720px width, optionally mirror the dock as a **left rail** with the same active-pill pattern.

### Marketing

Rare on marketing surfaces — Quiet Tabs are a product pattern. If a marketing site uses them (e.g. for a multi-feature landing), follow product rules.

---

## Examples in the wild

- **KiteSprint** — 4 icon-only tabs (bowl / dial / trash / camera) with sage pill sliding between slots; pill hides wholesale on camera and detail flows
- **iOS Tab Bar** — system-level adjacent precedent; Kinari's version adds the sliding pill + floating-above-paper geometry

---

## Anti-patterns

- **Labels on tabs.** Always icons-only. Labels would require single-language text (forbidden by [Principle #7](../principles.md#07-bilingual-is-first-class)) or bilingual lockups (which don't fit in a tab slot).
- **More than 5 tabs.** If you need more than 5 top-level destinations, you have either a hierarchical product (use a left rail) or a constellation that needs splitting.
- **Animated transitions of the bar itself** on page change. The bar **page-replaces**; it doesn't slide or fade.
- **Bottom border or shadow on the page above the bar.** The bar floats; the surface scrolls beneath. No separator.

---

## Cross-references

- [Pattern #11 Single Button](11-single-button.md) — for one-verb products instead
- [Pattern #12 Three Circles](12-three-circles.md) — for decision moments that *replace* the tab bar temporarily
- [Pattern #08 Soft Spring](08-soft-spring.md) — sliding-pill timing and page-replace policy
- [`docs/context/nav-analysis-from-references.md`](../context/nav-analysis-from-references.md) — source analysis

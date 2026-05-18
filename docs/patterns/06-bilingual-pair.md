# Pattern 06 · Bilingual Pair · 並記 *heiki*

**Core:** Two languages, one designed typographic unit. Labels are designed, not translated.

**Serves principles:** [#7 Bilingual is first-class](../principles.md#07-bilingual-is-first-class)

**Source:** Japanese product-packaging convention (MUJI, Tsutaya). Om Patel's `Cup / 컵` stickers. KiteSprint's `细线 clean` / `虚线 rhythm` / `圆点 soft` / `双层 premium` chip selectors.

---

## Spirit

Two languages lock up as a single designed unit — English on top, secondary language below (or vice versa, locale-dependent), with established weight and spacing relationships. Treated like brand wordmarks on Japanese product packaging — **never as "string and its tooltip."**

The bilingual pair is what makes Kinari respect more than one language as a visual primitive. Where i18n would swap a string, the framework swaps the *primary position* of the pair while preserving the typographic relationship. The reader who recognizes both sees one elegant lockup; the reader who knows only one still gets the structure.

This is also why Kinari section headers (`原則 · gensoku · principles`) wear this treatment by default — even in the framework's own docs.

---

## Across media

### Mobile

Sticker labels, button text, hero copy can all wear the pair. Locale switches change which language is primary; the visual relationship survives. Use a flex column with the larger language above and the smaller below; spacing handled by `gap` rather than margins so the typographic lockup is preserved across font sizes.

### Web

Same. CSS handles the typography lockup; localization swaps content but never breaks the visual relationship. A `.pair` component class can carry this everywhere:

```html
<span class="pair">
  <span class="pair-jp">原則</span>
  <span class="pair-en">gensoku · principles</span>
</span>
```

### Marketing

Brand wordmarks, pricing, calls-to-action — all support bilingual treatment when the audience earns it. Section headers and navigation labels often wear the pair on framework-aligned marketing.

---

## Examples in the wild

- **Om Patel sticker labels** — `Cup` (large bold sans, English) with `컵` (smaller, Korean) below, sometimes with a speaker icon for pronunciation
- **KiteSprint chip selectors** — `细线 clean`, `虚线 rhythm` — Chinese + English glossing as one chip
- **MUJI product packaging** — the canonical industrial precedent; every product wears the bilingual pair on its label
- **Tsutaya cassette / album covers** — pre-internet Japanese precedent for the lockup

---

## Anti-patterns

- **Translation tooltips** ("hover for Japanese") — strips the typography of intent
- **Single-language nav labels.** Kinari nav uses icons-only (see [Pattern #10 Quiet Tabs](10-quiet-tabs.md)) precisely to avoid single-language chrome.
- **Misaligned weight relationships.** The two languages should have a fixed *visual weight ratio*; one isn't subordinate to the other in any sense beyond locale primacy.

---

## Cross-references

- [Pattern #10 Quiet Tabs](10-quiet-tabs.md) — chooses icons-only specifically to dodge the single-language-label problem
- [Visual Language → Typography](../visual-language.md#01--typography--書体-shotai) — the type roles that support the pair

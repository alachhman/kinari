# Pattern 07 · Numeral Display · 数字 *sūji*

**Core:** Numbers that matter get the warm signal and the chunky display treatment — celebrated, not just shown.

**Serves principles:** [#2 The user's stuff is the atomic unit](../principles.md#02-the-users-stuff-is-the-atomic-unit) · [#4 Chunky over skinny](../principles.md#04-chunky-over-skinny)

**Source:** KiteSprint's `94 kcal` / `584 kcal` / `1,399 kcal` callouts · Om Patel's `1 Words` / `8 Words` / `34 Words` diary subheads.

---

## Spirit

Heavy-weight sans-serif (800–900), **italic**, tight letter-spacing, in 柿色 *kaki-iro* warm signal (`#d97a3c`). The unit (kcal, words, MB, $, mi) hangs smaller and lighter beside or below in the same color. Reserved for celebratory numbers — counts, scores, totals — **never for every metric**.

The italic is deliberate: it gives the number a forward-leaning quality, like a finished signature or a confidently completed total. The kaki-iro warm makes it the single color signal across an otherwise quiet UI — your eye finds the number first, then the surrounding context.

Numerals always italicize when stylized. This includes serif numerals in display contexts (principle numbers, pattern numbers on stickers): Georgia italic 600.

---

## Across media

### Mobile

`system-ui` heavy italic in `#d97a3c` for sans-serif numerals; Georgia italic 600 for serif numerals (principle / pattern numbering). Use `font-variant-numeric: tabular-nums` for any numeric that updates in place (counters, scores) so the digits don't jitter.

### Web

CSS:

```css
.numeric-display {
  font-weight: 800;
  font-style: italic;
  color: #d97a3c;
  letter-spacing: -0.03em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
```

### Marketing

Hero stats on landing pages. Pricing cards. Anywhere a number is the point. Sparingly — three or four numbers per page maximum, or the warm signal stops being a signal.

---

## Examples in the wild

- **KiteSprint** — `94 kcal` on the apple sticker · `584 kcal` on the salad detail · `1,399 kcal` in the daily summary
- **Om Patel** — `1 Words`, `8 Words`, `34 Words` subheaders (note the intentional `Words` plural — see [Principle #10](../principles.md#10-imperfections-are-signatures))
- **Linear / Things 3** — adjacent precedents in heavy-italic display numerals

---

## Anti-patterns

- **Roman (non-italic) display numerals.** Always italicize.
- **Non-kaki-iro stylized numbers.** The warm signal is reserved for this pattern; using another color undermines it.
- **Stylizing every number.** If you stylize the page count, the timestamp, the share count, the like count — none of them are signals anymore. Pick the numbers that *celebrate something*; let the rest sit in body type.

---

## Cross-references

- [Visual Language → Typography](../visual-language.md#01--typography--書体-shotai) — the four type roles; numeric display is the fourth
- [Visual Language → Color](../visual-language.md#02--color--配色-haishoku) — kaki-iro lives in the core palette
- [Pattern #01 Sticker Primitive](01-sticker-primitive.md) — numerals often sit on or beside stickers

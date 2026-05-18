# Pattern 04 · Diary Spine · 日記 *nikki*

**Core:** Content is organized chronologically by default. Time is the load-bearing axis.

**Serves principles:** [#2 The user's stuff is the atomic unit](../principles.md#02-the-users-stuff-is-the-atomic-unit) · [#6 Time is the spine](../principles.md#06-time-is-the-spine)

**Source:** Hobonichi Techo · Day One · the broader diary tradition · KiteSprint's daily food log · Om Patel's vocab diary.

---

## Spirit

Serif date headers (Georgia / Newsreader at 22–32pt) with a muted item-count subhead ("1 Words"). Items below as sticker rows or sticker walls, reverse chronological. Categories and tags are secondary; time is load-bearing.

Most products organize content by category, project, or tag. Kinari defaults to chronology because *users' lives accumulate*. The diary spine accepts that as the natural shape and makes the accumulation itself the navigable structure.

The dates are not metadata; they are the **navigation**. New items glow briefly on entry. Old items dim with time. The user can scroll back into yesterday, last week, last year — and the page reads like a journal, not a database.

---

## Across media

### Mobile

SwiftUI `Section` with a serif header (`.font(.system(.title, design: .serif))`) + a muted count subhead. Each row uses the [Sticker Primitive](01-sticker-primitive.md). Pull-to-refresh adds a new sticker to the top with a brief glow.

### Web

Long-scroll page with date anchors. Optional sticky month/day strip on the side for jump navigation when entries are dense. Pagination by month if entries number in the thousands.

### Marketing

Blogs, changelogs, news, archives all wear this spine. Each post is a sticker + date + body. Yearly archive is a sticker wall organized by month — the framework's signature take on the "archive page."

---

## Examples in the wild

- **KiteSprint daily food log** — `今天 17:25` headers with calorie-numeral stickers beneath
- **Om Patel vocab diary** — `Feb 23 — 1 Words`, `Feb 21 — 8 Words` (ungrammatical "Words" is intentional — see [Principle #10](../principles.md#10-imperfections-are-signatures))
- **Hobonichi Techo** — the analog ancestor; each daily page is its own diary spine
- **Day One** — well-known software descendant

---

## Anti-patterns

- **Category-first navigation.** Time is the default; categories are filters layered on top.
- **Hidden timestamps.** Every artifact in the diary shows when it landed.
- **Staggered row entrance animations on scroll.** Items appear as they're scrolled to — no fanfare. See [Visual Language → Motion](../visual-language.md#08--motion--撓み-tawami).
- **Pagination buttons.** The diary is long-scroll. Jump navigation is via the date anchor strip, not a "page 2 of 10."

---

## Cross-references

- [Pattern #01 Sticker Primitive](01-sticker-primitive.md) — the unit of each diary entry
- [Pattern #07 Numeral Display](07-numeral-display.md) — kcal / word-count / score numerals on diary entries
- [Pattern #8 Soft Spring](08-soft-spring.md) — focus drill-in (scale + blur) when tapping a diary entry to expand
- [Visual Language → Layout](../visual-language.md#07--layout--配置-haichi) — content max-width, padding rhythm

# Pattern Library · 手本 *tehon*

> Twelve seed patterns. Each is a UI *metaphor*, described in spirit, translatable across mobile / web / marketing.

A pattern is a **named UI metaphor** — not a component, not a snippet. It survives translation between media because it's described abstractly: what it *feels* like, what *job* it does, what *principles* it serves. Concrete implementations live in `examples/` once real projects demonstrate them.

The library is intended to grow. New patterns get added when a project earns one — observed in the wild, named with a Japanese romaji, mapped to principles. Existing patterns get refined as real implementations surface edge cases.

---

## The pattern doc template

Every pattern file follows this structure. When adding a new pattern, copy this template and fill each section.

```markdown
# Pattern NN · [English Name] · [Kanji] *[romaji]*

**Core:** One sentence describing the pattern.

**Serves principles:** [list with numbers and links to principles.md]

**Source:** Where this comes from — reference apps, design tradition, both.

---

## Spirit

Abstract description (2-3 paragraphs). What the pattern feels like in use, what
job it does, what the underlying metaphor is. This is the longest section and
the most important — it's what makes the pattern survive translation.

---

## Across media

### Mobile (iOS / Android native)

How it manifests on native mobile. Specific APIs / weights / sizes if helpful.

### Web

How it translates to web. CSS hints if helpful.

### Marketing

How it shows up on marketing surfaces (landing pages, content sites).

---

## Examples in the wild

Concrete references: which app, which screen, which transition. Both the
project's own reference materials (KiteSprint, Om Patel) and external examples
when applicable.

---

## Anti-patterns

Specific motions / shapes / behaviors this pattern is *not*. Helps the reader
recognize misuse. Optional but encouraged.

---

## Cross-references

- Related patterns
- Related visual-language sections
- Spec section if helpful
```

---

## The twelve seed patterns

| # | Name | Romaji | Kanji | Serves | One-line |
|---|---|---|---|---|---|
| 01 | [Sticker Primitive](01-sticker-primitive.md) | *shīru* | シール | 1, 2 | The user's stuff as a die-cut sticker — object with weight. |
| 02 | [Dot-Grid Canvas](02-dot-grid-canvas.md) | *hōgan* | 方眼 | 1, 9 | Backgrounds carry quiet structure — never empty. |
| 03 | [Capture Ritual](03-capture-ritual.md) | *utsushi* | 写し | 3, 5 | The moment of authorship is framed with ceremony. |
| 04 | [Diary Spine](04-diary-spine.md) | *nikki* | 日記 | 2, 6 | Time is the load-bearing organizational axis. |
| 05 | [Subject Lift](05-subject-lift.md) | *kirinuki* | 切り抜き | 3, 8 | AI segments subjects and presents them as craft. |
| 06 | [Bilingual Pair](06-bilingual-pair.md) | *heiki* | 並記 | 7 | Two languages, one designed typographic unit. |
| 07 | [Numeral Display](07-numeral-display.md) | *sūji* | 数字 | 2, 4 | Numbers that matter get the warm signal and the chunk. |
| 08 | [Soft Spring](08-soft-spring.md) | *tawami* | 撓み | 4, 5 | Things settle like a branch under snow — no overshoot. |
| 09 | [Navigation Pill](09-navigation-pill.md) | *annai* | 案内 | 4, 6 | Doc / tour browsing nav. Linear, prev-next, breadcrumb + dot strip. |
| 10 | [Quiet Tabs](10-quiet-tabs.md) | *shizukana tabu* | 静かなタブ | 1, 4, 7 | Product nav for constellation apps. Floating icon-only pills with a sliding accent indicator. |
| 11 | [Single Button](11-single-button.md) | *hitotsu-botan* | 一つボタン | 2, 3, 10 | Product nav for one-verb apps. A single branded shape replaces persistent navigation. |
| 12 | [Three Circles](12-three-circles.md) | *mittsu-no-maru* | 三つの丸 | 3, 5, 8 | Decision-moment chrome. Three round buttons for confirm / retry / discard. |

---

## Library growth

Patterns visible in references but not yet seeded — candidates for v0.2:

- **Adjust Affordance** — the "different from expected? tap to adjust" recovery pattern that softens AI failure modes (visible in Om Patel's cup-reveal flow). Partially subsumed by [Three Circles](12-three-circles.md) but the *language* of the affordance is its own thing.
- **Polaroid Variant** — the white-bordered photo treatment for un-maskable subjects (landscapes, scenes). Currently a sub-rule of [Sticker Primitive](01-sticker-primitive.md); may earn its own doc when a project leans on it.
- **Empty State** — what [Dot-Grid Canvas](02-dot-grid-canvas.md) does before the user has added anything. Currently implicit; deserves naming when an example project surfaces it.

Each gets named, sketched, and added when a real project demands it.

# Reference Context · 参考資料 *sankō shiryō*

> Source materials for the Kinari framework — not the framework itself.

**The framework lives at the repository root.** This directory holds the *reference materials* the framework was developed from: app captures, motion analyses, navigation analyses.

- **[README](../../README.md)** — what Kinari is and how to apply it
- **[Principles](../principles.md)** — the 10 commitments
- **[Visual Language](../visual-language.md)** — typography, color, shadows, photo, backgrounds, iconography, layout, motion
- **[Lineage](../lineage.md)** — honest attribution to the design traditions Kinari consolidates
- **[Pattern Library](../patterns/_index.md)** — 12 named UI metaphors

---

## What's in this directory

Purpose: source material for an in-progress design philosophy/framework for the user's future projects. Started 2026-05-18.

## Captured references

| Source | Type | One-line hook |
|---|---|---|
| [KiteSprint — 今日Plog food/wellness diary app](KiteSprint-2055871758352441792.md) | Twitter video, 15s, silent | Chinese food-logging app that turns meals into draggable, captionable photo stickers on a Live Photo canvas |
| [KiteSprint — onboarding flow](KiteSprint-2056743658217763246.md) | Twitter video, 16s, silent | 6-step first-run flow: AI cutout demo · Live Photo "Plog" · gender · birth year · height · weight |
| [Om Patel — dad-built kids' language-learning app](om_patel5-2055487997567553698.md) | Twitter video, 26s, silent | Point camera at any object → app cuts it out and gives you a labeled, pronounceable sticker in your target language |

## Cross-cutting design DNA (what these two apps share)

Both apps were chosen as aesthetic anchors for a design framework. Their visual languages are remarkably aligned despite serving completely different domains (food/wellness vs. language learning). The intersection is where the framework should live.

### 1. The photographic sticker is the atomic UI primitive

Both apps treat **subject-masked photos** — the user's actual photograph of a real object, with the background removed — as the fundamental "noun" of the interface. Stickers are draggable, captionable, collectible, datable. They are *the data*, not a decoration around the data. This is the central design move both apps make.

### 2. Dot-grid scrapbook background

Both apps use a subtle dotted grid as the universal canvas — evoking bullet journals, planners, sketchbooks. It signals "your private workspace," provides quiet structure, and creates visual continuity from camera-capture → diary → detail view.

### 3. Editorial typography over chromatic decoration

Big confident serif dates (`Feb 23`, `5월 07`, `今日Plog 4`); chunky bold sans-serif labels; bilingual pairs treated as a single typographic unit (`Cup / 컵`, `细线 clean`). Color comes from the photographs, not the type or chrome.

### 4. One disciplined accent color, plus the photos

The chrome is overwhelmingly off-white + near-black. Each app has *one* signature accent: **sage green** (KiteSprint) or **soft purple ✓ + multicolor pastel shutter ring** (Om Patel). Photographs supply everything else. Think *museum white-room with a single colored door*.

### 5. Capture is a ritual, not a transaction

Both apps make the act of photographing meaningful: thin white framing brackets, a celebratory yellow glow when the sticker appears, oversized round confirmation buttons, graceful "this isn't right — adjust" affordances. The capture moment is treated as the core delight loop, not a chore.

### 6. AR / computer vision dressed as craft

Subject masking and object recognition are presented as friendly framing exercises with ring outlines and chunky checkmarks, not as technical capabilities. The user never sees a "model" or a "confidence score." They see a sticker.

### 7. Time-stamped diary as the organizational metaphor

Both apps' primary list view is a journal: date headers (`Feb 23 — 1 Words`, `今天 17:25`) with sticker entries beneath. The "database" is presented as a diary. Items in a single day flow naturally as a vertical stack.

### 8. Chunky, generous, friendly chrome

Pill chips, fat rounded touch targets, white CTAs with thick outlines, oversized circular action buttons. Controls feel almost physical — like stickers themselves. Density is low; whitespace is generous.

### 9. Bilingual / multilingual respect

Both apps treat label-pairs across languages as visual units, not as i18n strings to be hidden. KiteSprint shows `细线 clean` as a single chip; Om's app stacks `Cup / 컵` as a single sticker caption. Multi-language is part of the aesthetic.

### 10. Honest, human edge cases

Om's app shows `1 Words` instead of `1 Word`. KiteSprint shows handwritten timestamps over photographs. Both feel hand-built, not machine-polished. The small imperfections signal a human author.

## Where the framework probably lives

These observations are descriptive of *those two apps*. The framework you build from this can be:

- **Aesthetic-first** (a visual language: typography, color, photo treatments, surface materials)
- **Pattern-first** (a library of UI metaphors: sticker-as-primitive, dot-grid canvas, capture-as-ritual, diary-as-database)
- **Principle-first** (a list of design commitments: e.g. "photos supply color, chrome stays quiet"; "capture is ceremonial"; "AI is dressed as craft")

Most successful frameworks are layered: principles at the top, patterns in the middle, components/tokens at the bottom. Recommend brainstorming the principles layer next.

## Working-directory notes

- Source media + keyframes are in `/tmp/twitter-ingest-<tweet-id>/` and will be cleaned up by macOS. Re-run `bash <skill>/scripts/ingest.sh <url> docs/context` to regenerate if needed.
- This directory is the durable source of truth for the design framework's reference material.

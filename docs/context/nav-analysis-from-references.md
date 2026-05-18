# Kinari Navigation Study — patterns from KiteSprint & Om Patel

## 1. Persistent chrome

**KiteSprint** carries a true bottom **tab bar** on every non-camera surface:
- **4 icon-only destinations**: bowl, dial, trash, camera. Flat, chunky.
- Active state: filled **sage stadium pill** wraps the active icon (white glyph); inactives at ~60% opacity. Pill slides between slots.
- Floats ≥18–24px above the home indicator; paper bleeds beneath. No tray, no border.

**Om Patel** has **no persistent tab bar**. Diary and camera share only the **multicolor segmented shutter ring** — a single floating CTA, bottom-center, with context-dependent meaning (capture vs. go-to-capture). Small recent-sticker thumbnails flank it on the diary.

So: KiteSprint is **multi-destination quiet chrome**; Om Patel is **single-CTA chrome** — a one-button app pretending it has none.

## 2. Contextual chrome

- **Confirm/Adjust circle triad** (KiteSprint apple; Om Patel sandwich + cup): three bottom-anchored round buttons — *retry / confirm / discard*. Confirm is centerpiece, slightly larger, accent-colored; flanks paper-gray.
- **Editorial action triad** (KiteSprint salad detail): *trash / dismiss-✕ / pencil* — same triad geometry, different verbs.
- **Action pill row** (KiteSprint canvas `5s⌄ ⟳ 背景 涂鸦 🔇`; doodle `✕ trash 粉笔⌄ undo 完成`). Pills clustered in a low horizontal row that *replaces* the tab bar in tool modes.

Top-corner controls are rare — only KiteSprint's `保存至相册` pill + avatar, and Om Patel's top-left back chevron.

## 3. Hide / reveal

The tab bar is **dropped wholesale** on camera, AI cutout-confirm, detail/hero view, and doodle mode. It returns when the surface becomes "list-like" again. No transform-in-place — page-replace.

## 4. Section relationships

KiteSprint is **constellation** — four co-equal destinations, lateral jumps. Inside a section, drilling list→detail uses depth-of-field zoom (hero 1.4×, siblings blur), and exit is a centered ✕ — never a back chevron.

Om Patel is **near-linear**: capture → confirm → diary, with a top-left back chevron on subordinate screens. Diary dates are vertical chronology, not jumpable.

## 5. Active-state inheritance

Sage-green (KiteSprint) and purple-✓ (Om Patel) carry "you are here / you just acted" across both persistent and contextual chrome. **The accent color is the only signal that travels** — no underlines, breadcrumb trails, or header chrome. Consistency by *one disciplined hue*, not structural repetition.

## 6. Bilingual labels

KiteSprint chip selectors use **bilingual lockups** (`细线 clean`, `双层 premium`) — two languages as one typographic unit. The persistent tab bar is **icons-only** (avoids labels). Date headers and sticker captions localize fully (`今天 17:23`, `5월 07`). Om Patel mirrors: bilingual sticker badges (`Cup 컵`), localized dates, no nav labels. **Chrome avoids text where possible; where text appears, it is a bilingual lockup, not a translatable string.**

---

## Three Kinari nav patterns

### 1. **Shizukana Tabu** — 静かなタブ ("Quiet Tabs")

Floating bottom row of 3–5 icon-only destinations. Active slot is a filled stadium pill in the project accent; pill slides between slots in 120–180ms. Floats ≥18px above the surface edge; content scrolls beneath. Use when a product has co-equal top-level sections (constellation, not hierarchy). Web: floating bottom dock; on >720px, optionally mirrored as a left rail.
*Serves **1** (chrome stays quiet), **4** (chunky), **7** (bilingual via icons-only).*

### 2. **Hitotsu-Botan** — 一つボタン ("Single Button")

A single hero CTA replaces persistent nav entirely. Recognizable branded shape (shutter ring, inkstone, etc.) anchored bottom-center; small satellite circles may flank it. The button's *meaning* shifts by context but its *shape* is invariant — it is the app's logo-in-place. Use when a product has one dominant verb (capture, compose, ask). Web: fixed bottom-center FAB on mobile; hero CTA at eye-line on desktop.
*Serves **2** (user's stuff atomic — verb leads), **3** (capture as ritual), **10** (branded shape is the hand).*

### 3. **Mittsu-no-Maru** — 三つの丸 ("Three Circles")

Three equal-sized round buttons in a horizontal row, bottom-anchored, replacing all other chrome during a branching decision (confirm/retry/discard; trash/close/edit). Center is the affirmative, accent-colored; flanks are paper-white with sumi glyphs. Use on confirmation gates, AI output review, and detail-action surfaces — any moment the user chooses between three near-equal paths. Web: centered triplet of 56–72px circles. Never collapses to a dropdown.
*Serves **3** (capture as ritual), **5** (forgiving — retry co-equal with confirm), **8** (AI as craft — user authors the decision).*

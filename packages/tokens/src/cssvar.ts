/** All CSS custom properties exposed by @kinari/tokens.
 *  Keep this union in sync with build-css.ts output. */
export type CssVar =
  | "kinari"
  | "sumi"
  | "kaki-iro"
  | "shiro"
  | "paper-tone"
  | "sumi-soft"
  | "sumi-muted"
  | "sumi-mute"
  | "moegi"
  | "kakishibu"
  | "sakura"
  | "asagi"
  | "yamabuki"
  | "shikon"
  | "ease-tawami"
  | "duration-sticker"
  | "duration-chip"
  | "duration-cross-fade"
  | "duration-drill-in"
  | "duration-label-land"
  | "duration-glow-bloom"
  | "duration-glow-contract"
  | "duration-ai-shimmer"
  | "shadow-umber-contact"
  | "shadow-umber-resting"
  | "shadow-umber-floating"
  | "shadow-sumi-resting"
  | "space-page-vertical"
  | "space-section-gap"
  | "space-sticker-gap"
  | "space-content-sticker"
  | "space-content-reading"
  | "space-nav-pill-offset"
  | "space-nav-pill-reserve";

export function cssvar(name: CssVar): string {
  return `var(--${name})`;
}

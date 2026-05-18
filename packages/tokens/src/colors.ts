export type AccentName = "moegi" | "kakishibu" | "sakura" | "asagi" | "yamabuki" | "shikon";

export const colors = {
  // Core palette — locked, framework-wide
  kinari: "#f7f5f0",
  sumi: "#1a1a1a",
  kakiIro: "#d97a3c",
  shiro: "#ffffff",
  paperTone: "#f4ede0",

  // Sumi variants for prose hierarchy
  sumiSoft: "#2a2a2a",
  sumiMuted: "#6b6b6b",
  sumiMute: "#8a8a8a",

  // Curated 伝統色 accents — projects pick ONE
  accents: {
    moegi: "#7DAE5C",
    kakishibu: "#B5683A",
    sakura: "#E08596",
    asagi: "#4FA9AA",
    yamabuki: "#D4A12B",
    shikon: "#5B3D6E",
  },
} as const;

export type AccentHex = (typeof colors.accents)[AccentName];

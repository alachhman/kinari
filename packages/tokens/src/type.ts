const DISPLAY_FAMILY = 'Georgia, "Newsreader", "Tiempos", "Source Serif 4", serif';
const SANS_FAMILY = '-apple-system, "SF Pro Text", "Inter", system-ui, sans-serif';

export const type = {
  display: {
    family: DISPLAY_FAMILY,
    weight: 600,
    italic: false,
  },
  label: {
    family: SANS_FAMILY,
    weight: 800,
    letterSpacing: "-0.01em",
  },
  body: {
    family: SANS_FAMILY,
    weight: 400,
    lineHeight: 1.55,
  },
  numericSans: {
    family: SANS_FAMILY,
    weight: 800,
    italic: true,
    letterSpacing: "-0.03em",
  },
  numericSerif: {
    family: DISPLAY_FAMILY,
    weight: 600,
    italic: true,
  },
} as const;

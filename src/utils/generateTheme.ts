import { MantineThemeOverride } from "@mantine/core";

const fonts = ["Poppins", "Nunito", "Rubik", "Inter", "Roboto", "Lato"];
const radii = ["xs", "sm", "md", "lg", "xl"];

const palettePresets = [
  ["blue", "cyan", "indigo"],
  ["green", "lime", "teal"],
  ["pink", "grape", "violet"],
  ["yellow", "orange", "red"],
  ["mist", "blue", "grape"]
];

// Utility: random pick
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Random Mantine theme generator
export function generateRandomTheme(): MantineThemeOverride {
  const primary = pick(palettePresets.flat());
  const gradientFrom = pick(palettePresets.flat());
  const gradientTo = pick(palettePresets.flat());
  const font = pick(fonts);
  const radius = pick(radii);

  return {
    primaryColor: primary,
    primaryShade: { light: Math.floor(Math.random() * 5) + 4, dark: Math.floor(Math.random() * 5) + 4 },
    defaultGradient: { from: gradientFrom, to: gradientTo, deg: 45 },
    fontFamily: font,
    fontFamilyMonospace: "Roboto Mono",
    headings: {
      fontFamily: font,
      fontWeight: "600",
      sizes: {
        h1: { fontSize: "2.125rem", lineHeight: "1.3", fontWeight: "700" },
        h2: { fontSize: "1.625rem", lineHeight: "1.35", fontWeight: "600" },
        h3: { fontSize: "1.375rem", lineHeight: "1.4", fontWeight: "600" },
        h4: { fontSize: "1.125rem", lineHeight: "1.45", fontWeight: "500" },
        h5: { fontSize: "1rem", lineHeight: "1.5", fontWeight: "400" },
        h6: { fontSize: "0.875rem", lineHeight: "1.5", fontWeight: "400" },
      },
    },
    defaultRadius: radius,
    components: {
      Card: {
        defaultProps: { withBorder: Math.random() > 0.5, radius, padding: "lg" },
      },
      Paper: {
        defaultProps: { shadow: "md", radius },
      },
    },
  };
}
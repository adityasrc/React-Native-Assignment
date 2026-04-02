import { Platform } from "react-native";

/**
 * Typography
 *
 * Font family definitions using the Inter font loaded via expo-font.
 * See README for how to load fonts in App.tsx.
 */

export const typography = {
  fonts: {
    inter: {
      light: "Inter_300Light",
      normal: "Inter_400Regular",
      medium: "Inter_500Medium",
      semiBold: "Inter_600SemiBold",
      bold: "Inter_700Bold",
    },
    system: Platform.select({
      ios: "System",
      android: "Roboto",
      default: "System",
    }),
  },

  sizes: {
    xs: 11,
    s: 13,
    m: 15,
    l: 17,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
  },
} as const;

export type Typography = typeof typography;

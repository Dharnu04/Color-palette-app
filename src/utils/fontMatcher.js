import { FONT_PAIRINGS } from "../data/fontPairings";

export function getSuggestedFonts(paletteName = "") {
  const name = paletteName.toLowerCase();

  if (
    name.includes("gold") ||
    name.includes("luxury") ||
    name.includes("royal")
  ) {
    return FONT_PAIRINGS[1];
  }

  if (
    name.includes("forest") ||
    name.includes("sage") ||
    name.includes("nature")
  ) {
    return FONT_PAIRINGS[5];
  }

  if (
    name.includes("cyber") ||
    name.includes("neon") ||
    name.includes("tech")
  ) {
    return FONT_PAIRINGS[4];
  }

  if (
    name.includes("creative") ||
    name.includes("studio") ||
    name.includes("muse")
  ) {
    return FONT_PAIRINGS[2];
  }

  return FONT_PAIRINGS[0];
}
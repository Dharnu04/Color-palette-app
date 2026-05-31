import { hexToRgb, rgbToHex } from "./colorUtils";

export function mixTwoColors(colorA, colorB, weight = 0.5) {
  const rgbA = hexToRgb(colorA);
  const rgbB = hexToRgb(colorB);

  const r = rgbA.r * (1 - weight) + rgbB.r * weight;
  const g = rgbA.g * (1 - weight) + rgbB.g * weight;
  const b = rgbA.b * (1 - weight) + rgbB.b * weight;

  return rgbToHex(r, g, b);
}

export function mixPalettes(paletteA, paletteB, weight = 0.5) {
  return paletteA.map((color, index) => {
    const nextColor = paletteB[index] || paletteB[paletteB.length - 1];
    return mixTwoColors(color, nextColor, weight);
  });
}
import { hexToRgb } from "./colorUtils";

function getRelativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);

  const values = [r, g, b].map((value) => {
    const channel = value / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

export function getContrastRatio(color1, color2) {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

export function getContrastStatus(ratio) {
  return {
    largeText: ratio >= 3,
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
  };
}
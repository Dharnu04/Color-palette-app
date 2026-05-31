import { hslToHex } from "./colorUtils";

function seededRandom(seed) {
  let hash = 2166136261;

  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash +=
      (hash << 1) +
      (hash << 4) +
      (hash << 7) +
      (hash << 8) +
      (hash << 24);
  }

  return () => {
    hash += hash << 13;
    hash ^= hash >>> 7;
    hash += hash << 3;
    hash ^= hash >>> 17;
    hash += hash << 5;

    return ((hash >>> 0) % 10000) / 10000;
  };
}

export function generateRandomPalette(seedValue = Date.now().toString()) {
  const random = seededRandom(seedValue);
  const baseHue = Math.floor(random() * 360);

  const modes = ["analogous", "triadic", "mono", "split"];
  const mode = modes[Math.floor(random() * modes.length)];

  const offsets = {
    analogous: [-32, -14, 0, 18, 38],
    triadic: [0, 35, 120, 150, 240],
    mono: [0, 0, 0, 0, 0],
    split: [0, 28, 150, 180, 212],
  }[mode];

  return offsets.map((offset, index) => {
    const hue = (baseHue + offset + 360) % 360;
    const saturation = mode === "mono" ? 45 + index * 5 : 48 + random() * 32;
    const lightness = mode === "mono" ? 18 + index * 14 : 24 + random() * 54;

    return hslToHex(hue, saturation, lightness);
  });
}
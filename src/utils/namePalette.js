import { hexToRgb, rgbToHsl } from "./colorUtils";

const moodWords = {
  dark: ["Midnight", "Noir", "Shadow", "Obsidian", "Eclipse"],
  light: ["Soft", "Pearl", "Cloud", "Morning", "Linen"],
  warm: ["Ember", "Sunset", "Terracotta", "Cinnamon", "Amber"],
  cool: ["Glacier", "Ocean", "Mist", "Nordic", "Arctic"],
  vibrant: ["Neon", "Electric", "Pop", "Festival", "Pulse"],
  earthy: ["Sage", "Clay", "Forest", "Olive", "Moss"],
};

const endingWords = [
  "Bloom",
  "Aura",
  "Studio",
  "Muse",
  "Glow",
  "Haze",
  "Rush",
  "Tone",
  "Dream",
  "Field",
];

function getAverageHsl(colors) {
  const values = colors.map((hex) => {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHsl(r, g, b);
  });

  return {
    h: values.reduce((sum, item) => sum + item.h, 0) / values.length,
    s: values.reduce((sum, item) => sum + item.s, 0) / values.length,
    l: values.reduce((sum, item) => sum + item.l, 0) / values.length,
  };
}

function pickFromArray(arr, number) {
  return arr[Math.abs(Math.floor(number)) % arr.length];
}

export function generatePaletteName(colors) {
  const { h, s, l } = getAverageHsl(colors);

  let mood = "cool";

  if (l < 32) mood = "dark";
  else if (l > 72) mood = "light";
  else if (s > 65) mood = "vibrant";
  else if (h >= 20 && h <= 70) mood = "warm";
  else if (h >= 80 && h <= 160) mood = "earthy";
  else if (h >= 180 && h <= 260) mood = "cool";

  const first = pickFromArray(moodWords[mood], h + s);
  const second = pickFromArray(endingWords, l + h);

  return `${first} ${second}`;
}
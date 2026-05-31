import { luxuryPalettes } from "./luxury";
import { fashionPalettes } from "./fashion";
import { naturePalettes } from "./nature";

export const CATEGORY_DATA = [
  {
    id: "luxury",
    label: "Luxury",
    description: "Premium, elegant palettes for refined brand systems.",
    palettes: luxuryPalettes,
  },
  {
    id: "fashion",
    label: "Fashion",
    description: "Editorial color palettes for lifestyle and apparel brands.",
    palettes: fashionPalettes,
  },
  {
    id: "nature",
    label: "Nature",
    description: "Earth-inspired palettes for organic and calm visual systems.",
    palettes: naturePalettes,
  },
];
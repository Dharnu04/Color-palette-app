import { hexToRgb, rgbToHsl } from "./colorUtils";

function getAverageHsl(colors) {
  const hslValues = colors.map((hex) => {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHsl(r, g, b);
  });

  return {
    h: hslValues.reduce((sum, item) => sum + item.h, 0) / hslValues.length,
    s: hslValues.reduce((sum, item) => sum + item.s, 0) / hslValues.length,
    l: hslValues.reduce((sum, item) => sum + item.l, 0) / hslValues.length,
  };
}

export function getBrandPersonality(colors) {
  const { h, s, l } = getAverageHsl(colors);

  if (l < 35) {
    return {
      tone: ["Premium", "Bold", "Confident"],
      industries: ["Luxury", "SaaS", "Consulting"],
      description:
        "A strong, high-contrast identity direction suited for brands that want to feel sharp, premium, and memorable.",
    };
  }

  if (s > 65) {
    return {
      tone: ["Energetic", "Modern", "Expressive"],
      industries: ["Fashion", "Events", "Creative Studios"],
      description:
        "A vibrant visual system that works well for brands looking to feel bold, youthful, and attention-grabbing.",
    };
  }

  if (h >= 80 && h <= 160) {
    return {
      tone: ["Natural", "Calm", "Trustworthy"],
      industries: ["Wellness", "Organic Products", "Lifestyle"],
      description:
        "An earthy and grounded palette direction that feels approachable, warm, and nature-led.",
    };
  }

  if (h >= 180 && h <= 260) {
    return {
      tone: ["Clean", "Reliable", "Digital"],
      industries: ["Technology", "Healthcare", "Finance"],
      description:
        "A clean and dependable palette direction suitable for digital products and professional services.",
    };
  }

  return {
    tone: ["Balanced", "Flexible", "Modern"],
    industries: ["Branding", "Retail", "Digital Products"],
    description:
      "A flexible brand direction that can adapt well across web, social, and presentation use cases.",
  };
}
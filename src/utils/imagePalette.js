import { rgbToHex, rgbToHsl, hexToRgb } from "./colorUtils";
import { generateRandomPalette } from "./generatePalette";

export function extractPaletteFromImage(file, colorCount = 5) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      image.src = event.target.result;
    };

    reader.onerror = () => reject(new Error("Could not read image."));

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const size = 180;
      const ratio = image.width / image.height;

      canvas.width = ratio >= 1 ? size : size * ratio;
      canvas.height = ratio >= 1 ? size / ratio : size;

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const buckets = new Map();

      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 180) continue;

        const { s, l } = rgbToHsl(r, g, b);

        if (l < 6 || l > 96 || s < 8) continue;

        const roundedR = Math.round(r / 24) * 24;
        const roundedG = Math.round(g / 24) * 24;
        const roundedB = Math.round(b / 24) * 24;

        const key = `${roundedR},${roundedG},${roundedB}`;
        buckets.set(key, (buckets.get(key) || 0) + 1);
      }

      const palette = [...buckets.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([key]) => {
          const [r, g, b] = key.split(",").map(Number);
          return rgbToHex(r, g, b);
        })
        .filter((hex, index, arr) => {
          const current = hexToRgb(hex);

          return !arr.slice(0, index).some((item) => {
            const other = hexToRgb(item);

            const distance = Math.sqrt(
              Math.pow(current.r - other.r, 2) +
                Math.pow(current.g - other.g, 2) +
                Math.pow(current.b - other.b, 2)
            );

            return distance < 55;
          });
        })
        .slice(0, colorCount);

      if (palette.length < colorCount) {
        const fallback = generateRandomPalette(file.name).slice(
          0,
          colorCount - palette.length
        );

        resolve([...palette, ...fallback]);
        return;
      }

      resolve(palette);
    };

    image.onerror = () => reject(new Error("Invalid image file."));
    reader.readAsDataURL(file);
  });
}
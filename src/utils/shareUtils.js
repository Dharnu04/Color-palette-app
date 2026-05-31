export function encodePaletteToPath(colors) {
  return colors.map((color) => color.replace("#", "")).join("-");
}

export function decodePaletteFromPath(pathname) {
  if (!pathname.startsWith("/palette/")) return null;

  const rawPalette = pathname.replace("/palette/", "");
  const parts = rawPalette.split("-");

  if (parts.length < 3) return null;

  const colors = parts.map((part) => `#${part.toUpperCase()}`);

  const isValid = colors.every((color) => /^#[0-9A-F]{6}$/.test(color));

  return isValid ? colors.slice(0, 5) : null;
}

export async function copyPaletteShareURL(colors) {
  const encoded = encodePaletteToPath(colors);
  const url = `${window.location.origin}/palette/${encoded}`;

  await navigator.clipboard.writeText(url);

  window.history.replaceState(null, "", `/palette/${encoded}`);

  return url;
}
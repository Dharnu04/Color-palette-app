import PaletteCard from "./PaletteCard";
import { POPULAR_PALETTES } from "../data/popularPalettes";

export default function Feed({
  onUsePalette,
  onCopyPalette,
  onFavoritePalette,
}) {
  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {POPULAR_PALETTES.map((palette) => (
        <PaletteCard
          key={palette.id}
          palette={palette}
          onUse={onUsePalette}
          onCopy={onCopyPalette}
          onFavorite={onFavoritePalette}
        />
      ))}
    </section>
  );
}
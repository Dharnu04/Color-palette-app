import { Copy, Heart, Paintbrush } from "lucide-react";
import PaletteStrip from "./PaletteStrip";

export default function CategoryPaletteCard({
  palette,
  onUsePalette,
  onCopyPalette,
  onFavoritePalette,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <PaletteStrip colors={palette.colors} />

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-black text-slate-950 dark:text-white">
            {palette.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {palette.likes} saves
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onFavoritePalette(palette)}
            className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Favorite"
          >
            <Heart size={16} />
          </button>

          <button
            onClick={() => onCopyPalette(palette.colors)}
            className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Copy"
          >
            <Copy size={16} />
          </button>

          <button
            onClick={() => onUsePalette(palette.colors, palette.title)}
            className="rounded-full bg-slate-950 p-2 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            title="Use Palette"
          >
            <Paintbrush size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
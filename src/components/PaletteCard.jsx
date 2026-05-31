import { Copy, Flame, Heart } from "lucide-react";
import PaletteStrip from "./PaletteStrip";

export default function PaletteCard({ palette, onUse, onCopy, onFavorite }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <PaletteStrip colors={palette.colors} />

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-950">{palette.title}</h3>

          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <Flame size={14} />
            {palette.likes || "New"} saves
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onFavorite(palette)}
            className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
          >
            <Heart size={16} />
          </button>

          <button
            onClick={() => onCopy(palette.colors)}
            className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
          >
            <Copy size={16} />
          </button>

          <button
            onClick={() => onUse(palette.colors, palette.title)}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Use
          </button>
        </div>
      </div>
    </div>
  );
}
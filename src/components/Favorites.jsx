import { Heart, Trash2 } from "lucide-react";
import PaletteStrip from "./PaletteStrip";

export default function Favorites({
  favorites,
  onOpenFavorite,
  onRemoveFavorite,
  onClearFavorites,
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-black text-slate-950">
            <Heart size={22} />
            Favorite palettes
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Saved palettes you want to reuse later.
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={onClearFavorites}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
          >
            <Trash2 size={15} />
            Clear
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-3xl bg-slate-50 p-10 text-center">
          <p className="text-lg font-bold text-slate-700">No favorites yet.</p>
          <p className="mt-2 text-sm text-slate-500">
            Click the heart on any palette to save it here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((item) => (
            <div key={item.id} className="rounded-3xl border border-slate-200 p-4">
              <PaletteStrip colors={item.colors} />

              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <h3 className="line-clamp-1 font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.createdAt}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenFavorite(item)}
                    className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
                  >
                    Open
                  </button>

                  <button
                    onClick={() => onRemoveFavorite(item.id)}
                    className="rounded-full border border-slate-200 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
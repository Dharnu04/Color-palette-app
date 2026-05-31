import { Flame } from "lucide-react";
import { TRENDING_PALETTES } from "../data/trending";
import CategoryPaletteCard from "./CategoryPaletteCard";

export default function Trending({
  onUsePalette,
  onCopyPalette,
  onFavoritePalette,
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-black text-orange-700">
            <Flame size={15} />
            Trending This Week
          </div>

          <h2 className="text-3xl font-black text-slate-950 dark:text-white">
            Palettes designers are reaching for right now.
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            A curated set of high-demand palettes for SaaS interfaces, premium
            brands, fashion visuals, and bold digital campaigns.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {TRENDING_PALETTES.map((palette) => (
          <div key={palette.id} className="relative">
            <div className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-900 shadow-sm backdrop-blur dark:bg-slate-950/90 dark:text-white">
              {palette.score}/10
            </div>

            <CategoryPaletteCard
              palette={palette}
              onUsePalette={onUsePalette}
              onCopyPalette={onCopyPalette}
              onFavoritePalette={onFavoritePalette}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
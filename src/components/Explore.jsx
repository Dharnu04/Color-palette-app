import { useMemo, useState } from "react";
import { CATEGORY_DATA } from "../data/categories";
import CategorySidebar from "./CategorySidebar";
import CategoryPaletteCard from "./CategoryPaletteCard";

export default function Explore({
  onUsePalette,
  onCopyPalette,
  onFavoritePalette,
}) {
  const [activeCategory, setActiveCategory] = useState(CATEGORY_DATA[0].id);

  const selectedCategory = useMemo(() => {
    return (
      CATEGORY_DATA.find((category) => category.id === activeCategory) ||
      CATEGORY_DATA[0]
    );
  }, [activeCategory]);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          Explore
        </p>

        <h2 className="text-3xl font-black text-slate-950 dark:text-white">
          Color collections for every creative direction.
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Browse curated palettes by category, then use, copy, or save your
          favorite combinations.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
        <CategorySidebar
          categories={CATEGORY_DATA}
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
        />

        <div>
          <div className="mb-4 rounded-[1.5rem] bg-slate-50 p-4 dark:bg-slate-950">
            <h3 className="text-xl font-black text-slate-950 dark:text-white">
              {selectedCategory.label}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {selectedCategory.description}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {selectedCategory.palettes.map((palette) => (
              <CategoryPaletteCard
                key={palette.id}
                palette={palette}
                onUsePalette={onUsePalette}
                onCopyPalette={onCopyPalette}
                onFavoritePalette={onFavoritePalette}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
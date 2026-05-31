import { useMemo, useState } from "react";
import { Copy, Heart, Paintbrush, Shuffle } from "lucide-react";

import PaletteStrip from "./PaletteStrip";
import { POPULAR_PALETTES } from "../data/popularPalettes";
import { TRENDING_PALETTES } from "../data/trending";
import { CATEGORY_DATA } from "../data/categories";
import { mixPalettes } from "../utils/mixerUtils";

export default function PaletteMixer({
  favorites,
  onUsePalette,
  onCopyPalette,
  onFavoritePalette,
  setStatus,
}) {
  const paletteOptions = useMemo(() => {
    const explorePalettes = CATEGORY_DATA.flatMap((category) =>
      category.palettes.map((palette) => ({
        ...palette,
        group: category.label,
      }))
    );

    const favoritePalettes = favorites.map((palette) => ({
      ...palette,
      group: "Favorites",
    }));

    return [
      ...POPULAR_PALETTES.map((palette) => ({
        ...palette,
        group: "Popular",
      })),
      ...TRENDING_PALETTES.map((palette) => ({
        ...palette,
        group: "Trending",
      })),
      ...explorePalettes,
      ...favoritePalettes,
    ];
  }, [favorites]);

  const [paletteAId, setPaletteAId] = useState(paletteOptions[0]?.id);
  const [paletteBId, setPaletteBId] = useState(paletteOptions[1]?.id);
  const [mixAmount, setMixAmount] = useState(0.5);

  const paletteA = useMemo(() => {
    return paletteOptions.find((palette) => palette.id === paletteAId);
  }, [paletteOptions, paletteAId]);

  const paletteB = useMemo(() => {
    return paletteOptions.find((palette) => palette.id === paletteBId);
  }, [paletteOptions, paletteBId]);

  const mixedColors = useMemo(() => {
    if (!paletteA || !paletteB) return [];
    return mixPalettes(paletteA.colors, paletteB.colors, mixAmount);
  }, [paletteA, paletteB, mixAmount]);

  const mixedPalette = {
    id: `mix-${paletteAId}-${paletteBId}-${mixAmount}`,
    title: `${paletteA?.title || "Palette A"} × ${paletteB?.title || "Palette B"}`,
    colors: mixedColors,
    likes: "Mixed",
  };

  const randomizeMixer = () => {
    if (paletteOptions.length < 2) return;

    const firstIndex = Math.floor(Math.random() * paletteOptions.length);
    let secondIndex = Math.floor(Math.random() * paletteOptions.length);

    if (secondIndex === firstIndex) {
      secondIndex = (secondIndex + 1) % paletteOptions.length;
    }

    const weights = [0.25, 0.5, 0.75];

    setPaletteAId(paletteOptions[firstIndex].id);
    setPaletteBId(paletteOptions[secondIndex].id);
    setMixAmount(weights[Math.floor(Math.random() * weights.length)]);
    setStatus("Mixer randomized.");
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Palette Mixer
          </p>

          <h2 className="text-3xl font-black text-slate-950 dark:text-white">
            Blend two palettes into a fresh direction.
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Choose any two palettes from Popular, Trending, Explore, or
            Favorites and generate a balanced mixed palette.
          </p>
        </div>

        <button
          onClick={randomizeMixer}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          <Shuffle size={16} />
          Random Mix
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">
                Palette A
              </label>

              <select
                value={paletteAId}
                onChange={(event) => setPaletteAId(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                {paletteOptions.map((palette) => (
                  <option key={`a-${palette.id}`} value={palette.id}>
                    {palette.group} — {palette.title}
                  </option>
                ))}
              </select>

              {paletteA && (
                <div className="mt-3">
                  <PaletteStrip colors={paletteA.colors} />
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">
                Palette B
              </label>

              <select
                value={paletteBId}
                onChange={(event) => setPaletteBId(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                {paletteOptions.map((palette) => (
                  <option key={`b-${palette.id}`} value={palette.id}>
                    {palette.group} — {palette.title}
                  </option>
                ))}
              </select>

              {paletteB && (
                <div className="mt-3">
                  <PaletteStrip colors={paletteB.colors} />
                </div>
              )}
            </div>

            <div>
              <label className="mb-3 block text-sm font-black text-slate-700 dark:text-slate-200">
                Mix Strength
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  [0.25, "25%"],
                  [0.5, "50%"],
                  [0.75, "75%"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setMixAmount(value)}
                    className={`rounded-2xl px-4 py-3 text-sm font-black ${
                      mixAmount === value
                        ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                        : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
          <div className="mb-4">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Mixed Result
            </p>

            <h3 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
              {mixedPalette.title}
            </h3>
          </div>

          {mixedColors.length > 0 && <PaletteStrip colors={mixedColors} large />}

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <button
              onClick={() => onUsePalette(mixedColors, "Mixed Palette")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              <Paintbrush size={16} />
              Use
            </button>

            <button
              onClick={() => onCopyPalette(mixedColors)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Copy size={16} />
              Copy
            </button>

            <button
              onClick={() => onFavoritePalette(mixedPalette)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Heart size={16} />
              Favorite
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
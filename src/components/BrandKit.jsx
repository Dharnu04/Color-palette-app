import { Copy, Sparkles } from "lucide-react";
import { getSuggestedFonts } from "../utils/fontMatcher";

export default function BrandKit({ paletteName, colors, setStatus }) {
  const fonts = getSuggestedFonts(paletteName);

  const copyBrandKit = async () => {
    const text = `
Brand Kit: ${paletteName}

Colors:
Primary: ${colors[0]}
Secondary: ${colors[1]}
Accent: ${colors[2]}
Surface: ${colors[3]}
Text: ${colors[4]}

Typography:
Heading: ${fonts.heading}
Body: ${fonts.body}
Style: ${fonts.style}
`;

    await navigator.clipboard.writeText(text);
    setStatus("Brand kit copied.");
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Brand Kit
          </p>

          <h2 className="text-3xl font-black text-slate-950 dark:text-white">
            {paletteName}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            A quick brand direction generated from your current palette and font
            pairing.
          </p>
        </div>

        <button
          onClick={copyBrandKit}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          <Copy size={16} />
          Copy Brand Kit
        </button>
      </div>

      <div
        className="overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-700"
        style={{ backgroundColor: colors[0], color: colors[4] }}
      >
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 md:p-10">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black"
              style={{ backgroundColor: colors[2], color: colors[0] }}
            >
              <Sparkles size={15} />
              Brand Direction
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-tight">
              Build a visual identity with clarity.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 opacity-80">
              This kit gives you a starting direction for brand visuals,
              interface colors, typography, buttons, and content sections.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                className="rounded-full px-5 py-3 text-sm font-black"
                style={{ backgroundColor: colors[2], color: colors[0] }}
              >
                Primary CTA
              </button>

              <button
                className="rounded-full border px-5 py-3 text-sm font-black"
                style={{ borderColor: colors[4], color: colors[4] }}
              >
                Secondary CTA
              </button>
            </div>
          </div>

          <div
            className="grid gap-4 p-8 md:p-10"
            style={{ backgroundColor: colors[3], color: colors[0] }}
          >
            <div className="rounded-3xl bg-white/70 p-5 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">
                Typography
              </p>

              <h3 className="mt-3 text-2xl font-black">{fonts.heading}</h3>

              <p className="mt-2 text-sm opacity-70">
                Body font: {fonts.body}
              </p>

              <p className="mt-2 text-sm opacity-70">Style: {fonts.style}</p>
            </div>

            <div className="rounded-3xl bg-white/70 p-5 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">
                Usage
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-bold opacity-60">Primary</p>
                  <p className="font-mono text-sm font-black">{colors[0]}</p>
                </div>

                <div>
                  <p className="text-xs font-bold opacity-60">Secondary</p>
                  <p className="font-mono text-sm font-black">{colors[1]}</p>
                </div>

                <div>
                  <p className="text-xs font-bold opacity-60">Accent</p>
                  <p className="font-mono text-sm font-black">{colors[2]}</p>
                </div>

                <div>
                  <p className="text-xs font-bold opacity-60">Text</p>
                  <p className="font-mono text-sm font-black">{colors[4]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5">
          {colors.map((color) => (
            <div
              key={color}
              className="flex h-28 items-end justify-center p-3 text-xs font-black"
              style={{ backgroundColor: color, color: "#ffffff" }}
            >
              <span className="rounded-full bg-black/30 px-2 py-1 backdrop-blur">
                {color}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
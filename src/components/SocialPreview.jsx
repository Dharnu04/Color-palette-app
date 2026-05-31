import { Layout } from "lucide-react";
import { getSuggestedFonts } from "../utils/fontMatcher";
import { getBrandPersonality } from "../utils/personalityUtils";

export default function SocialPreview({ paletteName, colors }) {
  const fonts = getSuggestedFonts(paletteName);
  const personality = getBrandPersonality(colors);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          Social Preview Generator
        </p>

        <h2 className="text-3xl font-black text-slate-950 dark:text-white">
          Visualize your brand in real-world layouts.
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Preview your current palette and typography direction across social
          and web layouts.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <div
            className="aspect-square p-8"
            style={{
              backgroundColor: colors[0],
              color: colors[4],
            }}
          >
            <div
              className="inline-block rounded-full px-4 py-2 text-xs font-black"
              style={{
                backgroundColor: colors[2],
                color: colors[0],
              }}
            >
              Instagram Post
            </div>

            <h3 className="mt-8 text-4xl font-black leading-tight">
              Build something memorable.
            </h3>

            <p className="mt-4 opacity-80">
              {personality.tone.join(" • ")}
            </p>

            <button
              className="mt-8 rounded-full px-5 py-3 text-sm font-black"
              style={{
                backgroundColor: colors[2],
                color: colors[0],
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <div
            className="aspect-[9/16] p-6"
            style={{
              background: `linear-gradient(135deg, ${colors[0]}, ${colors[2]})`,
              color: colors[4],
            }}
          >
            <div className="text-xs font-black uppercase tracking-widest opacity-70">
              Instagram Story
            </div>

            <h3 className="mt-12 text-4xl font-black leading-tight">
              {paletteName}
            </h3>

            <p className="mt-4 text-lg opacity-80">{fonts.style}</p>

            <div className="mt-10 rounded-full bg-white/20 px-5 py-3 text-center text-sm font-black backdrop-blur">
              Swipe Up
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <div
            className="aspect-[16/9] p-8"
            style={{
              backgroundColor: colors[3],
              color: colors[0],
            }}
          >
            <div className="mb-8 flex items-center gap-2 text-sm font-black">
              <Layout size={16} />
              Website Hero
            </div>

            <h3 className="max-w-md text-4xl font-black leading-tight">
              Design systems built from your palette.
            </h3>

            <p className="mt-4 max-w-md text-sm opacity-80">
              Generate colors, typography, and visual direction in minutes.
            </p>

            <button
              className="mt-8 rounded-full px-5 py-3 text-sm font-black text-white"
              style={{
                backgroundColor: colors[2],
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
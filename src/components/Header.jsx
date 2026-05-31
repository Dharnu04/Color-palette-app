import { Sparkles } from "lucide-react";

export default function Header({ currentColors, paletteName }) {
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-[2rem] bg-slate-950 px-6 py-6 text-white shadow-2xl shadow-slate-300/40 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
          <Sparkles size={15} />
          Color palette studio
        </div>

        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          {paletteName}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
          Upload an image, use a random seed, explore popular palettes, and name
          every palette automatically.
        </p>
      </div>

      <div className="grid grid-cols-5 overflow-hidden rounded-3xl border border-white/10 md:w-80">
        {currentColors.map((color) => (
          <div key={color} className="h-24" style={{ backgroundColor: color }} />
        ))}
      </div>
    </header>
  );
}
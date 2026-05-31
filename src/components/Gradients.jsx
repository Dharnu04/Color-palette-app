import { Copy, Download, Shuffle } from "lucide-react";
import {
  getGradientCSS,
  getTailwindGradient,
  downloadGradientPNG,
} from "../utils/gradientUtils";

export default function Gradients({ colors, onRandomGenerate, setStatus }) {
  const gradientCSS = getGradientCSS(colors, 90);
  const tailwindCSS = getTailwindGradient(colors);

  const copyText = async (text, message) => {
    await navigator.clipboard.writeText(text);
    setStatus(message);
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-950">
            Gradient Generator
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Create smooth gradients using your current palette.
          </p>
        </div>

        <button
          onClick={onRandomGenerate}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
        >
          <Shuffle size={16} />
          New Palette
        </button>
      </div>

      <div
        className="mb-5 h-80 rounded-[2rem] border border-slate-200 shadow-inner"
        style={{ background: gradientCSS }}
      />

      <div className="mb-5 grid grid-cols-5 overflow-hidden rounded-2xl">
        {colors.map((color) => (
          <div
            key={color}
            className="flex h-24 items-end justify-center p-2 text-xs font-bold text-white"
            style={{ backgroundColor: color }}
          >
            <span className="rounded-full bg-black/25 px-2 py-1 backdrop-blur">
              {color}
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <button
          onClick={() =>
            copyText(`background: ${gradientCSS};`, "Gradient CSS copied.")
          }
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
        >
          <Copy size={16} />
          Copy CSS
        </button>

        <button
          onClick={() =>
            copyText(tailwindCSS, "Tailwind gradient style copied.")
          }
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
        >
          <Copy size={16} />
          Copy Tailwind
        </button>

        <button
          onClick={() => downloadGradientPNG(colors)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
        >
          <Download size={16} />
          Download PNG
        </button>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">
        <p className="mb-2 font-bold">CSS Output</p>
        <code className="break-all text-slate-300">
          background: {gradientCSS};
        </code>
      </div>
    </section>
  );
}
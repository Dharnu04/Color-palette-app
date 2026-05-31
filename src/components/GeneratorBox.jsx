import { Upload, Shuffle, Image as ImageIcon, Sparkles } from "lucide-react";

export default function GeneratorBox({
  seed,
  setSeed,
  status,
  fileInputRef,
  onSeedGenerate,
  onRandomGenerate,
  onImageUpload,
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Sparkles size={18} className="text-slate-400" />

          <input
            value={seed}
            onChange={(event) => setSeed(event.target.value)}
            placeholder="Enter seed: luxury, ocean, festival..."
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          onClick={onSeedGenerate}
          className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
        >
          Generate Seed
        </button>

        <button
          onClick={onRandomGenerate}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
        >
          <Shuffle size={16} />
          Random
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-sm font-bold text-slate-700 hover:border-slate-950 hover:bg-white"
        >
          <Upload size={20} />
          Upload image
        </button>

        <label className="flex items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-sm font-bold text-slate-700 hover:border-slate-950 hover:bg-white">
          <ImageIcon size={20} />
          Choose image file

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
        {status}
      </p>
    </div>
  );
}
import { Type, Copy } from "lucide-react";
import { getSuggestedFonts } from "../utils/fontMatcher";

export default function FontPairings({
  paletteName,
  colors,
  setStatus,
}) {
  const pairing = getSuggestedFonts(paletteName);

  const copyFonts = async () => {
    const text = `
Heading Font: ${pairing.heading}
Body Font: ${pairing.body}
Style: ${pairing.style}
`;

    await navigator.clipboard.writeText(text);

    setStatus("Font pairing copied.");
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Typography Suggestions
          </p>

          <h2 className="text-3xl font-black text-slate-950 dark:text-white">
            Recommended Font Pairing
          </h2>
        </div>

        <button
          onClick={copyFonts}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <Copy size={15} />
          Copy
        </button>
      </div>

      <div className="mb-5 rounded-[2rem] p-8"
        style={{
          background: colors[0],
          color: colors[4],
        }}
      >
        <h1 className="mb-3 text-5xl font-black">
            Brand Headline Example
        </h1>

        <p className="text-sm opacity-70">
            Font: {pairing.heading}
        </p>

        <p className="max-w-xl text-lg opacity-90">
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-400">
            Heading
          </p>

          <h3 className="text-2xl font-black text-slate-950 dark:text-white">
            {pairing.heading}
          </h3>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-400">
            Body
          </p>

          <h3 className="text-2xl font-black text-slate-950 dark:text-white">
            {pairing.body}
          </h3>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-400">
            Style
          </p>

          <h3 className="text-xl font-black text-slate-950 dark:text-white">
            {pairing.style}
          </h3>
        </div>
      </div>

      <div className="mt-5 rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
        <div className="flex items-center gap-2">
          <Type size={16} />
          <span className="font-bold">
            Why this pairing?
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {pairing.description}
        </p>
      </div>
    </section>
  );
}
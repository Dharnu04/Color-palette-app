import { Download, Code2, FileImage, Braces } from "lucide-react";
import {
  exportAsCSS,
  exportAsTailwind,
  exportAsFigmaTokens,
  downloadText,
  downloadPalettePNG,
} from "../utils/exportUtils";
import SharePaletteButton from "./SharePaletteButton";

export default function ExportPanel({ colors, setStatus }) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-5">
      <button
        onClick={() => downloadText("palette.css", exportAsCSS(colors))}
        className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
      >
        <Code2 size={16} />
        CSS
      </button>

      <button
        onClick={() =>
          downloadText("tailwind-palette.txt", exportAsTailwind(colors))
        }
        className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
      >
        <Download size={16} />
        Tailwind
      </button>

      <button
        onClick={() => downloadText("figma-tokens.json", exportAsFigmaTokens(colors))}
        className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
      >
        <Braces size={16} />
        Tokens
      </button>

      <button
        onClick={() => downloadPalettePNG(colors)}
        className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
      >
        <FileImage size={16} />
        PNG
      </button>

      <SharePaletteButton colors={colors} setStatus={setStatus} />
    </div>
  );
}
import { Link2 } from "lucide-react";
import { copyPaletteShareURL } from "../utils/shareUtils";

export default function SharePaletteButton({ colors, setStatus }) {
  const handleShare = async () => {
    const url = await copyPaletteShareURL(colors);
    setStatus("Share URL copied and address bar updated.");
    console.log(url);
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
    >
      <Link2 size={16} />
      Share Palette
    </button>
  );
}
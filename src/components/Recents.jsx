import { Clock, Trash2 } from "lucide-react";
import PaletteStrip from "./PaletteStrip";

export default function Recents({ recents, onOpenRecent, onClearRecents }) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-black text-slate-950">
            <Clock size={22} />
            Recent palettes
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest generated palettes are stored in this browser.
          </p>
        </div>

        {recents.length > 0 && (
          <button
            onClick={onClearRecents}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
          >
            <Trash2 size={15} />
            Clear
          </button>
        )}
      </div>

      {recents.length === 0 ? (
        <div className="rounded-3xl bg-slate-50 p-10 text-center">
          <p className="text-lg font-bold text-slate-700">No recents yet.</p>
          <p className="mt-2 text-sm text-slate-500">
            Generate or extract a palette and it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recents.map((item) => (
            <div key={item.id} className="rounded-3xl border border-slate-200 p-4">
              <PaletteStrip colors={item.colors} />

              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <h3 className="line-clamp-1 font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">{item.createdAt}</p>
                </div>

                <button
                  onClick={() => onOpenRecent(item)}
                  className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
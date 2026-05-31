import { Keyboard, X } from "lucide-react";

const SHORTCUTS = [
  ["Space", "Generate new palette"],
  ["?", "Open shortcuts"],
  ["Esc", "Close shortcuts"],
  ["E", "Open Explore"],
  ["G", "Open Gradients"],
  ["C", "Open Contrast"],
  ["F", "Open Favorites"],
  ["R", "Open Recents"],
  ["D", "Toggle dark mode"],
];

export default function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Keyboard size={15} />
              Keyboard Shortcuts
            </div>

            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              Move faster inside your palette studio.
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-2">
          {SHORTCUTS.map(([key, label]) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-950"
            >
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                {label}
              </span>

              <kbd className="rounded-xl border border-slate-300 bg-white px-3 py-1 text-sm font-black text-slate-950 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                {key}
              </kbd>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs font-semibold text-slate-400">
          Shortcuts are disabled while typing in input fields.
        </p>
      </div>
    </div>
  );
}
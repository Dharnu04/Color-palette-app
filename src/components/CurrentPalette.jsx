import { Sparkles } from "lucide-react";
import ColorColumn from "./ColorColumn";
import ExportPanel from "./ExportPanel";

export default function CurrentPalette({
  colors,
  paletteName,
  lockedColors,
  copiedColor,
  onCopyColor,
  onToggleLock,
  onDragStart,
  onDrop,
  setStatus,
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Generated palette
          </p>

          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            {paletteName}
          </h2>
        </div>

        <Sparkles className="text-slate-400" />
      </div>

      <div className="grid gap-3 sm:grid-cols-5">
        {colors.map((color, index) => (
          <ColorColumn
            key={`${color}-${index}`}
            color={color}
            index={index}
            locked={lockedColors[index]}
            copiedColor={copiedColor}
            onCopy={onCopyColor}
            onToggleLock={onToggleLock}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        ))}
      </div>

      <ExportPanel colors={colors} setStatus={setStatus} />
    </div>
  );
}
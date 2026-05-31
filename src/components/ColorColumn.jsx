import { Copy, Lock, Unlock } from "lucide-react";

export default function ColorColumn({
  color,
  index,
  locked,
  copiedColor,
  onCopy,
  onToggleLock,
  onDragStart,
  onDrop,
}) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => onDrop(index)}
      className="group relative min-h-[260px] overflow-hidden rounded-3xl shadow-sm"
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-x-0 bottom-0 bg-black/20 p-4 backdrop-blur-sm">
        <p className="mb-3 font-mono text-lg font-black text-white">{color}</p>

        <div className="flex gap-2">
          <button
            onClick={() => onCopy(color)}
            className="rounded-full bg-white/90 p-2 text-slate-950"
          >
            <Copy size={16} />
          </button>

          <button
            onClick={() => onToggleLock(index)}
            className="rounded-full bg-white/90 p-2 text-slate-950"
          >
            {locked ? <Lock size={16} /> : <Unlock size={16} />}
          </button>
        </div>

        {copiedColor === color && (
          <p className="mt-2 text-xs font-bold text-white">Copied</p>
        )}
      </div>
    </div>
  );
}
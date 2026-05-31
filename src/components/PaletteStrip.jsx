import { getContrastColor } from "../utils/colorUtils";

export default function PaletteStrip({ colors, large = false }) {
  return (
    <div
      className={`grid grid-cols-5 overflow-hidden rounded-2xl ${
        large ? "h-32" : "h-20"
      }`}
    >
      {colors.map((color) => (
        <div key={color} className="relative group" style={{ backgroundColor: color }}>
          <span
            className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 rounded-full px-2 py-1 text-[10px] font-semibold group-hover:block"
            style={{
              color: getContrastColor(color),
              background: "rgba(255,255,255,0.18)",
            }}
          >
            {color}
          </span>
        </div>
      ))}
    </div>
  );
}
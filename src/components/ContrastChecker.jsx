import { useMemo, useState } from "react";
import { CheckCircle2, Copy, XCircle } from "lucide-react";
import { getContrastRatio, getContrastStatus } from "../utils/contrastUtils";

function StatusRow({ label, passed }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
        {label}
      </span>

      {passed ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
          <CheckCircle2 size={14} />
          Pass
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-700">
          <XCircle size={14} />
          Fail
        </span>
      )}
    </div>
  );
}

export default function ContrastChecker({ colors, setStatus }) {
  const [backgroundColor, setBackgroundColor] = useState(colors[0]);
  const [textColor, setTextColor] = useState(colors[4] || "#FFFFFF");

  const ratio = useMemo(
    () => getContrastRatio(backgroundColor, textColor),
    [backgroundColor, textColor]
  );

  const status = useMemo(() => getContrastStatus(ratio), [ratio]);

  const copyResult = async () => {
    const text = `Background: ${backgroundColor}
Text: ${textColor}
Contrast Ratio: ${ratio}:1
Large Text: ${status.largeText ? "Pass" : "Fail"}
AA: ${status.aa ? "Pass" : "Fail"}
AAA: ${status.aaa ? "Pass" : "Fail"}`;

    await navigator.clipboard.writeText(text);
    setStatus("Contrast result copied.");
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Contrast Checker
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Test text and background color accessibility from your palette.
          </p>
        </div>

        <button
          onClick={copyResult}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          <Copy size={16} />
          Copy Result
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          className="flex min-h-[340px] flex-col justify-end rounded-[2rem] p-8 shadow-inner"
          style={{
            backgroundColor,
            color: textColor,
          }}
        >
          <p className="mb-3 text-sm font-bold opacity-80">Sample Preview</p>

          <h3 className="text-4xl font-black tracking-tight">
            Design with clarity.
          </h3>

          <p className="mt-4 max-w-xl text-lg font-medium opacity-90">
            This preview shows how readable your selected text color is against
            the selected background.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">
                Background
              </label>

              <select
                value={backgroundColor}
                onChange={(event) => setBackgroundColor(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                {colors.map((color) => (
                  <option key={`bg-${color}`} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">
                Text
              </label>

              <select
                value={textColor}
                onChange={(event) => setTextColor(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                {colors.map((color) => (
                  <option key={`text-${color}`} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-5 rounded-3xl bg-white p-5 text-center dark:bg-slate-900">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Contrast Ratio
            </p>

            <h3 className="mt-2 text-5xl font-black text-slate-950 dark:text-white">
              {ratio}:1
            </h3>
          </div>

          <div className="grid gap-3">
            <StatusRow label="Large Text / UI Components" passed={status.largeText} />
            <StatusRow label="AA Normal Text" passed={status.aa} />
            <StatusRow label="AAA Enhanced Text" passed={status.aaa} />
          </div>
        </div>
      </div>
    </section>
  );
}
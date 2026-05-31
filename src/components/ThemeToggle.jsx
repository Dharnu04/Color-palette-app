import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ theme, onToggleTheme }) {
  return (
    <button
      onClick={onToggleTheme}
      className="fixed right-5 top-5 z-50 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-lg hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
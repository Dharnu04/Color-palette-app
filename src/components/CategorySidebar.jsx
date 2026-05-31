export default function CategorySidebar({
  categories,
  activeCategory,
  onChangeCategory,
}) {
  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="mb-3 px-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
        Collections
      </p>

      <div className="grid gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onChangeCategory(category.id)}
            className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
              activeCategory === category.id
                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
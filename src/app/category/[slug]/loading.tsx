export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
      {/* Breadcrumb */}
      <div className="skeleton h-3 w-40 rounded mb-4" />

      {/* Title */}
      <div className="skeleton h-8 w-64 rounded-lg mb-2" />
      <div className="skeleton h-4 w-96 rounded mb-8" />

      {/* Keyword cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="p-5 rounded-2xl border border-zinc-200/60">
            <div className="skeleton h-5 w-3/4 rounded-lg mb-3" />
            <div className="skeleton h-4 w-full rounded mb-2" />
            <div className="skeleton h-4 w-2/3 rounded mb-4" />
            <div className="flex gap-3">
              <div className="skeleton h-4 w-16 rounded" />
              <div className="skeleton h-4 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
      <div className="skeleton h-8 w-64 mb-4" />
      <div className="skeleton h-4 w-96 mb-12" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-5 rounded-xl border border-zinc-200">
            <div className="skeleton h-5 w-3/4 mb-3" />
            <div className="skeleton h-4 w-full mb-2" />
            <div className="skeleton h-4 w-2/3 mb-4" />
            <div className="skeleton h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

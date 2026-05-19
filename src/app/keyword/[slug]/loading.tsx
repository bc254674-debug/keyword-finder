export default function KeywordLoading() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-10 animate-pulse">
      {/* Breadcrumb */}
      <div className="skeleton h-3 w-32 rounded mb-8" />

      {/* Header */}
      <div className="mb-10">
        <div className="skeleton h-5 w-28 rounded-full mb-4" />
        <div className="skeleton h-8 w-80 rounded-lg mb-3" />
        <div className="skeleton h-4 w-96 rounded" />
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl p-4 border border-zinc-200/60">
            <div className="skeleton h-7 w-16 mx-auto rounded mb-2" />
            <div className="skeleton h-3 w-20 mx-auto rounded" />
          </div>
        ))}
      </div>

      {/* Competition bar */}
      <div className="rounded-2xl border border-zinc-200/60 p-5 mb-10">
        <div className="skeleton h-4 w-28 rounded mb-3" />
        <div className="skeleton h-2 w-full rounded-full mb-2" />
        <div className="skeleton h-3 w-64 rounded" />
      </div>

      {/* Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="skeleton h-5 w-48 rounded mb-3" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
          <div className="skeleton h-4 w-full rounded" />
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-200/60 p-5">
            <div className="skeleton h-4 w-32 rounded mb-3" />
            <div className="skeleton h-4 w-full rounded mb-2" />
            <div className="skeleton h-4 w-full rounded mb-2" />
            <div className="skeleton h-4 w-2/3 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

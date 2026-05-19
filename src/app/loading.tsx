export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero skeleton */}
      <div className="text-center mb-14 animate-pulse">
        <div className="skeleton h-10 w-72 mx-auto mb-4 rounded-xl" />
        <div className="skeleton h-5 w-96 mx-auto mb-2 rounded-lg" />
        <div className="skeleton h-5 w-64 mx-auto rounded-lg" />
      </div>

      {/* Trending grid skeleton */}
      <div className="mb-12">
        <div className="skeleton h-6 w-36 rounded-lg mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="p-5 rounded-2xl border border-zinc-200/60 animate-pulse">
              <div className="skeleton h-5 w-3/4 mb-3 rounded-lg" />
              <div className="skeleton h-4 w-full mb-2 rounded-lg" />
              <div className="skeleton h-4 w-2/3 mb-4 rounded-lg" />
              <div className="skeleton h-2.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Categories skeleton */}
      <div className="skeleton h-6 w-32 rounded-lg mb-5" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-28 rounded-2xl border border-zinc-200/60 animate-pulse">
            <div className="p-4">
              <div className="skeleton h-5 w-2/3 mb-2 rounded-lg" />
              <div className="skeleton h-3 w-full rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA skeleton */}
      <div className="rounded-3xl bg-zinc-50 p-10 animate-pulse">
        <div className="skeleton h-6 w-64 mx-auto mb-3 rounded-lg" />
        <div className="skeleton h-4 w-96 mx-auto rounded-lg" />
      </div>
    </div>
  );
}

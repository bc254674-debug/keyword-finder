"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <p className="text-4xl mb-4">&#x26A0;&#xFE0F;</p>
      <h2 className="text-lg font-semibold text-zinc-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-zinc-500 mb-6">
        The page couldn&apos;t load. This is usually temporary.
      </p>
      <button
        onClick={reset}
        className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

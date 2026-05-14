import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Pagination">
      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-3 py-2 text-gray-400">...</span>
        ) : (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        )
      )}
    </nav>
  );
}

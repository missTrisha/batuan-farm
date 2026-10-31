// src/components/ui/Pagination.tsx
interface PaginationProps {
  page: number; // 1-based current page
  pageSize: number;
  total: number; // total rows matching the query
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const PAGE_SIZE = 3;

export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (total <= pageSize) return null;

  const buttonClass =
    "rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-end gap-3 py-3"
    >
      <button
        type="button"
        className={buttonClass}
        onClick={() => onPageChange(page - 1)}
        disabled={disabled || page <= 1}
      >
        Prev
      </button>

      <span className="text-sm text-gray-600" aria-current="page">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        className={buttonClass}
        onClick={() => onPageChange(page + 1)}
        disabled={disabled || page >= totalPages}
      >
        Next
      </button>
    </nav>
  );
}

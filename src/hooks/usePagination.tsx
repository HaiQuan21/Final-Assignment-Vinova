import { useSearchParams } from "react-router-dom";
import type { PaginationState } from "@tanstack/react-table";

export function usePagination(initialPageSize = 8) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Đọc từ URL, fallback về default nếu không có
  const pageIndex = Math.max(0, Number(searchParams.get("page") ?? 1) - 1); //chuyển thành 0-indexed
  const pageSize = Number(searchParams.get("limit") ?? initialPageSize);
  const search = searchParams.get("search") ?? "";

  const pagination: PaginationState = { pageIndex, pageSize };

  const setPagination = (
    updater: PaginationState | ((prev: PaginationState) => PaginationState),
  ) => {
    const next = typeof updater === "function" ? updater(pagination) : updater;

    setSearchParams(
      (prev) => {
        prev.set("page", String(next.pageIndex + 1)); // lưu 1-based vào URL
        prev.set("limit", String(next.pageSize));
        return prev;
      },
      { replace: true }, // replace thay vì push để không spam history
    );
  };

  const setSearch = (value: string) => {
    setSearchParams(
      (prev) => {
        if (value) {
          prev.set("search", value);
        } else {
          prev.delete("search");
        }
        prev.set("page", "1"); // reset về trang 1 khi search
        return prev;
      },
      { replace: true }
    );
  };

  return { pagination, setPagination, search, setSearch };
}

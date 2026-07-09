import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { PaginationState, SortingState } from "@tanstack/react-table";

const DEFAULT_PAGE_SIZE = 25;

/** Parse an toàn số nguyên dương từ URL, fallback nếu invalid/NaN/<=0 */
function parsePositiveInt(value: string | null, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.trunc(n) : fallback;
}

function parseSorting(sortParam: string): SortingState {
  if (!sortParam) return [];
  return sortParam.split(",").map((s) => ({
    id: s.startsWith("-") ? s.slice(1) : s,
    desc: s.startsWith("-"),
  }));
}

function serializeSorting(sorting: SortingState): string {
  return sorting.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",");
}

/**
 * Hook duy nhất quản lý pagination + sorting + search trên URL searchParams.
 * Thay thế cho usePagination + useTableParams cũ — gộp lại để tránh 2 hook
 * cùng đọc/ghi chung key (page, limit, search) gây giẫm chân nhau.
 */
export function useTableParams(initialPageSize = DEFAULT_PAGE_SIZE) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = Math.max(
    0,
    parsePositiveInt(searchParams.get("page"), 1) - 1,
  );
  const pageSize = parsePositiveInt(
    searchParams.get("limit"),
    initialPageSize,
  );
  const search = searchParams.get("search") ?? "";
  const sortParam = searchParams.get("sort") ?? "";

  // useMemo để giữ referential stability — quan trọng vì các object này
  // thường được truyền thẳng vào state của @tanstack/react-table.
  const pagination: PaginationState = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize],
  );

  const sorting: SortingState = useMemo(
    () => parseSorting(sortParam),
    [sortParam],
  );

  // setPagination: tính current state TỪ prev (bên trong updater của
  // setSearchParams), không dùng biến `pagination` ở closure ngoài —
  // tránh bug mất update khi gọi setPagination nhiều lần liên tiếp.
  const setPagination = useCallback(
    (
      updater: PaginationState | ((prev: PaginationState) => PaginationState),
    ) => {
      setSearchParams(
        (prev) => {
          const current: PaginationState = {
            pageIndex: Math.max(
              0,
              parsePositiveInt(prev.get("page"), 1) - 1,
            ),
            pageSize: parsePositiveInt(prev.get("limit"), initialPageSize),
          };
          const next =
            typeof updater === "function" ? updater(current) : updater;

          prev.set("page", String(next.pageIndex + 1));
          prev.set("limit", String(next.pageSize));
          return prev;
        },
        { replace: true },
      );
    },
    [setSearchParams, initialPageSize],
  );

  const setSorting = useCallback(
    (updater: SortingState | ((prev: SortingState) => SortingState)) => {
      setSearchParams(
        (prev) => {
          const current = parseSorting(prev.get("sort") ?? "");
          const next = typeof updater === "function" ? updater(current) : updater;
          const sortStr = serializeSorting(next);

          if (sortStr) prev.set("sort", sortStr);
          else prev.delete("sort");
          prev.set("page", "1"); // đổi sort -> quay về trang 1
          return prev;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // setSearch: có so sánh với giá trị hiện tại để tránh set trùng
  // (hữu ích khi gọi từ debounce, tránh render/loop thừa).
  const setSearch = useCallback(
    (value: string) => {
      setSearchParams(
        (prev) => {
          const current = prev.get("search") ?? "";
          if (value === current) return prev;

          if (value) prev.set("search", value);
          else prev.delete("search");
          prev.set("page", "1"); // đổi search -> quay về trang 1
          return prev;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // setAll: cập nhật nhiều params cùng lúc trong 1 lần ghi URL
  // (ví dụ: reset toàn bộ filter khi đổi route/tab).
  const setAll = useCallback(
    (params: {
      page?: number;
      limit?: number;
      sort?: SortingState;
      search?: string;
    }) => {
      setSearchParams(
        (prev) => {
          if (params.page !== undefined) prev.set("page", String(params.page));
          if (params.limit !== undefined) prev.set("limit", String(params.limit));
          if (params.sort !== undefined) {
            const sortStr = serializeSorting(params.sort);
            if (sortStr) prev.set("sort", sortStr);
            else prev.delete("sort");
          }
          if (params.search !== undefined) {
            if (params.search) prev.set("search", params.search);
            else prev.delete("search");
          }
          return prev;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return {
    pagination,
    sorting,
    search,
    setPagination,
    setSorting,
    setSearch,
    setAll,
  };
}
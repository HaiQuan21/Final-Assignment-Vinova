import { useState } from "react";
import type { PaginationState } from "@tanstack/react-table";

export function usePagination(initialPageSize = 25) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, // TanStack dùng 0-based
    pageSize: initialPageSize,
  });

  return { pagination, setPagination };
}
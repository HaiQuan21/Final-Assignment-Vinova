import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import { HiSelector, HiChevronUp, HiChevronDown, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { getPaginationRange } from "../lib/pagination";

interface CommonTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
  manualSorting?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;

  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  // true (mặc định): data trả về từ API đã được phân trang sẵn (vd 25 dòng/lần),
  // cần truyền totalEntries để tính số trang. false: data đầy đủ, TanStack tự cắt trang.
  manualPagination?: boolean;
  totalEntries?: number;
  pageSizeOptions?: number[];
}

function CommonTable<T>({
  data,
  columns,
  sorting,
  onSortingChange,
  manualSorting = false,
  isLoading = false,
  emptyMessage = "No data available",
  pagination,
  onPaginationChange,
  manualPagination = true,
  totalEntries,
  pageSizeOptions = [10, 25, 50, 100],
}: CommonTableProps<T>) {
  const resolvedTotalEntries = manualPagination ? totalEntries ?? 0 : data.length;
  const pageCount = Math.max(1, Math.ceil(resolvedTotalEntries / pagination.pageSize));

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange(next);
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater(pagination) : updater;
      onPaginationChange(next);
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting,
    manualPagination,
    pageCount,
    ...(manualSorting ? {} : { getSortedRowModel: getSortedRowModel() }),
    // manualPagination=true: data truyền vào đã là đúng 1 trang sẵn từ API, không cần cắt lại
    ...(manualPagination ? {} : { getPaginationRowModel: getPaginationRowModel() }),
  });

  const currentPage = table.getState().pagination.pageIndex + 1; // hiển thị 1-based
  const startEntry = resolvedTotalEntries === 0 ? 0 : (currentPage - 1) * pagination.pageSize + 1;
  const endEntry = Math.min(currentPage * pagination.pageSize, resolvedTotalEntries);
  const pageItems = getPaginationRange(currentPage, pageCount);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-max border-collapse text-left text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200 bg-white">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={`whitespace-nowrap px-5 py-4 font-semibold text-gray-700 ${
                        canSort ? "cursor-pointer select-none" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort &&
                          (sortDir === "asc" ? (
                            <HiChevronUp size={14} className="text-gray-700" />
                          ) : sortDir === "desc" ? (
                            <HiChevronDown size={14} className="text-gray-700" />
                          ) : (
                            <HiSelector size={14} className="text-gray-400" />
                          ))}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-100 last:border-0 ${
                    index % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-4 align-top text-gray-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer — toàn bộ điều khiển trang lấy từ table instance của TanStack */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-1 py-4 text-sm text-gray-500">
        <span>
          showing {startEntry} to {endEntry} of {resolvedTotalEntries} entries.
        </span>

        <div className="flex items-center gap-4">

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Previous page"
            >
              <HiChevronLeft size={16} />
            </button>

            {pageItems.map((item, idx) =>
              item === "ellipsis" ? (
                <span key={`ellipsis-${idx}`} className="flex h-8 w-8 items-center justify-center text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => table.setPageIndex(item - 1)}
                  className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
                    item === currentPage
                      ? "bg-[#3A0099] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Next page"
            >
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonTable;
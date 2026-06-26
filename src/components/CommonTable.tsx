import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type RowSelectionState,
} from "@tanstack/react-table";
import {
  HiSelector,
  HiChevronUp,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { getPaginationRange } from "../lib/pagination";

const FIXED_ROW_COUNT = 8;
const ROW_HEIGHT = 72; // px — dùng số để tính height container

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
  manualPagination?: boolean;
  totalEntries?: number;
  // Hiện dropdown "n per page" — truyền mảng thì hiện, không truyền thì ẩn
  pageSizeOptions?: number[];
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
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
  pageSizeOptions,
  rowSelection = {},
  onRowSelectionChange,
}: CommonTableProps<T>) {
  const resolvedTotalEntries = manualPagination
    ? (totalEntries ?? 0)
    : data.length;
  const pageCount = Math.max(
    1,
    Math.ceil(resolvedTotalEntries / pagination.pageSize),
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination, rowSelection },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange(next);
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(pagination) : updater;
      onPaginationChange(next);
    },
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater;
      onRowSelectionChange?.(next);
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting,
    manualPagination,
    pageCount,
    enableRowSelection: !!onRowSelectionChange,
    ...(manualSorting ? {} : { getSortedRowModel: getSortedRowModel() }),
    ...(manualPagination
      ? {}
      : { getPaginationRowModel: getPaginationRowModel() }),
    columnResizeMode: "onChange",
  });

  const currentPage = table.getState().pagination.pageIndex + 1;
  const startEntry =
    resolvedTotalEntries === 0
      ? 0
      : (currentPage - 1) * pagination.pageSize + 1;
  const endEntry = Math.min(
    currentPage * pagination.pageSize,
    resolvedTotalEntries,
  );
  const pageItems = getPaginationRange(currentPage, pageCount);

  // Chiều cao cố định: header ~52px + 8 rows × 72px = 628px
  const HEADER_HEIGHT = 52;
  const TABLE_BODY_HEIGHT = FIXED_ROW_COUNT * ROW_HEIGHT;
  const CONTAINER_HEIGHT = HEADER_HEIGHT + TABLE_BODY_HEIGHT;

  const rows = table.getRowModel().rows;
  const fillerCount = Math.max(0, FIXED_ROW_COUNT - rows.length);

  const allColumns = table.getAllColumns();

  return (
    <div className="flex flex-col gap-2">
      {/* Container cố định chiều cao — scroll dọc bên trong, scroll ngang toàn bộ */}
      <div
        className="w-full overflow-x-auto rounded-lg border border-gray-200"
        style={{ height: `${CONTAINER_HEIGHT}px` }}
      >
        <table className="w-full min-w-max border-collapse text-left text-sm">
          {/* Header sticky để không bị cuộn khi scroll dọc */}
          <thead className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-gray-200 bg-white"
                style={{ height: `${HEADER_HEIGHT}px` }}
              >
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  const isAction = header.column.id === "action";

                  return (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() }}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      className={`whitespace-nowrap px-5 py-4 font-semibold text-gray-700
                        ${canSort ? "cursor-pointer select-none" : ""}
                        ${isAction ? "sticky right-0 bg-white shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.08)]" : ""}
                      `}
                    >
                      <div className="flex items-center gap-1.5">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {canSort &&
                          (sortDir === "asc" ? (
                            <HiChevronUp size={14} className="text-gray-700" />
                          ) : sortDir === "desc" ? (
                            <HiChevronDown
                              size={14}
                              className="text-gray-700"
                            />
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
              Array.from({ length: FIXED_ROW_COUNT }).map((_, index) => (
                <tr
                  key={`skeleton-${index}`}
                  style={{ height: `${ROW_HEIGHT}px` }}
                  className={`border-b border-gray-100 ${
                    index % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {allColumns.map((col) => (
                    <td key={col.id} style={{ width: col.getSize() }}>
                      <div className="h-4 animate-pulse rounded bg-gray-200" style={{width: `${60 + ((allColumns.indexOf(col) * 17) % 25)}%`}} />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <>
                <tr
                  style={{ height: `${ROW_HEIGHT}px` }}
                  className="border-b border-gray-100 bg-white"
                >
                  <td
                    colSpan={columns.length}
                    className="px-5 py-4 text-center text-gray-400"
                  >
                    {emptyMessage}
                  </td>
                </tr>
                {Array.from({ length: FIXED_ROW_COUNT - 1 }).map((_, index) => (
                  <tr
                    key={`empty-${index}`}
                    style={{ height: `${ROW_HEIGHT}px` }}
                    className={`border-b border-gray-100 last:border-0 ${
                      (index + 1) % 2 === 1 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td colSpan={columns.length} />
                  </tr>
                ))}
              </>
            ) : (
              <>
                {rows.map((row, index) => (
                  <tr
                    key={row.id}
                    style={{ height: `${ROW_HEIGHT}px` }}
                    className={`border-b border-gray-100 last:border-0 ${
                      row.getIsSelected()
                        ? "bg-purple-50"
                        : index % 2 === 1
                          ? "bg-gray-50"
                          : "bg-white"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isAction = cell.column.id === "action";
                      return (
                        <td
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                          className={`px-5 py-4 align-middle text-gray-700 ${
                            isAction
                              ? `sticky right-0 shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.08)] ${
                                  row.getIsSelected()
                                    ? "bg-purple-50"
                                    : index % 2 === 1
                                      ? "bg-gray-50"
                                      : "bg-white"
                                }`
                              : ""
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Filler rows giữ đủ 8 dòng */}
                {Array.from({ length: fillerCount }).map((_, index) => {
                  const rowIndex = rows.length + index;
                  return (
                    <tr
                      key={`filler-${index}`}
                      style={{ height: `${ROW_HEIGHT}px` }}
                      className={`border-b border-gray-100 last:border-0 ${
                        rowIndex % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      {columns.map((col, colIdx) => {
                        const isAction =
                          "id" in col ? col.id === "action" : false;
                        return (
                          <td
                            key={colIdx}
                            className={
                              isAction
                                ? `sticky right-0 shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.08)] ${
                                    rowIndex % 2 === 1
                                      ? "bg-gray-50"
                                      : "bg-white"
                                  }`
                                : ""
                            }
                          />
                        );
                      })}
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-1 py-4 text-sm text-gray-500">
        <span>
          showing {startEntry} to {endEntry} of {resolvedTotalEntries} entries.
        </span>

        <div className="flex items-center gap-2">
          {/* Per-page dropdown — chỉ hiện khi truyền pageSizeOptions */}
          {pageSizeOptions && (
            <select
              value={pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-400"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </select>
          )}

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-40"
            >
              <HiChevronLeft size={16} />
            </button>

            {pageItems.map((item, idx) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="flex h-8 w-8 items-center justify-center text-gray-400"
                >
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
              ),
            )}

            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-40"
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

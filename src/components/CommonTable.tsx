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
  pageSizeOptions?: number[];
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  FIXED_ROW_COUNT: number;
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
  FIXED_ROW_COUNT,
}: CommonTableProps<T>) {
  const resolvedTotalEntries = manualPagination
    ? (totalEntries ?? 0)
    : data.length;
  const pageCount = Math.max(
    1,
    Math.ceil(resolvedTotalEntries / pagination.pageSize),
  );

  const ROW_HEIGHT = 72;

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange(next);
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(pagination) : updater;
      onPaginationChange(next);
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting,
    manualPagination,
    pageCount,
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

  const HEADER_HEIGHT = 52;
  const TABLE_BODY_HEIGHT = FIXED_ROW_COUNT * ROW_HEIGHT;
  const CONTAINER_HEIGHT = HEADER_HEIGHT + TABLE_BODY_HEIGHT;

  const rows = table.getRowModel().rows;
  const fillerCount = Math.max(0, FIXED_ROW_COUNT - rows.length);
  const allColumns = table.getAllColumns();

  const paginationButtonClass =
    "flex h-8 w-8 items-center justify-center border text-sm transition disabled:pointer-events-none disabled:opacity-40";

  const getRowBgClass = (index: number) =>
    index % 2 === 1 ? "bg-[#F1F3F4]" : "bg-white";

  return (
    <div className="overflow-hidden border border-gray-200 bg-white">
      <div
        className="w-full overflow-x-auto overflow-y-auto"
        style={{ height: `${CONTAINER_HEIGHT}px` }}
      >
        <table
          className="w-full border-collapse text-left text-sm"
          style={{
            tableLayout: "fixed",
            width: table.getTotalSize(),
            minWidth: "100%",
          }}
        >
          <thead className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-[#F1F3F4]"
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
                      className={`whitespace-nowrap border-b border-r border-gray-200 px-5 py-4 font-semibold text-gray-700 last:border-r-0
                        ${canSort ? "cursor-pointer select-none" : ""}
                        ${isAction ? "text-center" : ""}
                      `}
                    >
                      <div
                        className={`flex items-center gap-1.5 ${isAction ? "justify-center" : ""}`}
                      >
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
                  className={`border-b border-gray-200 ${getRowBgClass(index)}`}
                >
                  {allColumns.map((col) => (
                    <td
                      key={col.id}
                      style={{ width: col.getSize() }}
                      className="border-b border-r border-gray-200 px-5 py-4 last:border-r-0"
                    >
                      <div
                        className="h-4 animate-pulse rounded bg-gray-100"
                        style={{
                          width: `${60 + ((allColumns.indexOf(col) * 17) % 25)}%`,
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <>
                <tr
                  style={{ height: `${ROW_HEIGHT}px` }}
                  className={`border-b border-gray-200 ${getRowBgClass(0)}`}
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
                    className={`border-b border-gray-200 last:border-0 ${getRowBgClass(index + 1)}`}
                  >
                    {columns.map((_, colIdx) => (
                      <td
                        key={colIdx}
                        className="border-r border-gray-200 last:border-r-0"
                      />
                    ))}
                  </tr>
                ))}
              </>
            ) : (
              <>
                {rows.map((row, index) => (
                  <tr
                    key={row.id}
                    style={{ height: `${ROW_HEIGHT}px` }}
                    className={`border-b border-gray-200 last:border-0 ${
                      row.getIsSelected()
                        ? "bg-purple-50"
                        : getRowBgClass(index)
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isAction = cell.column.id === "action";
                      return (
                        <td
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                          className={`border-r border-gray-200 px-5 py-4 align-middle text-gray-700 last:border-r-0 ${
                            isAction ? "text-center" : ""
                          }`}
                        >
                          {isAction ? (
                            <div className="flex items-center justify-center">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </div>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {Array.from({ length: fillerCount }).map((_, index) => {
                  const rowIndex = rows.length + index;
                  return (
                    <tr
                      key={`filler-${index}`}
                      style={{ height: `${ROW_HEIGHT}px` }}
                      className={`border-b border-gray-200 last:border-0 ${getRowBgClass(rowIndex)}`}
                    >
                      {columns.map((_, colIdx) => (
                        <td
                          key={colIdx}
                          className="border-r border-gray-200 last:border-r-0"
                        />
                      ))}
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 px-5 py-3 text-sm text-gray-500">
        <span>
          showing {startEntry} to {endEntry} of {resolvedTotalEntries} entries.
        </span>

        <div className="flex items-center gap-2">
          {pageSizeOptions && (
            <select
              value={pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none transition focus:border-gray-400"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={`${paginationButtonClass} text-gray-400`}
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
                  className={`${paginationButtonClass} ${
                    item === currentPage
                      ? "border-gray-900 bg-gray-900 text-white "
                      : "text-gray-600"
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
              className={`${paginationButtonClass} text-gray-400`}
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

import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
  } from "@tanstack/react-table";
  import { HiSelector, HiChevronUp, HiChevronDown } from "react-icons/hi";
  
  interface CommonTableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    sorting: SortingState;
    onSortingChange: (sorting: SortingState) => void;
    // true khi sort được xử lý ở server (đổi sort -> gọi lại API), false thì TanStack tự sort client-side
    manualSorting?: boolean;
    isLoading?: boolean;
    emptyMessage?: string;
  }
  
  function CommonTable<T>({
    data,
    columns,
    sorting,
    onSortingChange,
    manualSorting = false,
    isLoading = false,
    emptyMessage = "No data available",
  }: CommonTableProps<T>) {
    const table = useReactTable({
      data,
      columns,
      state: { sorting },
      onSortingChange: (updater) => {
        const next = typeof updater === "function" ? updater(sorting) : updater;
        onSortingChange(next);
      },
      getCoreRowModel: getCoreRowModel(),
      manualSorting,
      ...(manualSorting ? {} : { getSortedRowModel: getSortedRowModel() }),
    });
  
    return (
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
    );
  }
  
  export default CommonTable;
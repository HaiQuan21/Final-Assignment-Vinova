import type { ColumnDef, SortingState } from "@tanstack/react-table";
import CommonTable from "../../../../components/CommonTable";
import { useGetPackageList } from "../hooks/useDoulaPackage/useGetPackageList";
import { useTableParams } from "../../../../hooks/useTableParams";
import { formatDate } from "../../../../lib/formatDate";
import type { DoulaPackage } from "../../../../constants/MainObjectClass";

interface PackagesTabProps {
  doulaId: string;
}
// ── Tab: Packages ─────────────────────────────────────────────────────────────
export function PackagesTab({ doulaId }: PackagesTabProps) {
  const { pagination, setPagination, sorting, setSorting } = useTableParams(25);
  const { data, totalEntries, isLoading } = useGetPackageList(doulaId);

    const packageColumns: ColumnDef<DoulaPackage>[] = [
      { accessorKey: "name", header: "Package Name", size: 280 },
      {
        accessorKey: "image",
        header: "Cover photo",
        size: 200,
        enableSorting: false,
        cell: (info) => {
          const url = info.getValue<string>();
          return url ? (
            <img src={url} className="h-10 w-16 rounded object-cover" alt="cover" />
          ) : (
            <span className="text-gray-300">—</span>
          );
        },
      },
      { accessorKey: "price", header: "Price", size: 150,cell: (info) => `$${info.getValue<string>()}` },
      {
        accessorKey: "createdDate",
        header: "Created date",
        size: 180,
        cell: (info) => formatDate(false,info.getValue<string>()),
      },
      { accessorKey: "numberOfClients", header: "Number of Clients", size: 180 },
      {
        id: "action",
        header: "Action",
        size: 100,
        enableSorting: false,
        cell: () => null,
      },
    ];
  
    return (
      <div className="p-4">
        <CommonTable
          data={data}
          columns={packageColumns}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          onPaginationChange={setPagination}
          manualPagination={false}
          pageSizeOptions={[10, 25, 50]}
          FIXED_ROW_COUNT={8}
          emptyMessage="No Results"
        />
      </div>
    );
  }
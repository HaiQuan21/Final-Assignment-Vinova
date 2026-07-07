import { useState } from "react";
import { usePagination } from "../../../../hooks/usePagination";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "../../../../lib/formatDate";
import CommonTable from "../../../../components/CommonTable";

export const mockPackages: {
    name: string;
    coverPhoto: string;
    price: string;
    createdDate: string;
    numberOfClients: number;
  }[] = [];

// ── Tab: Packages ─────────────────────────────────────────────────────────────
export function PackagesTab() {
    const [sorting, setSorting] = useState([]);
    const { pagination, setPagination } = usePagination(25);
  
    const packageColumns: ColumnDef<(typeof mockPackages)[0]>[] = [
      { accessorKey: "name", header: "Package Name", size: 280 },
      {
        accessorKey: "coverPhoto",
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
      { accessorKey: "price", header: "Price", size: 150 },
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
          data={mockPackages}
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
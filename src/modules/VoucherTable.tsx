import { useMemo, useState } from "react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import CommonTable from "../components/CommonTable";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";
import { usePagination } from "../hooks/usePagination";

interface Voucher {
  id: string;
  code: string;
  startDate: string;
  endDate: string;
  status: string;
  type: string,
  amount: string,
  quantityUse: number,
  minPayAmount: string,
  maxDiscountAmount: string,
  stripeCouponId: string,
  createdBy: string,
  updatedBy: string,
  createdAt: string,
  updatedAt: string,
  totalDoulas: string
}

const mockVouchers: Voucher[] = [
  {
    id: "d3d4d1f2-70bd-4ea5-b70e-1ddc311a43dc",
    code: "OTIS7",
    status: "Active",
    startDate: "16/10/2024 07:00",
    endDate: "12/10/2026 07:00",
    numberOfUse: "6/100",
  },
  {
    id: "295a0b80-dc8d-464e-b11b-4dfc49f58927",
    code: "VOUCHERTEST12345678",
    status: "Expired",
    startDate: "12/08/2024 07:00",
    endDate: "13/08/2024 07:00",
    numberOfUse: "0/1",
  },
];

function VoucherTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(25);

  // Trong thực tế lấy từ response API (vd: response.totalElements)
  const totalEntries = 122;

  const columns = useMemo<ColumnDef<Voucher>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => (
          <span className="block max-w-[220px] break-words text-gray-500">
            {info.getValue<string>()}
          </span>
        ),
      },
      { accessorKey: "code", header: "Code" },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusBadge status={info.getValue<string>()} />,
      },
      { accessorKey: "startDate", header: "Start Date" },
      { accessorKey: "endDate", header: "End Date" },
      { accessorKey: "numberOfUse", header: "Number Of Use" },
      {
        id: "action",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => (
          <ActionButtons
            onView={() => console.log("view", row.original.id)}
            onDelete={() => console.log("delete", row.original.id)}
          />
        ),
      },
    ],
    []
  );

  return (
    <div className="p-6">
      <CommonTable
        data={mockVouchers}
        columns={columns}
        sorting={sorting}
        onSortingChange={setSorting}
        manualSorting
        pagination={pagination}
        onPaginationChange={setPagination}
        manualPagination
        totalEntries={totalEntries}
      />
    </div>
  );
}

export default VoucherTable;
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import CommonTable from "../../components/CommonTable";
import StatusBadge from "../../components/StatusBadge";
import ActionButtons from "../../components/ActionButtons";
import { type Voucher } from "../../constants/MainObjectClass";
import { useNavigate } from "react-router-dom";

import ConfirmModal from "../../components/ConfirmModal";
import { formatDate } from "../../lib/formatDate";
import { useTableParams } from "../../hooks/useTableParams";
import { useGetVouchers } from "./hooks/useGetVoucher";
import { usePatchCareStatus } from "./hooks/usePatchCareStatus";

function VoucherTable() {

  const navigate = useNavigate();
  const { pagination, setPagination, sorting, setSorting } = useTableParams(25);

  const { data, totalEntries, isLoading,fetchVoucher } = useGetVouchers({
    pagination,
    sorting,
  });

  const {
    handleToggleCancel,
    handleToggleClick,
    handleToggleConfirm,
    targetVoucher,
    confirmOpen,
  } = usePatchCareStatus(fetchVoucher);

  const columns = useMemo<ColumnDef<Voucher>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => (
          <span className="block max-w-[220px] break-words text-gray-500">
            {info.getValue<string>()}
          </span>
        ),size:170
      },
      { accessorKey: "code", header: "Code" ,size:170},
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusBadge status={info.getValue<string>()} />,
        size:170
      },
      { accessorKey: "startDate", header: "Start Date" ,size:170, cell: (info) => formatDate(false,info.getValue<string>()),},
      { accessorKey: "endDate", header: "End Date" ,size:170, cell: (info) => formatDate(false,info.getValue<string>()),},
      {
        cell: ({ row }) =>
          `${row.original.numOfUsed}/${row.original.quantityUse}`,
        header: "Number Of Use",
        enableSorting: false,
        size:170
      },
      {
        id: "action",
        header: "Action",
        enableSorting: false,
        size: 170,
        cell: ({ row }) => {
          const voucher = row.original;
          const isInactive = voucher.status === "inactive";

          return(
          <ActionButtons
            onView={() => navigate(`/vouchers/${row.original.id}`)}
            onDelete={() => handleToggleClick(voucher)}
            deleteDisabled={isInactive}
          />
          )
      },
      },
    ],
    [],
  );

  return (
    <div className="p-6">
      <CommonTable
        data={data}
        columns={columns}
        sorting={sorting}
        onSortingChange={setSorting}
        manualSorting
        pagination={pagination}
        onPaginationChange={setPagination}
        manualPagination
        totalEntries={totalEntries}
        pageSizeOptions={[8, 25, 50, 100]}
        isLoading={isLoading}
        FIXED_ROW_COUNT={8}
        emptyMessage="No vouchers found"
      />
      <ConfirmModal
      isOpen={confirmOpen}
      title="Change Voucher Status?"
      message={
        targetVoucher
          ? `Change "${targetVoucher.code}" from ${targetVoucher.status} to inactive`
          : ""
      }
      confirmLabel="Confirm"
      onConfirm={handleToggleConfirm}
      onCancel={handleToggleCancel}
    />
    </div>
  );
}

export default VoucherTable;

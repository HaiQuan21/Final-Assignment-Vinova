import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import CommonTable from "../../components/CommonTable";
import StatusBadge from "../../components/StatusBadge";
import ActionButtons from "../../components/ActionButtons";
import { type Voucher } from "../../constants/MainObjectClass";
import { useNavigate } from "react-router-dom";
import { useVoucher } from "./hooks/useVoucher";
import ConfirmModal from "../../components/ConfirmModal";

function VoucherTable() {

  const navigate = useNavigate();

  const {
    data, totalEntries, isLoading,
    sorting, setSorting, pagination, setPagination,
    handleToggleClick, handleToggleConfirm,
    handleToggleCancel,
    confirmOpen,
    targetVoucher,
    isPending,
  } = useVoucher();

  console.log("Data Voucher trả về", data);

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
      { accessorKey: "startDate", header: "Start Date" ,size:170},
      { accessorKey: "endDate", header: "End Date" ,size:170},
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
          const isExpired = voucher.status === "expired";
          const isThisRowPending = isPending === voucher.id;

          return(
          <ActionButtons
            onType={"voucher"}
            onAction={() => navigate(`/vouchers/${row.original.id}`)}
            onDelete={() => handleToggleClick(voucher)}
            deleteDisabled={isExpired}
            isPendingDelete={isThisRowPending}
          />
          )
      },
      },
    ],
    [isPending],
  );

  return (
    <div className="p-6">
      <CommonTable
        data={data}
        columns={columns}
        sorting={sorting}
        onSortingChange={(newSorting) => {
          setSorting(newSorting);
          setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
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
          ? `Change "${targetVoucher.code}" from ${targetVoucher.status} to ${
              targetVoucher.status === "active" ? "inactive" : "active"
            }?`
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

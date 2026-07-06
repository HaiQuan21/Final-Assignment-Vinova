import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import type { ColumnDef } from "@tanstack/react-table";
import CommonTable from "../../components/CommonTable";
import { useVoucherDetail } from "./hooks/useVoucherDetail";
import type { VoucherDoula } from "../../constants/MainObjectClass";

function VoucherDetail() {
  const navigate = useNavigate();

  const {
    vouchersDetail,
    isVoucherDetailLoading,
    doulaVouchersDetail,
    setPagination,
    setSorting,
    sorting,
  } = useVoucherDetail();

  const usageData: VoucherDoula[] = doulaVouchersDetail ?? [];


  const usageColumns = useMemo<ColumnDef<VoucherDoula>[]>(
    () => [
      {
        accessorKey: "fullName",
        header: "Take by",
        size: 300,
        cell: ({ row }) => (
          <span>{row.original.doulaUser?.fullName || "-"}</span> 
        ),
      },

      {
        accessorKey: "updatedAt",
        header: "Date",
        size: 200,
        cell: (info) => {
          const raw = info.getValue<string>();
          if (!raw) return "-";
          return new Date(raw).toLocaleDateString("en-GB"); // DD/MM/YYYY
        },
      },
    ],
    [],
  );

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-GB");
  };

  const formatAmount = (amount?: string, type?: string) => {
    if (amount === undefined) return "-";
    return type === "percentage"
      ? `%${amount}`
      : `$${Number(amount).toFixed(2)}`;
  };

  const formatMoney = (value?: string) => {
    if (!value) return "-";
    return `${Number(value).toFixed(2)}`;
  };

  if (isVoucherDetailLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!vouchersDetail) return null;

  return (
    <div className="w-full overflow-hidden p-6">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate("/vouchers")}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
      >
        <HiArrowLeft size={18} />
        Back
      </button>

      {/* Voucher Information */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-base font-bold text-gray-900">
          Voucher Information
        </h2>

        {/* Row 1 — main info */}
        <div className="mb-4 flex flex-wrap gap-20">
          <div>
            <p className="text-xs text-gray-500">Code</p>
            <p className="font-semibold text-gray-900">{vouchersDetail.code}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Start Date</p>
            <p className="font-semibold text-gray-900">
              {formatDate(vouchersDetail.startDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">End Date</p>
            <p className="font-semibold text-gray-900">
              {formatDate(vouchersDetail.endDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Number Of Use</p>
            <p className="font-semibold text-gray-900">
              {(vouchersDetail as any).numOfUsed ?? 0}/{vouchersDetail.quantityUse}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Type of coupon</p>
            <p className="font-semibold text-gray-900">{vouchersDetail.type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Amount</p>
            <p className="font-semibold text-gray-900">
              {formatAmount(vouchersDetail.amount, vouchersDetail.type)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Condition</p>
            <p className="font-semibold text-gray-900">
              ${formatMoney(vouchersDetail.minPayAmount)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Max Discount Amount</p>
            <p className="font-semibold text-gray-900">
              ${formatMoney(vouchersDetail.maxDiscountAmount)}
            </p>
          </div>
        </div>

        {/* Row 2 — description */}
        <div>
          <p className="text-xs text-gray-500">Description</p>
          <p className="font-semibold text-gray-900">
            {vouchersDetail.description || "-"}
          </p>
        </div>
      </div>

      {/* Usage History Table */}
      <CommonTable
        data={usageData}
        columns={usageColumns}
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={{ pageIndex: 0, pageSize: 5 }}
        onPaginationChange={setPagination}
        manualPagination={false}
        emptyMessage="No usage history"
        FIXED_ROW_COUNT={5}
      />
    </div>
  );
}

export default VoucherDetail;

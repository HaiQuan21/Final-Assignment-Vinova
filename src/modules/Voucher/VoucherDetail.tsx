import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { toast } from "react-toastify";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { getListDoulaVoucher, getVouchersByCode, getVouchersById } from "./api/apiVoucher";
import type { Voucher } from "../../constants/MainObjectClass";
import CommonTable from "../../components/CommonTable";
import { usePagination } from "../../hooks/usePagination";

// Interface cho usage history item
interface VoucherUsage {
  id: string;
  userName: string;
  usedAt: string;
}

function VoucherDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(8);

  // useEffect(() => {
  //   if (!id) return;
  //   setIsLoading(true);
  //   getVouchersById(id)
  //     .then(({ data: res }) => {
  //       setVoucher(res.data);
  //       console.log("Data voucher Id được trả về",res)
  //     })
  //     .catch((err) => {
  //       toast.error(err?.response?.data?.message ?? "Failed to load voucher.");
  //       navigate("/vouchers");
  //     })
  //     .finally(() => setIsLoading(false));

  // }, [id]);

  // useEffect(() => {
  //   if (!id) return;
  //   setIsLoading(true);
  //   getListDoulaVoucher({
  //     f_voucherId: id;
  //     page: pagination.pageIndex + 1,
  //     limit: pagination.pageSize,
  //     offset: pagination.pageIndex * pagination.pageSize,
  //     search: search || undefined,
  //     sort: 
  //       sorting.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",") || undefined,
  //   })
  //     .then(({ data: res }) => {
  //       setVoucher(res.data);
  //       console.log("Data voucher Id được trả về",res)
  //     })
  //     .catch((err) => {
  //       toast.error(err?.response?.data?.message ?? "Failed to load voucher.");
  //       navigate("/vouchers");
  //     })
  //     .finally(() => setIsLoading(false));

  // }, [id]);

  // Usage history từ voucher data — tuỳ API trả về field gì
  // const usageData: VoucherUsage[] = useMemo(
  //   () => (voucher as any)?.usages ?? [],
  //   [voucher]
  // );

  const usageData: VoucherUsage[] = (voucher as any)?.usages ?? [];

  // const usageData = useMemo(() => {
  //   return mockUsageData;
  // }, []);

  const usageColumns = useMemo<ColumnDef<VoucherUsage>[]>(
    () => [
      {
        accessorKey: "userName",
        header: "Take by",
        size: 500,
        cell: (info) => (
          <span>{info.getValue<string>() || "-"}</span>
        ),
      },
      {
        accessorKey: "usedAt",
        header: "Date",
        size: 500,
        cell: (info) => {
          const raw = info.getValue<string>();
          if (!raw) return "-";
          return new Date(raw).toLocaleDateString("en-GB"); // DD/MM/YYYY
        },
      },
    ],
    []
  );

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-GB");
  };

  const formatAmount = (amount?: string , type?: string) => {
    if (amount === undefined) return "-";
    return type === "percentage" ? `%${amount}` : `$${Number(amount).toFixed(2)}`;
  };

  const formatMoney = (value?: string) => {
    if (!value) return "-";
    return `${Number(value).toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!voucher) return null;

  return (
    <div className="p-6">
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
            <p className="font-semibold text-gray-900">{voucher.code}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Start Date</p>
            <p className="font-semibold text-gray-900">
              {formatDate(voucher.startDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">End Date</p>
            <p className="font-semibold text-gray-900">
              {formatDate(voucher.endDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Number Of Use</p>
            <p className="font-semibold text-gray-900">
              {(voucher as any).numOfUsed ?? 0}/{voucher.quantityUse}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Type of coupon</p>
            <p className="font-semibold text-gray-900">{voucher.type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Amount</p>
            <p className="font-semibold text-gray-900">
              {formatAmount(voucher.amount, voucher.type)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Condition</p>
            <p className="font-semibold text-gray-900">
              ${formatMoney(voucher.minPayAmount)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Max Discount Amount</p>
            <p className="font-semibold text-gray-900">
              ${formatMoney(voucher.maxDiscountAmount)}
            </p>
          </div>
        </div>

        {/* Row 2 — description */}
        <div>
          <p className="text-xs text-gray-500">Description</p>
          <p className="font-semibold text-gray-900">
            {voucher.description || "-"}
          </p>
        </div>
      </div>

      {/* Usage History Table */}
      <CommonTable
        data={usageData}
        columns={usageColumns}
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={pagination}
        onPaginationChange={setPagination}
        manualPagination={false}
        emptyMessage="No usage history"
      />
    </div>
  );
}

export default VoucherDetail;
import CommonTable from "../../../../components/CommonTable";
import StatusBadge from "../../../../components/StatusBadge";
import { useTableParams } from "../../../../hooks/useTableParams";
import type { ColumnDef } from "@tanstack/react-table";
import { useDoulaSubscriptionDetail } from "../hooks/useDoulaSubscription/useDoulaSubscriptionDetail";
import { formatDate } from "../../../../lib/formatDate";

interface SubscriptionTabProps {
  doulaId: string;
}

// TODO: chưa có API cho Billing History, đang giữ mock — thay khi có endpoint
const mockBillingHistory = [
  { date: "27/02/2025 05:37", amount: "$0", status: "success", invoice: "#" },
  { date: "28/02/2025 06:38", amount: "$200.99", status: "success", invoice: "#" },
  { date: "01/03/2025 06:39", amount: "$200.99", status: "success", invoice: "#" },
  { date: "02/03/2025 06:38", amount: "$200.99", status: "success", invoice: "#" },
  { date: "03/03/2025 06:39", amount: "$200.99", status: "success", invoice: "#" },
];

// ── Tab: Subscription ────────────────────────────────────────────────────────
export function SubscriptionTab({ doulaId }: SubscriptionTabProps) {
  const { pagination, setPagination, sorting, setSorting } = useTableParams(25);
  const { data: subscription, isLoading: isSubLoading } = useDoulaSubscriptionDetail(doulaId);

  const billingColumns: ColumnDef<(typeof mockBillingHistory)[0]>[] = [
    { accessorKey: "date", header: "Date", size: 200 },
    { accessorKey: "amount", header: "Amount", size: 200 },
    {
      accessorKey: "status",
      header: "Status",
      size: 200,
      cell: (info) => <StatusBadge status={info.getValue<string>()} />,
    },
    {
      accessorKey: "invoice",
      header: "Invoice",
      size: 200,
      enableSorting: false,
      cell: () => (
        <a href="#" className="text-blue-500 hover:underline text-sm">
          Invoice
        </a>
      ),
    },
  ];

  return (
    <div className="flex gap-6 p-4">
      {/* Left: Subscription info card */}
      <div className="w-72 shrink-0">
        {isSubLoading ? (
          <div className="h-40 animate-pulse rounded-xl border border-gray-200 bg-gray-100" />
        ) : !subscription ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-400">
            No active subscription
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded bg-blue-100 p-1.5 text-blue-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-800">
                  {subscription.subscriptionPlanName}
                </span>
              </div>
              <span
                className={`text-sm font-medium ${
                  subscription.status === "active" ? "text-green-500" : "text-red-500"
                }`}
              >
                {subscription.status}
              </span>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium">
                  ${subscription.price.amount.toFixed(2)} - {subscription.price.count}{" "}
                  {subscription.price.interval}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Started</span>
                <span className="font-medium">{formatDate(false, subscription.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ends</span>
                <span className="font-medium">
                  {subscription.endTime ? formatDate(false, subscription.endTime) : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Next billing</span>
                <span className="font-medium">
                  {formatDate(false, subscription.nextBillingDate)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right: Billing History table */}
      <div className="flex-1">
        <h3 className="mb-3 text-base font-semibold text-gray-800">Billing History</h3>
        <CommonTable
          data={mockBillingHistory}
          columns={billingColumns}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          onPaginationChange={setPagination}
          manualPagination={false}
          pageSizeOptions={[10, 25, 50]}
          FIXED_ROW_COUNT={8}
          emptyMessage="No billing history"
        />
      </div>
    </div>
  );
}
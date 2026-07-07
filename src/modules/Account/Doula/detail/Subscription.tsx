
const mockSubscription = {
    name: "Test trim",
    status: "Cancelled",
    amount: "$200.99 - 1 month",
    started: "27 Feb 2025",
    ends: "28 Feb 2025",
  };

const mockBillingHistory = [
    { date: "27/02/2025 05:37", amount: "$0", status: "success", invoice: "#" },
    { date: "28/02/2025 06:38", amount: "$200.99", status: "success", invoice: "#" },
    { date: "01/03/2025 06:39", amount: "$200.99", status: "success", invoice: "#" },
    { date: "02/03/2025 06:38", amount: "$200.99", status: "success", invoice: "#" },
    { date: "03/03/2025 06:39", amount: "$200.99", status: "success", invoice: "#" },
  ];

// ── Tab: Subscription ────────────────────────────────────────────────────────
function SubscriptionTab() {
    const [sorting, setSorting] = useState([]);
    const { pagination, setPagination } = usePagination(25);
  
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
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded bg-blue-100 p-1.5 text-blue-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-800">{mockSubscription.name}</span>
              </div>
              <span className="text-sm font-medium text-red-500">{mockSubscription.status}</span>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium">{mockSubscription.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Started</span>
                <span className="font-medium">{mockSubscription.started}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ends</span>
                <span className="font-medium">{mockSubscription.ends}</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Right: Billing History table */}
        <div className="flex-1">
          <h3 className="mb-3 text-base font-semibold text-gray-800">
            Billing History
          </h3>
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
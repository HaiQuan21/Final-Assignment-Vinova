
const mockReviews: {
    avatar: string;
    fullName: string;
    rating: number;
    comment: string;
    date: string;
  }[] = [];

// ── Tab: Reviews ─────────────────────────────────────────────────────────────
export function ReviewsTab() {
    const [sorting, setSorting] = useState([]);
    const { pagination, setPagination } = usePagination(25);
    const averageRating = mockReviews.length
      ? mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length
      : null;
  
    const reviewColumns: ColumnDef<(typeof mockReviews)[0]>[] = [
      {
        id: "avatar",
        header: "Avatar",
        size: 80,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.avatar ? (
            <img
              src={row.original.avatar}
              className="h-9 w-9 rounded-full object-cover"
              alt="avatar"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-500">
              ?
            </div>
          ),
      },
      { accessorKey: "fullName", header: "Full name", size: 200 },
      {
        accessorKey: "rating",
        header: "Rating",
        size: 120,
        cell: (info) => (
          <span className="flex items-center gap-1">
            <HiStar className="text-yellow-400" size={16} />
            {info.getValue<number>()}
          </span>
        ),
      },
      { accessorKey: "comment", header: "Comment", size: 300 },
      {
        accessorKey: "date",
        header: "Date",
        size: 160,
        cell: (info) => formatDate(false,info.getValue<string>()),
      },
      {
        id: "action",
        header: "Action",
        size: 100,
        enableSorting: false,
        cell: () => null,
      },
    ];
    return (
        <div className="flex gap-6 p-4">
          {/* Left: Average rating */}
          <div className="w-56 shrink-0">
            <h3 className="mb-3 text-base font-semibold text-gray-800">
              Average Rating
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-800">
                {averageRating ? averageRating.toFixed(1) : "N/A"}
              </span>
              <HiStar className="text-yellow-400" size={24} />
            </div>
            <p className="mt-2 text-sm text-gray-400">
              {mockReviews.length === 0 ? "No Reviews Yet" : `${mockReviews.length} reviews`}
            </p>
          </div>
    
          {/* Right: Review history table */}
          <div className="flex-1">
            <h3 className="mb-3 text-base font-semibold text-gray-800">
              Review History
            </h3>
            <CommonTable
              data={mockReviews}
              columns={reviewColumns}
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
        </div>
      );
    }
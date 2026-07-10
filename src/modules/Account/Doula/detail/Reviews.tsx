import { useTableParams } from "../../../../hooks/useTableParams";
import type { ColumnDef } from "@tanstack/react-table";
import { HiStar } from "react-icons/hi2";
import { formatDate } from "../../../../lib/formatDate";
import CommonTable from "../../../../components/CommonTable";
import ConfirmModal from "../../../../components/ConfirmModal";
import type { DoulaReview } from "../../../../constants/MainObjectClass";
import { useGetDoulaReviewList } from "../hooks/useDoulaReview/useGetDoulaReviewList";
import { useGetDoulaReviewStar } from "../hooks/useDoulaReview/useGetDoulaReviewStar";
import { useDeleteDoulaReviewById } from "../hooks/useDoulaReview/useDeleteReviewById";

interface ReviewsTabProps {
  doulaId: string;
}

export function ReviewsTab({ doulaId }: ReviewsTabProps) {
  const { pagination, setPagination, sorting, setSorting } = useTableParams(25);
  const { data, totalEntries, isLoading, fetchDoulaReviewList } = useGetDoulaReviewList(doulaId);
  const { data: reviewStar, isLoading: isStarLoading } = useGetDoulaReviewStar(doulaId);

  const {
    deleteModalOpen,
    deletingDoula,
    isDeleting,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useDeleteDoulaReviewById(fetchDoulaReviewList);

  const reviewColumns: ColumnDef<DoulaReview>[] = [
    {
      id: "avatar",
      header: "Avatar",
      size: 80,
      enableSorting: false,
      cell: ({ row }) =>
        row.original.user?.picture ? (
          <img
            src={row.original.user.picture}
            className="h-9 w-9 rounded-full object-cover"
            alt="avatar"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-500">
            ?
          </div>
        ),
    },
    {
      id: "fullName",
      header: "Full name",
      size: 200,
      cell: ({ row }) => row.original.user?.fullName ?? "-",
    },
    {
      accessorKey: "start",
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
      accessorKey: "createdAt",
      header: "Date",
      size: 160,
      cell: (info) => formatDate(false, info.getValue<string>()),
    },
    {
      id: "action",
      header: "Action",
      size: 100,
      enableSorting: false,
      cell: ({ row }) => (
        <button
          onClick={() => handleDeleteClick(row.original)}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="flex gap-6 p-4">
      {/* Left: Average rating */}
      <div className="w-56 shrink-0">
        <h3 className="mb-3 text-base font-semibold text-gray-800">Average Rating</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-800">
            {isStarLoading ? "…" : reviewStar?.starAvg ? reviewStar.starAvg.toFixed(1) : "N/A"}
          </span>
          <HiStar className="text-yellow-400" size={24} />
        </div>
        <p className="mt-2 text-sm text-gray-400">
          {!reviewStar?.totalReview || reviewStar.totalReview === "0"
            ? "No Reviews Yet"
            : `${reviewStar.totalReview} reviews`}
        </p>
      </div>

      {/* Right: Review history table */}
      <div className="flex-1">
        <h3 className="mb-3 text-base font-semibold text-gray-800">Review History</h3>
        <CommonTable
          data={data}
          columns={reviewColumns}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          onPaginationChange={setPagination}
          manualPagination
          totalEntries={totalEntries}
          isLoading={isLoading}
          pageSizeOptions={[10, 25, 50]}
          FIXED_ROW_COUNT={8}
          emptyMessage="No Results"
        />
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete review"
        message={`Are you sure you want to delete this review${
          deletingDoula ? ` from ${deletingDoula.user?.fullName}` : ""
        }?`}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
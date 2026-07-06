import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import CommonTable from "../../../components/CommonTable";
import StatusBadge from "../../../components/StatusBadge";
import ActionButtons from "../../../components/ActionButtons";
import ConfirmModal from "../../../components/ConfirmModal";
import { useGetListOfDoula } from "./hooks/useGetListOfDoula";
import { useUpdateDoulaById } from "./hooks/useUpdateDoulaById";
import { useDeleteDoulaById } from "./hooks/useDeleteDoulaById";
import { usePagination } from "../../../hooks/usePagination";
import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import type { Doula } from "../../../constants/MainObjectClass";
import { formatDate } from "../../../lib/formatDate";
import { useNavigate } from "react-router-dom";

function DoulaTable() {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(25);

  const { data, totalEntries, isLoading, fetchListOfDoulas } =
    useGetListOfDoula({ pagination, sorting });

  const {
    editOpen, editingDoula, isSubmitting: isEditing, isFetching,
    handleEditClick, handleEditSubmit, handleEditClose,
  } = useUpdateDoulaById(fetchListOfDoulas);

  const {
    deleteModalOpen, deletingDoula, isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  } = useDeleteDoulaById(fetchListOfDoulas);

  const columns = useMemo<ColumnDef<Doula>[]>(
    () => [
      // ── Avatar ──────────────────────────────────────────────────────────
      {
        id: "avatar",
        header: "Avatar",
        size: 160,
        enableSorting: false,
        cell: ({ row }) => {
          const uri = row.original.picture?.metadata?.thumbnail?.uri
            ?? row.original.picture?.uri;
          return uri ? (
            <img
              src={uri}
              alt={row.original.user?.fullName ?? "avatar"}
              className="h-10 w-10 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(row.original.user?.fullName ?? "?") +
                  "&background=3A0099&color=fff";
              }}
            />
          ) : (
            // Fallback avatar khi không có ảnh
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-500">
              {(row.original.user?.firstName?.[0] ?? "?").toUpperCase()}
            </div>
          );
        },
      },
      // ── Full name ────────────────────────────────────────────────────────
      {
        id: "fullName",
        header: "Full name",
        size: 250,
        cell: ({ row }) => row.original.user?.fullName ?? "-"
        ,
      },
      // ── Email ────────────────────────────────────────────────────────────
      {
        id: "email",
        header: "Email",
        size: 300,
        cell: ({ row }) => row.original.user?.email ?? "-",
      },

      {
        id: "phoneNumber",
        header: "Phone number",
        size: 230,
        enableSorting: false,
        cell: ({row}) =>  row.original.user?.phoneNumber ?? "-",
      },
      // ── Birthday ─────────────────────────────────────────────────────────
      {
        id: "birthday",
        header: "Birthday",
        size: 250,
        cell: ({ row }) => formatDate(true,row.original.user?.birthDate) ?? "-", 
      },
      // ── Address ──────────────────────────────────────────────────────────
      {
        id: "address",
        header: "Address",
        size: 360,
        enableSorting: false,
        cell: ({ row }) => (
          <span className="line-clamp-2 text-gray-600">
            {row.original.address?.fullAddress ?? "-"}
          </span>
        ),
      },
      // ── Created Date ─────────────────────────────────────────────────────
      {
        id: "createdDate",
        header: "Created Date",
        size: 200,
        enableSorting: false,
        cell: ({row}) => formatDate(false,row.original.createdAt)?? "-",
      },
      // ── Last Access ──────────────────────────────────────────────────────
      {
        id: "lastAccess",
        header: "Last Access",
        size: 220,
        enableSorting: false,
        cell: ({row}) =>  row.original.user?.lastAccess ?? "-",
      },
      // ── Status ───────────────────────────────────────────────────────────
      {
        accessorKey: "status",
        header: "Status",
        size: 220,
        cell: (info) => <StatusBadge status={info.getValue<string>()} />,
      },
      // ── Action ───────────────────────────────────────────────────────────
      {
        id: "action",
        header: "Action",
        size: 120,
        enableSorting: false,
        cell: ({ row }) => (
          <ActionButtons
            onView={() => navigate(`/account/doula/${row.original.id}`)}
            onEdit={() => handleEditClick(row.original)}
            onDelete={() => handleDeleteClick(row.original)}
          />
        ),
      },
    ],
    []
  );

  return (
    <div className="p-6">
      <CommonTable
        data={data}
        columns={columns}
        sorting={sorting}
        onSortingChange={(s) => {
          setSorting(s);
          setPagination((p) => ({ ...p, pageIndex: 0 }));
        }}
        manualSorting
        pagination={pagination}
        onPaginationChange={setPagination}
        manualPagination
        totalEntries={totalEntries}
        pageSizeOptions={[10, 25, 50, 100]}
        isLoading={isLoading}
        FIXED_ROW_COUNT={8}
        emptyMessage="No doulas found"
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Doula?"
        message={`Are you sure you want to delete "${deletingDoula?.user?.fullName}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default DoulaTable;
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import CommonTable from "../../../components/CommonTable";
import StatusBadge from "../../../components/StatusBadge";
import ActionButtons from "../../../components/ActionButtons";
import ConfirmModal from "../../../components/ConfirmModal";
import { useGetListOfDoula } from "./hooks/useGetListOfDoula";
import { useUpdateDoulaById } from "./hooks/useUpdateDoulaById";
import { useDeleteDoulaById } from "./hooks/useDeleteDoulaById";
import type { Doula } from "../../../constants/MainObjectClass";
import { formatDate } from "../../../lib/formatDate";
import { useNavigate } from "react-router-dom";
import { useTableParams } from "../../../hooks/useTableParams";
import SlideOver from "../../../components/SlideOver";
import FormSkeleton from "../../../components/FormSkeleton";
import DoulaForm from "./DoulaForm";

const doulaFormFields = [
  { name: "phoneNumber", label: "Phone Number", type: "phone" as const, countryCodeName: "countryCode" },
  { name: "status", label: "Status", type: "select" as const, options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
];

function DoulaTable() {
  const navigate = useNavigate();
  const { pagination, setPagination, sorting, setSorting } = useTableParams(25);

  const { data, totalEntries, isLoading, fetchListOfDoulas } =
    useGetListOfDoula();

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
            {/* Edit SlideOver */}
            <SlideOver isOpen={editOpen} onClose={handleEditClose} title="Update Client">
        {isFetching ? (
          <FormSkeleton fields={doulaFormFields} />
        ) : editingDoula ? (
          <DoulaForm
            onSubmit={(values) =>
              handleEditSubmit({
                user: {
                  countryCode: values.countryCode,
                  phoneNumber: values.phoneNumber
              },
              deletedPhotos: []
              ,
              newPhotos: []
              ,
              title: editingDoula.title,
              description: editingDoula.description,
              qualifications: 
                  editingDoula.qualifications
              ,
              categoryIds: 
                  editingDoula.categories.id
              ,
              businessName: editingDoula.businessName,
              status: values.status
              })
            }
            isSubmitting={isEditing}
            defaultValues={{
              countryCode: editingDoula.user.countryCode ?? "+61",
              phoneNumber: editingDoula.user.phoneNumber ?? "",
              status: editingDoula.status,
            }}
          />
        ) : null}
      </SlideOver>

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
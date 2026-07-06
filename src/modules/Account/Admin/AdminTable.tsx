import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import CommonTable from "../../../components/CommonTable";
import StatusBadge from "../../../components/StatusBadge";
import ActionButtons from "../../../components/ActionButtons";
import SlideOver from "../../../components/SlideOver";
import ConfirmModal from "../../../components/ConfirmModal";
import AdminForm from "./AdminForm";
import { useAdmin } from "./hooks/useAdmin";
import type { AdminItem } from "../../../constants/MainObjectClass";
import FormSkeleton from "../../../components/FormSkeleton";
import { updateAdminFields } from "./AdminFormProps";
import { useUpdateAdminById } from "./hooks/useUpdateAdminById";
import { useDeleteAdminById } from "./hooks/useDeleteAdminById";
import { getCurrentUser } from "../../../lib/getCurrentUser";

function AdminTable() {
  const currentUser = getCurrentUser();
  const {
    data,
    totalEntries,
    isLoading,
    sorting,
    setSorting,
    pagination,
    setPagination,
    fetchAllAdmin,
  } = useAdmin();

  const {
    editOpen,
    editingAdmin,
    isSubmitting: isEditing,
    isFetching,
    toFormValues,
    handleEditClick,
    handleEditSubmit,
    handleEditClose,
  } = useUpdateAdminById(fetchAllAdmin);

  const {
    deleteModalOpen,
    deletingAdmin,
    isDeleting,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useDeleteAdminById(fetchAllAdmin);

  const columns = useMemo<ColumnDef<AdminItem>[]>(
    () => [
      { accessorKey: "username", header: "Username", size: 220 },
      { accessorKey: "firstName", header: "First Name", size: 220 },
      { accessorKey: "lastName", header: "Last Name", size: 220 },
      { accessorKey: "email", header: "Email", size: 240 },
      { accessorKey: "role", header: "Role", size: 220 },
      {
        accessorKey: "status",
        header: "Status",
        size: 220,
        cell: (info) => <StatusBadge status={info.getValue<string>()} />,
      },
      {
        id: "action",
        header: "Action",
        enableSorting: false,
        size: 130,
        cell: ({ row }) => {
          const isSelf = row.original.id === currentUser?.id;
          return (
            <ActionButtons
              onEdit={() => handleEditClick(row.original)}
              onDelete={
                isSelf ? undefined : () => handleDeleteClick(row.original)
              }
              deleteDisabled={isSelf}
            />
          );
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
        emptyMessage="No admin users found"
      />

      {/* Edit SlideOver */}
      <SlideOver
        isOpen={editOpen}
        onClose={handleEditClose}
        title="Update Admin User"
      >
        {isFetching ? (
          <FormSkeleton fields={updateAdminFields} />
        ) : editingAdmin ? (
          <AdminForm
            onSubmit={handleEditSubmit}
            isSubmitting={isEditing}
            defaultValues={toFormValues(editingAdmin)}
            targetAdminId={editingAdmin.id} // ← truyền id để AdminForm tự xác định isSelf
          />
        ) : null}
      </SlideOver>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Admin User?"
        message={`Are you sure you want to delete "${deletingAdmin?.username}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default AdminTable;

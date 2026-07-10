import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import CommonTable from "../../components/CommonTable";
import StatusBadge from "../../components/StatusBadge";
import ActionButtons from "../../components/ActionButtons";
import SlideOver from "../../components/SlideOver";
import ConfirmModal from "../../components/ConfirmModal";
import FormSkeleton from "../../components/FormSkeleton";
import CategoryForm from "./CategoryForm";
import type { Category } from "../../constants/MainObjectClass";
import { formatDate } from "../../lib/formatDate";
import { categoryFields } from "./categoryFormProps";
import { useTableParams } from "../../hooks/useTableParams";
import { useGetAllCategories } from "./hooks/useGetAllCategories";
import { useUpdateCategories } from "./hooks/useUpdateCategories";
import { useDeleteCategories } from "./hooks/useDeleteCategories";

function CategoryTable() {

  const { pagination, setPagination, sorting, setSorting } = useTableParams(8);

  const { data, totalEntries, isLoading, fetchAllCategories } = useGetAllCategories({
    pagination,
    sorting,
  });

  const {
    editOpen, editingCategory, isSubmitting: isEditing, isFetching,
    toFormValues, handleEditClick, handleEditSubmit, handleEditClose,
  } = useUpdateCategories(fetchAllCategories);

  const {
    deleteModalOpen, deletingCategory, isDeleting,
    handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  } = useDeleteCategories(fetchAllCategories);

  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 250,
      },
      {
        accessorKey: "image",
        header: "Image",
        size: 150,
        enableSorting: false,
        cell: ({row}) => {
          const uri = row.original.picture?.uri;
          if (!uri) return <span className="text-gray-300">—</span>;
          return (
            <img
              src={uri}
              alt={row.original.name}
              className="h-10 w-10 rounded object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        cell: (info) => <StatusBadge status={info.getValue<string>()} />,
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
        size: 200,
        cell: (info) => formatDate(false,info.getValue<string>()),
      },
      {
        id: "action",
        header: "Action",
        enableSorting: false,
        size: 120,
        cell: ({ row }) => (
          <ActionButtons
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
        pageSizeOptions={[8, 25, 50, 100]}
        isLoading={isLoading}
        FIXED_ROW_COUNT={8}
        emptyMessage="No categories found"
      />

      {/* Edit SlideOver */}
      <SlideOver
        isOpen={editOpen}
        onClose={handleEditClose}
        title="Edit Category"
      >
        {isFetching ? (
          <FormSkeleton fields={categoryFields} />
        ) : editingCategory ? (
          <CategoryForm
            onSubmit={handleEditSubmit}
            isSubmitting={isEditing}
            defaultValues={toFormValues(editingCategory)}
          />
        ) : null}
      </SlideOver>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Category?"
        message={`Are you sure you want to delete "${deletingCategory?.name}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default CategoryTable;
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import CommonTable from "../../components/CommonTable";
import StatusBadge from "../../components/StatusBadge";
import ActionButtons from "../../components/ActionButtons";
import SlideOver from "../../components/SlideOver";
import ConfirmModal from "../../components/ConfirmModal";
import ArticleForm from "./ArticleForm";
import { useArticle } from "./hooks/useArticle";
import type { Article } from "../../constants/MainObjectClass";

function ArticleTable() {
  const {
    data, totalEntries, isLoading,
    sorting, setSorting, pagination, setPagination,
    editOpen, editingArticle, isEditing, toFormValues, handleEditClick, handleEditSubmit, handleEditClose,
    deleteModalOpen, deletingArticle, handleDeleteClick, handleDeleteConfirm, handleDeleteCancel,
  } = useArticle();

  const columns = useMemo<ColumnDef<Article>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => (
          <span className="block max-w-[220px] break-words text-gray-500">
            {info.getValue<string>()}
          </span>
        ),
      },
      { accessorKey: "title", header: "Title" },
      { accessorKey: "author", header: "Author" },
      { accessorKey: "category.name", header: "Category" },
      { accessorKey: "createdAt", header: "Create Date" },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusBadge status={info.getValue<string>()} />,
      },
      {
        id: "action",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => (
          <ActionButtons
            onType="article"
            onAction={() => handleEditClick(row.original)}
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
        onSortingChange={(s) => { setSorting(s); setPagination((p) => ({ ...p, pageIndex: 0 })); }}
        manualSorting
        pagination={pagination}
        onPaginationChange={setPagination}
        manualPagination
        totalEntries={totalEntries}
        isLoading={isLoading}
      />

      <SlideOver isOpen={editOpen} onClose={handleEditClose} title="Edit Article">
        {editingArticle && (
          <ArticleForm
            onSubmit={handleEditSubmit}
            isSubmitting={isEditing}
            defaultValues={toFormValues(editingArticle)}
          />
        )}
      </SlideOver>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Article?"
        message={`Are you sure you want to delete "${deletingArticle?.title}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}

export default ArticleTable;
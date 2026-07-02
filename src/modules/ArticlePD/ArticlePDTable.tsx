import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import CommonTable from "../../components/CommonTable";
import StatusBadge from "../../components/StatusBadge";
import ActionButtons from "../../components/ActionButtons";
import SlideOver from "../../components/SlideOver";
import ConfirmModal from "../../components/ConfirmModal";
import ArticlePDForm from "./ArticlePDForm";
import { useArticlePD } from "./hooks/useArticlePD";
import type { ArticlePD } from "../../constants/MainObjectClass";
import FormSkeleton from "../../components/FormSkeleton";
import { articlepdFields } from "./articlepdFormProps";
interface ArticlePDProps {
  type: "article" | "pd";
}

function ArticlePDTable({ type }: ArticlePDProps) {
  const {
    data,
    totalEntries,
    isLoading,
    sorting,
    setSorting,
    pagination,
    setPagination,
    editOpen,
    editingArticle,
    isEditing,
    toFormValues,
    handleEditClick,
    handleEditSubmit,
    handleEditClose,
    isFetching,
    deleteModalOpen,
    deletingArticle,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    isDeleting,
  } = useArticlePD(type);

  const columns = useMemo<ColumnDef<ArticlePD>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => (
          <span className="block max-w-[220px] break-words text-gray-500">
            {info.getValue<string>()}
          </span>
        ),
        size: 170,
      },
      { accessorKey: "title", header: "Title", size: 170 },
      { accessorKey: "author", header: "Author", size: 170 },
      { accessorKey: "category.name", header: "Category", size: 170 },
      { accessorKey: "createdAt", header: "Create Date", size: 170 },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusBadge status={info.getValue<string>()} />,
        size: 170,
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
        size: 170,
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
        pageSizeOptions={[8, 25, 50, 100]}
        isLoading={isLoading}
        FIXED_ROW_COUNT={8}
      />

      <SlideOver
        isOpen={editOpen}
        onClose={handleEditClose}
        title="Edit Article"
      >
        {isFetching ? (
          <FormSkeleton fields={articlepdFields([])} />
        ) : // truyền [] vì category chưa load nhưng skeleton vẫn hiện đúng shape select
        editingArticle ? (
          <ArticlePDForm
            onSubmit={handleEditSubmit}
            isSubmitting={isEditing}
            defaultValues={toFormValues(editingArticle)}
          />
        ) : null}
      </SlideOver>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title={`Delete ${type === "article" ? "Article" : "PD Session"}?`}
        message={`Are you sure you want to delete "${deletingArticle?.title}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default ArticlePDTable;

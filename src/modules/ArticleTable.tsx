import { useEffect, useMemo, useState } from "react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommonTable from "../components/CommonTable";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";
import SlideOver from "../components/SlideOver";
import ConfirmModal from "../components/ConfirmModal";
import ArticleForm from "./ArticleForm";
import { usePagination } from "../hooks/usePagination";
import { getAllArticles, updateArticle, deleteMultipleArticles } from "../api/apiService";
import { type Article } from "../constants/MainObjectClass";
import type { ArticleFormValues } from "../constants/articleFormProps";
import { DEFAULT_IMAGE_URL } from "../constants/articleFormProps";

function ArticleTable() {
  const [data, setData] = useState<Article[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, setPagination } = usePagination(8);
  const [refetchKey, setRefetchKey] = useState(0);
  const refetch = () => setRefetchKey((prev) => prev + 1);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  // ── Edit state ───────────────────────────────────────────────────────────────
  const [editOpen, setEditOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Delete state ─────────────────────────────────────────────────────────────
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingArticle, setDeletingArticle] = useState<Article | null>(null);

  const toFormValues = (article: Article): ArticleFormValues => ({
    title: article.title ?? "",
    author: article.author ?? "",
    status: article.status ?? "",
    category: article.categoryId ?? "",
    duration: String(article.timeToRead ?? ""),
    image: (article.picture as any)?.uri ?? DEFAULT_IMAGE_URL,
    content: article.content ?? "",
  });

  // ── Edit handlers ────────────────────────────────────────────────────────────
  const handleEditClick = (article: Article) => {
    setEditingArticle(article);
    setEditOpen(true);
  };

  const handleEditSubmit = (values: ArticleFormValues) => {
    if (!editingArticle) return;
    setIsSubmitting(true);
    updateArticle(editingArticle.id, {
      title: values.title,
      content: values.content,
      picture: values.image,
      status: values.status,
      categoryId: values.category,
      timeToRead: Number(values.duration),
      type: "article",
    })
      .then((res) => {
        toast.success(res.data.message);
        setEditOpen(false);
        setEditingArticle(null);
        refetch();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred.");
      })
      .finally(() => setIsSubmitting(false));
  };

  // ── Delete handlers ──────────────────────────────────────────────────────────
  const handleDeleteClick = (article: Article) => {
    setDeletingArticle(article);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingArticle) return;

    deleteMultipleArticles([deletingArticle.id])
      .then((res) => {
        toast.success(res.data.message ?? "Đã xóa thành công.");
        setDeleteModalOpen(false);
        setDeletingArticle(null);
        refetch();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred.");
      });
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDeletingArticle(null);
  };
  // ────────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    setIsLoading(true);
    getAllArticles({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      search: search || undefined,
      sort: sorting.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",") || undefined,
    })
      .then(({ data: res }) => {
        setData(res.data);
        setTotalEntries(res.metadata.totalCount);
      })
      .finally(() => setIsLoading(false));
  }, [pagination.pageIndex, pagination.pageSize, sorting, search, refetchKey]);

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
        onSortingChange={(newSorting) => {
          setSorting(newSorting);
          setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
        manualSorting
        pagination={pagination}
        onPaginationChange={setPagination}
        manualPagination
        totalEntries={totalEntries}
        isLoading={isLoading}
      />

      {/* Edit SlideOver */}
      <SlideOver
        isOpen={editOpen}
        onClose={() => { setEditOpen(false); setEditingArticle(null); }}
        title="Edit Article"
      >
        {editingArticle && (
          <ArticleForm
            onSubmit={handleEditSubmit}
            isSubmitting={isSubmitting}
            defaultValues={toFormValues(editingArticle)}
          />
        )}
      </SlideOver>

      {/* Delete Confirm Modal */}
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
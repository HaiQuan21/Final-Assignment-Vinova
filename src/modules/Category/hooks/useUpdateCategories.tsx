import { useState } from "react";
import { toast } from "react-toastify";
import { getCategories, updateCategories } from "../api/apiCategory";
import type { Category } from "../../../constants/MainObjectClass";
import type { CategoryFormValues } from "../../../schemas/categorySchema";
import { DEFAULT_IMAGE_URL } from "../../ArticlePD/articlepdFormProps";

export function useUpdateCategories(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const toFormValues = (category: Category): CategoryFormValues => ({
    title: category.title ?? "",
    name: category.name ?? "",
    image: category.picture.uri ?? DEFAULT_IMAGE_URL,
    status: category.status ?? "active",
  });

  const handleEditClick = (category: Category) => {
    setIsFetching(true);
    setEditOpen(true);
    getCategories(category.id)
      .then(({ data: res }) => {
        setEditingCategory(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load category.");
        setEditOpen(false);
      })
      .finally(() => setIsFetching(false));
  };

  const handleEditSubmit = (values: CategoryFormValues) => {
    if (!editingCategory) return;
    setIsSubmitting(true);
    updateCategories(editingCategory.id, {
      title: values.title,
      name: values.name,
      image: values.image ?? DEFAULT_IMAGE_URL,
      status: values.status,
    })
      .then((res) => {
        toast.success(res.data.message);
        setEditOpen(false);
        setEditingCategory(null);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred, please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingCategory(null);
  };

  return {
    editOpen, editingCategory, isSubmitting, isFetching,
    toFormValues, handleEditClick, handleEditSubmit, handleEditClose,
  };
}
import { useState } from "react";
import { toast } from "react-toastify";
import { updateReviewById, getReviewDetail } from "../../api/Doula Reviews/apiDoulaReview";
import type { DoulaReview,DoulaReviewDetail } from "../../../../../constants/MainObjectClass";
import type { UpdateReviewByIdPayload } from "../../api/Doula Reviews/payloadAPIDoulaReview";

export function useUpdateDoulaById(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingDoula, setEditingDoula] = useState<DoulaReviewDetail | null>(null);

  const handleEditClick = (doula: DoulaReview) => {
    setIsFetching(true);
    setEditOpen(true);
    getReviewDetail(doula.id)
      .then(({ data: res }) => {
        setEditingDoula(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load doula data.");
        setEditOpen(false);
      })
      .finally(() => setIsFetching(false));
  };

  const handleEditSubmit = (values: UpdateReviewByIdPayload) => {
    if (!editingDoula) return;
    setIsSubmitting(true);
    updateReviewById(editingDoula.id, values)
      .then((res) => {
        toast.success(res.data.message ?? "Updated successfully.");
        setEditOpen(false);
        setEditingDoula(null);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred, please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingDoula(null);
  };

  return {
    editOpen, editingDoula, isSubmitting, isFetching,
    handleEditClick, handleEditSubmit, handleEditClose,
  };
}
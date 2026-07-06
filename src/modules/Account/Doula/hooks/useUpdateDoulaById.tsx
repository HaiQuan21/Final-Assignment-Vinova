import { useState } from "react";
import { toast } from "react-toastify";
import { getDoulaDetailById, updateDoulaById } from "../api/apiDoula";
import type { Doula, DoulaDetail } from "../../../../constants/MainObjectClass";
import type { UpdateDoulaPayload } from "../api/payloadAPIDoula";

export function useUpdateDoulaById(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingDoula, setEditingDoula] = useState<DoulaDetail | null>(null);

  const handleEditClick = (doula: Doula) => {
    setIsFetching(true);
    setEditOpen(true);
    getDoulaDetailById(doula.id)
      .then(({ data: res }) => {
        setEditingDoula(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load doula data.");
        setEditOpen(false);
      })
      .finally(() => setIsFetching(false));
  };

  const handleEditSubmit = (id: string, payload: UpdateDoulaPayload) => {
    setIsSubmitting(true);
    updateDoulaById(id, payload)
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
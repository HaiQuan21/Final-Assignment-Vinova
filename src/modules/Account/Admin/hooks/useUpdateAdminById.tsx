import { useState } from "react";
import { toast } from "react-toastify";
import { updateAdminById } from "../api/apiAdmin";
import type { AdminItem } from "../../../../constants/MainObjectClass";
import type { UpdateAdminFormValues } from "../../../../schemas/adminSchemas";
import { DEFAULT_IMAGE_URL } from "../../../ArticlePD/articlepdFormProps";
import { getAdminById } from "../api/apiAdmin";
export function useUpdateAdminById(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // ← loading khi fetch by id
  const [editingAdmin, setEditingAdmin] = useState<AdminItem | null>(null);

  const toFormValues = (admin: AdminItem): UpdateAdminFormValues => ({
    username: admin.username ?? "",
    firstName: admin.firstName ?? "",
    lastName: admin.lastName ?? "",
    email: admin.email ?? "",
    status: admin.status ?? "active",
    password: "", // không pre-fill password
  });

  const handleEditClick = (admin: AdminItem) => {
    setIsFetching(true);
    setEditOpen(true);
    getAdminById(admin.id)
      .then(({ data: res }) => {
        setEditingAdmin(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load admin data.");
        setEditOpen(false);
      })
      .finally(() => setIsFetching(false));
  };

  const handleEditSubmit = (values: UpdateAdminFormValues) => {
    if (!editingAdmin) return;
    setIsSubmitting(true);
    updateAdminById(editingAdmin.id, {
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      status: values.status,
      password: values.password ?? "",
      picture: DEFAULT_IMAGE_URL,
    })
      .then((res) => {
        toast.success(res.data.message ?? "Updated successfully.");
        setEditOpen(false);
        setEditingAdmin(null);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred, please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingAdmin(null);
  };

  return {
    editOpen, editingAdmin, isSubmitting, isFetching,
    toFormValues, handleEditClick, handleEditSubmit, handleEditClose,
  };
}
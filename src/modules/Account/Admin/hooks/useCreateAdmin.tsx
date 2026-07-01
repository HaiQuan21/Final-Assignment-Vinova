import { useState } from "react";
import { toast } from "react-toastify";
import { createAdmin } from "../api/apiAdmin";
import type { CreateAdminFormValues } from "../../../../schemas/adminSchemas";
import { DEFAULT_IMAGE_URL } from "../../../ArticlePD/articlepdFormProps";

export function useCreateAdmin(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = (values: CreateAdminFormValues) => {
    setIsSubmitting(true);
    createAdmin({
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      status: values.status,
      password: values.password,
      picture: DEFAULT_IMAGE_URL,
    })
      .then((res) => {
        toast.success(res.data.message);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred, please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return { handleCreate, isSubmitting };
}
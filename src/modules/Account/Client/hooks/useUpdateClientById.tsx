import { useState } from "react";
import { toast } from "react-toastify";
import { getUserById, editUserById } from "../api/apiClient";
import type { Client } from "../../../../constants/MainObjectClass";
import type { EditClientByIdPayload } from "../api/payloadAPIClient";

export function useUpdateClientById(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const toFormValues = (client: Client): EditClientByIdPayload => ({
    firstName: client.firstName ?? "",
    middleName: client.middleName ?? "",
    lastName: client.lastName ?? "",
    picture: client.picture?.uri ?? "",
    birthDate: client.birthDate ?? "",
    email: client.email ?? "",
    phoneNumber: client.phoneNumber ?? "",
    status: client.status ?? "active",
    verifiedEmail: client.verifiedEmail ?? false,
    countryCode: client.countryCode ?? "+61",
    verifiedPhoneNumber: client.verifiedPhoneNumber ?? false,
  });

  const handleEditClick = (client: Client) => {
    setIsFetching(true);
    setEditOpen(true);
    getUserById(client.id)
      .then(({ data: res }) => {
        setEditingClient(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load client data.");
        setEditOpen(false);
      })
      .finally(() => setIsFetching(false));
  };

  const handleEditSubmit = (values: EditClientByIdPayload) => {
    if (!editingClient) return;
    setIsSubmitting(true);
    editUserById(editingClient.id, values)
      .then((res) => {
        toast.success(res.data.message ?? "Updated successfully.");
        setEditOpen(false);
        setEditingClient(null);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingClient(null);
  };

  return {
    editOpen, editingClient, isSubmitting, isFetching,
    toFormValues, handleEditClick, handleEditSubmit, handleEditClose,
  };
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/apiClient";
import type { Client } from "../../../../constants/MainObjectClass";
import { toast } from "react-toastify";

export function useGetUserById() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserById = () => {
    if (!id) return;
    setIsLoading(true);
    getUserById(id)
      .then(({ data: res }) => {
        setData(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load client.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchUserById();
  }, [id]);

  return { data, isLoading, fetchUserById };
}
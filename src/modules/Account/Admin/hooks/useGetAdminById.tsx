import { useState } from "react";
import { getAdminById } from "../api/apiAdmin";
import type { AdminItem } from "../../../../constants/MainObjectClass";

export function useGetAdminById() {
  const [data, setData] = useState<AdminItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdminById = (id: string) => {
    setIsLoading(true);
    return getAdminById(id)
      .then(({ data: res }) => {
        setData(res.data);
        return res.data;
      })
      .finally(() => setIsLoading(false));
  };

  return { data, isLoading, fetchAdminById };
}
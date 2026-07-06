import { useState } from "react";
import { getDoulaDetailById } from "../api/apiDoula";
import type { DoulaDetail } from "../../../../constants/MainObjectClass";
import { toast } from "react-toastify";

export function useGetDoulaDetailById() {
  const [data, setData] = useState<DoulaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDoulaDetailById = (id: string) => {
    setIsLoading(true);
    return getDoulaDetailById(id)
      .then(({ data: res }) => {
        setData(res.data);
        return res.data as DoulaDetail;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load doula detail.");
      })
      .finally(() => setIsLoading(false));
  };

  return { data, isLoading, fetchDoulaDetailById };
}
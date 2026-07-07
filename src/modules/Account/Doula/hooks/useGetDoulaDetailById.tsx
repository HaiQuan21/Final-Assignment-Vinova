import { useState,useEffect } from "react";
import { getDoulaDetailById } from "../api/apiDoula";
import type { DoulaDetail } from "../../../../constants/MainObjectClass";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export function useGetDoulaDetailById() {
  const {id} = useParams<{id : string}>();
  const [data, setData] = useState<DoulaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDoulaDetailById = () => {
    setIsLoading(true);
    getDoulaDetailById(id)
      .then(({ data: res }) => {
        setData(res.data);
        console.log("Doula By Id được trả về",res);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load doula detail.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!id) return;
    fetchDoulaDetailById();
  }, [id]);

  return { data, isLoading, fetchDoulaDetailById };
}
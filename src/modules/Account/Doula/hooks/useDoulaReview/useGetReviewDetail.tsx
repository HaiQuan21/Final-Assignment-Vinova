import { useState,useEffect } from "react";
import { getReviewDetail } from "../../api/Doula Reviews/apiDoulaReview";
import type { DoulaReviewDetail } from "../../../../../constants/MainObjectClass";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export function useGetReviewDetailById() {
  const {id} = useParams<{id : string}>();
  const [data, setData] = useState<DoulaReviewDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviewDetailById = () => {
    setIsLoading(true);
    getReviewDetail(id)
      .then(({ data: res }) => {
        setData(res.data);
        console.log("Review Detail By Id được trả về",res);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load doula detail.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!id) return;
    fetchReviewDetailById();
  }, [id]);

  return { data, isLoading, fetchReviewDetailById };
}
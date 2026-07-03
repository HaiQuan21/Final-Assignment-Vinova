import { useState } from "react";
import { getCategories } from "../api/apiCategory";
import type { Category } from "../../../constants/MainObjectClass";

export function useGetCategoriesById() {
  const [data, setData] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategoryById = (id: string) => {
    setIsLoading(true);
    return getCategories(id)
      .then(({ data: res }) => {
        setData(res.data);
        return res.data as Category;
      })
      .finally(() => setIsLoading(false));
  };

  return { data, isLoading, fetchCategoryById };
}
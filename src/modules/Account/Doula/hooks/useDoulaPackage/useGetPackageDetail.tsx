import { useEffect, useState } from "react";
import { getPackageDetail } from "../../api/Doula Package/apiDoulaPackage";
import type { DoulaPackageDetail } from "../../../../../constants/MainObjectClass";
import { toast } from "react-toastify";

export function useGetPackageDetail(packageId?: string) {
  const [data, setData] = useState<DoulaPackageDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPackageDetail = (id: string) => {
    setIsLoading(true);
    getPackageDetail(id)
      .then(({ data: res }) => {
        setData(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Failed to load package detail.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (packageId) fetchPackageDetail(packageId);
  }, [packageId]);

  return { data, isLoading, fetchPackageDetail };
}
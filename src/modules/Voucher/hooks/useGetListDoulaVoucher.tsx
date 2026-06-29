import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { SortingState, PaginationState } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import { type VoucherDoula } from "../../../constants/MainObjectClass";
import { getListDoulaVoucher } from "../api/apiVoucher";

interface UseGetListDoulaVoucherParams {
    pagination: PaginationState;
    sorting: SortingState;
  }

export function useGetListDoulaVoucher({
    pagination,
    sorting,
  }: UseGetListDoulaVoucherParams) {
    const { id } = useParams<{ id: string }>();
    const voucherId = id;

    const [data, setData] = useState<VoucherDoula[]>([]);
    const [totalEntries, setTotalEntries] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
  
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const fetchListDoulaVoucherDetail = () => {
      setIsLoading(true);
      getListDoulaVoucher({
      f_voucherId: voucherId,
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      search: search || undefined,
      sort:
        sorting.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",") || undefined,
      })
        .then(({ data: res }) => {
          setData(res.data);
          setTotalEntries(res.metadata.totalCount);
        })
        .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchListDoulaVoucherDetail();
    }, [pagination.pageIndex, pagination.pageSize, sorting, search]);

  return {
    data,
    totalEntries,
    isLoading
  }
}

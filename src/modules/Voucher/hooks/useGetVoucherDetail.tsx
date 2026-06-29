import { useState } from "react";
import { getVouchersById } from "../api/apiVoucher";
import type { Voucher } from "../../../constants/MainObjectClass";
import { useParams } from "react-router-dom";


  export function useGetVouchersDetail() {
    
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<Voucher[]>([]);
    const [totalEntries, setTotalEntries] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    const fetchVoucherDetail = () => {
      setIsLoading(true);
      getVouchersById(id)
        .then(({ data: res }) => {
          setData(res.data);
          setTotalEntries(res.metadata.totalCount);
        })
        .finally(() => setIsLoading(false));
    };
  
    return { data, totalEntries, isLoading, fetchVoucherDetail };
  }
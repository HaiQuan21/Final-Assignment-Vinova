import { useState,useEffect } from "react";
import { getVouchersById } from "../api/apiVoucher";
import type { Voucher } from "../../../constants/MainObjectClass";
import { useParams } from "react-router-dom";


  export function useGetVouchersDetail() {
    
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<Voucher>();
    const [isLoading, setIsLoading] = useState(false);

    const fetchVoucherDetail = () => {
      setIsLoading(true);
      getVouchersById(id)
        .then(({ data: res }) => {
          setData(res.data);
          console.log("Data Voucher Detail lấy về",res)
        })
        .finally(() => setIsLoading(false));
    };

    useEffect(() => {
      if (!id) return;
      fetchVoucherDetail();
    }, [id]);
  
    return { data, isLoading, fetchVoucherDetail };
  }
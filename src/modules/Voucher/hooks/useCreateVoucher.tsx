import { useState } from "react";
import { toast } from "react-toastify";
import { createVoucher } from "../api/apiVoucher";
import type { VoucherFormValues } from "../voucherFormProps";

export function useCreateVoucher(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = (values: VoucherFormValues) => {
    setIsSubmitting(true);
    createVoucher({
      code: values.code,
      description: values.description,
      startDate: values.startDate,
      endDate: values.endDate,
      status: "active",
      type: values.typeOfCoupon,
      amount: Number(values.amount),
      quantityUse: Number(values.quantity),
      minPayAmount: Number(values.condition),
      maxDiscountAmount: Number(values.conditionMaxDiscount),
    })
      .then((res) => {
        toast.success(res.data.message);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred, please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return { handleCreate, isSubmitting };
}
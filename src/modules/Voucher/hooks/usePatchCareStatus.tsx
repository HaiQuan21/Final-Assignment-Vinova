import { useState } from "react";
import { toast } from "react-toastify";
import { patchCareStatus } from "../api/apiVoucher";
import type { Voucher } from "../../../constants/MainObjectClass";

export function usePatchCareStatus(onSuccess?: () => void) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetVoucher, setTargetVoucher] = useState<Voucher | null>(null);

  const handleToggleClick = (voucher: Voucher) => {
    if (voucher.status === "inactive") return;
    setTargetVoucher(voucher);
    setConfirmOpen(true);
  };

  const handleToggleConfirm = () => {
    if (!targetVoucher) return;

    const nextStatus ="inactive";

    patchCareStatus(targetVoucher.id, {
      code: targetVoucher.code,
      description: targetVoucher.description ?? "",
      startDate: targetVoucher.startDate,
      endDate: targetVoucher.endDate,
      status: nextStatus,
      type: targetVoucher.type,
      amount: Number(targetVoucher.amount),
      minPayAmount: Number(targetVoucher.minPayAmount),
      maxDiscountAmount: Number(targetVoucher.maxDiscountAmount),
    })
      .then((res) => {
        toast.success(res.data.message ?? `Status changed to ${nextStatus}.`);
        setConfirmOpen(false);
        setTargetVoucher(null);
        onSuccess?.();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "An error occurred.");
      })
  };

  const handleToggleCancel = () => {
    setConfirmOpen(false);
    setTargetVoucher(null);
  };

  return {
    handleToggleClick,
    handleToggleConfirm,
    handleToggleCancel,
    confirmOpen,
    targetVoucher,
  };
}

// ─── Vouchers ─────────────────────────────────────────────────────────────────
export interface VoucherPayload {
    code: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    type: string;
    amount: number;
    quantityUse: number;
    minPayAmount: number;
    maxDiscountAmount: number;
  }

  export interface GetVouchersParams{
    page?: number;
    limit?: number;
    offset?: number;
    search?: string;
    sort?: string;
    f_code?: string;
    f_status?: "active" | "inactive" | "expired";
    f_type?: "fixed" | "percent";
  }


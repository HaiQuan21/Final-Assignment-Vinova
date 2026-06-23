import { z } from "zod";

export const voucherSchema = z.object({
  code: z.string().min(1, "Code is required").max(50),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  quantity: z.string().min(1, "Quantity is required"),
  typeOfCoupon: z.string().min(1, "Type of coupon is required"),
  amount: z.string().min(1, "Amount is required"),
  condition: z.string().min(1, "Condition is required"),
  conditionMaxDiscount: z.string().min(1, "This field is required"),
});

export type VoucherFormValues = z.infer<typeof voucherSchema>;
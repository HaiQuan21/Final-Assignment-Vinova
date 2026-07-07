import { z } from "zod";
export const clientUpdateSchema = z.object({
    countryCode: z.string().min(1),
    phoneNumber: z.string().min(1, "Phone number is required"),
    status: z.string().min(1, "Status is required"),
  });
  
export type ClientUpdateFormValues = z.infer<typeof clientUpdateSchema>;
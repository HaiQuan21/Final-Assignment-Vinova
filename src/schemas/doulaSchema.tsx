import { z } from "zod";
export const doulaUpdateSchema = z.object({
    countryCode: z.string().min(1, "Required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    status: z.string().min(1, "Status is required"),
  });
  
  export type DoulaUpdateFormValues = z.infer<typeof doulaUpdateSchema>;
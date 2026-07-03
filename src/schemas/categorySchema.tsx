import { z } from "zod";

export const categorySchema = z.object({
  title: z.string().min(1, "This field is required."),
  name: z.string().min(1, "This field is required."),
  status: z.string().min(1, "This field is required."),
  image: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
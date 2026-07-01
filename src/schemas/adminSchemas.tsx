import { z } from "zod";

export const createAdminSchema = z.object({
  username: z.string().min(1, "This field is required."),
  firstName: z.string().min(1, "This field is required.").max(25),
  lastName: z.string().min(1, "This field is required.").max(25),
  email: z.string().min(1, "This field is required.").email("Invalid email"),
  status: z.string().min(1, "This field is required."),
  password: z.string().min(1, "This field is required."),
});

export const updateAdminSchema = z.object({
  username: z.string().min(1, "This field is required."),
  firstName: z.string().min(1, "This field is required.").max(25),
  lastName: z.string().min(1, "This field is required.").max(25),
  email: z.string().min(1, "This field is required.").email("Invalid email"),
  status: z.string().min(1, "This field is required."),
  password: z.string().optional().or(z.literal("")),
});

export type CreateAdminFormValues = z.infer<typeof createAdminSchema>;
export type UpdateAdminFormValues = z.infer<typeof updateAdminSchema>;

import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must be 8–32 characters long")
    .max(32, "Password must be 8–32 characters long"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Checklist rules gắn kèm schema để dùng trong UI
export const passwordRules = [
  {
    label: "8–32 characters long",
    test: (v: string) => v.length >= 8 && v.length <= 32,
  },
  {
    label: "Contain at least one uppercase letter",
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    label: "Contain at least one number",
    test: (v: string) => /[0-9]/.test(v),
  },
  {
    label: "Contain at least one special character",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];
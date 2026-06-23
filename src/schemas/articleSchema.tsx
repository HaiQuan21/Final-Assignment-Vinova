import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  status: z.string().min(1, "Status is required"),
  category: z.string().min(1, "Category is required"),
  duration: z.string().min(1, "Duration is required"),
  image: z.string().optional(),
  content: z.string().min(1, "Content is required"),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;
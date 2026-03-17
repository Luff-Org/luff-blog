import { z } from "zod";

export const CreateBlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  content: z.string().min(10, "Content must be at least 10 characters"),
  tags: z.string().transform((val) => val.split(",").map((t) => t.trim()).filter((t) => t !== "")),
});

export type CreateBlogInput = z.infer<typeof CreateBlogSchema>;

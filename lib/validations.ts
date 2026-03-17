import { z } from "zod";

export const CreateBlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  content: z.string().min(10, "Content must be at least 10 characters"),
  tags: z.string().transform((val) => val.split(",").map((t) => t.trim()).filter((t) => t !== "")),
});

export type CreateBlogInput = z.infer<typeof CreateBlogSchema>;

export const UpdateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  image: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

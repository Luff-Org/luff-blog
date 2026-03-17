"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CreateBlogSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const validatedFields = CreateBlogSchema.parse({
    title: formData.get("title"),
    content: formData.get("content"),
    tags: formData.get("tags"),
  });

  const { title, content, tags } = validatedFields;

  await prisma.blog.create({
    data: {
      title,
      content,
      authorId: session.user.id,
      tags: {
        connectOrCreate: tags.map((name) => ({
          where: { name },
          create: { name },
        })),
      },
    },
  });

  revalidatePath("/");
  return { success: true };
}

export async function deleteBlog(blogId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    select: { authorId: true },
  });

  if (!blog || blog.authorId !== session.user.id) {
    throw new Error("Unauthorized: Only author can delete their blog");
  }

  await prisma.blog.delete({
    where: { id: blogId },
  });

  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function getBlogs({
  search = "",
  tag = "",
  sort = "latest",
}: {
  search?: string;
  tag?: string;
  sort?: "latest" | "oldest";
}) {
  const order = sort === "oldest" ? "asc" : "desc";

  return await prisma.blog.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { content: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        tag ? { tags: { some: { name: tag } } } : {},
      ],
    },
    include: {
      author: {
        select: { name: true, image: true },
      },
      tags: true,
    },
    orderBy: { createdAt: order },
  });
}

export async function getBlogById(id: string) {
  return await prisma.blog.findUnique({
    where: { id },
    include: {
      author: {
        select: { name: true, image: true },
      },
      tags: true,
    },
  });
}

export async function getUserBlogs() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await prisma.blog.findMany({
    where: { authorId: session.user.id },
    include: { tags: true },
    orderBy: { createdAt: "desc" },
  });
}

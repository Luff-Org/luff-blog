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
  if (!id) {
    throw new Error("Blog ID is required");
  }

  return await prisma.blog.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
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

export async function updateBlog(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const tagsInput = (formData.get("tags") as string) || "";

  const validatedFields = CreateBlogSchema.safeParse({
    title,
    content,
    tags: tagsInput,
  });

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const blog = await prisma.blog.findUnique({
    where: { id },
    select: { authorId: true },
  });

  if (!blog || blog.authorId !== session.user.id) {
    throw new Error("Unauthorized: Only author can edit this blog");
  }

  const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);

  try {
    const tagRecords = await Promise.all(
      tags.map((name) =>
        prisma.tag.upsert({
          where: { name },
          update: {},
          create: { name },
        })
      )
    );

    await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        tags: {
          set: [],
          connect: tagRecords.map((tag) => ({ id: tag.id })),
        },
      },
    });

    revalidatePath("/");
    revalidatePath(`/blog/${id}`);
    revalidatePath("/dashboard");

    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Update failed" };
  }
}
import { getBlogById } from "@/actions/blog";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { EditBlogForm } from "@/components/edit-blog-form";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ correct

  const session = await auth();
  if (!session) redirect("/");

  const blog = await getBlogById(id);
  if (!blog) notFound();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
      <EditBlogForm blog={blog} />
    </div>
  );
}

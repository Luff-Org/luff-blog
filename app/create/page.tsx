import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CreateBlogForm } from "@/components/create-blog-form";

export default async function CreateBlogPage() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create New Post</h1>
        <p className="text-muted-foreground">
          Share your thoughts with the world. You can use markdown in the content.
        </p>
      </div>
      <CreateBlogForm />
    </div>
  );
}

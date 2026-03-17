import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserBlogs } from "@/actions/blog";
import { UserBlogList } from "@/components/user-blog-list";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const blogs = await getUserBlogs();

  return (
    <div className="max-w-5xl mx-auto py-12">
      <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 border-b pb-12">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">My Dashboard</h1>
          <p className="text-xl text-muted-foreground">Manage your articles and see their status.</p>
        </div>
        <Link 
          href="/create" 
          className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 h-12 group bg-primary hover:bg-primary/85 text-primary-foreground shadow-lg shadow-primary/20")}
        >
          <PlusCircle className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
          New Post
        </Link>
      </header>

      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-muted/20 rounded-3xl border-2 border-dashed">
          <h3 className="text-2xl font-bold mb-4">No posts yet</h3>
          <p className="text-muted-foreground mb-10 max-w-sm text-center">
            You haven't written any articles yet. Start sharing your voice with the world.
          </p>
          <Link 
            href="/create"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-12 h-12 border-primary/20 hover:border-primary/50 text-primary")}
          >
            Create Your First Blog
          </Link>
        </div>
      ) : (
        <UserBlogList blogs={blogs} />
      )}
    </div>
  );
}

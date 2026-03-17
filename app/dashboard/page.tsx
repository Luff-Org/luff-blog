import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserBlogs } from "@/actions/blog";
import { UserBlogList } from "@/components/user-blog-list";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import { DashboardStats } from "@/components/dashboard-stats";
import { DashboardChart } from "@/components/dashboard-chart";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const blogs = await getUserBlogs();

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <header className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-black tracking-tight mb-4 first-letter:uppercase">My dashboard</h1>
          <p className="text-xl text-muted-foreground font-medium opacity-70">Manage your articles and monitor your performance.</p>
        </div>
        <Link 
          href="/create" 
          className={cn(buttonVariants({ size: "lg" }), "rounded-2xl px-10 h-14 group bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/30 font-bold transition-all hover:scale-105")}
        >
          <PlusCircle className="mr-2.5 h-5 w-5 transition-transform group-hover:rotate-90 duration-500" />
          New post
        </Link>
      </header>

      <DashboardStats blogsCount={blogs.length} />
      
      <div className="grid grid-cols-1 gap-12">
        <DashboardChart />
        
        <div>
          <h2 className="text-3xl font-black tracking-tight mb-10 first-letter:uppercase">Recent articles</h2>
          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 bg-muted/10 rounded-[2.5rem] border-2 border-dashed border-muted/30">
              <h3 className="text-2xl font-bold mb-4">No posts yet</h3>
              <p className="text-muted-foreground mb-10 max-w-sm text-center font-medium opacity-60">
                You haven't written any articles yet. Start sharing your voice with the world.
              </p>
              <Link 
                href="/create"
                className={cn(buttonVariants({ variant: "outline" }), "rounded-2xl px-12 h-14 border-primary/20 hover:bg-primary/5 text-primary font-bold")}
              >
                Create your first blog
              </Link>
            </div>
          ) : (
            <UserBlogList blogs={blogs} />
          )}
        </div>
      </div>
    </div>
  );
}

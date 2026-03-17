import { getBlogById } from "@/actions/blog";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <div className="mb-12">
        <Link 
          href="/" 
          className={cn(buttonVariants({ variant: "ghost" }), "mb-8 p-0 hover:bg-transparent text-muted-foreground hover:text-primary group")}
        >
          <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-[1.1]">
          {blog.title}
        </h1>

        <div className="flex items-center justify-between border-y py-6 mb-8 border-muted/30">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/20 p-0.5">
              <AvatarImage src={blog.author.image || ""} />
              <AvatarFallback>{blog.author.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold text-lg">{blog.author.name}</span>
              <span className="text-sm text-muted-foreground">
                Published on {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {blog.tags.map((tag) => (
            <Link key={tag.name} href={`/?tag=${tag.name}`}>
              <Badge variant="secondary" className="px-3 py-1 text-[10px] font-bold bg-primary/5 text-primary border border-primary/10 rounded-lg hover:bg-primary/20 transition-all cursor-pointer">
                #{tag.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-primary whitespace-pre-wrap selection:bg-primary selection:text-primary-foreground">
        {blog.content}
      </div>

      <footer className="mt-20 pt-12 border-t border-muted/30">
        <div className="bg-primary/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="z-10 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Loved this read?</h3>
            <p className="text-muted-foreground">Share your thoughts on this story and join the conversation.</p>
          </div>
          <Button size="lg" className="z-10 group bg-primary hover:bg-primary/90 rounded-full px-8 h-12">
            Share <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:rotate-45" />
          </Button>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
        </div>
      </footer>
    </article>
  );
}

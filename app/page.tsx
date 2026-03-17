import { Suspense } from "react";
import { getBlogs } from "@/actions/blog";
import { BlogCard } from "@/components/blog-card";
import { FilterControls } from "@/components/filter-controls";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; tag?: string; sort?: string }>;
}) {
  const { query, tag, sort } = await searchParams;
  
  const blogs = await getBlogs({
    search: query,
    tag: tag,
    sort: sort as "latest" | "oldest",
  });

  return (
    <div className="container mx-auto px-6 pb-20">
      <HeroSection />

      <section className="max-w-6xl mx-auto mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight mb-1">Latest Updates</h2>
            <p className="text-muted-foreground text-sm font-medium">Recently published articles</p>
          </div>
          <FilterControls />
        </div>

        {tag && (
          <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Filtered:</span>
            <Badge className="px-3 py-1 bg-primary text-primary-foreground font-bold text-xs rounded-full">
              #{tag}
            </Badge>
            <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-all">
              Clear all
            </Link>
          </div>
        )}

        <Suspense fallback={<BlogGridSkeleton />}>
          {blogs.length === 0 ? (
            <div className="text-center py-32 bg-muted/20 rounded-3xl border border-dashed border-muted/50">
              <h3 className="text-2xl font-bold mb-2">No blogs found</h3>
              <p className="text-muted-foreground mb-8">Try adjusting your filters or search query.</p>
              <Link href="/create" className="inline-flex h-10 px-6 items-center bg-primary text-primary-foreground rounded-full font-bold text-sm">
                Write something new
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </Suspense>
      </section>
    </div>
  );
}

function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-4 p-6 bg-muted/10 rounded-2xl border border-muted/20 animate-pulse">
          <div className="flex gap-3 items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

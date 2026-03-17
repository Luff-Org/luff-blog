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

      <section className="max-w-7xl mx-auto mt-16 px-4">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-10 mb-16 border-b border-muted/20 pb-12">
          <div className="text-center xl:text-left shrink-0">
            <h2 className="text-4xl font-black tracking-tight mb-2">Latest Updates</h2>
            <p className="text-muted-foreground font-medium opacity-60">High-signal articles curated for you</p>
          </div>
          <div className="w-full xl:max-w-5xl">
            <FilterControls />
          </div>
        </div>

        {tag && (
          <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <span className="text-xs font-bold text-muted-foreground opacity-60">Filtered by:</span>
            <Badge className="px-3 py-1 bg-primary text-primary-foreground font-bold text-xs rounded-full">
              #{tag}
            </Badge>
            <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-all font-medium">
              Clear filters
            </Link>
          </div>
        )}

        <Suspense fallback={<BlogGridSkeleton />}>
          {blogs.length === 0 ? (
            <div className="text-center py-32 bg-muted/10 rounded-[2rem] border border-dashed border-muted/50">
              <h3 className="text-3xl font-black mb-4">Empty feed</h3>
              <p className="text-muted-foreground mb-10 max-w-sm mx-auto font-medium opacity-60">
                No high-signal updates found for this query.
              </p>
              <Link href="/create" className="inline-flex h-12 px-8 items-center bg-primary text-primary-foreground rounded-full font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-primary/20">
                Post new update
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

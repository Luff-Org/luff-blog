import { Suspense } from "react";
import { getBlogs } from "@/actions/blog";
import { BlogCard } from "@/components/blog-card";
import { FilterControls } from "@/components/filter-controls";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
    <div className="max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Discover <span className="text-primary italic">Perspectives</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          A space for clear thoughts and deep dives into technology, design, and life.
        </p>
      </header>

      <FilterControls />

      {tag && (
        <div className="flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-left-2 duration-300">
          <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Filtered by:</span>
          <Badge variant="outline" className="px-3 py-1 bg-primary/5 text-primary border-primary/20">
            #{tag}
          </Badge>
          <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline">
            Remove filter
          </Link>
        </div>
      )}

      <Suspense fallback={<BlogGridSkeleton />}>
        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
            <h3 className="text-2xl font-semibold mb-2">No blogs found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
}

function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-4 p-4 border rounded-xl animate-pulse">
          <div className="flex gap-3 items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-6 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

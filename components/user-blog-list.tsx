"use client";

import { deleteBlog } from "@/actions/blog";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, Edit2, Layout, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UserBlogListProps {
  blogs: any[];
}

export function UserBlogList({ blogs: initialBlogs }: UserBlogListProps) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error("Failed to delete blog");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full grow flex flex-col justify-between overflow-hidden border-muted/30 bg-background/50 backdrop-blur-3xl hover:bg-background/95 hover:border-primary/30 hover:shadow-[0_40px_80px_-15px_rgba(var(--primary-rgb),0.15)] transition-all duration-500 rounded-[2.5rem] p-8 border-[1.5px] relative group">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-2.5">
                  {blog.tags.map((tag: any) => (
                    <span
                      key={tag.name}
                      className="px-4 py-1.5 text-[10px] font-bold tracking-tight bg-primary/10 text-primary rounded-xl border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all duration-300"
                    >
                      {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-black leading-tight tracking-tight group-hover:text-primary transition-colors duration-300 first-letter:uppercase">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 font-medium opacity-75 group-hover:opacity-100 transition-opacity">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <div className="flex items-center text-[11px] text-muted-foreground font-semibold opacity-50 gap-2 uppercase tracking-widest">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 flex items-center gap-4 border-t border-muted/10">
                <Link
                  href={`/blog/${blog.id}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "grow h-12 rounded-2xl font-black border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300",
                  )}
                >
                  View post
                </Link>

                <Link
                  href={`/edit/${blog.id}`}
                  className="h-12 w-12 rounded-2xl flex items-center justify-center bg-primary/5 border border-primary/10 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Edit2 className="h-5 w-5" strokeWidth={2.5} />
                </Link>

                <Dialog>
                  <DialogTrigger>
                    <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-destructive bg-destructive/5 border border-destructive/10 hover:bg-destructive hover:text-white transition-all duration-300 cursor-pointer group/delete">
                      <Trash2 className="h-5 w-5" strokeWidth={2.5} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="rounded-[2.5rem] p-8 border-muted/30 bg-background/95 backdrop-blur-3xl shadow-2xl">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="text-3xl font-black tracking-tight mb-2">
                        Delete blog?
                      </DialogTitle>
                      <DialogDescription className="text-base text-muted-foreground font-medium">
                        This action cannot be undone. This will permanently
                        delete your blog post and remove it from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="ghost"
                        className="rounded-2xl px-8 h-12 flex-1 font-bold border border-muted/20"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(blog.id)}
                        disabled={deletingId === blog.id}
                        className="rounded-2xl px-8 h-12 flex-1 font-bold shadow-lg shadow-destructive/20"
                      >
                        {deletingId === blog.id
                          ? "Deleting..."
                          : "Confirm delete"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

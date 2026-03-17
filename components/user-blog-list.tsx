"use client";

import { deleteBlog } from "@/actions/blog";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
            <Card className="h-full group hover:shadow-xl hover:-translate-y-2 transition-all p-2 rounded-3xl border-muted/30">
              <CardHeader className="p-6 relative">
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag: any) => (
                    <Badge key={tag.name} variant="secondary" className="bg-primary/5 text-primary text-[10px] uppercase font-bold tracking-widest px-2 py-0.5">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="leading-tight text-xl mb-2 line-clamp-2">{blog.title}</CardTitle>
                <div className="flex items-center text-xs text-muted-foreground gap-2">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed h-10">
                  {blog.content.substring(0, 100)}...
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-4 mt-auto">
                <Link 
                  href={`/blog/${blog.id}`} 
                  className={cn(buttonVariants({ variant: "ghost" }), "flex-1 rounded-2xl h-10 hover:bg-primary/5 hover:text-primary border border-primary/10")}
                >
                  View Post
                </Link>
                
                <Dialog>
                  <DialogTrigger>
                    <Button variant="ghost" className="rounded-2xl h-10 w-10 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive border border-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl max-w-[400px]">
                    <DialogHeader className="p-4">
                      <DialogTitle className="text-2xl font-black mb-2">Delete blog?</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        This action cannot be undone. This will permanently delete your
                        blog post and remove it from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                      <Button variant="ghost" className="rounded-full px-8 h-12 flex-1">
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(blog.id)}
                        disabled={deletingId === blog.id}
                        className="rounded-full px-8 h-12 flex-1"
                      >
                        {deletingId === blog.id ? "Deleting..." : "Confirm Delete"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

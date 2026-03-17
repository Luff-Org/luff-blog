"use client";

import { useState } from "react";
import { createBlog } from "@/actions/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function CreateBlogForm() {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading || isSubmitted) return;
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await createBlog(formData);
      if (result?.success) {
        setIsSubmitted(true);
        toast.success("Blog created successfully!");
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create blog");
      }
    } catch (error) {
      toast.error("Failed to create blog. Please try again.");
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <Label htmlFor="title" className="text-lg font-semibold">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter a catchy title..."
          required
          autoComplete="off"
          className="h-12 text-lg focus-visible:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content" className="text-lg font-semibold">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="What's on your mind? (Markdown supported)"
          required
          className="min-h-[300px] text-base leading-relaxed py-4 focus-visible:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags" className="text-lg font-semibold">Tags</Label>
        <Input
          id="tags"
          name="tags"
          placeholder="tech, writing, lifestyle (comma separated)"
          autoComplete="off"
          className="h-12 focus-visible:ring-primary/20"
        />
        <p className="text-sm text-muted-foreground">Separate tags with commas.</p>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-muted/30">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={loading || isSubmitted}
          className="h-12 px-8 rounded-full"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading || isSubmitted}
          className="h-12 px-8 rounded-full font-bold group select-none"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : isSubmitted ? (
            <PlusCircle className="mr-2 h-4 w-4" />
          ) : (
            <PlusCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          )}
          {loading ? "Publishing..." : isSubmitted ? "Published" : "Publish Post"}
        </Button>
      </div>
    </motion.form>
  );
}

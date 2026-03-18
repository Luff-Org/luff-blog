"use client";

import { useState } from "react";
import { updateBlog } from "@/actions/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function EditBlogForm({ blog }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(blog.title || "");
  const [content, setContent] = useState(blog.content || "");
  const [tags, setTags] = useState(
    blog.tags?.map((t: any) => t.name).join(", ") || "",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("id", blog.id);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);

    try {
      const res = await updateBlog(formData);

      if (res?.success) {
        toast.success("Blog updated!");
        router.push(`/blog/${blog.id}`);
        router.refresh();
        return;
      }

      throw new Error();
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <Label className="text-lg font-semibold">Title</Label>
        <Input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-12 text-lg focus-visible:ring-primary/20"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label className="text-lg font-semibold">Content</Label>
        <Textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] text-base leading-[1.6] py-4 focus-visible:ring-primary/20"
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label className="text-lg font-semibold">Tags</Label>
        <Input
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="h-12 focus-visible:ring-primary/20"
        />
        <p className="text-sm text-muted-foreground">
          Separate tags with commas.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t border-muted/30">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={loading}
          className="h-12 px-8 rounded-full"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="h-12 px-8 rounded-full font-bold"
        >
          {loading ? "Updating..." : "Update Blog"}
        </Button>
      </div>
    </form>
  );
}

"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    author: {
      name: string | null;
      image: string | null;
    };
    tags: {
      name: string;
    }[];
  };
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/blog/${blog.id}`}>
        <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={blog.author.image || ""} />
              <AvatarFallback>{blog.author.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none">{blog.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
              </p>
            </div>
          </CardHeader>
          <CardContent className="grow">
            <CardTitle className="mb-2 line-clamp-2">{blog.title}</CardTitle>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {blog.content.substring(0, 150)}...
            </p>
          </CardContent>
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag.name} variant="secondary" className="hover:bg-primary hover:text-primary-foreground">
                  #{tag.name}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/blog/${blog.id}`}>
        <Card className="h-full flex flex-col justify-between overflow-hidden border-muted/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all rounded-2xl">
          <div>
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
              <Avatar className="h-7 w-7">
                <AvatarImage src={blog.author.image || ""} />
                <AvatarFallback>{blog.author.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-xs font-bold leading-none">{blog.author.name}</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                </p>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardTitle className="mb-3 text-xl font-bold tracking-tight line-clamp-2">
                {blog.title}
              </CardTitle>
              <div className="text-muted-foreground text-sm leading-relaxed line-clamp-3 font-medium">
                {blog.content.substring(0, 150)}...
              </div>
            </CardContent>
          </div>
          <CardFooter className="pt-0 pb-6">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge 
                  key={tag.name} 
                  variant="secondary" 
                  className="px-2.5 py-0.5 text-[10px] font-bold bg-primary/5 text-primary border-none rounded-full"
                >
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

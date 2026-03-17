"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
      whileHover={{ scale: 1.01, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link href={`/blog/${blog.id}`} className="group h-full flex">
        <Card className="h-full flex grow flex-col justify-between overflow-hidden border-muted/30 bg-background/50 backdrop-blur-3xl group-hover:bg-background/95 group-hover:border-primary/30 group-hover:shadow-[0_40px_80px_-15px_rgba(var(--primary-rgb),0.15)] transition-all duration-500 rounded-[2.5rem] p-8 border-[1.5px] relative">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2.5">
              {blog.tags.map((tag) => (
                <span 
                  key={tag.name} 
                  className="px-4 py-1.5 text-[10px] font-bold tracking-tight bg-primary/10 text-primary rounded-xl border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all duration-300"
                >
                  {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-black leading-tight tracking-tighter group-hover:text-primary transition-colors duration-300 first-letter:uppercase">
                {blog.title}
              </h3>
              <p className="text-muted-foreground text-[16px] leading-relaxed line-clamp-3 font-medium opacity-75 group-hover:opacity-100 transition-opacity">
                {blog.content.substring(0, 150)}...
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 flex items-center justify-between border-t border-muted/10">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 ring-4 ring-primary/5 group-hover:ring-primary/20 transition-all duration-500">
                <AvatarImage src={blog.author.image || ""} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {blog.author.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground/90">{blog.author.name}</span>
                <span className="text-[11px] text-muted-foreground font-medium opacity-60">
                  {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
            
            <div className="h-12 w-12 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:rotate-45 shadow-sm">
              <ArrowUpRight className="h-6 w-6" strokeWidth={2.5} />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

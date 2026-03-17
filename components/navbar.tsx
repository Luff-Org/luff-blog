"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, PlusCircle, User, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
          Luff<span className="text-primary">Blog</span>
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {status === "loading" ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : session ? (
            <>
              <Link 
                href="/create" 
                className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:flex")}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Blog
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost" }), "relative h-8 w-8 rounded-full p-0")}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="sm:hidden">
                    <Link href="/create" className="flex items-center w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Blog
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={() => signIn("google")}>Login</Button>
          )}
        </div>
      </div>
    </nav>
  );
}

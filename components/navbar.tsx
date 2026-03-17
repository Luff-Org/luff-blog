"use client";

import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Loader2, Plus } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-extrabold text-xl shadow-lg shadow-primary/20">
            L
          </div>
          <span className="font-bold text-xl tracking-tight">Luff <span className="text-primary">Blog</span></span>
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />
          
          {status === "loading" ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link 
                href="/create" 
                className={cn(buttonVariants({ variant: "default", size: "sm" }), "hidden sm:flex rounded-full px-4")}
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Write
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback className="font-bold">{session.user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-xl">
                  <DropdownMenuItem className="rounded-lg cursor-pointer">
                    <Link href="/dashboard" className="flex items-center w-full font-medium">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer font-medium"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button 
              size="sm"
              onClick={() => signIn("google")} 
              className="rounded-full px-5 font-bold"
            >
              Get started
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

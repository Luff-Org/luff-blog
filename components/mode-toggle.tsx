"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
        <div className="h-4 w-4" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 border border-muted/20 bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-all active:scale-95"
    >
      <Sun className="h-4 w-4 text-amber-500 transition-all dark:hidden" />
      <Moon className="hidden h-4 w-4 text-indigo-400 transition-all dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

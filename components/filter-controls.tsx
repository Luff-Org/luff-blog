"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

export function FilterControls() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSortChange = (sort: string | null) => {
    if (!sort) return;
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    replace(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    replace(pathname);
  };

  const currentQuery = searchParams.get("query") || "";
  const currentSort = searchParams.get("sort") || "latest";

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full">
      <div className="relative grow w-full lg:max-w-3xl">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground opacity-50" />
        <Input
          key={currentQuery}
          placeholder="Search blogs..."
          defaultValue={currentQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-14 h-14 text-base rounded-2xl bg-muted/10 border-muted/20 focus:border-primary/30 transition-all shadow-sm w-full"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto h-full">
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-[220px] h-14 rounded-2xl border-muted/20 bg-muted/10 px-6 font-semibold transition-all hover:bg-muted/20">
            <SelectValue placeholder="Sort by">
              {currentSort === "latest" ? "Latest first" : "Oldest first"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-muted/20 shadow-2xl">
            <SelectItem value="latest">Latest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>

        {(currentQuery || searchParams.get("tag")) && (
          <Button 
            variant="ghost" 
            onClick={clearFilters} 
            className="h-14 rounded-2xl px-6 hover:bg-destructive/10 hover:text-destructive transition-all font-semibold border border-muted/10 hover:border-destructive/20 bg-muted/5 flex items-center justify-center whitespace-nowrap"
          >
            <X className="h-4 w-4 mr-2" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}

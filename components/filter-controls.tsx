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
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          key={currentQuery}
          placeholder="Search blogs..."
          defaultValue={currentQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 h-10 rounded-full bg-muted/30 focus-visible:bg-background transition-colors"
        />
      </div>
      
      <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>

        {(currentQuery || searchParams.get("tag") || currentSort !== "latest") && (
          <Button variant="ghost" onClick={clearFilters} className="h-10">
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}

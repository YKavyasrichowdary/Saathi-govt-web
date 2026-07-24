"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

interface Props {
  initialQuery?: string;
}

export default function OpportunitySearch({ initialQuery = "" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQueryParam = searchParams.get("q") ?? initialQuery;

  const [query, setQuery] = useState(currentQueryParam);

  useEffect(() => {
    setQuery(currentQueryParam);
  }, [currentQueryParam]);

  const handleSearch = (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/opportunities?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/opportunities");
    }
  };

  const handleClear = () => {
    setQuery("");
    router.push("/opportunities");
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-3 w-full max-w-2xl">
      <div className="relative flex-1 flex items-center">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search opportunities..."
          className="w-full rounded-2xl border border-border bg-surface py-3.5 pl-12 pr-10 text-sm placeholder:text-muted-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1.5 rounded-full transition-colors hover:bg-muted"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="btn-primary shrink-0 py-3.5 px-6"
      >
        Search
      </button>
    </form>
  );
}

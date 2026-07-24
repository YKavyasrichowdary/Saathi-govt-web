"use client";

import { useRouter } from "next/navigation";
import { Opportunity } from "@prisma/client";
import OpportunityCard, { OpportunityWithBookmarks } from "./OpportunityCard";

interface Props {
  opportunities: (Opportunity | OpportunityWithBookmarks)[];
  search?: string;
}

const SUGGESTED_SEARCHES = ["scholarship", "internship", "AI", "Google"];

export default function OpportunityGrid({
  opportunities,
  search,
}: Props) {
  const router = useRouter();

  if (!opportunities.length) {
    return (
      <div className="surface-card rounded-2xl p-12 text-center max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            {search
              ? `No opportunities matched "${search}".`
              : "No opportunities found."}
          </h2>
          <p className="text-sm text-muted-foreground">
            Check back soon or try searching for different terms.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <p className="text-xs font-semibold text-eyebrow uppercase tracking-wider">
            Try:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTED_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => router.push(`/opportunities?q=${encodeURIComponent(term)}`)}
                className="chip hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                • {term}
              </button>
            ))}
          </div>
        </div>

        {search && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => router.push("/opportunities")}
              className="btn-ghost text-sm py-2 px-5"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground font-medium">
        {search ? (
          <span>
            {opportunities.length}{" "}
            {opportunities.length === 1 ? "opportunity" : "opportunities"} found
          </span>
        ) : (
          <span>
            Showing all {opportunities.length}{" "}
            {opportunities.length === 1 ? "opportunity" : "opportunities"}
          </span>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {opportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
          />
        ))}
      </div>
    </div>
  );
}
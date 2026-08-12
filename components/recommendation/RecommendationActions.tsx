"use client";

import Link from "next/link";
import { ArrowRight, Route } from "lucide-react";

import SaveButton from "@/components/opportunity/SaveButton";

interface Props {
  opportunityId: string;
  slug?: string;
  isSaved?: boolean;
}

export default function RecommendationActions({
  opportunityId,
  isSaved = false,
}: Props) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">

      {/* Save */}
      <SaveButton
        opportunityId={opportunityId}
        initialSaved={isSaved}
      />

      {/* Create Roadmap */}
      <Link
        href={`/roadmap/prepare?opportunityId=${encodeURIComponent(
          opportunityId
        )}`}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
      >
        <Route className="h-4 w-4" />
        Create Roadmap
      </Link>

      {/* View */}
      <Link
        href={`/opportunities/${encodeURIComponent(
          opportunityId
        )}`}
        className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
      >
        View Opportunity
        <ArrowRight className="h-4 w-4" />
      </Link>

    </div>
  );
}
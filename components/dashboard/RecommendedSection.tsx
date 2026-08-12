"use client";

import Link from "next/link";
import OpportunityCard, { OpportunityItem } from "./OpportunityCard";
import EmptyState from "@/components/common/EmptyState";

interface RecommendedSectionProps {
  opportunities?: OpportunityItem[];
}

export default function RecommendedSection({
  opportunities = [],
}: RecommendedSectionProps) {
  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="surface-card rounded-3xl border border-border p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Recommended Opportunities</h2>
            <p className="text-sm text-muted-foreground">
              Personalized recommendations based on your profile and resume.
            </p>
          </div>
        </div>

        <EmptyState
          title="No Recommendations"
          description="Explore opportunities to receive personalized recommendations."
        />
      </div>
    );
  }

  return (
    <div className="surface-card rounded-3xl border border-border p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recommended Opportunities</h2>
          <p className="text-sm text-muted-foreground">
            Personalized recommendations based on your profile and resume.
          </p>
        </div>

        <Link href="/recommendations" className="btn-secondary">
          View All
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {opportunities.map((item, index) => (
          <OpportunityCard
            key={item.id || index}
            id={item.id}
            title={item.title}
            organization={item.organization}
            matchScore={item.matchScore}
            deadline={item.deadline}
            mode={item.mode}
            reasons={item.reasons}
            isSaved={item.isSaved}
            slug={item.slug}
          />
        ))}
      </div>
    </div>
  );
}
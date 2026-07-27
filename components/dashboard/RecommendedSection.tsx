"use client";

import OpportunityCard, { OpportunityItem } from "./OpportunityCard";

interface RecommendedSectionProps {
  opportunities?: OpportunityItem[];
}

export default function RecommendedSection({
  opportunities = [],
}: RecommendedSectionProps) {
  return (
    <div className="surface-card rounded-3xl border border-border p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Recommended Opportunities
          </h2>
          <p className="text-sm text-muted-foreground">
            Personalized recommendations based on your profile and resume.
          </p>
        </div>

        <button className="btn-secondary">
          View All
        </button>
      </div>

      {opportunities.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No recommendations found yet. Save opportunities to see them here!
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {opportunities.map((item, index) => (
            <OpportunityCard
              key={item.id || index}
              title={item.title}
              organization={item.organization}
              match={item.match}
              deadline={item.deadline}
              mode={item.mode}
              reasons={item.reasons}
            />
          ))}
        </div>
      )}
    </div>
  );
}
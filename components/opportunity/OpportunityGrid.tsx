import { Opportunity } from "@prisma/client";

import OpportunityCard from "./OpportunityCard";

interface Props {
  opportunities: Opportunity[];
}

export default function OpportunityGrid({
  opportunities,
}: Props) {
  if (!opportunities.length) {
    return (
      <div className="surface-card rounded-2xl p-12 text-center">
        <h2 className="text-xl font-semibold">
          No opportunities found
        </h2>

        <p className="mt-2 text-muted-foreground">
          Check back soon for new opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
        />
      ))}
    </div>
  );
}
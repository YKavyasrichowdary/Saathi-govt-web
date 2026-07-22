import { Opportunity } from "@prisma/client";
import Link from "next/link";
import { Plus } from "lucide-react";

import OpportunityCard from "./OpportunityCard";

interface Props {
  opportunities: Opportunity[];
}

export default function OpportunityList({
  opportunities,
}: Props) {
  if (!opportunities.length) {
    return (
      <div className="surface-card flex flex-col items-center justify-center rounded-2xl p-12 text-center">

        <h2 className="text-xl font-semibold">
          No opportunities yet
        </h2>

        <p className="mt-2 text-muted-foreground">
          Create your first opportunity to get started.
        </p>

        <Link
          href="/admin/opportunities/create"
          className="mt-6 btn-primary text-sm py-2 px-4"
        >
          <Plus className="h-4 w-4" />
          Create Opportunity
        </Link>

      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
        />
      ))}
    </div>
  );
}
import { redirect } from "next/navigation";

import { AppShell } from "@/components/AppShell";
import OpportunityGrid from "@/components/opportunity/OpportunityGrid";

import { getSession } from "@/lib/auth";

import savedOpportunityService from "@/services/saved-opportunity/saved-opportunity.service";

export default async function SavedOpportunitiesPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const saved =
    await savedOpportunityService.getSavedByUser(
      session.user.id
    );

  const opportunities = saved.map(
    (item) => item.opportunity
  );

  return (
    <AppShell
      title="Saved Opportunities"
      subtitle={`${opportunities.length} opportunities saved`}
    >
      <OpportunityGrid
        opportunities={opportunities}
      />
    </AppShell>
  );
}
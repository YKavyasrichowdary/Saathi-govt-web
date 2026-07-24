import Link from "next/link";
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
      subtitle={`${opportunities.length} saved opportunities`}
    >
      {opportunities.length === 0 ? (
        <div className="surface-card flex flex-col items-center justify-center rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-semibold">
            Nothing saved yet
          </h2>

          <p className="mt-3 max-w-lg text-muted-foreground">
            Save scholarships, internships,
            hackathons and jobs to access them
            quickly later.
          </p>

          <Link
            href="/opportunities"
            className="btn-primary mt-6"
          >
            Browse Opportunities
          </Link>
        </div>
      ) : (
        <OpportunityGrid
          opportunities={opportunities}
          forceSaved
        />
      )}
    </AppShell>
  );
}
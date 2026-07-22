import { AppShell } from "@/components/AppShell";
import OpportunityGrid from "@/components/opportunity/OpportunityGrid";
import opportunityService from "@/services/opportunity/opportunity.service";

export default async function OpportunitiesPage() {
  const opportunities =
    await opportunityService.getAll();

  return (
    <AppShell
      title="Discover Opportunities"
      subtitle="Scholarships, internships, hackathons and more."
    >
      <OpportunityGrid
        opportunities={opportunities}
      />
    </AppShell>
  );
}
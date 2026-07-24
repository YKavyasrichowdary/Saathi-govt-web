import { AppShell } from "@/components/AppShell";
import OpportunityGrid from "@/components/opportunity/OpportunityGrid";
import OpportunitySearch from "@/components/opportunity/OpportunitySearch";
import opportunityService from "@/services/opportunity/opportunity.service";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function OpportunitiesPage({ searchParams }: Props) {
  const { q } = await searchParams;

  const opportunities = q
    ? await opportunityService.search(q)
    : await opportunityService.getAll();

  return (
    <AppShell
      title="Discover Opportunities"
      subtitle="Scholarships, internships, hackathons and more."
    >
      <div className="space-y-6">
        <OpportunitySearch initialQuery={q} />
        <OpportunityGrid opportunities={opportunities} search={q} />
      </div>
    </AppShell>
  );
}
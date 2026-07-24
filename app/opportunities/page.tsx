import { AppShell } from "@/components/AppShell";
import OpportunityFilters from "@/components/opportunity/OpportunityFilters";
import OpportunityGrid from "@/components/opportunity/OpportunityGrid";
import OpportunitySearch from "@/components/opportunity/OpportunitySearch";
import opportunityService from "@/services/opportunity/opportunity.service";

type Props = {
  searchParams: Promise<{
    q?: string;
    type?: string;
    mode?: string;
    source?: string;
    educationLevel?: string;
    featured?: string;
    sort?: string;
  }>;
};

export default async function OpportunitiesPage({ searchParams }: Props) {
  const {
    q,
    type,
    mode,
    source,
    educationLevel,
    featured,
    sort,
  } = await searchParams;

  const opportunities =
    q ||
    type ||
    mode ||
    source ||
    educationLevel ||
    featured ||
    sort
      ? await opportunityService.search({
          q,
          type,
          mode,
          source,
          educationLevel,
          featured: featured === "true",
          sort,
        })
      : await opportunityService.getAll();

  return (
    <AppShell
      title="Discover Opportunities"
      subtitle="Scholarships, internships, hackathons and more."
    >
      <div className="space-y-6">
        <OpportunitySearch initialQuery={q} />
        <OpportunityFilters />
        <OpportunityGrid opportunities={opportunities} search={q} />
      </div>
    </AppShell>
  );
}
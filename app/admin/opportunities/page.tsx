import { AppShell } from "@/components/AppShell";
import { adminNavigation } from "@/config/admin-navigation";
import OpportunityList from "@/components/admin/opportunity/OpportunityList";
import OpportunityStats from "@/components/admin/opportunity/OpportunityStats";
import opportunityService from "@/services/opportunity/opportunity.service";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function OpportunitiesPage() {
  const [
    opportunities,
    stats,
  ] = await Promise.all([
    opportunityService.getAll(),
    opportunityService.getStats(),
  ]);

  return (
    <AppShell
      navigation={adminNavigation}
      title="Manage Opportunities"
      subtitle={`${opportunities.length} opportunities`}
      actions={
        <Link
          href="/admin/opportunities/create"
          className="btn-primary text-sm py-2 px-4"
        >
          <Plus className="h-4 w-4" />
          Create Opportunity
        </Link>
      }
    >
      <div className="space-y-6">
        <OpportunityStats
          total={stats.total}
          open={stats.open}
          draft={stats.draft}
          expired={stats.expired}
        />

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            All Opportunities
          </h2>
          <Link
            href="/admin/opportunities/create"
            className="btn-primary text-sm py-2 px-4"
          >
            <Plus className="h-4 w-4" />
            Create Opportunity
          </Link>
        </div>

        <OpportunityList
          opportunities={opportunities}
        />
      </div>
    </AppShell>
  );
}
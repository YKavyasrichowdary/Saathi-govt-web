import OpportunityGrid from "@/components/opportunity/OpportunityGrid";
import savedOpportunityService from "@/services/saved-opportunity/saved-opportunity.service";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SavedOpportunitiesPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const savedItems = await savedOpportunityService.getSavedByUser(session.user.id);
  const opportunities = savedItems.map((item: any) => item.opportunity);

  return (
    <OpportunityGrid opportunities={opportunities} />
  );
}

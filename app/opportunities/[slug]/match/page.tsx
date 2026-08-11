import { redirect } from "next/navigation";

import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth";

import opportunityMatchService from "@/services/opportunity-match/opportunity-match.service";
import opportunityService from "@/services/opportunity/opportunity.service";

import OpportunityMatchCard from "@/components/opportunity/OpportunityMatchCard";
import PreparationPlanCard from "@/components/opportunity/PreparationPlanCard";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function OpportunityMatchPage({
  params,
}: Props) {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const { slug } = await params;

  const opportunity = await opportunityService.getOpportunity(slug);

  if (!opportunity) {
    redirect("/opportunities");
  }

  const match = await opportunityMatchService.getMatch(
    session.user.id,
    opportunity.id
  );

  if (!match) {
    redirect(`/opportunities/${slug}`);
  }

  return (
    <AppShell
      title="AI Match Analysis"
      subtitle={opportunity.title}
    >
      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <OpportunityMatchCard
          match={match}
          opportunity={opportunity}
        />

        <PreparationPlanCard
          opportunity={opportunity}
          match={match}
        />
      </div>
    </AppShell>
  );
}

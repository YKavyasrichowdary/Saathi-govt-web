import { notFound } from "next/navigation";

import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth";
import opportunityService from "@/services/opportunity/opportunity.service";
import roadmapService from "@/services/roadmap/roadmap.service";
import OpportunityDetailsView from "@/components/opportunity/OpportunityDetailsView";

export default async function OpportunityDetailsPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const opportunity =
    await opportunityService.getOpportunity(
      slug
    );

  if (!opportunity) {
    notFound();
  }

  const session = await getSession();
  const existingRoadmap = session?.user?.id
    ? await roadmapService.getRoadmapByOpportunity(session.user.id, opportunity.id)
    : null;

  return (
    <AppShell
      title={opportunity.title}
      subtitle={opportunity.organization}
    >
      <OpportunityDetailsView
        opportunity={opportunity}
        existingRoadmap={existingRoadmap}
      />
    </AppShell>
  );
}

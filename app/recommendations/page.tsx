import { redirect } from "next/navigation";

import { AppShell } from "@/components/AppShell";
import RecommendationGrid from "@/components/recommendation/RecommendationGrid";

import { getSession } from "@/lib/auth";

import recommendationService from "@/services/recommendation/recommendation.service";
import {
  getScoreColor,
  getScoreLabel,
} from "@/lib/intelligence/score";
export default async function RecommendationsPage() {

  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const recommendations =
    await recommendationService.getRecommendations(
      session.user.id
    );

  return (
    <AppShell
      title="Recommendations"
      subtitle={`${recommendations.length} personalized opportunities`}
    >

      <RecommendationGrid
        recommendations={recommendations}
      />

    </AppShell>
  );
}
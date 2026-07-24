import { RecommendedOpportunity } from "@/types/recommendation";

import RecommendationCard from "./RecommendationCard";

interface Props {
  recommendations: RecommendedOpportunity[];
}

export default function RecommendationGrid({
  recommendations,
}: Props) {

  if (!recommendations.length) {

    return (
      <div className="surface-card rounded-2xl p-10 text-center">
        <h2 className="text-xl font-semibold">
          No recommendations yet
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Complete your profile to receive personalized recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {recommendations.map((recommendation) => (

        <RecommendationCard
          key={recommendation.id}
          recommendation={recommendation}
        />

      ))}
    </div>
  );
}
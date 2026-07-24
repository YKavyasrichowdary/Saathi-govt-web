import Link from "next/link";
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
          Complete your profile to unlock personalized recommendations.
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Add your skills, education, and interests to get matched opportunities.
        </p>

        <div className="mt-6">
          <Link
            href="/profile"
            className="btn-primary inline-flex"
          >
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {recommendations.length} personalized recommendations
        </p>

        <select className="input max-w-[200px]">
          <option>Highest Match</option>
          <option>Deadline</option>
          <option>Newest</option>
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </div>
    </div>
  );
}
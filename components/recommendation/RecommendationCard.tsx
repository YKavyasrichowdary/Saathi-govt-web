import RecommendationScore from "./RecommendationScore";
import RecommendationSection from "./RecommendationSection";
import RecommendationActions from "./RecommendationActions";
import { RecommendedOpportunity } from "@/types/recommendation";

interface Props {
  recommendation: RecommendedOpportunity;
}

export default function RecommendationCard({
  recommendation,
}: Props) {
  const analysis = recommendation.analysis;
  const score = analysis?.score ?? recommendation.matchScore ?? 0;

  const strengths =
    analysis?.strengths && analysis.strengths.length > 0
      ? analysis.strengths
      : recommendation.breakdown
          ?.filter((item) => item.matched)
          .map((item) => `${item.category} matches`) || [];

  const missing = analysis?.missing || [];
  const nextSteps = analysis?.nextSteps || [];

  return (
    <div className="surface-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg border border-border flex flex-col justify-between">
      <div>
        {/* Header & Score Badge */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {recommendation.title}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {recommendation.organization}
            </p>
          </div>

          <RecommendationScore score={score} />
        </div>

        {/* Why it matches */}
        <RecommendationSection
          title="Why it matches"
          items={strengths}
          variant="success"
        />

        {/* Needs Improvement / Missing Skills & Empty State */}
        <RecommendationSection
          title="Needs Improvement"
          items={missing}
          variant="warning"
        />

        {/* Recommended Actions */}
        <RecommendationSection
          title="Recommended Actions"
          items={nextSteps}
          variant="info"
        />
      </div>

      {/* Actions */}
      <RecommendationActions slug={recommendation.slug} />
    </div>
  );
}
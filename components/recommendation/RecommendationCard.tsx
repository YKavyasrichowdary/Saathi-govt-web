import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Star,
} from "lucide-react";

import { RecommendedOpportunity } from "@/types/recommendation";

interface Props {
  recommendation: RecommendedOpportunity;
}

export default function RecommendationCard({
  recommendation,
}: Props) {
  return (
    <div className="surface-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>
          <h3 className="text-lg font-semibold">
            {recommendation.title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {recommendation.organization}
          </p>
        </div>

        <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {recommendation.matchScore}%
        </div>

      </div>

      <div className="mt-5 space-y-2">

        {recommendation.breakdown
          .filter(item => item.matched)
          .slice(0,4)
          .map(item => (

            <div
              key={item.category}
              className="flex items-center gap-2 text-sm"
            >
              <BadgeCheck className="h-4 w-4 text-green-600"/>

              {item.category}
            </div>

          ))}

      </div>

      <Link
        href={`/opportunities/${recommendation.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        View Opportunity

        <ArrowRight className="h-4 w-4"/>
      </Link>

    </div>
  );
}
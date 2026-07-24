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

        <div className="rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold">
              {recommendation.matchScore}%
            </span>
          </div>
        </div>

      </div>

      <div className="mt-5 space-y-2">

        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Why Recommended
        </h4>

        {recommendation.breakdown
          .filter(item => item.matched)
          .slice(0,5)
          .map(item => (

            <div
              key={item.category}
              className="flex items-center gap-2 text-sm"
            >
              <BadgeCheck className="h-4 w-4 text-green-600"/>

              <span>{item.category}</span>

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
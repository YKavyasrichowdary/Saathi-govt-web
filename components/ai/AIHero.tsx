import { Sparkles } from "lucide-react";
import { DailySummary } from "./types";
import { buildDailySummary } from "@/lib/ai/summary-builder";

interface AIHeroProps {
  summary?: DailySummary;
}

const defaultSummary = buildDailySummary({
  profileCompletion: 82,
  recommendationCount: 12,
  topRecommendation: "Google STEP Internship",
});

function HeroInsight({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-primary">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {value}
      </p>
    </div>
  );
}

export default function AIHero({ summary = defaultSummary }: AIHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8">
      {/* Decorative Blur */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Saathi AI
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight">
          {summary.greeting}
        </h1>

        {/* Insights */}
        <div className="space-y-4 mt-8">
          <HeroInsight
            title="Today's Priority"
            value={summary.priority}
          />

          <HeroInsight
            title="Profile"
            value={summary.profile}
          />

          <HeroInsight
            title="Opportunities"
            value={summary.opportunities}
          />

          <HeroInsight
            title="Advice"
            value={summary.advice}
          />
        </div>
      </div>
    </section>
  );
}
"use client";

import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";

interface AIInsightsProps {
  insights: {
    id: string;
    title: string;
    description: string;
    type: "recommendation" | "improvement";
    highlightText: string;
  }[];
}

export default function AIInsights({ insights }: AIInsightsProps) {
  return (
    <div className="surface-card rounded-3xl border border-border p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-xl font-bold">AI Insights</h2>

          <p className="text-sm text-muted-foreground">
            Personalized recommendations from Saathi AI.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => {
          const isImprovement = insight.type === "improvement";
          const Icon = isImprovement ? TrendingUp : Sparkles;
          const style = isImprovement
            ? {
                bg: "border-indigo-500/20 bg-indigo-500/5",
                icon: "text-indigo-600",
              }
            : {
                bg: "border-green-500/20 bg-green-500/5",
                icon: "text-green-600",
              };

          return (
            <div
              key={insight.id}
              className={`rounded-2xl border p-4 ${style.bg}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`mt-1 h-5 w-5 ${style.icon}`} />

                <div>
                  <h3 className="font-semibold">{insight.title}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {insight.description}
                    {insight.highlightText && (
                      <span className="font-semibold text-foreground">
                        {" "}
                        {insight.highlightText}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn-primary mt-8 flex w-full items-center justify-center gap-2">
        Start Recommended Mission
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
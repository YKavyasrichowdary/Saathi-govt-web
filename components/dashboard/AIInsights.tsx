"use client";

import { Sparkles, ArrowRight, Lightbulb, TrendingUp } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";

export interface DashboardInsight {
  id: string;
  title: string;
  description: string;
  type: "recommendation" | "improvement";
  highlightText: string;
}

interface AIInsightsProps {
  insights: DashboardInsight[];
}

export default function AIInsights({ insights }: AIInsightsProps) {
  if (!insights || insights.length === 0) {
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

        <EmptyState
          title="No AI Insights Yet"
          description="Complete more activities to receive personalized insights."
        />
      </div>
    );
  }

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
          const Icon =
            insight.type === "recommendation" ? Lightbulb : TrendingUp;

          return (
            <div
              key={insight.id}
              className="rounded-2xl border border-border bg-muted/20 p-4"
            >
              <div className="flex items-start gap-3">
                <Icon className="mt-1 h-5 w-5 text-primary flex-shrink-0" />

                <div className="flex-1">
                  <h3 className="font-semibold">{insight.title}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {insight.description}
                  </p>

                  {insight.highlightText && (
                    <span className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {insight.highlightText}
                    </span>
                  )}
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
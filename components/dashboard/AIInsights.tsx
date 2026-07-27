"use client";

import {
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function AIInsights() {
  return (
    <div className="surface-card rounded-3xl border border-border p-6">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            AI Insights
          </h2>

          <p className="text-sm text-muted-foreground">
            Personalized recommendations from Saathi AI.
          </p>
        </div>

      </div>

      <div className="space-y-4">

        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4">

          <div className="flex items-start gap-3">

            <TrendingUp className="mt-1 h-5 w-5 text-indigo-600" />

            <div>

              <h3 className="font-semibold">
                ATS Score Improved
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Your resume score improved by
                <span className="font-semibold text-foreground">
                  {" "}9 points{" "}
                </span>
                after the last analysis.
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-4">

          <div className="flex items-start gap-3">

            <Sparkles className="mt-1 h-5 w-5 text-green-600" />

            <div>

              <h3 className="font-semibold">
                Recommended Next Step
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Completing
                <span className="font-semibold text-foreground">
                  {" "}Docker Basics
                </span>
                could increase your internship match by approximately
                <span className="font-semibold text-foreground">
                  {" "}6%.
                </span>
              </p>

            </div>

          </div>

        </div>

      </div>

      <button className="btn-primary mt-8 flex w-full items-center justify-center gap-2">
        Start Recommended Mission

        <ArrowRight className="h-4 w-4" />
      </button>

    </div>
  );
}
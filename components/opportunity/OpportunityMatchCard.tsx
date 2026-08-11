"use client";

import {
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Target,
  Sparkles,
  TrendingUp,
  Award,
} from "lucide-react";

import { OpportunityMatchResponse } from "@/types/opportunity-match";

interface OpportunityMatchCardProps {
  match: OpportunityMatchResponse;
  opportunity?: {
    title: string;
    organization: string;
  };
  compact?: boolean;
}

function getScoreConfig(score: number) {
  if (score >= 90) {
    return {
      label: "Excellent Match",
      badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      barClass: "from-emerald-500 to-teal-400",
      textClass: "text-emerald-600 dark:text-emerald-400",
    };
  }
  if (score >= 75) {
    return {
      label: "Strong Match",
      badgeClass: "bg-primary/10 text-primary border-primary/20",
      barClass: "from-primary to-indigo-500",
      textClass: "text-primary",
    };
  }
  if (score >= 60) {
    return {
      label: "Moderate Match",
      badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      barClass: "from-amber-500 to-yellow-400",
      textClass: "text-amber-600 dark:text-amber-400",
    };
  }
  return {
    label: "Needs Work",
    badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    barClass: "from-rose-500 to-pink-500",
    textClass: "text-rose-600 dark:text-rose-400",
  };
}

export default function OpportunityMatchCard({
  match,
  opportunity,
  compact = false,
}: OpportunityMatchCardProps) {
  const config = getScoreConfig(match.matchScore);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/90 backdrop-blur-md p-5 sm:p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
      {/* Decorative top glow accent */}
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border/60">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <Sparkles className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-foreground truncate">
              {opportunity ? opportunity.title : "AI Match Analysis"}
            </h2>
          </div>
          {opportunity && (
            <p className="text-sm font-semibold text-muted-foreground pl-10">
              {opportunity.organization}
            </p>
          )}
          <div className="flex items-center gap-2 pt-0.5 pl-10">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.badgeClass}`}
            >
              {config.label}
            </span>
          </div>
        </div>

        {/* Score Badge */}
        <div className="flex items-center gap-3 self-start sm:self-center bg-muted/30 border border-border/50 rounded-2xl px-4 py-2 shrink-0">
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-0.5">
              <span className={`text-3xl font-extrabold tracking-tight ${config.textClass}`}>
                {match.matchScore}
              </span>
              <span className={`text-base font-bold ${config.textClass}`}>%</span>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Match Score
            </p>
          </div>
          <Award className={`h-7 w-7 ${config.textClass} opacity-80`} />
        </div>
      </div>

      {/* Readiness Bar */}
      <div className="mt-5 rounded-2xl bg-muted/40 p-4 border border-border/40">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            Role Readiness
          </span>
          <span className="text-foreground font-bold">{match.readinessScore}%</span>
        </div>

        <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-muted/80">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${config.barClass} transition-all duration-1000 ease-out`}
            style={{ width: `${match.readinessScore}%` }}
          />
        </div>
      </div>

      {/* Strengths */}
      {match.strengths && match.strengths.length > 0 && (
        <div className="mt-5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Your Strengths</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {match.strengths.map((strength) => (
              <span
                key={strength}
                className="inline-flex items-center rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {match.missingSkills && match.missingSkills.length > 0 && (
        <div className="mt-5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
            <span>Skills to Improve</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {match.missingSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-800 dark:text-amber-300 border border-amber-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {!compact && (
        <>
          {/* AI Recommendations */}
          {match.recommendations && match.recommendations.length > 0 && (
            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Lightbulb className="h-4 w-4 text-primary shrink-0" />
                <span>AI Recommendations</span>
              </div>

              <ul className="space-y-1.5 pl-1">
                {match.recommendations.map((recommendation) => (
                  <li
                    key={recommendation}
                    className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                  >
                    <span className="text-primary font-bold">•</span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI Summary */}
          {match.summary && (
            <div className="mt-5 rounded-2xl bg-muted/20 border border-border/40 p-4 space-y-1">
              <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-primary" />
                AI Verdict Summary
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground pt-1">
                {match.summary}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Sparkles,
  Loader2,
  Calendar,
  Clock,
  Target,
  Award,
  Route,
  ArrowRight,
} from "lucide-react";

import { OpportunityMatchResponse } from "@/types/opportunity-match";
import { Opportunity, Roadmap } from "@prisma/client";

interface Props {
  match: OpportunityMatchResponse;
  opportunity: Opportunity;
  existingRoadmap?: Roadmap | null;
}

export default function MatchClientView({ match, opportunity, existingRoadmap }: Props) {
  const router = useRouter();

  // Default target date: opportunity.deadline formatted YYYY-MM-DD, or 14 days from today
  const defaultTargetDate = opportunity.deadline
    ? new Date(opportunity.deadline).toISOString().split("T")[0]
    : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const [targetDate, setTargetDate] = useState(defaultTargetDate);
  const [dailyHours, setDailyHours] = useState<number>(2);
  const [confidence, setConfidence] = useState<"BEGINNER" | "INTERMEDIATE" | "ADVANCED">("INTERMEDIATE");
  const [goal, setGoal] = useState<"QUALIFY" | "COMPETITIVE">("COMPETITIVE");
  const [preferredStudyTime, setPreferredStudyTime] = useState<"MORNING" | "AFTERNOON" | "EVENING" | "NIGHT">("EVENING");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate days remaining
  const calculateDaysRemaining = (dateStr: string) => {
    const selected = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = selected.getTime() - today.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const daysRemaining = calculateDaysRemaining(targetDate);

  async function handleCreateRoadmap(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opportunityId: opportunity.id,
          targetDate,
          dailyHours: Number(dailyHours),
          confidence,
          goal,
          preferredStudyTime,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.roadmap?.id) {
        throw new Error(data.message || "Failed to generate roadmap.");
      }

      router.push(`/roadmap/${data.roadmap.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Back Link & Header */}
      <div className="space-y-4">
        <Link
          href={`/opportunities/${opportunity.slug || opportunity.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Opportunity
        </Link>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            AI Opportunity Analysis
          </h1>
          <div className="mt-1 flex items-center gap-3 text-lg font-semibold text-muted-foreground">
            <span className="text-foreground">{opportunity.title}</span>
            <span>•</span>
            <span>{opportunity.organization}</span>
          </div>
        </div>
      </div>

      <hr className="border-border/60" />

      {/* Scores Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="surface-card p-6 rounded-3xl border border-border/80 text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-1">
            <Award className="h-6 w-6" />
          </div>
          <div className="text-5xl font-black tracking-tight text-primary">
            {match.matchScore}%
          </div>
          <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Match Score
          </p>
        </div>

        <div className="surface-card p-6 rounded-3xl border border-border/80 text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 text-secondary-foreground mb-1">
            <Target className="h-6 w-6" />
          </div>
          <div className="text-5xl font-black tracking-tight text-foreground">
            {match.readinessScore}%
          </div>
          <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Role Readiness
          </p>
        </div>
      </div>

      <hr className="border-border/60" />

      {/* Your Strengths */}
      <div className="surface-card p-6 sm:p-8 rounded-3xl border border-border/80 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          Your Strengths
        </h2>
        <ul className="space-y-2">
          {match.strengths.map((strength) => (
            <li
              key={strength}
              className="flex items-center gap-3 text-base font-medium text-foreground"
            >
              <span className="text-emerald-500 font-bold">✓</span>
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Skills to Improve */}
      <div className="surface-card p-6 sm:p-8 rounded-3xl border border-border/80 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          Skills to Improve
        </h2>
        <ul className="space-y-2">
          {match.missingSkills.map((skill) => (
            <li
              key={skill}
              className="flex items-center gap-3 text-base font-medium text-foreground"
            >
              <span className="text-amber-500 font-bold">○</span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Recommendations */}
      <div className="surface-card p-6 sm:p-8 rounded-3xl border border-border/80 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI Recommendations
        </h2>
        <ol className="space-y-3 pl-1">
          {match.recommendations.map((recommendation, idx) => (
            <li
              key={recommendation}
              className="flex items-start gap-3 text-base text-muted-foreground leading-relaxed"
            >
              <span className="font-bold text-primary shrink-0">{idx + 1}.</span>
              <span>{recommendation}</span>
            </li>
          ))}
        </ol>
      </div>

      <hr className="border-border/60" />

      {/* AI Summary */}
      <div className="surface-card p-6 sm:p-8 rounded-3xl border border-border/80 space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          AI Summary
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          {match.summary}
        </p>
      </div>

      {existingRoadmap && (
        <div className="surface-card p-6 sm:p-8 rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-secondary/10 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                <Route className="h-3.5 w-3.5" />
                Active Roadmap Available
              </div>
              <h3 className="text-xl font-extrabold text-foreground">
                You already generated a preparation roadmap for this opportunity!
              </h3>
              <p className="text-sm text-muted-foreground">
                Readiness score: <strong className="text-foreground">{existingRoadmap.readinessScore}%</strong> · Target score: <strong className="text-foreground">{existingRoadmap.targetScore}%</strong>
              </p>
            </div>
            <Link
              href={`/roadmap/${existingRoadmap.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.98] shrink-0"
            >
              <span>Open Existing Roadmap</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      <hr className="border-border/60" />

      {/* Preparation Plan Form */}
      <div className="surface-card p-6 sm:p-8 rounded-3xl border border-primary/30 bg-card shadow-xl space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            Ready to prepare?
          </h2>
          <p className="text-base text-muted-foreground">
            You&apos;re <strong className="text-foreground">{match.readinessScore}%</strong> ready for this opportunity. We can build a personalized preparation plan around your target date.
          </p>
        </div>

        <form onSubmit={handleCreateRoadmap} className="space-y-6 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Target Date */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Target Date / Deadline
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs font-semibold text-primary">
                Days remaining: {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
              </p>
            </div>

            {/* Daily Study Time */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Daily Study Time
              </label>
              <select
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value={1}>1 hour per day</option>
                <option value={2}>2 hours per day</option>
                <option value={3}>3 hours per day</option>
                <option value={4}>4 hours per day</option>
                <option value={5}>5+ hours per day</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-destructive/10 p-3 text-sm font-medium text-destructive border border-destructive/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lg transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Building Your AI Roadmap...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Create My Preparation Roadmap</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Loader2,
  Calendar,
  Clock,
  Target,
  GraduationCap,
  SunMedium,
} from "lucide-react";
import { getDaysUntil } from "@/lib/utils/date-difference";
import { OpportunityMatchResponse } from "@/types/opportunity-match";

interface PreparationPlanCardProps {
  opportunity: {
    id: string;
    title: string;
    deadline?: Date | string | null;
  };
  match?: OpportunityMatchResponse;
}

export default function PreparationPlanCard({
  opportunity,
  match,
}: PreparationPlanCardProps) {
  const router = useRouter();

  // 1. Pre-fill deadline if present
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

  // 2. Calculate preparation window
  const availableDays = getDaysUntil(targetDate);

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
      const roadmapId = data.data?.id || data.roadmap?.id || data.id;

      if (!response.ok || !data.success || !roadmapId) {
        throw new Error(data.message || "Failed to generate roadmap.");
      }

      router.push(`/roadmap/${roadmapId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="surface-card p-6 sm:p-8 rounded-3xl border border-primary/30 bg-card shadow-xl space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          Ready to prepare?
        </h2>
        <p className="text-base text-muted-foreground">
          {match ? (
            <>
              You&apos;re <strong className="text-foreground">{match.readinessScore}%</strong> ready for this opportunity. We can build a personalized preparation plan around your target date.
            </>
          ) : (
            <>Build a personalized step-by-step preparation plan tailored to your schedule.</>
          )}
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
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <span>{availableDays} {availableDays === 1 ? "day" : "days"} available</span>
            </div>
          </div>

          {/* Daily Study Time */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Daily Study Time
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "1 hour", value: 1 },
                { label: "2 hours", value: 2 },
                { label: "3 hours", value: 3 },
                { label: "4+ hours", value: 4 },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setDailyHours(option.value)}
                  className={`rounded-xl px-3 py-2.5 text-xs font-bold transition-all border ${
                    dailyHours === option.value
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Preparation Goal
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Qualify", value: "QUALIFY", desc: "Pass threshold" },
                { label: "Competitive", value: "COMPETITIVE", desc: "Top percentile" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setGoal(item.value as "QUALIFY" | "COMPETITIVE")}
                  className={`rounded-xl p-3 text-left transition-all border ${
                    goal === item.value
                      ? "bg-primary/10 border-primary text-primary font-bold shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:border-primary/40"
                  }`}
                >
                  <div className="text-xs font-bold text-foreground">{item.label}</div>
                  <div className="text-[11px] text-muted-foreground">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Confidence */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              Current Confidence
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Beginner", value: "BEGINNER" },
                { label: "Intermediate", value: "INTERMEDIATE" },
                { label: "Advanced", value: "ADVANCED" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setConfidence(item.value as "BEGINNER" | "INTERMEDIATE" | "ADVANCED")}
                  className={`rounded-xl px-2.5 py-2.5 text-xs font-bold text-center transition-all border ${
                    confidence === item.value
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
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
          className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lg transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
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
  );
}

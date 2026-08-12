"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card, StatCard, SectionTitle } from "@/components/PageBits";
import { Flame, Trophy, Star, Route, CheckCircle2 } from "lucide-react";

type ProgressData = {
  xp: {
    totalXP: number;
    level: number;
    currentStreak: number;
    longestStreak: number;
    missionsCompleted: number;
  };

  stats: {
    missionsCompleted: number;
    applications: number;
    savedOpportunities: number;
    resumeAnalyses: number;
    roadmaps: number;
    roadmapTasksCompleted: number;
    estimatedMinutesCompleted: number;
  };

  activityDays: {
    id: string;
    date: string;
  }[];

  roadmaps: {
    id: string;
    title: string;
    progress: number;
    status: string;
    targetDate: string | null;
  }[];
};

export default function ProgressPage() {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      try {
        const response = await fetch("/api/progress");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load progress"
          );
        }

        setData(result.progress);
      } catch (error) {
        console.error("Progress fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, []);

  const activeDates = new Set(
    (data?.activityDays ?? []).map((item) =>
      new Date(item.date).toISOString().slice(0, 10)
    )
  );

  const today = new Date();

  const activityGrid = Array.from({ length: 84 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (83 - index));
    const key = date.toISOString().slice(0, 10);

    return {
      date,
      active: activeDates.has(key),
    };
  });

  const estimatedHours = Math.floor(
    (data?.stats.estimatedMinutesCompleted ?? 0) / 60
  );

  const badges = [
    {
      title: "First Mission",
      unlocked: (data?.stats.missionsCompleted ?? 0) >= 1,
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    {
      title: "First Application",
      unlocked: (data?.stats.applications ?? 0) >= 1,
      icon: <Star className="h-5 w-5" />,
    },
    {
      title: "5 Applications",
      unlocked: (data?.stats.applications ?? 0) >= 5,
      icon: <Star className="h-5 w-5" />,
    },
    {
      title: "7 Day Streak",
      unlocked: (data?.xp.longestStreak ?? 0) >= 7,
      icon: <Flame className="h-5 w-5" />,
    },
    {
      title: "30 Day Streak",
      unlocked: (data?.xp.longestStreak ?? 0) >= 30,
      icon: <Flame className="h-5 w-5" />,
    },
    {
      title: "First Roadmap",
      unlocked: (data?.stats.roadmaps ?? 0) >= 1,
      icon: <Route className="h-5 w-5" />,
    },
    {
      title: "Roadmap Finisher",
      unlocked:
        data?.roadmaps.some((roadmap) => roadmap.status === "COMPLETED") ?? false,
      icon: <Trophy className="h-5 w-5" />,
    },
  ];

  return (
    <AppShell
      title="Progress & Streaks"
      subtitle="Celebrate every step forward. Consistency builds mastery."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
          Loading progress data...
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Statistics */}
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard
              label="Current streak"
              value={`${data?.xp.currentStreak ?? 0} days`}
              tone="accent"
              hint={`Longest streak: ${data?.xp.longestStreak ?? 0} days`}
            />

            <StatCard
              label="Estimated learning time"
              value={`${estimatedHours}h`}
              tone="primary"
              hint="From completed roadmap tasks"
            />

            <StatCard
              label="Applications"
              value={`${data?.stats.applications ?? 0}`}
              tone="secondary"
              hint="Total submitted applications"
            />

            <StatCard
              label="Missions"
              value={`${data?.stats.missionsCompleted ?? 0}`}
              tone="primary"
              hint="Completed daily missions"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Activity Heatmap */}
            <Card>
              <SectionTitle
                eyebrow="Consistency"
                title="Your last 12 weeks"
              />

              <div className="grid grid-cols-12 gap-1.5">
                {activityGrid.map((day) => (
                  <div
                    key={day.date.toISOString()}
                    title={day.date.toLocaleDateString("en-IN")}
                    className={`h-4 w-4 rounded-sm ${
                      day.active ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span>Inactive</span>
                <div className="flex gap-1">
                  <div className="h-3 w-3 rounded-sm bg-muted" />
                  <div className="h-3 w-3 rounded-sm bg-primary" />
                </div>
                <span>Active</span>
              </div>
            </Card>

            {/* Badges */}
            <Card>
              <SectionTitle
                eyebrow="Milestones"
                title="Badges earned"
              />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {badges.map((badge) => (
                  <div
                    key={badge.title}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center text-xs ${
                      badge.unlocked
                        ? "border-accent/40 bg-gold-soft/60 text-foreground"
                        : "border-border bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        badge.unlocked
                          ? "bg-accent text-accent-foreground"
                          : "bg-surface"
                      }`}
                    >
                      {badge.icon}
                    </span>

                    <span className="font-semibold">{badge.title}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Real Roadmap Progress */}
          <Card>
            <SectionTitle
              eyebrow="Execution"
              title="Roadmap Progress"
            />

            {data?.roadmaps && data.roadmaps.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {data.roadmaps.map((roadmap) => (
                  <div
                    key={roadmap.id}
                    className="rounded-2xl border border-border p-5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">
                        {roadmap.title}
                      </h3>
                      <span className="text-sm font-semibold text-primary">
                        {roadmap.progress}%
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${roadmap.progress}%` }}
                      />
                    </div>

                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status: {roadmap.status}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                You haven't created a roadmap yet.
              </p>
            )}
          </Card>
        </div>
      )}
    </AppShell>
  );
}
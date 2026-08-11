import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import roadmapService from "@/services/roadmap/roadmap.service";
import { AppShell } from "@/components/AppShell";
import {
  Route,
  Sparkles,
  Compass,
  ArrowRight,
  Target,
  Calendar,
  ListTodo,
} from "lucide-react";

export const metadata: Metadata = {
  title: "My Roadmaps · SAATHI",
  description: "View and manage your AI-generated preparation roadmaps and execution plans.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RoadmapsDashboardPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const roadmaps = await roadmapService.getUserRoadmaps(session.user.id);

  return (
    <AppShell
      title="My Roadmaps"
      subtitle="Personalized AI execution plans built around your real schedule and goals."
      actions={
        <Link
          href="/roadmap/prepare"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow transition hover:opacity-90 active:scale-[0.98]"
        >
          <Sparkles className="h-4 w-4" />
          <span>New AI Roadmap</span>
        </Link>
      }
    >
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        {/* Header Hero Banner */}
        <div className="surface-card p-6 sm:p-8 rounded-3xl border border-border/80 shadow-md bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Route className="h-3.5 w-3.5" />
              <span>AI Execution Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Your Active Learning & Preparation Paths
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every roadmap breaks down your opportunity goals into bite-sized daily missions, keeping you ready for deadlines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-bold text-foreground shadow-sm transition hover:bg-accent active:scale-[0.98]"
            >
              <Compass className="h-4 w-4 text-primary" />
              <span>Explore Opportunities</span>
            </Link>
            <Link
              href="/roadmap/prepare"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md transition hover:opacity-90 active:scale-[0.98]"
            >
              <Sparkles className="h-4 w-4" />
              <span>Create Roadmap</span>
            </Link>
          </div>
        </div>

        {/* Roadmaps Grid */}
        {roadmaps.length === 0 ? (
          <div className="surface-card p-12 rounded-3xl border border-border/80 text-center space-y-6 max-w-xl mx-auto my-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Route className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">No roadmaps generated yet</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Select an opportunity and analyze your match to generate an instant step-by-step AI preparation plan tailored to your target date.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow transition hover:opacity-90"
              >
                <Compass className="h-4 w-4" />
                <span>Find Opportunities</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((roadmap: any) => {
              const allTasks = roadmap.milestones.flatMap((m: any) => m.tasks);
              const completedTasks = allTasks.filter((t: any) => t.status === "COMPLETED").length;
              const progressPercentage = roadmap.readinessScore;

              return (
                <div
                  key={roadmap.id}
                  className="surface-card rounded-3xl border border-border/80 p-6 flex flex-col justify-between hover:border-primary/40 transition-all hover:shadow-xl space-y-5"
                >
                  <div className="space-y-4">
                    {/* Header info */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        {roadmap.opportunity && (
                          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary">
                            {roadmap.opportunity.title}
                          </span>
                        )}
                        <h2 className="text-lg font-bold text-foreground line-clamp-2">
                          {roadmap.title}
                        </h2>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          roadmap.status === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                            : "bg-muted text-muted-foreground border border-border"
                        }`}
                      >
                        {roadmap.status}
                      </span>
                    </div>

                    {/* AI Summary snippet */}
                    {roadmap.aiSummary && (
                      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {roadmap.aiSummary}
                      </p>
                    )}

                    {/* Progress Bar */}
                    <div className="space-y-2 pt-2 border-t border-border/60">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Target className="h-3.5 w-3.5 text-primary" />
                          Readiness Score
                        </span>
                        <span className="text-foreground font-bold">
                          {progressPercentage}% / {roadmap.targetScore}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.max(5, progressPercentage))}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats badges */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-1">
                      <div className="flex items-center gap-1.5 rounded-xl bg-muted/60 px-3 py-2 text-muted-foreground">
                        <ListTodo className="h-3.5 w-3.5 text-primary" />
                        <span>{completedTasks}/{allTasks.length} Tasks</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-xl bg-muted/60 px-3 py-2 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 text-secondary-foreground" />
                        <span>{roadmap.estimatedDays} Days Plan</span>
                      </div>
                    </div>
                  </div>

                  {/* Open Button */}
                  <div className="pt-2">
                    <Link
                      href={`/roadmap/${roadmap.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.99]"
                    >
                      <span>Open Roadmap</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}

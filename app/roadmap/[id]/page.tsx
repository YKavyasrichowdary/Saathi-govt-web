import { notFound } from "next/navigation";

import roadmapService from "@/services/roadmap/roadmap.service";
import { AppShell } from "@/components/AppShell";

import RoadmapHero from "@/components/roadmap/RoadmapHero";
import ReadinessGauge from "@/components/roadmap/ReadinessGauge";
import AIInsights from "@/components/roadmap/AIInsights";
import TodayMissionCard from "@/components/roadmap/TodayMissionCard";
import TodayPlan from "@/components/roadmap/TodayPlan";
import MilestoneTimeline from "@/components/roadmap/MilestoneTimeline";
import TaskChecklist from "@/components/roadmap/TaskChecklist";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function RoadmapPage({
  params,
}: Props) {

  const { id } = await params;

  let roadmapView;
  try {
    roadmapView = await roadmapService.getRoadmapView(id);
  } catch {
    notFound();
  }

  const {
    roadmap,
    match,
    nextTask,
    currentMilestone,
    milestones,
    checklistTasks,
    todayPlan,
  } = roadmapView;

  return (
    <AppShell
      title={roadmap.title}
      subtitle="AI Execution Roadmap"
    >
      <div className="space-y-8">

        <RoadmapHero
          title={roadmap.title}
          readinessScore={roadmap.readinessScore}
          targetScore={roadmap.targetScore}
          estimatedDays={roadmap.estimatedDays}
        />

        <ReadinessGauge
          readinessScore={roadmap.readinessScore}
          targetScore={roadmap.targetScore}
        />

        <div className="surface-card rounded-3xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Roadmap Progress
              </p>

              <p className="mt-1 text-2xl font-bold">
                {roadmap.progress}%
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              Task completion
            </p>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{
                width: `${roadmap.progress}%`,
              }}
            />
          </div>
        </div>

        <AIInsights
          summary={
            match?.summary ??
            roadmap.aiSummary ??
            ""
          }
          strengths={
            match?.strengths ?? []
          }
          improvements={
            match?.missingSkills ?? []
          }
        />

        {todayPlan && (
          <TodayPlan
            dayNumber={todayPlan.dayNumber}
            date={todayPlan.date}
            tasks={todayPlan.tasks}
            dailyCapacity={roadmap.dailyHours * 60}
          />
        )}

        <TodayMissionCard
          title={
            nextTask?.title ??
            "All missions completed 🎉"
          }
          description={
            nextTask?.description ??
            "You're all caught up."
          }
          estimatedMinutes={
            nextTask?.estimatedMinutes ?? 0
          }
          rewardXP={
            nextTask?.rewardXP ?? 0
          }
        />

        <MilestoneTimeline
          milestones={milestones}
        />

        {currentMilestone && (
          <TaskChecklist
            key={currentMilestone.id}
            title={currentMilestone.title}
            tasks={checklistTasks}
          />
        )}


      </div>
    </AppShell>
  );
}
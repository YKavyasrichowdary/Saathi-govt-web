import { notFound } from "next/navigation";

import roadmapService from "@/services/roadmap/roadmap.service";

import RoadmapHero from "@/components/roadmap/RoadmapHero";
import ReadinessGauge from "@/components/roadmap/ReadinessGauge";
import AIInsights from "@/components/roadmap/AIInsights";
import TodayMissionCard from "@/components/roadmap/TodayMissionCard";
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

  let roadmap;
  try {
    roadmap = await roadmapService.getRoadmap(id);
  } catch {
    notFound();
  }

  // 🚀 Sprint 45.4 — Today's Mission
  const nextTask =
    roadmap.milestones
      .flatMap((m) => m.tasks)
      .find(
        (task) => task.status !== "COMPLETED"
      );

  // Derive milestone status for timeline and active milestone selection
  const milestonesWithStatus = roadmap.milestones.map((m) => {
    const allTasksCompleted =
      m.tasks.length > 0 && m.tasks.every((t) => t.status === "COMPLETED");
    const anyTaskStarted =
      m.tasks.some((t) => t.status === "COMPLETED" || t.status === "IN_PROGRESS");
    const status: "COMPLETED" | "IN_PROGRESS" | "PENDING" = allTasksCompleted
      ? "COMPLETED"
      : anyTaskStarted
      ? "IN_PROGRESS"
      : "PENDING";

    return {
      id: m.id,
      title: m.title,
      description: m.description ?? "",
      status,
      tasks: m.tasks,
    };
  });

  // 🚀 Sprint 45.6 — Checklist
  const currentMilestone =
    milestonesWithStatus.find(
      (m) => m.status === "IN_PROGRESS"
    ) ?? milestonesWithStatus[0];

  const checklistTasks = currentMilestone
    ? currentMilestone.tasks.map((t) => ({
        id: t.id,
        title: t.title,
        estimatedMinutes: t.estimatedMinutes,
        completed: t.status === "COMPLETED",
      }))
    : [];

  return (
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

      <AIInsights
        summary={roadmap.aiSummary ?? ""}
        strengths={[
          "React",
          "Frontend",
        ]}
        improvements={[
          "DSA",
          "SQL",
        ]}
      />

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
        milestones={milestonesWithStatus}
      />

      {currentMilestone && (
        <TaskChecklist
          title={currentMilestone.title}
          tasks={checklistTasks}
        />
      )}

    </div>
  );
}
"use client";

import MissionHero from "./MissionHero";

interface DashboardHeroProps {
  greeting?: string;
  name?: string | null;
  readinessScore?: number;
  mission?: {
    title: string;
    description: string;
    estimatedMinutes: number;
    rewardResumeScore?: number | null;
    rewardOpportunityMatch?: number | null;
  } | null;
}

export default function DashboardHero({
  greeting,
  name,
  readinessScore = 0,
  mission,
}: DashboardHeroProps) {
  return (
    <MissionHero
      title={mission?.title ?? "No Active Mission"}
      description={mission?.description ?? "You're all caught up."}
      progress={readinessScore}
      estimatedTime={`${mission?.estimatedMinutes ?? 0} mins`}
      reward={
        mission?.rewardResumeScore
          ? `+${mission.rewardResumeScore} Resume`
          : "Complete today's mission"
      }
      matchIncrease={
        mission?.rewardOpportunityMatch
          ? `+${mission.rewardOpportunityMatch}% Match`
          : undefined
      }
      dueText="Today"
    />
  );
}

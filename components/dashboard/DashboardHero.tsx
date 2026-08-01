"use client";

import MissionHero from "./MissionHero";

interface DashboardHeroProps {
  greeting?: string;
  name?: string | null;
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
  mission,
}: DashboardHeroProps) {
  return (
    <MissionHero
      title={mission?.title ?? "No Active Mission"}
      description={mission?.description ?? "You're all caught up."}
      progress={0}
      estimatedTime={`${mission?.estimatedMinutes ?? 0} mins`}
      reward={`+${mission?.rewardResumeScore ?? 0} Resume`}
      matchIncrease={`+${mission?.rewardOpportunityMatch ?? 0}% Match`}
      dueText="Today"
    />
  );
}

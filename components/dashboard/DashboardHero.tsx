"use client";

import { DashboardData } from "@/types/dashboard";
import MissionHero from "./MissionHero";

interface DashboardHeroProps {
  dashboard?: DashboardData;
  name?: string | null;
}

export default function DashboardHero({ dashboard }: DashboardHeroProps) {
  return (
    <MissionHero
    title={dashboard?.mission?.title ?? "No Active Mission"}
    description={dashboard?.mission?.description ?? "You're all caught up."}
    progress={dashboard?.resume?.overallScore ?? 0}
    estimatedTime={`${dashboard?.mission?.estimatedMinutes ?? ""} mins`}
    reward={`+${dashboard?.mission?.rewardResumeScore ?? ""} Resume`}
    matchIncrease={`+${dashboard?.mission?.rewardOpportunityMatch ?? ""} % Match`}
    dueText="Today"
/>
  );
}

import { redirect } from "next/navigation";

import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth";

import MissionHeader from "@/components/mission/MissionHeader";
import MissionDetails from "@/components/mission/MissionDetails";
import RewardCard from "@/components/mission/RewardCard";
import MissionProgress from "@/components/mission/MissionProgress";
import CompleteMissionButton from "@/components/mission/CompleteMissionButton";
import missionOrchestratorService from "@/services/mission/mission-orchestrator.service";

export default async function MissionPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const mission = await missionOrchestratorService.getOrCreateMission(session.user.id);

  if (!mission) {
    return (
      <AppShell
        title="Today's Mission"
        subtitle="Complete your next career milestone"
      >
        <div className="p-8 text-center text-muted-foreground">
          No mission available for today.
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      title="Today's Mission"
      subtitle="Complete your next career milestone"
    >
      <div className="space-y-6">
        <MissionHeader mission={mission} />

        <MissionDetails mission={mission} />

        <RewardCard mission={mission} />

        <MissionProgress
          progress={67}
          completedTasks={2}
          totalTasks={3}
          remainingMinutes={8}
        />

        <CompleteMissionButton missionId={mission.id} />
      </div>
    </AppShell>
  );
}
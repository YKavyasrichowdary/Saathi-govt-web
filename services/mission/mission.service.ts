import {
  MissionCategory,
  MissionPriority,
  MissionStatus,
} from "@prisma/client";
import xpService from "@/services/progress/xp.service";
import activityService from "@/services/progress/activity.service";
import streakService from "@/services/progress/streak.service";
import repository from "@/repositories/mission/mission.repository";
import orchestrator from "./mission-orchestrator.service";

class MissionService {
  async createMission(data: {
    userId: string;
    title: string;
    description: string;
    category: MissionCategory;
    estimatedMinutes: number;
    rewardResumeScore?: number;
    rewardOpportunityMatch?: number;
    rewardProfileScore?: number;
    rewardXP?: number;
    priority?: MissionPriority;
  }) {
    return repository.create(data);
  }

  async getTodayMissions(userId: string) {
  return repository.getTodayMissions(userId);
}

  async getCurrentMission(userId: string) {
    return orchestrator.getOrCreateMission(userId);
  }

  async getUserMissions(userId: string) {
    return repository.getAll(userId);
  }

  async completeMission(
    id: string,
    userId: string
  ) {
    const mission =
      await repository.completeMission(
        id,
        userId
      );

    if (mission.status === "COMPLETED") {
      await activityService.recordActivity(
        userId
      );
    }

    return mission;
  }

  async startMission(id: string) {
    const mission =
      await repository.updateStatus(
        id,
        MissionStatus.IN_PROGRESS
      );

    if (mission?.userId) {
      await activityService.recordActivity(
        mission.userId
      );
    }

    return mission;
  }

  async getMission(id: string) {
    return repository.getMission(id);
  }

  async deleteMission(id: string) {
    return repository.delete(id);
  }
}

export default new MissionService();
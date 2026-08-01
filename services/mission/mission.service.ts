import {
  MissionCategory,
  MissionPriority,
  MissionStatus,
} from "@prisma/client";

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

  async getCurrentMission(userId: string) {
    return orchestrator.getOrCreateMission(userId);
  }

  async getUserMissions(userId: string) {
    return repository.getAll(userId);
  }

async completeMission(id: string) {
  return repository.completeMission(id);
}

  async startMission(id: string) {
    return repository.updateStatus(
      id,
      MissionStatus.IN_PROGRESS
    );
  }

  async getMission(id: string) {
    return repository.getMission(id);
  }

  async deleteMission(id: string) {
    return repository.delete(id);
  }
}

export default new MissionService();
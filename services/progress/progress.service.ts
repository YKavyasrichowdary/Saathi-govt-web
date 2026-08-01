import xpService from "@/services/xp/xp.service";
import missionService from "@/services/mission/mission.service";
import roadmapProgressRepository from "@/repositories/roadmap/roadmap-progress.repository";

class ProgressService {

  async completeMission(
    missionId: string,
    userId: string,
    rewardXP: number
  ) {

    // Step 1
    await missionService.completeMission(
      missionId
    );

    const mission =
      await missionService.getMission(
        missionId
      );

    if (mission?.roadmapTaskId) {

      await roadmapProgressRepository.completeTask(
        mission.roadmapTaskId
      );

      const task =
        await roadmapProgressRepository.getTask(
          mission.roadmapTaskId
        );

      if (task) {

        await roadmapProgressRepository.updateMilestoneStatus(
          task.milestone.id
        );

        await roadmapProgressRepository.updateRoadmapProgress(
          task.milestone.roadmap.id
        );

      }

    }

    // Step 2
    await xpService.rewardXP(
      userId,
      rewardXP
    );

    return {
      success: true,
    };

  }

}

export default new ProgressService();
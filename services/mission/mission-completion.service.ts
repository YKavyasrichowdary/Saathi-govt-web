import missionService from "./mission.service";
import xpService from "../xp/xp.service";

class MissionCompletionService {

  async completeMission(
    missionId: string,
    userId: string,
    rewardXP: number
  ) {


  await missionService.completeMission(missionId);


  await xpService.rewardXP(userId, rewardXP);


  return {
    success: true,
  };

  }

}

export default new MissionCompletionService();